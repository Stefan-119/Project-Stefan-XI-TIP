import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

const TambahProduk = () => {
  const [produk, setProduk] = useState({
    nm_produk: "",
    deskripsi: "",
    harga: "",
    code: "",
    category: "",
    color: "",
    stok: "",
    foto: null,
  });
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "foto") {
      setProduk({ ...produk, foto: files[0] });
    } else {
      setProduk({ ...produk, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nm_produk", produk.nm_produk);
      formData.append("deskripsi", produk.deskripsi);
      formData.append("harga", produk.harga);
      formData.append("code", produk.code);
      formData.append("category", produk.category);
      formData.append("color", produk.color);
      formData.append("stok", produk.stok);
      formData.append("foto", produk.foto); // tambahkan file gambar ke FormData
      const response = await axios.post(
        "http://localhost:5000/api/dataProduk",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        alert(response.data.message);
        setProduk({
          nm_produk: "",
          deskripsi: "",
          harga: "",
          code: "",
          category: "",
          color: "",
          stok: "",
          foto: null,
        });
        history.push("/dataProduk");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Tambah Data Produk</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formProduk">
          <Form.Label>Nama Produk</Form.Label>
          <Form.Control
            type="text"
            name="nm_produk"
            value={produk.nm_produk}
            onChange={handleChange}
            placeholder="Masukkan nama produk"
          />
        </Form.Group>
        <Form.Group controlId="formDesc">
          <Form.Label>Deskripsi</Form.Label>
          <Form.Control
            type="text"
            name="deskripsi"
            value={produk.deskripsi}
            onChange={handleChange}
            placeholder="Masukkan deskripsi"
          />
        </Form.Group>
        <Form.Group controlId="formHarga">
          <Form.Label>Harga</Form.Label>
          <Form.Control
            type="text"
            name="harga"
            value={produk.harga}
            onChange={handleChange}
            placeholder="Masukkan harga"
          />
        </Form.Group>
        <Form.Group controlId="formCode">
          <Form.Label>Code</Form.Label>
          <Form.Control
            type="text"
            name="code"
            value={produk.code}
            onChange={handleChange}
            placeholder="Masukkan Code"
          />
        </Form.Group>
        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={produk.category}
            onChange={handleChange}
            placeholder="Masukkan Category"
          />
        </Form.Group>
        <Form.Group controlId="formColor">
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            name="color"
            value={produk.color}
            onChange={handleChange}
            placeholder="Masukkan Color"
          />
        </Form.Group>
        <Form.Group controlId="formStok">
          <Form.Label>Stok</Form.Label>
          <Form.Control
            type="text"
            name="stok"
            value={produk.stok}
            onChange={handleChange}
            placeholder="Masukkan stok"
          />
        </Form.Group>
        <Form.Group controlId="formGambar">
          <Form.Label>Gambar</Form.Label>
          <Form.Control type="file" name="foto" onChange={handleChange} />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{ margin: "20px", width: "150px" }}
        >
          Simpan
        </Button>
      </Form>
    </div>
  );
};

export default TambahProduk;
