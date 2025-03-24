import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the product interface
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  discountPrice?: number;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, price, image, category, discountPrice } = product;
  const hasDiscount = discountPrice !== undefined;

  return (
    <div className="group relative rounded-xl border bg-card text-card-foreground overflow-hidden transition-all hover:shadow-md">
      {/* Product Image */}
      <Link href={`/products/${id}`} className="block relative h-60 md:h-72 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full">
            {Math.round(((price - discountPrice) / price) * 100)}% OFF
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {category && (
          <div className="text-xs text-muted-foreground mb-1">{category}</div>
        )}
        
        <Link href={`/products/${id}`} className="block">
          <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-2 flex items-center">
          {hasDiscount ? (
            <>
              <span className="font-semibold">${discountPrice.toFixed(2)}</span>
              <span className="ml-2 text-sm text-muted-foreground line-through">
                ${price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-semibold">${price.toFixed(2)}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button 
          size="sm" 
          className="mt-3 w-full gap-1"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}; 