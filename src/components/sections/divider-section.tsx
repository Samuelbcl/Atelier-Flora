// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DividerSection({ data }: { data: any }) {
  const style = data.style || "line";
  const height = data.hauteur || "md";
  const color = data.couleur?.hex || "#B49E7A";

  const heightMap: Record<string, string> = {
    sm: "py-6",
    md: "py-12",
    lg: "py-20",
    xl: "py-32",
  };

  if (style === "space") {
    return <div className={heightMap[height]} />;
  }

  if (style === "ornament") {
    return (
      <div className={`${heightMap[height]} flex items-center justify-center`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-[1px]" style={{ backgroundColor: color }} />
          <div className="w-2 h-2 rotate-45" style={{ backgroundColor: color }} />
          <div className="w-12 h-[1px]" style={{ backgroundColor: color }} />
        </div>
      </div>
    );
  }

  return (
    <div className={`${heightMap[height]} flex items-center`}>
      <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="w-full h-[1px]" style={{ backgroundColor: color, opacity: 0.2 }} />
      </div>
    </div>
  );
}
