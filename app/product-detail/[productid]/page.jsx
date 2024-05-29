"use client";
import React, { useEffect, useState } from "react";
import ProductBanner from "./_components/ProductBanner";
import ProductInfo from "./_components/ProductInfo";
import GlobalApi from "../../_utils/GlobalApi";
import BreadCrumb from "../../_components/BreadCrumb";
import ProductList from "../../_components/ProductList";

const ProductDetail = ({ params }) => {
  const [productDetail, setProductDetail] = useState();
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    getProduct();
  }, []);

  const getProductList = (product) => {
    GlobalApi.getProductbyCategory(product.attributes.category)
      .then((res) => {
        setProductList(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.error("Error while fetching product List", err);
      });
  };

  const getProduct = () => {
    GlobalApi.getProductbyId(params.productid)
      .then((res) => {
        setProductDetail(res.data.data);
        getProductList(res.data.data);
      })
      .catch((err) => {
        console.error("Error while fetching product Detail", err);
      });
  };
  return (
    <div className="p-6 md:p-20">
      <BreadCrumb productid={params.productid}/>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10 sm:gap-5">
        {productDetail && <ProductBanner product={productDetail} />}
        {productDetail && <ProductInfo product={productDetail} />}
      </div>
      {productList && (
        <div className="mt-20">
          <h2 className="mb-8 font-medium text-[24px]">Similar Products</h2>
          <ProductList productList={productList} />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
