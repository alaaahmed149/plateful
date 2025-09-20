export default function CardsLoading() {
  return (
    <div className="w-full min-h-screen flex items-center flex-col">
      <h1 className="text-4xl font-extrabold text-gray-900 my-8">Recipes</h1>

      {/* Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-md shadow-md animate-pulse"
          >
            {/* Skeleton Image */}
            <div className="w-full h-40 bg-gray-300 rounded-md mb-2"></div>

            {/* Skeleton Title */}
            <div className="h-5 bg-gray-300 rounded mb-2 w-3/4"></div>

            {/* Skeleton Area */}
            <div className="h-4 bg-gray-200 rounded mb-1 w-1/2"></div>

            {/* Skeleton Category */}
            <div className="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>

            {/* Skeleton Tags */}
            <div className="mt-2 flex flex-wrap gap-1">
              <div className="h-5 bg-gray-200 rounded-full w-12"></div>
              <div className="h-5 bg-gray-200 rounded-full w-16"></div>
              <div className="h-5 bg-gray-200 rounded-full w-14"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
