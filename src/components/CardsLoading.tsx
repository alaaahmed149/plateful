export default function CardsLoading() {
  return (
    <div className="w-full min-h-screen flex items-center flex-col">
      <h1 className="text-4xl font-extrabold text-gray-900 my-8">Recipes</h1>

      <div className="flex flex-wrap justify-center gap-6 px-4 mb-8 max-w-7xl w-full">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md animate-pulse w-80 flex-shrink-0"
          >
            <div className="w-full h-40 bg-gray-300 rounded-md mb-2"></div>

            <div className="h-5 bg-gray-300 rounded mb-2 w-3/4"></div>

            <div className="h-4 bg-gray-200 rounded mb-1 w-1/2"></div>

            <div className="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>

            <div className="mt-2 flex flex-wrap gap-2">
              <div className="h-5 bg-gray-200 rounded-lg w-12"></div>
              <div className="h-5 bg-gray-200 rounded-lg w-16"></div>
              <div className="h-5 bg-gray-200 rounded-lg w-14"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
