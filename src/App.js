import Template from "./template/Template";
import ProductDetail from "./products/detail/ProductDetail";
import { Switch, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import Login from "./login/Login";
import Register from "./register/Register";

import Navbar from "./components/Navbar";

import DataUser from "./components/DataUser";
import EditUser from "./components/EditUser";
import TambahUser from "./components/TambahUser";

import DataProduk from "./components/DataProduk";
import EditProduk from "./components/EditProduk";
import TambahProduk from "./components/TambahProduk";

import DataBanner from "./components/DataBanner";
import EditBanner from "./components/EditBanner";
import TambahBanner from "./components/TambahBanner";

import { CartProvider } from "./products/CartContext";

function App() {
  return (
    <CartProvider>
      <Template>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>

          <Route path="/products" exact>
            <ProductList />
          </Route>
          <Route path="/products/:id">
            <ProductDetail />
          </Route>
          <Route path="/landing" exact>
            <Landing />
          </Route>

          <Route path="/dataUser" exact>
            <Navbar />
            <DataUser />
          </Route>
          <Route path="/editUser/:id" exact>
            <Navbar />
            <EditUser />
          </Route>
          <Route path="/tambahUser" exact>
            <Navbar />
            <TambahUser />
          </Route>

          <Route path="/dataProduk" exact>
            <Navbar />
            <DataProduk />
          </Route>
          <Route path="/tambahProduk" exact>
            <Navbar />
            <TambahProduk />
          </Route>
          <Route path="/editProduk/:id" exact>
            <Navbar />
            <EditProduk />
          </Route>

          <Route path="/dataBanner" exact>
            <Navbar />
            <DataBanner />
          </Route>
          <Route path="/tambahBanner" exact>
            <Navbar />
            <TambahBanner />
          </Route>
          <Route path="/editBanner/:id" exact>
            <Navbar />
            <EditBanner />
          </Route>
        </Switch>
      </Template>
    </CartProvider>
  );
}

export default App;
