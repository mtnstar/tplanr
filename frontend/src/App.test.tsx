import { render, screen } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';
import App from './App';

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});

test('renders login form', () => {
  render(<App />);
  const emailInput = screen.getByLabelText('E-Mail');
  expect(emailInput).toBeInTheDocument();
});
