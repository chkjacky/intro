export default function VolksmarketArcade() {
  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "calc(47.5% + 41px)",
        height: "0",
        width: "100%",
      }}
    >
      <iframe
        src="https://demo.arcade.software/Z0LEAEHXvsMmR0S1xnkb?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
        title="Volksmarket - A true prediction market"
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
