import Image from "next/image";
import React from "react";

const ProductBanner = ({ product }) => {
  // console.log("Product:", product);
  return (
    <div className="w-full">
      {product ? (
        <Image
          src={product?.attributes?.banner?.data?.attributes?.url}
          height={400}
          width={350}
          alt="banner"
          className="rounded-lg object-cover"
        />
      ) : (
        <div className="h-[400px] w-[350px] bg-slate-300 animate-pulse"></div>
      )}
    </div>
  );
};

export default ProductBanner;
