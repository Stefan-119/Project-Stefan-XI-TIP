const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();
const path = require("path");
const bcrypt = require("bcryptjs");
const fs = require("fs");

const app = express();
const port = 5000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "src/images")));

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Connected to MySQL database...");
  connection.release();
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

// memeriksa apakah user terautentikasi saat melakukan login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM user WHERE username = ?";
  pool.query(sql, [username], async (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const isPasswordMatched = await bcrypt.compare(
        password,
        result[0].password
      );
      if (isPasswordMatched) {
        res.json({ message: "Berhasil login.", role: result[0].roles });
      } else {
        res.status(401).json({ message: "Password salah." });
      }
    } else {
      res.status(404).json({ message: "Username tidak ditemukan." });
    }
  });
});

// mengambil data pada user
app.get("/api/dataUser", (req, res) => {
  const sql = "SELECT * FROM user";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// mengambil data pada produk
app.get("/api/dataProduk", (req, res) => {
  const sql = "SELECT * FROM produk";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// mengambil data pada banner
app.get("/api/dataBanner", (req, res) => {
  const sql = "SELECT * FROM banner";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// menambahkan data pada user
app.post("/api/dataUser", upload.single("foto"), (req, res) => {
  const { username, email, jk, umur, roles, password } = req.body;
  const pic_user = req.file.filename;
  const sql = `INSERT INTO user (id_user, username, email, jk, umur, roles, pic_user, password) VALUES ('', '${username}', '${email}', '${jk}', '${umur}', '${roles}', '${pic_user}', '${password}')`;
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil ditambahkan." });
  });
});

// menambahkan data pada produk
app.post("/api/dataProduk", upload.single("foto"), (req, res) => {
  const { nm_produk, deskripsi, harga, code, category, color, stok } = req.body;
  const pic_produk = req.file.filename;
  const sql = `INSERT INTO produk (id_produk, nm_produk, deskripsi, harga, code, category, color, stok, pic_produk) VALUES ('', '${nm_produk}', '${deskripsi}', '${harga}', '${code}', '${category}', '${color}', '${stok}', '${pic_produk}')`;
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil ditambahkan." });
  });
});

// menambahkan data pada banner
app.post("/api/dataBanner", upload.single("foto"), (req, res) => {
  const { nm_produk, deskripsi } = req.body;
  const pic_banner = req.file.filename;
  const sql = `INSERT INTO banner (id_banner, nm_produk, deskripsi, pic_banner) VALUES ('', '${nm_produk}', '${deskripsi}', '${pic_banner}')`;
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil ditambahkan." });
  });
});

// mengambil data user berdasarkan ID
app.get("/api/dataUser/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM user WHERE id_user = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// mengambil data produk berdasarkan ID
app.get("/api/dataProduk/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM produk WHERE id_produk = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// mengambil data banner berdasarkan ID
app.get("/api/dataBanner/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM banner WHERE id_banner = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// memperbarui data User berdasarkan ID
// Anggap Anda sudah memiliki variabel fs yang mengacu pada modul fs
app.put("/api/dataUser/:id", upload.single("foto"), (req, res) => {
  const id = req.params.id;
  const { username, email, jk, umur, roles } = req.body;
  let pic_user = null;

  // Cek apakah ada gambar yang diunggah
  if (req.file) {
    // Jika ada, atur nama gambar baru
    pic_user = req.file.filename;

    // Lakukan penghapusan gambar lama
    const getPicQuery = "SELECT pic_user FROM user WHERE id_user = ?";
    pool.query(getPicQuery, id, (err, result) => {
      if (err) throw err;
      const oldPic = result[0].pic_user;
      const oldPicPath = path.join(__dirname, "src/images", oldPic);

      // Hapus gambar lama
      fs.unlink(oldPicPath, (err) => {
        if (err) console.log(err);
      });
    });
  }

  const sql =
    "UPDATE user SET username = ?, email = ?, jk = ?, umur = ?, roles = ?, pic_user = IFNULL(?, pic_user) WHERE id_user = ?";
  const values = [username, email, jk, umur, roles, pic_user, id];

  pool.query(sql, values, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil diperbarui." });
  });
});

// memperbarui data produk berdasarkan ID
// Anggap Anda sudah memiliki variabel fs yang mengacu pada modul fs
app.put("/api/dataProduk/:id", upload.single("foto"), (req, res) => {
  const id = req.params.id;
  const { nm_produk, deskripsi, harga, code, category, color, stok } = req.body;
  let pic_produk = null;

  // Cek apakah ada gambar yang diunggah
  if (req.file) {
    // Jika ada, atur nama gambar baru
    pic_produk = req.file.filename;

    // Lakukan penghapusan gambar lama
    const getPicQuery = "SELECT pic_produk FROM produk WHERE id_produk = ?";
    pool.query(getPicQuery, id, (err, result) => {
      if (err) throw err;
      const oldPic = result[0].pic_produk;
      const oldPicPath = path.join(__dirname, "src/images", oldPic);

      // Hapus gambar lama
      fs.unlink(oldPicPath, (err) => {
        if (err) console.log(err);
      });
    });
  }

  const sql =
    "UPDATE produk SET nm_produk = ?, deskripsi = ?, harga = ?, code = ?, category = ?, color = ?, stok = ?, pic_produk = IFNULL(?, pic_produk) WHERE id_produk = ?";
  const values = [nm_produk, deskripsi, harga, code, category, color, stok, pic_produk, id];

  pool.query(sql, values, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil diperbarui." });
  });
});

// memperbarui data banner berdasarkan ID
// Anggap Anda sudah memiliki variabel fs yang mengacu pada modul fs
app.put("/api/dataBanner/:id", upload.single("foto"), (req, res) => {
  const id = req.params.id;
  const { nm_produk, deskripsi } = req.body;
  let pic_banner = null;

  // Cek apakah ada gambar yang diunggah
  if (req.file) {
    // Jika ada, atur nama gambar baru
    pic_banner = req.file.filename;

    // Lakukan penghapusan gambar lama
    const getPicQuery = "SELECT pic_banner FROM banner WHERE id_banner = ?";
    pool.query(getPicQuery, id, (err, result) => {
      if (err) throw err;
      const oldPic = result[0].pic_banner;
      const oldPicPath = path.join(__dirname, "src/images", oldPic);

      // Hapus gambar lama
      fs.unlink(oldPicPath, (err) => {
        if (err) console.log(err);
      });
    });
  }

  const sql =
    "UPDATE banner SET nm_produk = ?, deskripsi = ?, pic_banner = IFNULL(?, pic_banner) WHERE id_banner = ?";
  const values = [nm_produk, deskripsi, pic_banner, id];

  pool.query(sql, values, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil diperbarui." });
  });
});

// menghapus data user berdasarkan ID
app.delete("/api/dataUser/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM user WHERE id_user = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil dihapus." });
  });
});

// menghapus data produk berdasarkan ID
app.delete("/api/dataProduk/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM produk WHERE id_produk = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil dihapus." });
  });
});

// menghapus data banner berdasarkan ID
app.delete("/api/dataBanner/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM banner WHERE id_banner = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil dihapus." });
  });
});

// menghapus file gambar
app.delete("/api/images/:filename", (req, res) => {
  const filename = req.params.filename;
  const path = `./src/images/${filename}`;
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Gagal menghapus file." });
    } else {
      res.json({ message: "File berhasil dihapus." });
    }
  });
});
