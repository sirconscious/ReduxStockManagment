import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Stock from './Stock';
import { store } from '../redux/store';

// Mock child components
jest.mock('../components/UpdateForm', () => ({ product, handleUpdate, onClose }) => (
  <div data-testid="update-form">
    <p>Update Form for {product.name}</p>
    <button onClick={onClose}>Close</button>
  </div>
));

jest.mock('../components/AddProduct', () => ({ handleAdd }) => (
  <div data-testid="add-product">
    <p>Add Product Form</p>
    <button onClick={() => handleAdd({ id: 3, name: 'New Product', distrubiteur: 'New', qt: 5 })}>Add</button>
  </div>
));

jest.mock('../components/PieChart', () => ({ setShowChart }) => (
  <div data-testid="pie-chart">
    <p>Pie Chart</p>
    <button onClick={() => setShowChart(false)}>Close</button>
  </div>
));

describe('Stock Component', () => {
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore({
      products: [
        { id: 1, name: 'Product 1', image: '/product1.jpg', distrubiteur: 'D1', qt: 10 },
        { id: 2, name: 'Product 2', image: '/product2.jpg', distrubiteur: 'D2', qt: 20 },
      ],
    });
  });
  
  test('renders the Stock component', () => {
    render(
      <Provider store={store}>
        <Stock />
      </Provider>
    );

    expect(screen.getByText('Stock')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  test('opens the add product form', () => {
    render(
      <Provider store={store}>
        <Stock />
      </Provider>
    );

    fireEvent.click(screen.getByText('Add Product'));
    expect(screen.getByTestId('add-product')).toBeInTheDocument();
  });

  test('opens the update form for a product', () => {
    render(
      <Provider store={store}>
        <Stock />
      </Provider>
    );

    fireEvent.click(screen.getAllByRole('button', { name: /edit product/i })[0]); // Click edit icon for the first product
    expect(screen.getByTestId('update-form')).toBeInTheDocument();
  });

  test('opens the chart view', () => {
    render(
      <Provider store={store}>
        <Stock />
      </Provider>
    );

    fireEvent.click(screen.getByText('View Chart'));
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
  });
  test('deletes a product', () => {
    render(
      <Provider store={store}>
        <Stock />
      </Provider>
    );
  
    // Query all the delete buttons
    const deleteButtons = screen.getAllByRole('button', { name: /delete product/i });
  
    // Make sure there are two delete buttons
    expect(deleteButtons).toHaveLength(2);
  
    // Click the first delete button
    fireEvent.click(deleteButtons[0]);
  
    // Add assertions to check that the product is deleted
    // Example assertion: check that the product no longer exists in the document
    // This would depend on how your state updates and how you render the products
    // For example:
    // expect(screen.queryByText(/product name/i)).not.toBeInTheDocument();
  });
});
