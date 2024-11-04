import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export default function LoadingProductPage() {
  return (
    <main className="mx-auto mt-6 md:mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-5xl lg:px-8">
      <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-5 lg:col-start-7">
          <div className="flex justify-between">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="mt-4">
            <h2 className="sr-only">Reviews</h2>
            <div className="flex items-center">
              <div className="h-5 w-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="ml-1 flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Star
                    key={rating}
                    className={cn(
                      "h-5 w-5 flex-shrink-0 text-gray-200 animate-pulse",
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div className="ml-4 flex">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-1 lg:row-span-3 lg:row-start-1">
          <div className="relative w-full aspect-[3/4] md:aspect-[4/5] md:overflow-hidden">
            <div className="w-full h-full bg-gray-200 animate-pulse"></div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <form>
            <div className="md:mt-8 md:mb-1 flex flex-col gap-3">
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="mt-8 h-12 w-full bg-gray-200 rounded animate-pulse"></div>
          </form>
        </div>
      </div>
    </main>
  );
}
