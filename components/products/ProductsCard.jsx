//

import { formatPrice } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import Rating from "./Rating";

export default function ProductsCard({ products }) {
  return (
    <div className="flex-1">
      <div className="space-y-4">
        {/* <!-- Product 1 --> */}

        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="flex gap-4 p-4 border rounded hover:shadow-md transition"
          >
            <div className="w-48 h-48 flex-shrink-0 bg-gray-50 flex items-center justify-center">
              <Image
                src={product.images[0].url}
                alt={product.images[0].alt}
                height={300}
                width={300}
                className="h-full object-cover mix-blend-multiply"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg text-amazon-blue hover:text-amazon-orange font-normal mb-1">
                {product.title}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amazon-secondary">
                  <Rating rating={product.rating.average} />
                </div>
                <span className="text-sm text-amazon-blue">
                  {formatPrice(product.rating.count)}
                </span>
              </div>
              <div className="mb-2">
                <span className="text-2xl font-normal">
                  ৳ {formatPrice(product.price)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                FREE delivery <strong>Tomorrow</strong>
              </p>
              <p className="text-xs text-gray-500">
                {product.shortDescription}
              </p>
            </div>
          </Link>
        ))}
        {/* <a
          href="details.html"
          className="flex gap-4 p-4 border rounded hover:shadow-md transition"
        >
          <div className="w-48 h-48 flex-shrink-0 bg-gray-50 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1675868374786-3edd36dddf04?w=300"
              className="h-full object-cover mix-blend-multiply"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg text-amazon-blue hover:text-amazon-orange font-normal mb-1">
              Apple MacBook Pro 16" M2 Max - 32GB RAM, 1TB SSD, Space Gray
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-amazon-secondary">
                <i data-lucide="star" className="w-4 h-4 fill-current"></i>
                <i data-lucide="star" className="w-4 h-4 fill-current"></i>
                <i data-lucide="star" className="w-4 h-4 fill-current"></i>
                <i data-lucide="star" className="w-4 h-4 fill-current"></i>
                <i data-lucide="star" className="w-4 h-4 fill-current"></i>
              </div>
              <span className="text-sm text-amazon-blue">1,245</span>
            </div>
            <div className="mb-2">
              <span className="text-2xl font-normal">৳3,45,000</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              FREE delivery <strong>Tomorrow</strong>
            </p>
            <p className="text-xs text-gray-500">
              Apple M2 Max chip | 16-inch Liquid Retina XDR display | 1080p
              FaceTime HD camera
            </p>
          </div>
        </a> */}
      </div>
    </div>
  );
}
