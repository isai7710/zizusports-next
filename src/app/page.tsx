import Carousel from "@/components/carousel";
import Link from "next/link";

export default async function Home() {
  const images = [
    "uniform24group",
    "uniform24kids1",
    "uniform24kids2",
    "uniform24girls1",
    "uniform22girls",
    "uniform22boys1",
    "uniform22boys2",
  ];

  return (
    <main className="container w-full max-w-5xl md:max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-8 pb-8 md:pb-0">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-1 md:gap-4 text-primary">
          <h2 className="text-3xl sm:text-5xl font-bold text-center">
            Powered By Community.
          </h2>
          <p className="italic text-center text-md sm:text-lg text-balance">
            Sportswear with a heartbeat. Your passion, our gear.
          </p>
          <Link
            href="/shop"
            className="font-bold px-6 py-2 rounded-md bg-primary text-white transition duration-200 hover:bg-primary/90 hover:scale-105 mt-1"
          >
            Find your team kit here
          </Link>
        </div>
        <div className="order-first md:order-1 w-full md:w-1/2 h-[400px] md:h-[400px] relative overflow-hidden">
          <Carousel imgs={images} />
        </div>
      </div>
    </main>
  );
}
