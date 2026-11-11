#!/usr/bin/env bash
# Checks, from outside the site, that the public Firebase key and the Firestore
# rules for the visitor counter are locked down (see .claude/plans/visitor-counter.md).
#
#   ./scripts/check-firebase.sh
#
# Reads the API key and project ID from src/lib/firebase.ts. Each passing run
# adds 1 anonymous user (Firebase Authentication → Users) but never creates a
# visitor doc, so the count isn't affected. Needs curl and python3.
set -uo pipefail

cd "$(dirname "$0")/.."
CONFIG=src/lib/firebase.ts
KEY=$(sed -n 's/.*apiKey: *"\([^"]*\)".*/\1/p' "$CONFIG")
PROJECT=$(sed -n 's/.*projectId: *"\([^"]*\)".*/\1/p' "$CONFIG")
[ -n "$KEY" ] && [ -n "$PROJECT" ] || { echo "No apiKey/projectId found in $CONFIG"; exit 1; }

SITE="https://chkjacky.github.io/intro/"
SIGNUP="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=$KEY"
DB="https://firestore.googleapis.com/v1/projects/$PROJECT/databases/(default)/documents"
FAILED=0

# check <label> <expected> <actual>
check() {
  if [ "$2" = "$3" ]; then printf '  PASS  %-46s %s\n' "$1" "$3"
  else printf '  FAIL  %-46s got %s, expected %s\n' "$1" "$3" "$2"; FAILED=1; fi
}

# status <curl args...>: prints only the HTTP status code
status() { curl -s -o /dev/null -w '%{http_code}' "$@"; }

# signup [referer]: anonymous sign-in, prints the raw JSON response
signup() {
  local args=(-s -X POST "$SIGNUP" -H 'Content-Type: application/json' -d '{"returnSecureToken":true}')
  [ -n "${1:-}" ] && args+=(-H "Referer: $1")
  curl "${args[@]}"
}

json() { python3 -I -c "import json,sys;d=json.load(sys.stdin);print($1)" 2>/dev/null; }

echo "API key restrictions (Google Cloud Console → Credentials)"
check "sign-in with no referer"                 blocked "$(signup | json '"ok" if "idToken" in d else "blocked"')"
check "sign-in from https://evil.example.com"   blocked "$(signup https://evil.example.com/ | json '"ok" if "idToken" in d else "blocked"')"
check "Gemini API with this key"                403 "$(status "https://generativelanguage.googleapis.com/v1beta/models?key=$KEY" -H "Referer: $SITE")"
check "email/password sign-up"                  blocked "$(curl -s -X POST "$SIGNUP" -H "Referer: $SITE" -H 'Content-Type: application/json' \
  -d '{"email":"probe@example.com","password":"probe12345","returnSecureToken":true}' | json '"ok" if "idToken" in d else "blocked"')"

# Sign in as the site would, to test the rules with a real anonymous user
RESP=$(signup "$SITE")
TOKEN=$(echo "$RESP" | json 'd["idToken"]')
UID_=$(echo "$RESP" | json 'd["localId"]')
check "sign-in from $SITE" ok "$([ -n "$TOKEN" ] && echo ok || echo blocked)"
[ -n "$TOKEN" ] || { echo "Can't test the rules without a sign-in."; exit 1; }

echo
echo "Firestore rules (firestore.rules)"
AUTH=(-H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -H "Referer: $SITE")
AT='{"fields":{"at":{"timestampValue":"2026-01-01T00:00:00Z"}}}'
check "create another user's visitor doc"     403 "$(status -X PATCH "$DB/visitors/someone-else?currentDocument.exists=false" "${AUTH[@]}" -d "$AT")"
check "create own doc with a client timestamp" 403 "$(status -X PATCH "$DB/visitors/$UID_?currentDocument.exists=false" "${AUTH[@]}" -d "$AT")"
check "create own doc with an extra field"     403 "$(status -X PATCH "$DB/visitors/$UID_?currentDocument.exists=false" "${AUTH[@]}" \
  -d '{"fields":{"at":{"timestampValue":"2026-01-01T00:00:00Z"},"x":{"stringValue":"y"}}}')"
check "write to another collection"            403 "$(status -X POST "$DB/junk" "${AUTH[@]}" -d '{"fields":{"a":{"stringValue":"b"}}}')"
check "write without signing in"               403 "$(status -X POST "$DB/junk" -H 'Content-Type: application/json' -d '{"fields":{"a":{"stringValue":"b"}}}')"
check "read the visitors list"                 200 "$(status "$DB/visitors?pageSize=1" -H "Referer: $SITE")"

FIRST=$(curl -s "$DB/visitors?pageSize=1" -H "Referer: $SITE" | json 'd.get("documents",[{}])[0].get("name","").split("/")[-1]')
if [ -n "$FIRST" ]; then
  check "update an existing visitor doc" 403 "$(status -X PATCH "$DB/visitors/$FIRST" "${AUTH[@]}" -d "$AT")"
  check "delete an existing visitor doc" 403 "$(status -X DELETE "$DB/visitors/$FIRST" "${AUTH[@]}")"
else
  echo "  SKIP  update/delete (no visitor docs yet)"
fi

echo
[ "$FAILED" = 0 ] && echo "All checks passed." || echo "Some checks failed, see FAIL lines above."
exit "$FAILED"
