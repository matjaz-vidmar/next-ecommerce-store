import { css, Global } from '@emotion/react';
import { useEffect, useState } from 'react';
import CookieBanner from '../components/CookieBanner';
import Header from '../components/Header';
//import { getProductById, getProducts, Product } from '../database/products';
import { parseIntFromContextQuery } from '../utils/contextQuery';
import {
  getParsedCookie,
  ProductCookieItem,
  setStringifiedCookie,
} from '../utils/cookies';

// const [cart, setCart] = useState([]);
// I have to do Use state - lift use state lecture by Jose and then do twice use effect, once for the page render and the second use effect for
// useEffect(() => {
//   function changeAmount(amount) {
//     setAmount(amount);
//   }
// }, [amount]);
function MyApp({ Component, pageProps }) {
  const [amount, setAmount] = useState(1);
  const [cookieStateCart, setCookieStateCart] = useState(ProductCookieItem);

  useEffect(() => {
    const cookieStateValue = getParsedCookie('cookieStateCart');
    if (cookieStateValue) {
      setCookieStateCart(cookieStateValue);
    }
  }, []),
    useEffect(() => {
      if (typeof cart !== 'undefined') {
        setStringifiedCookie('cookieStateCart', cookieStateCart);
      }
    }, [cookieStateCart]);
  useEffect(() => {
    setAmount(amount);
  }, [amount]);
  return (
    <>
      <Header />
      <CookieBanner />
      <Global
        styles={css`
          body {
            font-family: Verdana, Geneva, Tahoma, sans-serif;
          }
          strong {
            font-size: large;
            background: black;
            color: white;
            border-radius: 6px;
            width: 80px;
            padding: 15px 20px;
            align-content: center;
            text-decoration: none;
          }
          h1 {
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
              'Lucida Sans', Arial, sans-serif;
            font-weight: bold;
            color: darkslateblue;
            display: flex;
            justify-content: center;
            border: 3px solid;
            padding: 30px;
          }
          h2 {
            display: flex;
            flex-direction: column;
            position: top;
          }

          header {
            border-radius: 8px;
            border-style: solid;
            margin-top: 20px;
            padding: 20px;
            background-color: #a9a9a9;
            font-weight: 600;
            display: flex;
            justify-content: center;
            gap: 40px;
            font-size: larger;
          }
          p {
            border-style: solid;
            border-radius: 6px;
            padding: 20px;
            font-weight: bold;
          }
          button {
            background: white;
            color: black;
            border-radius: 6px;
            width: 55px;
            padding: 8px 10px;
            align-items: center;
            align-content: center;
            text-decoration: none;
            font-size: larger;

            :hover {
              transition: box-shadow 0.5s;
              border: 2px solid purple;
              background: darkslateblue;
              color: whitesmoke;
            }
          }
          label {
            background: black;
            color: white;
            border-radius: 6px;
            width: 70px;
            padding: 8px 20px;
            align-items: center;
            align-content: center;
            text-decoration: none;

            :hover {
              transition: box-shadow 0.5s;
              border: 2px solid purple;
              background: darkslateblue;
              color: whitesmoke;
            }
          }
          input {
            position: relative;
            align-items: baseline;
            size-adjust: auto;
          }
        `}
      />

      <Component
        {...pageProps}
        amount={amount}
        setAmount={setAmount}
        cookieStateCart={cookieStateCart}
        setCookieStateCart={setCookieStateCart}
      />
    </>
  );
}

export default MyApp;
