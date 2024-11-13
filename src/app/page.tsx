import Carousel from "@/components/carousel";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, ShoppingBag, Truck, Users } from "lucide-react";

export default function Component() {
  const images = [
    "uniform24group",
    "uniform24kids1",
    "uniform24kids2",
    "uniform24girls1",
    "uniform22girls",
    "uniform22boys1",
    "uniform22boys2",
  ];

  const cardContent = [
    {
      title: "Quality Products",
      desc: "Our sportswear is crafted with premium materials for durability and comfort",
      icon: ShoppingBag,
    },
    {
      title: "Community-Driven",
      desc: "We support local teams and foster a sense of community through our products",
      icon: Users,
    },
    {
      title: "Fast Delivery",
      desc: "Get your team kits quickly with our efficient shipping process",
      icon: Truck,
    },
  ];

  return (
    <main className="min-h-screen w-full">
      <div className="container max-w-5xl md:max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 pb-8 md:pb-0">
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-1 md:gap-4 text-black">
            <h2 className="text-3xl sm:text-5xl font-bold">
              Powered By Community.
            </h2>
            <p className="text-center text-md sm:text-lg text-balance px-4">
              SIZU is an all-in-one platform for{" "}
              <span className="font-semibold">team management</span>,{" "}
              <span className="font-semibold">uniform ordering</span>, and
              streamlined <span className="font-semibold">club operations</span>
              . Gear up for your story below.
            </p>
            <Tabs defaultValue="player" className="w-full max-w-md mt-4">
              <TabsList className="grid w-full grid-cols-2 bg-gray-500/10">
                <TabsTrigger value="manager">Manager</TabsTrigger>
                <TabsTrigger value="player">Player</TabsTrigger>
              </TabsList>
              <TabsContent value="manager" className="mt-4 text-center">
                <Link
                  href="/dashboard"
                  className="inline-flex w-80 items-center justify-center py-1.5 text-white bg-black rounded-md shadow-md"
                >
                  Manager Login
                </Link>
              </TabsContent>
              <TabsContent value="player" className="mt-4 text-center">
                <Link
                  href="/shop/uniform-kits"
                  className="inline-flex w-80 items-center justify-center py-1.5 text-white bg-black rounded-md shadow-md"
                >
                  Find your team kit here
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </TabsContent>
            </Tabs>
          </div>
          <div className="order-first md:order-1 w-full md:w-1/2 h-[400px] px-8 pt-4 md:px-0 md:pr-4 md:pt-0 relative overflow-hidden">
            <Carousel imgs={images} />
          </div>
        </div>
      </div>

      <section className="px-8 py-16 bg-transparent">
        <div className="container max-w-5xl md:max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            Why Choose Us?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cardContent.map((card) => {
              const CardIcon = card.icon;
              return (
                <div
                  key={card.title}
                  className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md transition duration-300 hover:shadow-xl"
                >
                  <CardIcon className="w-10 h-10" />
                  <h4 className="text-xl font-semibold mt-4 mb-2">
                    {card.title}
                  </h4>
                  <p className="text-gray-600">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container max-w-5xl md:max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Join Our Community</h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Be part of something bigger. Sign up for our newsletter to get
            exclusive offers, community stories, and more!
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-primary text-white font-bold transition duration-200 hover:bg-primary/90"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
