import React, { useState } from 'react';

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  th: {
    backgroundColor: '#f0f0f0',
    padding: '8px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  td: {
    padding: '8px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default function UpdateForm({ product, handleUpdate }) {
  const [newProduct, setProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Distrubiteur</th>
            <th style={styles.th}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                style={styles.input}
              />
            </td>
            <td>
              <input
                type="text"
                name="image"
                value={newProduct.image}
                onChange={handleChange}
                style={styles.input}
              />
            </td>
            <td>
              <input
                type="text"
                name="distrubiteur"
                value={newProduct.distrubiteur}
                onChange={handleChange}
                style={styles.input}
              />
            </td>
            <td>
              <input
                type="number"
                name="qt"
                value={newProduct.qt}
                onChange={handleChange}
                style={styles.input}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button style={styles.button} onClick={() => handleUpdate(newProduct)}>Update</button>
    </div>
  );
}

