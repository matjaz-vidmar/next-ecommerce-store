export default function Layout(props) {
  return (
    <>
      <Header />

      <main css={mainStyles}>{props.children}</main>

      <Footer />
    </>
  );
}
