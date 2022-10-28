import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getProducts } from '../database/products';
import { addProduct, getParsedCookie, setParsedCookie } from '../utils/cookies';

function Cart(props) {
  const [storeCart, setStoreCart] = useState(props.products);
  // function totalSum(price, amount) {
  //   return price * amount;
  // }

  useEffect(() => {
    // loop for filtering through products
    // for (let i=0; i < props.products.length; i++){
    //     if (props.products.amount > 0){
    //         return props.products
    //     }
    // }
    const newCartProducts = cartProducts?.filter(
      (product) => product.id === id,
    );
    setStoreCart(newCartProducts);
    const cartProducts = props.products.filter((product) => {
      return product.amount > 0;
    });
    setStoreCart(cartProducts);
  }, [props.products]);

  // const clearButton = () => {
  //   setParsedCookie('cart', []);
  //   setStoreCart([]);
  // };
  // function addTotalSum(storeCart) {}
  // const totalSum = addTotalSum(storeCart);
  // const totalAmount = addTotalAmount(storeCart);

  console.log(amount.cookieId.amount);
  return (
    <div>
      <Header>
        <meta content="cart" />
      </Header>

      <div //display it with the map
      >
        {storeCart.map((product) => {
          return (
            <div key={`product-${product.id}`}>
              <div>
                <Link href={`/products/${product.id}`}>
                  <image
                    src={`/public/${product.name}.png`}
                    width="80"
                    height="80"
                    alt={product.name}
                  />
                </Link>
              </div>
              <div>{product.name}</div>
              <div>{product.amount * product.price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Cart;
export async function getServerSideProps(context) {
  // search through raw cookie and match the ids of products and cookies

  const products = await getProducts();

  const currentCookie = context.req.cookies.amount;
  let cookieArray = [];
  if (currentCookie) {
    cookieArray = JSON.parse(currentCookie);
  }
  console.log('cookieArray', cookieArray);
  const cartArray = cookieArray.map((cookieId) => {
    const cartProduct = products.find((prodId) => prodId.id === cookieId.id);
    return {
      id: cartProduct.id,
      amount: cookieId.amount,
      name: cartProduct.name,
      price: cartProduct.price,
    };
  });
  // console.log(cartArray);
  // function matchIds(prod) {
  //   return prod.id === id;
  // }
  // const cookieProductId = newCookieValue.find(matchIds);

  return {
    props: {
      products: { products, cartArray, cookieArray },
      // add cart array
    },
  };
}
