import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const DataBanner = () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/dataBanner")
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  };

  const handleEdit = (id) => {
    history.push(`/editBanner/${id}`);
  };

  const handleTambah = () => {
    history.push(`/tambahBanner`);
  };

  const handleDelete = (id, pic_banner) => {
    const confirmDelete = window.confirm(
      "Anda yakin ingin menghapus Banner ini?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/dataBanner/${id}`)
        .then(() => {
          if (pic_banner) {
            axios
              .delete(`http://localhost:5000/api/images/${pic_banner}`)
              .catch((err) => console.error(err));
          }
          fetchData();
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <h1>Data Banner</h1>
      <Button
        onClick={() => handleTambah()}
        className="mb-2"
        variant="outline-primary"
      >
        Tambah Banner
      </Button>
      <table className="table text-center">
        <thead className="table-dark">
          <tr>
            <th>Foto</th>
            <th>Nama Banner</th>
            <th>Deskripsi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id_banner}>
              <td>
                <img
                  src={`http://localhost:5000/images/${item.pic_banner}`}
                  alt={item.nm_produk}
                  width="100"
                />
              </td>
              <td>{item.nm_produk}</td>
              <td>{item.deskripsi}</td>
              <td>
                <button onClick={() => handleEdit(item.id_banner)}>Edit</button>
                <button
                  onClick={() => handleDelete(item.id_banner, item.pic_banner)}
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

export default DataBanner;
