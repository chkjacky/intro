import { MoveDown } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function BounceToScrollDown({
  sectionName,
  sectionId,
}: {
  sectionName: string;
  sectionId: string;
}) {
  return (
    <div className="flex h-[10vh] flex-col items-center justify-center">
      <Button
        asChild
        className="bg-muted-foreground/60 dark:bg-input h-8 w-8 animate-bounce rounded-full border border-white hover:cursor-pointer"
      >
        <a href={`#${sectionId}`} title={`View ${sectionName}`}>
          <MoveDown className="h-5 w-5 text-white" />
        </a>
      </Button>
    </div>
  );
}
