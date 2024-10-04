import Carousel from "@/components/carousel";

const images = [
  "uniform22girls.jpg",
  "uniform22boys1.jpg",
  "uniform22boys2.jpg",
  "teamintrainingjerseys.png",
  "2010inblack.png",
  "upslatrslindoor.jpg",
];

export default async function Home() {
  return (
    <main className="bg-palette-1">
      <Carousel
        className="rounded-xl min-h-[80vh] w-full max-w-5xl mx-auto flex flex-col justify-end"
        imgs={images}
      >
        <div className="mb-4 px-8 h-64 flex flex-col justify-end items-center md:items-start gap-2">
          <h2 className="text-5xl font-bold text-center md:text-start text-white w-full md:w-2/3">
            Powered By Community.
          </h2>
          <p className="w-2/3 md:w-full italic text-center md:text-start text-xl text-white">
            Sportswear with a heartbeat. Your passion, our gear.
          </p>
          <button className="text-white font-bold my-1 px-4 py-1 rounded-md bg-zinc-100 bg-opacity-25 backdrop-blur-sm transition duration-200 hover:scale-105">
            Find your team kit here
          </button>
        </div>
      </Carousel>
    </main>
  );
}
