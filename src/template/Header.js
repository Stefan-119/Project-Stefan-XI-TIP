import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../products/CartContext";
// import axios from "axios";

function Header() {
  const { cartCount } = useContext(CartContext);

  const [openedDrawer, setOpenedDrawer] = useState(false);

  function toggleDrawer() {
    setOpenedDrawer(!openedDrawer);
  }

  function changeNav(event) {
    if (openedDrawer) {
      setOpenedDrawer(false);
    }
  }

  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/landing" onClick={changeNav}>
            {/* <FontAwesomeIcon
              icon={["fab", "bootstrap"]}
              className="ms-1"
              size="lg"
            /> */}
            <img
              src={"https://cdn.worldvectorlogo.com/logos/ligam.svg"}
              alt="Logo"
              style={{ width: "40px", height: "40px" }}
            />
            <span className="ms-2 h5">FOX Shop</span>
          </Link>

          <div
            className={
              "navbar-collapse offcanvas-collapse " +
              (openedDrawer ? "open" : "")
            }
          >
            <ul className="navbar-nav me-auto mb-lg-0"> </ul>
            <button
              type="button"
              className="btn btn-outline-dark me-3 d-none d-lg-inline"
            >
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-3 badge rounded-pill bg-dark">
                {cartCount}
              </span>
            </button>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <div className="d-flex gap-5">
                  <a
                    href="!#"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={["fas", "user-alt"]} />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="userDropdown"
                    style={{
                      marginRight: 30,
                    }}
                  >
                    <li>
                      <Link
                        to="/"
                        className="dropdown-item"
                        onClick={changeNav}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="dropdown-item"
                        onClick={changeNav}
                      >
                        Register
                      </Link>
                    </li>
                  </ul>
                  <Link to="/" className="btn btn-outline-danger" replace>
                    Logout
                  </Link>
                </div>
              </li>
            </ul>
          </div>

          <div className="d-inline-block d-lg-none">
            <button type="button" className="btn btn-outline-dark">
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-3 badge rounded-pill bg-dark">0</span>
            </button>
            <button
              className="navbar-toggler p-0 border-0 ms-3"
              type="button"
              onClick={toggleDrawer}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
