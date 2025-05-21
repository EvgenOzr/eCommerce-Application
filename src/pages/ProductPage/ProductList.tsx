import "./ProductList.scss";

export function ProductList() {
  return (
    <section className="product-container">
      <h2 className="product-container_title">ALL PRODUCTS</h2>
      <div className="product-wrapper">
        <aside>Aside Panel</aside>
        <div className="product-list">Product-list</div>
      </div>
    </section>
  );
}
