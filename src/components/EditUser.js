import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

const EditUser = () => {
  const { id } = useParams();
  const history = useHistory();
  const [user, setUser] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dataUser/" + id)
      .then((res) => setUser(res.data[0]))
      .catch((err) => console.log(err));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:5000/api/dataUser/${id}`, User
  //     );
  //     if (response.data) {
  //       alert(response.data.message);
  //       history("/dataUser");
  //       return;
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert(err.message);
  //   }
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // prepare form data
    const formData = new FormData();
    formData.append("foto", selectedFile);
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("jk", user.jk);
    formData.append("umur", user.umur);
    formData.append("roles", user.roles);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/dataUser/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        alert(response.data.message);
        history.push("/dataUser");
        return;
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Edit Data User</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            placeholder="Masukkan Username"
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Masukkan email"
          />
        </Form.Group>
        <Form.Group controlId="formJk">
          <Form.Label>Jenis Kelamin</Form.Label>
          <Form.Control
            as="select"
            name="jk"
            value={user.jk}
            onChange={handleInputChange}
          >
            <option value="">-- Pilih Jenis Kelamin --</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formUmur">
          <Form.Label>Umur</Form.Label>
          <Form.Control
            type="text"
            name="umur"
            value={user.umur}
            onChange={handleInputChange}
            placeholder="Masukkan Umur"
          />
        </Form.Group>
        <Form.Group controlId="formRoles">
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            name="roles"
            value={user.roles}
            onChange={handleInputChange}
            placeholder="Masukkan Role"
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

export default EditUser;
