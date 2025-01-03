import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Stock from './Stock';
import UpdateForm from '../components/UpdateForm';
import AddProduct from '../components/AddProduct';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteForever } from 'react-icons/md';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({ adapter: new Adapter() });

// Configure mock store
const mockStore = configureMockStore();
const initialState = {
  products: [
    { id: 1, name: 'Product 1', image: '/img1.png', distrubiteur: 'Distributor 1', qt: 10 },
    { id: 2, name: 'Product 2', image: '/img2.png', distrubiteur: 'Distributor 2', qt: 5 },
  ],
};
let store;

describe('Stock Component', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders the stock table and buttons correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Stock />
      </Provider>
    );
    expect(wrapper.find('h1').text()).toBe('Stock');
    expect(wrapper.find('table')).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('renders products correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Stock />
      </Provider>
    );
    expect(wrapper.find('tr')).toHaveLength(initialState.products.length + 1); // +1 for header row
    expect(wrapper.find('td').at(1).text()).toBe(initialState.products[0].name); // Check the first product's name
  });

  it('displays AddProduct form when Add Product button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Stock />
      </Provider>
    );
    wrapper.find('button').simulate('click'); // Simulate click on "Add Product" button
    expect(wrapper.find(AddProduct)).toHaveLength(1); // Check if AddProduct form is displayed
  });

  it('displays UpdateForm when edit button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Stock />
      </Provider>
    );
    wrapper.find(CiEdit).at(0).simulate('click'); // Simulate click on the first edit button
    expect(wrapper.find(UpdateForm)).toHaveLength(1); // Check if UpdateForm is displayed
  });

  it('calls handleDelete action when delete button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Stock />
      </Provider>
    );
    const deleteButton = wrapper.find(MdDeleteForever).at(0);
    deleteButton.simulate('click'); // Simulate click on delete button
    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'DELETE_STOCK', payload: 1 }]); // Check if the DELETE_STOCK action was dispatched with correct payload
  });

  it('closes AddProduct form when onClose is called', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Stock />
      </Provider>
    );
    wrapper.find('button').simulate('click'); // Open AddProduct form
    expect(wrapper.find(AddProduct)).toHaveLength(1);
    wrapper.find(AddProduct).prop('onClose')(); // Simulate closing the AddProduct form
    wrapper.update();
    expect(wrapper.find(AddProduct)).toHaveLength(0); // Check if AddProduct form is closed
  });

  it('closes UpdateForm when onClose is called', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Stock />
      </Provider>
    );
    wrapper.find(CiEdit).at(0).simulate('click'); // Open UpdateForm
    expect(wrapper.find(UpdateForm)).toHaveLength(1);
    wrapper.find(UpdateForm).prop('onClose')(); // Simulate closing the UpdateForm
    wrapper.update();
    expect(wrapper.find(UpdateForm)).toHaveLength(0); // Check if UpdateForm is closed
  });
});
