
import { Layout } from '@/components/account/Layout';
import { userService } from '@/services';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// import { useFormStatus } from 'react-dom'

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await userService.register({ username, email, password });

      // Registration successful, redirect or show a success message
      setMessage("Registration successful");
      router.push('/account/login');

    } catch (error: any) {
      console.error('Registration failed:', error.message);
      setError('Registration failed. Please try again later.');
    }
  };

  return (
    <Layout>
      <div className="card">
        <h4 className="card-header">Registration</h4>
        <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <div>{message && <p>{message}</p>}</div>
          <div>{error && <p>{error}</p>}</div>
          <RegisterButton />
          <Link href="/account/login" className="btn btn-link">Cancel</Link>
        </form>
        </div>
      </div>
    </Layout>
  )
}

function RegisterButton() {
  // const { pending } = useFormStatus()

  return (
    <button /** aria-disabled={pending} */ type="submit">
      Register
    </button>
  )
}