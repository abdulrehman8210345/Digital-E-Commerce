"use client";
import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import GlobalApi from "../_utils/GlobalApi";

const ProductSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    latestProducts();
  }, []);

  const latestProducts = () => {
    GlobalApi.getLatestProducts().then((res) => {
      // console.log(res.data.data);
      setProducts(res.data.data);
    });
  };
  return (
    <div className="p-10 md:p-20">
      <h2 className="py-2 font-bold text-[20px] ">Brand New</h2>
      <ProductList productList={products} />
      <h2 className="pt-12 py-2 font-bold text-[20px] ">New Collections</h2>
      <ProductList productList={products} />
      <h2 className=" pt-12 py-2 font-bold text-[20px] ">New Sale</h2>
      <ProductList productList={products} />
    </div>
  );
};

export default ProductSection;
