import Header from '../components/Header';
import AddNewsModal from '../components/AddNewsModal';
import { getCurrentUser } from '../utils/auth';
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'newsList';
const initialNews = [
  // ... твой массив initialNews ...
];

function getNews() {
  if (typeof window === "undefined") return initialNews;
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : initialNews;
}

function saveNews(newsList) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newsList));
}

export default function News() {
  const [user, setUser] = useState(null);
  const [newsList, setNewsList] = useState(initialNews);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
    setNewsList(getNews());
  }, []);

  const handleAddNews = (news) => {
    let updated;
    if (news.id) {
      updated = newsList.map(n => n.id === news.id ? { ...news, date: n.date } : n);
    } else {
      updated = [...newsList, { ...news, id: Date.now(), date: new Date().toISOString().slice(0, 10) }];
    }
    setNewsList(updated);
    saveNews(updated);
    setShowModal(false);
    setEditData(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Удалить эту новость?')) return;
    const updated = newsList.filter(n => n.id !== id);
    setNewsList(updated);
    saveNews(updated);
  };

  // Защита для гостей
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-200">
        <Header />
        <main className="flex flex-col items-center justify-center flex-1 py-20">
          <div className="bg-white bg-opacity-90 backdrop-blur p-10 rounded-2xl shadow-2xl flex flex-col items-center animate-fadeInDown">
            <h2 className="text-3xl font-extrabold mb-2 text-blue-800 flex items-center gap-3">
              <svg className="w-9 h-9 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 7v4H5V7h14zm0 6v4H5v-4h14zm2-8H3a2 2 0 00-2 2v14a2 2 0 002 2h18a2 2 0 002-2V5a2 2 0 00-2-2z" />
              </svg>
              Новости закрыты
            </h2>
            <p className="text-lg text-gray-600 mb-4 text-center">
              Только зарегистрированные пользователи могут читать новости.
            </p>
            <a href="/login" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow mt-2 text-lg">
              Войти на сайт
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-50 to-blue-200">
      <Header />
      <main className="w-full flex flex-col items-center py-10 px-2 sm:px-6">
        <div className="w-full max-w-7xl mx-auto mb-8">
          <div className="flex items-center gap-4 justify-center">
            <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 7v4H5V7h14zm0 6v4H5v-4h14zm2-8H3a2 2 0 00-2 2v14a2 2 0 002 2h18a2 2 0 002-2V5a2 2 0 00-2-2z" />
            </svg>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-900 drop-shadow-lg">Новости чемпионата</h2>
          </div>
          <p className="text-lg text-blue-700 font-medium text-center mt-2">
            Весь драйв и атмосфера событий — без рамок и границ!
          </p>
        </div>
        {user.role === 'admin' && (
          <div className="w-full max-w-7xl mx-auto flex justify-end mb-4">
            <button
              onClick={() => { setEditData(null); setShowModal(true); }}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 hover:from-green-600 hover:to-blue-600 transition-all duration-150 shadow-lg text-lg"
            >
              + Добавить новость
            </button>
          </div>
        )}

        {/* Новостная лента */}
        <section className="w-full max-w-7xl mx-auto flex flex-col gap-0">
          {newsList.length === 0 ? (
            <div className="text-center text-lg text-gray-500 mt-8 w-full">Новостей пока нет.</div>
          ) : (
            newsList.slice().reverse().map((news, idx) => (
              <div
                key={news.id}
                className={`flex flex-col md:flex-row items-stretch w-full min-h-[220px] 
                  ${idx % 2 === 0 ? "bg-gradient-to-r from-blue-50 to-white" : "bg-gradient-to-r from-green-50 to-white"} 
                  border-b border-blue-100 group
                  hover:bg-blue-50/50 transition-all duration-200`}
                style={{
                  animation: `fadeInRow 0.7s both`,
                  animationDelay: `${0.06 * idx}s`
                }}
              >
                {/* Картинка новости */}
                <div className="md:w-[320px] w-full flex-shrink-0 flex items-center justify-center bg-white/70 rounded-xl m-3 overflow-hidden"
                  style={{ minHeight: '220px', maxHeight: '320px' }}>
                  {news.image ? (
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-[300px] object-cover object-center transition group-hover:scale-105 duration-300"
                      style={{ maxWidth: '320px', minWidth: '220px' }}
                    />
                  ) : (
                    <div className="w-full h-[220px] bg-blue-100 flex items-center justify-center text-blue-400 text-xl">Нет изображения</div>
                  )}
                </div>
                {/* Контент новости */}
                <div className="flex flex-col justify-center px-6 py-4 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-2xl font-bold text-blue-900 group-hover:text-green-700 transition">{news.title}</h3>
                    <span className="text-xs text-blue-700 opacity-80 ml-1">{news.date}</span>
                  </div>
                  <div className="text-gray-800 text-lg mt-1 mb-2">{news.description}</div>
                  {user.role === 'admin' && (
                    <div className="flex gap-2 mt-1">
                      <button
                        className="text-blue-1700 border border-blue-300 px-3 py-1 rounded hover:bg-blue-100 text-sm"
                        onClick={() => { setEditData(news); setShowModal(true); }}
                      >Редактировать</button>
                      <button
                        className="text-red-600 border border-red-200 px-3 py-1 rounded hover:bg-red-50 text-sm"
                        onClick={() => handleDelete(news.id)}
                      >Удалить</button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </section>

        {/* Модальное окно */}
        {showModal && (
          <AddNewsModal
            onClose={() => { setShowModal(false); setEditData(null); }}
            onAdd={handleAddNews}
            initialData={editData}
          />
        )}
      </main>
      <style jsx global>{`
        @keyframes fadeInRow { from { opacity: 0; transform: translateY(40px);} to {opacity: 1; transform: none;} }
      `}</style>
    </div>
  );
}
