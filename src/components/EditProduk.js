import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

const EditProduk = () => {
  const { id } = useParams();
  const history = useHistory();
  const [produk, setProduk] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dataProduk/" + id)
      .then((res) => setProduk(res.data[0]))
      .catch((err) => console.log(err));
  }, [id]);

  const handleInputChange = (e) => {
    console.log("halo");
    const { name, value } = e.target;
    setProduk((prevProduk) => ({
      ...prevProduk,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // prepare form data
    const formData = new FormData();
    formData.append("foto", selectedFile);
    formData.append("nm_produk", produk.nm_produk);
    formData.append("deskripsi", produk.deskripsi);
    formData.append("harga", produk.harga);
    formData.append("code", produk.code);
    formData.append("category", produk.category);
    formData.append("color", produk.color);
    formData.append("stok", produk.stok);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/dataProduk/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        alert(response.data.message);
        history.push("/dataProduk");
        return;
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Edit Data Produk</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formProduk">
          <Form.Label>Nama Produk</Form.Label>
          <Form.Control
            type="text"
            name="nm_produk"
            value={produk.nm_produk}
            onChange={handleInputChange}
            placeholder="Masukkan nama produk"
          />
        </Form.Group>
        <Form.Group controlId="formDesc">
          <Form.Label>Deskripsi</Form.Label>
          <Form.Control
            type="text"
            name="deskripsi"
            value={produk.deskripsi}
            onChange={handleInputChange}
            placeholder="Masukkan deskripsi"
          />
        </Form.Group>
        <Form.Group controlId="formHarga">
          <Form.Label>Harga</Form.Label>
          <Form.Control
            type="text"
            name="harga"
            value={produk.harga}
            onChange={handleInputChange}
            placeholder="Masukkan harga"
          />
        </Form.Group>
        <Form.Group controlId="formCode">
          <Form.Label>Code</Form.Label>
          <Form.Control
            type="text"
            name="code"
            value={produk.code}
            onChange={handleInputChange}
            placeholder="Masukkan Code"
          />
        </Form.Group>
        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={produk.category}
            onChange={handleInputChange}
            placeholder="Masukkan Category"
          />
        </Form.Group>
        <Form.Group controlId="formColor">
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            name="color"
            value={produk.color}
            onChange={handleInputChange}
            placeholder="Masukkan Color"
          />
        </Form.Group>
        <Form.Group controlId="formStok">
          <Form.Label>Stok</Form.Label>
          <Form.Control
            type="text"
            name="stok"
            value={produk.stok}
            onChange={handleInputChange}
            placeholder="Masukkan Stok"
          />
        </Form.Group>
        <Form.Group controlId="formGambar">
          <Form.Label>Gambar</Form.Label>
          <Form.Control type="file" name="foto" onChange={handleImageChange} />
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

export default EditProduk;
