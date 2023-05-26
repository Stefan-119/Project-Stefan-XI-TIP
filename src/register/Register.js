import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import { hash } from "bcryptjs";
import { useHistory } from "react-router-dom";

function Register() {
  const [register, setRegister] = useState({
    username: "",
    email: "",
    jk: "",
    umur: "",
    roles: "User",
    foto: null,
    password: "",
  });
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "foto") {
      setRegister({ ...register, foto: files[0] });
    } else {
      setRegister({ ...register, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hashedPassword = await hash(register.password, 10);
      const formData = new FormData();
      formData.append("username", register.username);
      formData.append("email", register.email);
      formData.append("jk", register.jk);
      formData.append("umur", register.umur);
      formData.append("roles", register.roles);
      formData.append("foto", register.foto); // tambahkan file gambar ke FormData
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
        setRegister({
          username: "",
          email: "",
          jk: "",
          umur: "",
          roles: "User",
          foto: null,
          password: "",
        });
        history.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="register-container">
        <div className="register-form">
          <h1 className="header-register">Register</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className="input"
                type="text"
                name="username"
                value={register.username}
                onChange={handleChange}
                placeholder="Masukkan Username"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="input"
                type="text"
                name="email"
                value={register.email}
                onChange={handleChange}
                placeholder="Masukkan email"
              />
            </Form.Group>
            <Form.Group controlId="formJk">
              <Form.Label>Jenis Kelamin</Form.Label>
              <Form.Control
                className="input"
                as="select"
                name="jk"
                value={register.jk}
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
                className="input"
                type="text"
                name="umur"
                value={register.umur}
                onChange={handleChange}
                placeholder="Masukkan Umur"
              />
            </Form.Group>
            <Form.Group controlId="formRoles">
              <Form.Label>Role</Form.Label>
              <Form.Control
                className="input"
                type="text"
                name="roles"
                value={register.roles}
                onChange={handleChange}
                placeholder="User"
                disabled // Menambahkan atribut disabled tanpa nilai akan menonaktifkan input
              />
            </Form.Group>
            <Form.Group controlId="formGambar">
              <Form.Label>Gambar</Form.Label>
              <Form.Control
                className="input"
                type="file"
                name="foto"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="input"
                type="password"
                name="password"
                value={register.password}
                onChange={handleChange}
                placeholder="Masukkan Password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
            <p className="register-text">
              Already have an account?{" "}
              <Link to="/" replace className="link-register">
                Login
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
