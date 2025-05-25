import { useState } from 'react';
import Header from '../components/Header';
import { useRouter } from 'next/router';
import { loginUser } from '../utils/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = loginUser(email, password);
    if (error) {
      setError(error);
    } else {
      router.push('/news');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold mb-2">Вход</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-8 pt-6 pb-8 w-80">
          {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Введите email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Пароль</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Введите пароль"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full font-bold"
          >
            Войти
          </button>
          <div className="mt-4 text-center">
            <a href="/register" className="text-blue-600 hover:underline">Нет аккаунта? Зарегистрироваться</a>
          </div>
        </form>
      </main>
    </div>
  );
}
