import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../CartContext";
// eslint-disable-next-line no-unused-vars
import { useParams } from "react-router-dom";
import axios from "axios";

import RelatedProduct from "./RelatedProduct";
import Ratings from "react-ratings-declarative";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";
import Header from "../../template/Header";
import Footer from "../../template/Footer";

const iconPath =
  "M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z";

function ProductDetail() {
  const { addToCart, removeFromCart, handleBuyNow } = useContext(CartContext);
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dataProduk")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  function changeRating(newRating) {}

  return (
    <>
    <Header />
      {data
        .filter((item) => item.id_produk === parseInt(id))
        .map((item) => (
          <div className="container mt-5 py-4 px-xl-5">
            <ScrollToTopOnMount />
            <nav
              aria-label="breadcrumb"
              className="bg-custom-light rounded mb-4"
            >
              <ol className="breadcrumb p-3">
                {/* <li className="breadcrumb-item">
                  <Link
                    className="text-decoration-none link-secondary"
                    to="/products"
                  >
                    All Products
                  </Link>
                </li> */}
                <li className="breadcrumb-item">
                  <a className="text-decoration-none link-secondary" href="!#">
                    Back To Home
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {item.nm_produk}
                </li>
              </ol>
            </nav>
            <div className="row mb-4">
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-12 mb-4">
                    <img
                      className="border rounded ratio ratio-1x1"
                      alt=""
                      src={`http://localhost:5000/images/${item.pic_produk}`}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="d-flex flex-column h-100">
                  <h2 className="mb-1">{item.nm_produk}</h2>
                  <h4 className="text-muted mb-4">Rp {item.harga}</h4>

                  <div className="row g-3 mb-4 flex-column">
                    <div className="col">
                      <button onClick={handleBuyNow} className="btn btn-dark py-2 w-100">
                        Buy now
                      </button>
                    </div>
                    <div className="col g-3 d-flex">
                      <button
                        onClick={addToCart}
                        className="btn btn-outline-secondary py-2 me-2 w-100"
                      >
                        Add to cart
                      </button>
                      <button
                        onClick={removeFromCart}
                        className="btn btn-outline-danger py-2 w-100"
                      >
                        Remove from cart
                      </button>
                    </div>
                  </div>
                  <dl className="row">
                    <dt className="col-sm-4">Code</dt>
                    <dd className="col-sm-8 mb-3">{item.code}</dd>

                    <dt className="col-sm-4">Category</dt>
                    <dd className="col-sm-8 mb-3">{item.category}</dd>

                    <dt className="col-sm-4">Color</dt>
                    <dd className="col-sm-8 mb-3">{item.color}</dd>

                    <dt className="col-sm-4">Stok</dt>
                    <dd className="col-sm-8 mb-3">{item.stok}</dd>

                    <dt className="col-sm-4">Rating</dt>
                    <dd className="col-sm-8 mb-3">
                      <Ratings
                        rating={4.5}
                        widgetRatedColors="rgb(253, 204, 13)"
                        changeRating={changeRating}
                        widgetSpacings="2px"
                      >
                        {Array.from({ length: 5 }, (_, i) => {
                          return (
                            <Ratings.Widget
                              key={i}
                              widgetDimension="20px"
                              svgIconViewBox="0 0 19 20"
                              svgIconPath={iconPath}
                              widgetHoverColor="rgb(253, 204, 13)"
                            />
                          );
                        })}
                      </Ratings>
                    </dd>
                  </dl>

                  <h4 className="mb-0">Description</h4>
                  <hr />
                  <p className="lead flex-shrink-0">
                    <small>{item.deskripsi}</small>
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 mb-4">
                <hr />
                <h4 className="text-muted my-4">Related Product</h4>
                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
                  {Array.from({ length: 1 }, (_, i) => {
                    return (
                      <RelatedProduct
                        percentOff={i % 2 === 0 ? 15 : null}
                        excludedId={parseInt(id)}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
        <Footer />
    </>
  );
}

export default ProductDetail;
