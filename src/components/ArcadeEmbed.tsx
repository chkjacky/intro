/**
 * An Arcade (demo.arcade.software) interactive demo, sized like Arcade's own
 * embed snippet: `ratio` is the demo's height as a % of its width, and the
 * extra 41px fits Arcade's toolbar.
 */
export default function ArcadeEmbed({
  id,
  title,
  ratio,
}: {
  id: string;
  title: string;
  ratio: number;
}) {
  return (
    <div
      style={{
        position: "relative",
        paddingBottom: `calc(${ratio}% + 41px)`,
        height: "0",
        width: "100%",
      }}
    >
      <iframe
        src={`https://demo.arcade.software/${id}?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true`}
        title={title}
        loading="lazy"
        allowFullScreen
        allow="clipboard-write; autoplay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          colorScheme: "light",
        }}
      />
    </div>
  );
}
