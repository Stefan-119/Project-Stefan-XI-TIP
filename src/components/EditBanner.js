import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

const EditBanner = () => {
  const { id } = useParams();
  const history = useHistory();
  const [banner, setBanner] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dataBanner/" + id)
      .then((res) => setBanner(res.data[0]))
      .catch((err) => console.log(err));
  }, [id]);

  const handleInputChange = (e) => {
    console.log("halo");
    const { name, value } = e.target;
    setBanner((prevBanner) => ({
      ...prevBanner,
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
    formData.append("nm_produk", banner.nm_produk);
    formData.append("deskripsi", banner.deskripsi);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/dataBanner/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        alert(response.data.message);
        history.push("/dataBanner");
        return;
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Edit Data Banner</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBanner">
          <Form.Label>Nama Banner</Form.Label>
          <Form.Control
            type="text"
            name="nm_produk"
            value={banner.nm_produk}
            onChange={handleInputChange}
            placeholder="Masukkan nama banner"
          />
        </Form.Group>
        <Form.Group controlId="formDesc">
          <Form.Label>Deskripsi</Form.Label>
          <Form.Control
            type="text"
            name="deskripsi"
            value={banner.deskripsi}
            onChange={handleInputChange}
            placeholder="Masukkan deskripsi"
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

export default EditBanner;
