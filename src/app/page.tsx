import Carousel from "@/components/carousel";

export default async function Home() {
  const images = [
    "uniform22girls.jpg",
    "uniform22boys1.jpg",
    "uniform22boys2.jpg",
    "teamintrainingjerseys.png",
    "2010inblack.png",
    "upslatrslindoor.jpg",
  ];

  return (
    <main className="bg-palette-1 flex items-center p-2">
      <div className="w-1/2 pb-4 px-8 h-52 flex flex-col justify-center items-center gap-2 text-primary">
        <h2 className="text-5xl font-bold text-center  w-full md:w-2/3">
          Powered By Community.
        </h2>
        <p className="w-2/3 md:w-full italic text-center text-xl">
          Sportswear with a heartbeat. Your passion, our gear.
        </p>
        <button className="font-bold my-1 px-4 py-1 rounded-md bg-zinc-400 bg-opacity-25 backdrop-blur-sm transition duration-200 hover:scale-105 hover:-rotate-3">
          Find your team kit here
        </button>
      </div>
      <Carousel
        className="rounded-xl min-h-[80vh] w-1/2 mx-auto flex flex-col justify-end"
        imgs={images}
      />
    </main>
  );
}
