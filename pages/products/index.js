import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { allowedNodeEnvironmentFlags } from 'process';
import CookieBanner from '../../components/CookieBanner';
import Header from '../../components/Header';
import { getProducts } from '../../database/products';

const productDiv = css`
  display: inline-block;
  flex-direction: column;
  align-items: center;
  padding: 8px 20px;
  justify-content: space-between;
  align-content: center;
  gap: 16px;
  margin-left: 15px;
  align-items: center;
  border-style: solid;
  :hover {
    transition: box-shadow 0.5s;
    border: 2px solid purple;
    background: #d0d0d0;
  }
`;

export default function Products(props) {
  return (
    <div>
      <Head>
        <meta content="Product One" />
      </Head>

      <div>
        <h1>Products</h1>
        <>
          {props.products.map((product) => {
            return (
              <a
                data-test-id={`product-${product.id}`}
                css={productDiv}
                key={`product-${product.id}`}
              >
                <h2>
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h2>
                <Link href={`/products/${product.id}`}>
                  <a>
                    <Image
                      src={`/${product.id}-${product.name.toLowerCase()}.png`}
                      alt=""
                      width="400"
                      height="400"
                    />
                  </a>
                </Link>
              </a>
            );
          })}
        </>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // const parsedCookies = context.req.cookies.amount
  //   ? JSON.parse(context.req.cookies.amount)
  //   : [];

  // const products = products.map((product) => {
  //   return {
  //     ...product,
  //     amount:
  //       parsedCookies.find(
  //         (cookieProductObject) => product.id === cookieProductObject.id,
  //       )?.amount || 0,
  //   };
  // });
  const findProducts = await getProducts();
  return {
    props: {
      products: findProducts,
    },
  };
}

// stringifyCookieValue('cart', newCookieValue);
// return newCookieValue;
