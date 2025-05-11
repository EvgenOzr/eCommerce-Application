import Banner from "../../components/banner/Banner";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./MainPage.scss";

const MainPage = () => {
  return (
    <div className="main-container">
      <Banner
        textMain={"Discount 20% For New Member, "}
        textAdd={"ONLY FOR TODAY!!"}
      />
      <Header />
      <Footer />
    </div>
  );
};

export default MainPage;
