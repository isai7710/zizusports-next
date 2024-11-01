import { cn } from "@/lib/utils";
import { Star } from "react-feather";

export default function ProductHeader({
  name,
  price,
}: {
  name: string;
  price: string;
}) {
  return (
    <>
      <div className="flex flex-col md:justify-between items-start mb-2">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
          {name}
        </h1>
        <p className="text-xl md:text-2xl font-medium text-gray-900">
          ${price}
        </p>
      </div>
      <div className="my-4">
        <h2 className="sr-only">Reviews</h2>
        <div className="flex items-center flex-wrap">
          <div className="flex items-center mr-2">
            {[0, 1, 2, 3, 4].map((rating) => (
              <Star
                key={rating}
                className={cn(
                  4 > rating ? "text-yellow-400" : "text-gray-200",
                  "h-5 w-5 flex-shrink-0",
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="text-sm text-gray-700 mr-4">
            4 (5)
            <span className="sr-only"> out of 5 stars</span>
          </p>
          <a
            href="#"
            className="text-sm font-medium text-slate-600 hover:text-slate-500"
          >
            See all {42} reviews
          </a>
        </div>
      </div>
    </>
  );
}
