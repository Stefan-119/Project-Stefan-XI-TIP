import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { hash } from "bcryptjs";
import { useHistory } from "react-router-dom";

const TambahUser = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    jk: "",
    umur: "",
    roles: "",
    foto: null,
    password: "",
  });
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "foto") {
      setUser({ ...user, foto: files[0] });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hashedPassword = await hash(user.password, 10);
      const formData = new FormData();
      formData.append("username", user.username);
      formData.append("email", user.email);
      formData.append("jk", user.jk);
      formData.append("umur", user.umur);
      formData.append("roles", user.roles);
      formData.append("foto", user.foto); // tambahkan file gambar ke FormData
      formData.append("password", hashedPassword); // tambahkan password yang sudah di-hash ke FormData
      const response = await axios.post(
        "http://localhost:5000/api/dataUser",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        alert(response.data.message);
        setUser({
          username: "",
          email: "",
          jk: "",
          umur: "",
          roles: "",
          foto: null,
          password: "",
        });
        history.push("/dataUser");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Tambah Data User</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Masukkan Username"
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Masukkan email"
          />
        </Form.Group>
        <Form.Group controlId="formJk">
          <Form.Label>Jenis Kelamin</Form.Label>
          <Form.Control
            as="select"
            name="jk"
            value={user.jk}
            onChange={handleChange}
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
            onChange={handleChange}
            placeholder="Masukkan Umur"
          />
        </Form.Group>
        <Form.Group controlId="formRoles">
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            name="roles"
            value={user.roles}
            onChange={handleChange}
            placeholder="Masukkan Role"
          />
        </Form.Group>
        <Form.Group controlId="formGambar">
          <Form.Label>Gambar</Form.Label>
          <Form.Control type="file" name="foto" onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Masukkan Password"
          />
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

export default TambahUser;
