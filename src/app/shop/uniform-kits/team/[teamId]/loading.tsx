import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden p-4">
      <div className="flex flex-col md:grid md:grid-cols-11 md:gap-x-6">
        <div className="block md:hidden mb-4">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2" />
        </div>

        <div className="order-2 md:order-1 md:col-span-1 md:col-start-1 md:row-start-1">
          <div className="flex md:grid md:grid-rows-4 gap-2 my-4 md:my-0 space-x-2 md:space-x-0">
            {[...Array(3)].map((_, index) => (
              <Skeleton
                key={index}
                className="w-16 md:w-full aspect-square rounded-md"
              />
            ))}
          </div>
        </div>

        <div className="order-1 md:order-2 md:col-span-5 md:col-start-2 md:row-start-1">
          <Skeleton className="w-full aspect-square md:aspect-[2/3] rounded-xl" />
        </div>

        <div className="order-3 md:col-span-5 md:col-start-7 mt-6 md:mt-0">
          <div className="hidden md:block mb-6">
            <Skeleton className="h-10 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2" />
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between my-6">
              <div>
                <Skeleton className="h-5 w-20 mb-2" />
                <div className="flex space-x-2">
                  {[...Array(3)].map((_, index) => (
                    <Skeleton key={index} className="w-8 h-8 rounded-full" />
                  ))}
                </div>
              </div>
              <div>
                <Skeleton className="h-5 w-24 mb-2" />
                <Skeleton className="h-10 w-40" />
              </div>
            </div>

            <div className="my-6 space-y-4">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <Skeleton className="w-16 md:w-20 aspect-square rounded-md" />
                  <div className="flex-grow">
                    <Skeleton className="h-5 w-24 mb-2" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-10 w-[100px]" />
                </div>
              ))}
            </div>

            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
