import Header from '../../components/Header';
import { getCurrentUser } from '../../utils/auth';
import { useState, useEffect } from 'react';

export default function AnketsAdmin() {
  const [user, setUser] = useState(null);
  const [ankets, setAnkets] = useState([]);

  useEffect(() => {
    setUser(getCurrentUser());
    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem('ankets') || '[]');
      setAnkets(stored);
    }
  }, []);

  // Функция удаления анкеты
  const handleDelete = (idx) => {
    if (window.confirm('Удалить анкету?')) {
      const newAnkets = ankets.filter((a, i) => i !== idx);
      setAnkets(newAnkets);
      localStorage.setItem('ankets', JSON.stringify(newAnkets));
    }
  };

  if (!user || user.email !== 'Admin@mail.ru') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="flex flex-col items-center justify-center">
          <div className="card max-w-lg w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Доступ запрещён</h2>
            <p>Только администратор может просматривать заявки.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex flex-col items-center py-10">
        <div className="card w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-6">Заявки участников</h2>
          {ankets.length === 0 ? (
            <div className="text-gray-500 text-lg text-center">Нет новых анкет</div>
          ) : (
            <div className="space-y-4">
              {ankets.slice().reverse().map((a, idx) => (
                <div key={idx} className="p-4 border rounded-xl bg-gray-50 relative">
                  <button
                    onClick={() => handleDelete(ankets.length - 1 - idx)}
                    className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800 font-bold"
                  >
                    Удалить
                  </button>
                  <div><b>ФИО:</b> {a.fio}</div>
                  <div><b>Email:</b> {a.email}</div>
                  <div><b>Телефон:</b> {a.phone}</div>
                  <div><b>Город:</b> {a.city}</div>
                  <div><b>Дата рождения:</b> {a.birth}</div>
                  <div><b>Организация:</b> {a.org}</div>
                  <div><b>Опыт:</b> {a.exp}</div>
                  <div><b>Комментарий:</b> {a.comment}</div>
                  <div className="text-xs text-gray-400 mt-1"><b>Дата:</b> {a.date?.slice(0, 10)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
