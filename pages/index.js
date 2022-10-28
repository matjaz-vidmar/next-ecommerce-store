import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import NeuralHead from '../public/NeuralHead.jpg';

export default function Home() {
  return (
    <div>
      <Head>
        <h1>E commerce Philosophy store</h1>
        <meta content="Product One" />
      </Head>
      <div>
        <nav>
          <Image alt="Neural head philosophy" src={NeuralHead} />
        </nav>
      </div>
    </div>
  );
}
