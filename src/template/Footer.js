function Footer() {
  return (
    <footer className="mt-auto py-5 bg-dark">
      <div className="container d-flex justify-content-between">
        <h2 className="text-muted">FOX Shop</h2>
        <div className="text-info">
          <ul style={{ listStyle: "none", fontSize: 20 }}>
            <li style={{ marginBottom: 20 }}>
              <span style={{ marginRight: 84 }}>Nama</span>: Stefan
            </li>
            <li style={{ marginBottom: 20 }}>
              <span style={{ marginRight: 91 }}>Kelas</span>: XI-TIP
            </li>
            <li>
              <span style={{ marginRight: 16 }}>Nama Project</span>: FOX Shop
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
