const { default: axios } = require("axios");

const api_key = process.env.NEXT_PUBLIC_REST_API_KEY;
const api_url = "http://localhost:1337/api";

const axiosClient = axios.create({
  baseURL: api_url,
  headers: {
    Authorization: `Bearer ${api_key}`,
  },
});
//get all products
const getLatestProducts = () => axiosClient.get("/products?populate=*");
//get particular product by its id
const getProductbyId = (id) => axiosClient.get(`/products/${id}?populate=*`);

//getallproducts of particular category
const getProductbyCategory = (category) => axiosClient.get(`products?filters[category][$eq]=${category}&populate=*`);

//add products to cart (post/create)

const addToCart= (products)=> axiosClient.post("/carts",products); 

const getUserCartItems = (email) => axiosClient.get(`carts?populate[products][populate][0]=banner&filters[email][$eq]=${email}`);

const deleteCartItem = (id) => axiosClient.delete(`/carts/${id}`);

export default { getLatestProducts, getProductbyId ,getProductbyCategory,addToCart,getUserCartItems,deleteCartItem};
