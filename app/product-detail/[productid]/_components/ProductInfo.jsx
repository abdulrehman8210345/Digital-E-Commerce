import { useUser } from "@clerk/nextjs";
import { AlertOctagon, BadgeCheck, ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import GlobalApi from "../../../_utils/GlobalApi";
import { CartContext } from "../../../_context/CartContext";

const ProductInfo = ({ product }) => {
  const router = useRouter();
  const { user } = useUser();
  const { cart, setCart } = useContext(CartContext);
  // console.log(product.id);
  const toAddCart = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    } else {
      const data = {
        data: {
          userName: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: product.id,
        },
      };
      GlobalApi.addToCart(data)
        .then((res) => {
          // console.log("Added to cart",product);
          setCart((cart) => [...cart, { id: res.data.id, product: product }]);
        })
        .catch((err) => {
          console.log("Error while adding to the cart", err);
        });
    }
  };
  return (
    <div>
      <h2 className="text-[20px]">{product.attributes.title}</h2>
      <h2 className="text-[16px] text-gray-400 ">
        {product.attributes.category}
      </h2>
      <h2 className="text-[20px] text-gray-600 mt-4">
        {product.attributes.description[0].children[0].text}
      </h2>
      <h2 className="flex gap-2 text-[14px] text-gray-500 mt-3">
        {product.attributes.instantDelivery ? (
          <BadgeCheck className=" text-green-500 h-5 w-5" />
        ) : (
          <AlertOctagon className="text-yellow-400 h-5 w-5" />
        )}{" "}
        Eligible for instant delivery
      </h2>
      <h2 className="text-[32px] mt-4 font-medium text-primary">
        ${product.attributes.pricing}
      </h2>
      <button
        onClick={() => toAddCart()}
        className="flex gap-2 mt-4 bg-primary p-4 rounded-lg text-white px-8 hover:bg-blue-700"
      >
        <ShoppingCartIcon />
        Add to cart
      </button>
    </div>
  );
};

export default ProductInfo;
