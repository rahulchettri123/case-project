import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";

export default function HomePage() {
  // This would be fetched from a database in a real app
  const featuredProducts = [
    {
      id: "1",
      name: "Modern Chair",
      price: 149.99,
      image: "https://placehold.co/600x400?text=Modern+Chair",
      category: "Furniture",
    },
    {
      id: "2",
      name: "Ergonomic Desk",
      price: 299.99,
      image: "https://placehold.co/600x400?text=Ergonomic+Desk",
      category: "Furniture",
    },
    {
      id: "3",
      name: "Ceramic Vase",
      price: 59.99,
      image: "https://placehold.co/600x400?text=Ceramic+Vase",
      category: "Decor",
    },
    {
      id: "4",
      name: "Wall Art",
      price: 89.99,
      image: "https://placehold.co/600x400?text=Wall+Art",
      category: "Decor",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner Carousel */}
      <div className="relative overflow-hidden rounded-xl bg-gray-100 h-[400px] md:h-[500px] mb-12">
        <div className="absolute inset-0">
          <Image
            src="https://placehold.co/1200x500?text=Beautiful+Home+Furniture"
            alt="Banner image"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-start p-8 md:p-16">
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
            Transform Your Space
          </h1>
          <p className="text-white text-lg md:text-xl mb-8 max-w-md">
            Discover our collection of beautiful furniture and home decor items.
          </p>
          <Link href="/products">
            <Button size="lg" className="font-semibold">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Latest Products Section */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Latest Products</h2>
          <Link href="/products" className="text-sm text-primary hover:underline">
            View All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Featured Categories */}
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            href="/categories/furniture" 
            className="group relative overflow-hidden rounded-xl h-[200px]"
          >
            <Image
              src="https://placehold.co/600x400?text=Furniture"
              alt="Furniture"
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <h3 className="text-white text-2xl font-bold">Furniture</h3>
            </div>
          </Link>
          <Link 
            href="/categories/decor" 
            className="group relative overflow-hidden rounded-xl h-[200px]"
          >
            <Image
              src="https://placehold.co/600x400?text=Decor"
              alt="Decor"
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <h3 className="text-white text-2xl font-bold">Decor</h3>
            </div>
          </Link>
          <Link 
            href="/categories/lighting" 
            className="group relative overflow-hidden rounded-xl h-[200px]"
          >
            <Image
              src="https://placehold.co/600x400?text=Lighting"
              alt="Lighting"
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <h3 className="text-white text-2xl font-bold">Lighting</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 