import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import UpdateForm from '../components/UpdateForm';
import AddProduct from '../components/AddProduct';
import PieChart from '../components/PieChart';

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
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
  icon: {
    cursor: 'pointer',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(179, 178, 178, 0.7)',
    backdropFilter: 'blur(1px)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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

export default function Stock() {
  const [showForm, setShowForm] = React.useState(false);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [showChart , setShowChart] = React.useState(false);

  const handleAdd = (value) => {
    dispatch({ type: 'ADD_STOCK'  , payload:value});
    setShowForm(false);
  }
  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_STOCK', payload: id });
  };
  const handleUpdate = (product) => {
    dispatch({ type: 'UPDATE_STOCK', payload: product });
    setIsEditing(false);
  };
  const [isEditing, setIsEditing] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };
  console.log(products);
  return (
    <div>
      <h1>Stock</h1>
      <button onClick={() => setShowChart(true)} style={styles.button}>View Chart</button>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Distrubiteur</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Edit</th>
            <th style={styles.th}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td style={styles.td}>{product.id}</td>
                <td style={styles.td}>{product.name}</td>
                <td style={styles.td}>
                  <img src={`${process.env.PUBLIC_URL}${product.image}`} alt={product.name} style={{ width: '50px' }} />
                </td>
                <td style={styles.td}>{product.distrubiteur}</td>
                <td style={styles.td}>{product.qt}</td>
                <td style={styles.td}><CiEdit onClick={() => handleEdit(product)} style={styles.icon} size={30} /></td>
                <td style={styles.td}><MdDeleteForever onClick={() => handleDelete(product.id)} style={styles.icon} size={30} /></td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={styles.td} colSpan="4">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '20px'}}>
        <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={() => setShowForm(true)}>Add Product</button>
      </div>
      {isEditing && selectedProduct && (
        <div style={styles.overlay}>
          <UpdateForm product={selectedProduct} handleUpdate={handleUpdate} onClose={() => setIsEditing(false)} />
        </div>
      )}
      {showForm && <div  style={styles.overlay}> <AddProduct handleAdd={handleAdd}/></div>}
      {showChart && <div  style={styles.overlay}> <PieChart setShowChart={setShowChart} /></div>}
    </div>
  );
}

