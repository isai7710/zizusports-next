export default function LoadingShop() {
  return (
    <section className="min-h-screen">
      <div className="relative w-full h-48 md:h-80 bg-gray-500 flex justify-center items-center gap-3">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        <h1 className="absolute text-nowrap z-10 text-palette-1 text-2xl md:text-5xl font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pt-32 md:pt-44">
          Loading...
        </h1>
      </div>
    </section>
  );
}
