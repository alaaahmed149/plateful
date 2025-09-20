import Link from "next/link";
import Image from "next/image";
export default function Hero() {
  return (
    <div className="w-full max-w-6xl flex flex-col-reverse md:flex-row items-center justify-between px-4 py-8 md:gap-20 md:py-10">
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Discover Delicious Recipes
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          Find recipes to enjoy cooking in your home. Save your favorites and
          explore new culinary ideas.
        </p>
        <Link
          href="/recipes"
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          Explore Recipes
        </Link>
      </div>
      <div className="md:w-1/2 mt-2 md:mt-0">
        <Image src="/hero.png" alt="hero" width={500} height={500} />
      </div>
    </div>
  );
}
