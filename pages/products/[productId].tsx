import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { getProductById, getProducts, Product } from '../../database/products';
import { parseIntFromContextQuery } from '../../utils/contextQuery';
import {
  getParsedCookie,
  setStringifiedCookie,
  stringifyCookieValue,
} from '../../utils/cookies';

type Props = { error: string } | { singleProduct: Product };

const productDiv = css`
  display: grid;
  flex-direction: column;
  max-width: 600px;
  justify-content: center;
  align-items: center;
  padding: 20px 20px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  background-color: #a8a8a8;
  border-radius: 6px;
  border-style: solid;
`;
const priceNav = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const buttonAddToCart = css`
  width: 100px;
`;

export default function SingleProduct(props: Props) {
  if ('error' in props) {
    return (
      <div>
        <Header />
        <h1>{props.error}</h1>
        <h2>
          Sorry, try the <Link href="/products"> products page</Link>
        </h2>
      </div>
    );
  }

  const [cart, setCart] = useState(getParsedCookie('cart') || []);
  const [count, setCount] = useState(1);
  // const initialAmount = cookieProduct ? cookieProduct.amount : 1;
  const [amount, setAmount] = useState('');
  const addToCart = function () {
    const currentCookie = getParsedCookie('cart') || [];
  };
  // const productInCart = currentCookie.some((cookieProduct) => {
  //   return cookieProduct.id === props.singleProduct.id;
  // });

  const increaseCount = () => {
    setCount(count + 1);
  };
  const decreaseCount = () => {
    setCount(count - 1);
  };
  const resetCount = () => {
    setCount(1);
  };
  const [updatedAmount, setUpdatedAmount] = useState(0);
  // location reload - look it up
  const productId = props.singleProduct.id;
  useEffect(() => {
    const initialAmount =
      getParsedCookie('amount')?.find(
        (productCookieItem) => productCookieItem.id === productId,
      )?.amount || 1;
    if (initialAmount > 0) setAmount(initialAmount);
  }, [amount]);

  return (
    <div
      id={`/products/${props.singleProduct.id}`}
      css={productDiv}
      key={`product-${props.singleProduct.id}`}
    >
      <strong>Products</strong>

      <h1>{props.singleProduct.name}</h1>
      <Image
        data-test-id="product-image"
        src={`/${
          props.singleProduct.id
        }-${props.singleProduct.name.toLowerCase()}.png`}
        alt=""
        width="500"
        height="500"
      />
      <p>{props.singleProduct.description}</p>
      <nav css={priceNav}>
        <label>Price - EURO: {props.singleProduct.price}</label>
        <button
          css={buttonAddToCart}
          onClick={() => {
            addToCart;
          }}
        >
          Add to cart
        </button>
      </nav>

      <br />
      <br />
      <br />
      <br />
      <nav>
        <strong>Amount:{count}</strong>
        <button
          onClick={() => {
            const currentCookieValue = getParsedCookie('amount');
            if (!currentCookieValue) {
              setStringifiedCookie('amount', [
                { id: props.singleProduct.id, amount: -1 },
              ]);
              return;
            }

            const foundCookie = currentCookieValue.find(
              (productCookieItem) =>
                productCookieItem.id === props.singleProduct.id,
            );
            if (!foundCookie) {
              currentCookieValue.push({
                id: props.singleProduct.id,
                amount: -1,
              });
            } else {
              foundCookie.amount--;
            }
            setStringifiedCookie('amount', currentCookieValue);
            props.setAmount(amount);
            decreaseCount();
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            const currentCookieValue = getParsedCookie('amount');
            if (!currentCookieValue) {
              setStringifiedCookie('amount', [
                { id: props.singleProduct.id, amount: 1 },
              ]);
              return;
            }

            const foundCookie = currentCookieValue.find(
              (productCookieItem) =>
                productCookieItem.id === props.singleProduct.id,
            );
            if (!foundCookie) {
              currentCookieValue.push({
                id: props.singleProduct.id,
                amount: 1,
              });
            } else {
              foundCookie.amount++;
            }
            setStringifiedCookie('amount', currentCookieValue);
            props.setAmount(amount);
            increaseCount();
          }}
        >
          +
        </button>
      </nav>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  const productId = parseIntFromContextQuery(context.query.productId);

  // const foundProduct = products.find((product) => {
  //   return product.id === productId;
  // });

  if (typeof productId === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Product not found',
      },
    };
  }
  const foundProduct = await getProductById(productId);
  if (typeof foundProduct === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Product not found',
      },
    };
  }
  return {
    props: {
      singleProduct: foundProduct,
    },
  };
}
