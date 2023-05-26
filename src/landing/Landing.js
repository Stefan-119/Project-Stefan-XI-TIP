import Banner from "./Banner";
import FeatureProduct from "./FeatureProduct";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import Header from "../template/Header";
import Footer from "../template/Footer";

function Landing() {
  return (
    <>
    <Header />
      <ScrollToTopOnMount />
      <Banner />
      <div className="d-flex flex-column bg-white py-4">
        <p className="text-center px-4">
          Selamat datang di toko online kami, destinasi terbaik untuk memenuhi
          kebutuhan Anda akan handphone terbaru dan terbaik! Kami bangga
          menyajikan koleksi lengkap dari merek-merek terkemuka, memberikan Anda
          akses ke berbagai pilihan handphone berkualitas tinggi untuk memenuhi
          segala kebutuhan teknologi dan gaya hidup Anda.
        </p>
        {/* <div className="d-flex justify-content-center">
          <Link to="/products" className="btn btn-primary" replace>
            Browse products
          </Link>
        </div> */}
      </div>
      <h2 className="text-muted text-center mt-4 mb-3">Recomended Product</h2>
      <div className="container pb-5 px-lg-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5">
          {Array.from({ length: 1 }, (_, i) => {
            return <FeatureProduct key={i} />;
          })}
        </div>
      </div>
      <div className="d-flex flex-column bg-white py-4">
        {/* <h5 className="text-center mb-3">Follow us on</h5>
        <div className="d-flex justify-content-center">
          <a href="!#" className="me-3">
            <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
          </a>
          <a href="!#">
            <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
          </a>
          <a href="!#" className="ms-3">
            <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
          </a>
        </div> */}
      </div>
      <Footer />
    </>
  );
}

export default Landing;
