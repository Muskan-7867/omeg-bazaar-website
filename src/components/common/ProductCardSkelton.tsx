

export function ProductCardSkeleton() {
  return (
    <article className="w-full md:w-82 max-w-full bg-white p-1 flex flex-col animate-pulse">
      {/* Image placeholder */}
      <div className="relative w-full aspect-square bg-gray-200 rounded-md" />

      <div className="mt-2 flex flex-col flex-1 gap-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="flex gap-1 mt-1">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="h-3 w-3 bg-gray-200 rounded-full" />
          ))}
          <div className="h-3 w-8 bg-gray-200 rounded ml-2" />
        </div>
        <div className="h-5 bg-gray-200 rounded w-1/2 mt-1" />
        <div className="h-3 bg-gray-200 rounded w-1/3 mt-1" />
        <div className="h-8 bg-gray-300 rounded mt-2" />
      </div>
    </article>
  );
}
