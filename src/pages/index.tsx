import ProductList from "../components/Product/ProductList";
import { Provider, useApp } from "../components/Provider";
import Cart from "../components/Cart/Cart";
import CartIcon from "../components/Cart/CartIcon";

const HomePageContent = () => {
  const { headerText } = useApp();

  return (
    <main>
      <h1>{headerText}</h1>
      <div className="cart-icon"><CartIcon  /></div>
      
      <div className="home-layout">
        {/* Main Content */}
        <section className="product-list">
          <ProductList />
        </section>

        {/* Sidebar for Cart */}
        <aside className="cart-container">
          <Cart />
        </aside>
      </div>
    </main>
  );
};

const HomePage = () => {
  return (
    <Provider>
      <HomePageContent />
    </Provider>
  );
};

export default HomePage;
