// export const products = [
//   { id: 1,
//     name: 'existentialism',
//     description: 'God is dead. Nietzsche, 1883. Nietzsche is dead. God, 1900.',
//     price: 275,},
//   { id: 2,
//     name: 'nihilism',
//     description:
//       'If we believe in nothing, if nothing has any meaning and if we can affirm no values whatsoever, then everything is possible and nothing has any importance.',
//     price: 593,},
//   { id: 3,
//     name: 'post-structuralism',
//     description:
//       'To pretend, I actually do the thing: I have therefore only pretended to pretend',
//     price: 1250,},
//   { id: 4,
//     name: 'stoicism',
//     description: 'We suffer more often in imagination than in reality.',
//     price: 46,},
// ];

import { sql } from './connect';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export async function getProducts() {
  const products = await sql<Product[]>`
  SELECT * FROM products
  `;
  return products;
}
export async function getProductById(id: number) {
  const [product] = await sql<Product[]>`
    SELECT * FROM products WHERE id = ${id}
  `;
  return product;
}
