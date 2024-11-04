import Carousel from "@/components/carousel";
import Link from "next/link";
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

  return (
    <main className="min-h-screen w-full">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container max-w-5xl md:max-w-7xl mx-auto">
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
                className="font-bold px-6 py-2 rounded-md bg-primary text-white transition duration-200 hover:bg-primary/90 hover:scale-105 mt-4 flex items-center gap-2"
              >
                Find your team kit here
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="order-first md:order-1 w-full md:w-1/2 h-[300px] md:h-[400px] px-8 pt-4 md:px-0 md:pt-0 relative overflow-hidden">
              <Carousel imgs={images} className="rounded-md" />
            </div>
          </div>
        </div>
      </div>

      <section className="px-8 py-16 bg-white">
        <div className="container max-w-5xl md:max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            Why Choose Us?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ShoppingBag className="w-12 h-12 text-primary" />}
              title="Quality Products"
              description="Our sportswear is crafted with premium materials for durability and comfort."
            />
            <FeatureCard
              icon={<Users className="w-12 h-12 text-primary" />}
              title="Community-Driven"
              description="We support local teams and foster a sense of belonging through our products."
            />
            <FeatureCard
              icon={<Truck className="w-12 h-12 text-primary" />}
              title="Fast Delivery"
              description="Get your team kits quickly with our efficient shipping process."
            />
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

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md transition duration-300 hover:shadow-xl">
      {icon}
      <h4 className="text-xl font-semibold mt-4 mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
