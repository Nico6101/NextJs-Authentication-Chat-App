import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '@/pages/account/login';

jest.mock("next/navigation", () => ({
  useRouter: () => {
    return {
      push: (route: string) => null
    };
  },
}));

jest.mock("next/router", () => ({
  useRouter: () => {
    return {
      push: (route: string) => null
    };
  },
}));

global.fetch = jest.fn((url: string, requestOptions: RequestInit) => {
  if (JSON.parse(requestOptions.body as string).email === "invaliduser@test.com") {
    return Promise.reject("email or password is incorrect");
  } else {
    return Promise.resolve({
      json: () => Promise.resolve({ test: 100 }),
      text: () => Promise.resolve(JSON.stringify({
        id: '123',
        username: "test",
        email: "test@test.com",
        token: "test"
      })),
      ok: true,

    })
  }
}) as jest.Mock;

describe('Login Page', () => {
  afterEach(() => {
    // Restore the original fetch function after each test
    jest.restoreAllMocks();
  });

  it('renders login form', () => {
    const { getByPlaceholderText, getByText } = render(<LoginPage />);

    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
  });

  it('submits login form with valid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginPage />);

    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'testuser@gmail.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });

  it('displays error message on invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginPage />);

    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'invaliduser@test.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'invalidpassword' } });
    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(getByText('Registration failed. Please try again later.')).toBeInTheDocument();
    });
  });
});
