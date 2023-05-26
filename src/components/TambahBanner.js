import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

const TambahBanner = () => {
  const [banner, setBanner] = useState({
    nm_produk: "",
    deskrpsi: "",
    foto: null,
  });
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "foto") {
      setBanner({ ...banner, foto: files[0] });
    } else {
      setBanner({ ...banner, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nm_produk", banner.nm_produk);
      formData.append("deskripsi", banner.deskripsi);
      formData.append("foto", banner.foto); // tambahkan file gambar ke FormData
      const response = await axios.post(
        "http://localhost:5000/api/dataBanner",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        alert(response.data.message);
        setBanner({
          nm_produk: "",
          deskripsi: "",
          foto: null,
        });
        history.push("/dataBanner");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Tambah Data Banner</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formProduk">
          <Form.Label>Produk</Form.Label>
          <Form.Control
            type="text"
            name="nm_produk"
            value={banner.nm_produk}
            onChange={handleChange}
            placeholder="Masukkan nama produk"
          />
        </Form.Group>
        <Form.Group controlId="formDesc">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="deskripsi"
            value={banner.deskripsi}
            onChange={handleChange}
            placeholder="Masukkan deskripsi"
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

export default TambahBanner;
