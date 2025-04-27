import { render, screen, fireEvent } from '@testing-library/react';
import ClientForm from '../src/components/ClientForm';

/**
 * Test suite for ClientForm component.
 */
describe('ClientForm', () => {
  it('renders form inputs', () => {
    render(<ClientForm />);
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('updates input values', () => {
    render(<ClientForm />);
    const nameInput = screen.getByPlaceholderText('Name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');
  });
});