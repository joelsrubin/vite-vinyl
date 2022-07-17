export default function VStack({ items }: { items: any[] }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <div className="stack">
        {items.map((item, i) => (
          <div
            className="grid w-32 h-20 rounded bg-primary text-primary-content place-content-center"
            key={i}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}
