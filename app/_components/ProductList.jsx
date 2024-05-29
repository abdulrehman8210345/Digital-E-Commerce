import React from 'react'
import ProductItem from './ProductItem'

const ProductList = ({productList}) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10'>
        {
            productList.map((ele,i)=>(
              i<=3 &&
                <div key={i}>
                    <ProductItem product={ele} />   
                </div>
            )
        )
        }
    </div>
  )
}

export default ProductList