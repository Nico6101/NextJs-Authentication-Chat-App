
import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from '@/pages/account/register';
// import { useRouter } from 'next/navigation';

jest.mock("next/navigation", () => ({
    useRouter: () => {
        return {
            push: (route: string) => {
                console.log('route = ', route);
                return route;
            }
        };
    },
}));

jest.mock("next/router", () => ({
    useRouter: () => {
        return {
            push: (route: string) => {
                console.log('route = ', route);
                return route;
            }
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

describe('Registration Page', () => {

    afterEach(() => {
        // Restore the original fetch function after each test
        jest.restoreAllMocks();
    });

    it('renders register form', () => {
        const { getByPlaceholderText, getByText } = render(<RegisterPage />);
        expect(getByPlaceholderText('Username')).toBeInTheDocument();
        expect(getByPlaceholderText('Email')).toBeInTheDocument();
        expect(getByPlaceholderText('Password')).toBeInTheDocument();
        expect(getByPlaceholderText('Confirm Password')).toBeInTheDocument();

        expect(getByText('Register')).toBeInTheDocument();
    });

    it('submits register form with valid credentials', async () => {
        const { getByPlaceholderText, getByText } = render(<RegisterPage />);

        fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'testuser@gmail.com' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });
        fireEvent.change(getByPlaceholderText('Confirm Password'), { target: { value: 'password' } });

        fireEvent.click(getByText('Register'));

        await waitFor(() => {
            expect(getByText("Registration successful")).toBeInTheDocument();
        });
    });

    it('displays error message on invalid credentials', async () => {
        const { getByPlaceholderText, getByText } = render(<RegisterPage />);

        fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'invaliduser@test.com' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'invalidpassword' } });
        fireEvent.change(getByPlaceholderText('Confirm Password'), { target: { value: 'password' } });
        fireEvent.click(getByText('Register'));

        await waitFor(() => {
            expect(getByText('Passwords do not match')).toBeInTheDocument();
        });
    });
});
