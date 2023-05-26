import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const DataUser = () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/dataUser")
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  };

  const handleEdit = (id) => {
    history.push(`/editUser/${id}`);
  };

  const handleTambah = () => {
    history.push(`/tambahUser`);
  };

  const handleDelete = (id, pic_user) => {
    const confirmDelete = window.confirm(
      "Anda yakin ingin menghapus User ini?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/dataUser/${id}`)
        .then(() => {
          if (pic_user) {
            axios
              .delete(`http://localhost:5000/api/images/${pic_user}`)
              .catch((err) => console.error(err));
          }
          fetchData();
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <h1>Data User</h1>
      <Button
        onClick={() => handleTambah()}
        className="mb-2"
        variant="outline-primary"
      >
        Tambah User
      </Button>
      <table className="table text-center ">
        <thead className="table-dark">
          <tr>
            <th>Foto</th>
            <th>Username</th>
            <th>Email</th>
            <th>Jenis Kelamin</th>
            <th>Umur</th>
            <th>roles</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id_user}>
              <td>
                <img
                  src={`http://localhost:5000/images/${item.pic_user}`}
                  alt={item.username}
                  width="100"
                />
              </td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.jk}</td>
              <td>{item.umur}</td>
              <td>{item.roles}</td>
              <td>
                <button onClick={() => handleEdit(item.id_user)}>Edit</button>
                <button
                  onClick={() => handleDelete(item.id_user, item.pic_user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataUser;
