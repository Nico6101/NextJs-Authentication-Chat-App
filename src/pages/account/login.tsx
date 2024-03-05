'use client'

import { Link } from '@/components/Link';
import { Layout } from '@/components/account/Layout';
import { userService } from '@/services';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
// import { useFormState, useFormStatus } from 'react-dom'

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await userService.login(email, password);
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/');
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. Please try again later.');
    }
  };

  return (
    <Layout>
      <div className="card">
        <h4 className="card-header">Authentication</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>{error && <p>{error}</p>}</div>
            <LoginButton />
            <Link href="/account/register" className="btn btn-link">Register</Link>
          </form>
        </div>
      </div>
    </Layout>
  )
}

function LoginButton() {
  // const { pending } = useFormStatus()

  return (
    <button /** aria-disabled={pending} */ type="submit">
      Login
    </button>
  )
}