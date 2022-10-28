import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Link data-test-id="products-link" href="/products">
        Products
      </Link>
      <Link href="/cart">Cart</Link>
    </header>
  );
}
