import { ChevronRightSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductItem = ({ product }) => {
  return (
    <Link href={`/product-detail/${product.id}`}>
      <div className="hover:border hover:p-1 rounded-lg border-blue-300">
        <Image
          src={product.attributes.banner.data.attributes.url}
          height={350}
          alt="banner"
          width={400}
          className="rounded-t-lg h-[250px] object-cover"
        />
        <div className="flex justify-between items-center p-6 bg-gray-100 rounded-b-lg">
          <div>
            <h2 className="text-[18px] font-medium">
              {product.attributes.title}
            </h2>
            <h2 className="text-[14px] text-gray-400 flex gap-2">
              <ChevronRightSquare className="h-5 w-5" />{" "}
              {product.attributes.category}
            </h2>
          </div>
          <h2>${product.attributes.pricing}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
