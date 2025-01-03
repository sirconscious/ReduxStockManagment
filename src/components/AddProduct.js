import React, { useState } from 'react'

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
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    marginBottom: '15px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
}
export default function AddProduct({handleAdd}) {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [distrubiteur, setDistrubiteur] = useState('')
  const [qt, setQuantity] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    handleAdd({id, name, image, distrubiteur, qt})
  }

  return (
    <div style={styles.container}>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='number'
          placeholder='id'
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={styles.input}
        />
        <input
          type='text'
          placeholder='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type='text'
          placeholder='image'
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={styles.input}
        />
        <input
          type='text'
          placeholder='distrubiteur'
          value={distrubiteur}
          onChange={(e) => setDistrubiteur(e.target.value)}
          style={styles.input}
        />
        <input
          type='number'
          placeholder='qt'
          value={qt}
          onChange={(e) => setQuantity(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button}>Add</button>
      </form>
    </div>
  )
}

