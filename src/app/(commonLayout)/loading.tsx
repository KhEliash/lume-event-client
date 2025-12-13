export default function Loading() {
  return (
    <div className="p-6 space-y-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-10 bg-gray-200 rounded animate-pulse"
        />
      ))}
    </div>
  );
}
