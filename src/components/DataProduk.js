import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const DataProduk = () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/dataProduk")
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  };

  const handleEdit = (id) => {
    history.push(`/editProduk/${id}`);
  };

  const handleTambah = () => {
    history.push(`/tambahProduk`);
  };

  const handleDelete = (id, pic_produk) => {
    const confirmDelete = window.confirm(
      "Anda yakin ingin menghapus produk ini?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/dataProduk/${id}`)
        .then(() => {
          if (pic_produk) {
            axios
              .delete(`http://localhost:5000/api/images/${pic_produk}`)
              .catch((err) => console.error(err));
          }
          fetchData();
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <h1>Data Produk</h1>
      <Button
        onClick={() => handleTambah()}
        className="mb-2"
        variant="outline-primary"
      >
        Tambah Produk
      </Button>
      <table className="table text-center">
        <thead className="table-dark">
          <tr>
            <th>Foto</th>
            <th>Nama Produk</th>
            <th>Deskripsi</th>
            <th>Harga</th>
            <th>Code</th>
            <th>Category</th>
            <th>Color</th>
            <th>Stok</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id_produk}>
              <td>
                <img
                  src={`http://localhost:5000/images/${item.pic_produk}`}
                  alt={item.nm_produk}
                  width="100"
                />
              </td>
              <td>{item.nm_produk}</td>
              <td>{item.deskripsi}</td>
              <td>{item.harga}</td>
              <td>{item.code}</td>
              <td>{item.category}</td>
              <td>{item.color}</td>
              <td>{item.stok}</td>
              <td>
                <button onClick={() => handleEdit(item.id_produk)}>Edit</button>
                <button
                  onClick={() => handleDelete(item.id_produk, item.pic_produk)}
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

export default DataProduk;
