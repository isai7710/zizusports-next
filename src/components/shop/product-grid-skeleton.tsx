import { cn } from "@/lib/utils";

export default function ProductGridSkeleton({
  className,
  itemCount = 9,
}: {
  className?: string;
  itemCount?: number;
}) {
  return (
    <section
      className={cn(
        "w-full max-w-4xl mx-auto md:my-8 grid grid-cols-2 md:grid-cols-3 gap-4",
        className,
      )}
    >
      {Array.from({ length: itemCount }).map((_, index) => (
        <div
          key={index}
          className="bg-white flex flex-col"
          aria-busy="true"
          aria-live="polite"
        >
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-md">
            <div className="w-full h-full bg-gray-200 animate-pulse" />
          </div>
          <div className="p-4 space-y-2">
            <div className="h-6 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
            <div className="flex gap-2 mt-2">
              {Array.from({ length: 2 }).map((_, colorIndex) => (
                <div
                  key={colorIndex}
                  className="w-6 h-6 rounded-full bg-gray-200 animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
