import React, { useContext, useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { CartContext } from "../_context/CartContext"; // Import CartContext
import GlobalApi from "../_utils/GlobalApi";
import Cart from "./Cart";

const Header = () => {
  const [isloggedin,setIsloggedin] =useState(false); 
  const {user} = useUser();
  const [openCart,setOpenCart]=useState(false);
  const {cart,setCart}=useContext(CartContext);

  useEffect(()=>{
    const path = window.location.pathname;
    if(path === "/sign-in" || path === "/sign-up"){
      setIsloggedin(path);
    }
  },[]);

  useEffect(()=>{
    user && getcartitem();
  },[user]);

  const getcartitem= ()=>{
    GlobalApi.getUserCartItems(user.primaryEmailAddress.emailAddress).then(res=>{
      const result = res.data.data;
      if(result && result.length > 0){
        const cartItems = result.map(prod => ({
          id: prod.id,
          product:prod.attributes.products.data[0]
        }));
        setCart(prev=>[...prev,...cartItems]);
      }
    })
  } 
  
  return !isloggedin && (
    <header className="bg-white">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-8 px-4 sm:px-6 lg:px-8 shadow-sm">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  Explore
                </a>
              </li>

              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  Projects
                </a>
              </li>

              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            { !user ? <div className="sm:flex sm:gap-4">
              <a
                className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-400"
                href="/sign-in"
              >
                Login
              </a>

              <a
                className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary transition hover:text-blue-800/75 sm:block"
                href="/sign-up"
              >
                Register
              </a>
            </div> :
             <div className="flex gap-4 items-center">
              <h2 className="flex gap-1 cursor-pointer" onClick={()=>setOpenCart(!openCart)}><ShoppingCart/>({cart.length})</h2>
              <UserButton/>
             </div>
            }

            {openCart && <Cart/> }
            

            <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
