import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';  // Ensure this path is correct
import App from './App';  // Ensure this path is correct

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Your test logic or assertions go here, e.g., checking if a link is present:
  // screen.getByText('Learn React') or any other relevant test
});
