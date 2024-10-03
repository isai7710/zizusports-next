export default async function Home() {
  return (
    <main className="min-h-screen bg-hero-img bg-center bg-cover bg-no-repeat flex flex-col justify-end">
      <section className="px-2 mb-20 md:mb-10 h-64 w-full max-w-5xl mx-auto flex flex-col justify-center items-center md:items-start gap-2">
        <h2 className="md:mt-10 text-5xl font-bold text-center md:text-start text-white w-full md:w-1/3">
          Powered By Community.
        </h2>
        <p className="w-2/3 md:w-full italic text-center md:text-start text-xl text-white">
          Sportswear with a heartbeat. Your passion, our gear.
        </p>
        <button className="text-white font-bold my-1 px-4 py-1 rounded-md bg-zinc-100 bg-opacity-25 backdrop-blur-sm transition duration-200 hover:scale-105">
          Find your team kit here
        </button>
      </section>
    </main>
  );
}
