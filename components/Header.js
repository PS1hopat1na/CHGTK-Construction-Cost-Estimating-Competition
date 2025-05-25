import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCurrentUser, logoutUser } from '../utils/auth';
import { useRouter } from 'next/router';
import VisuallyImpairedMode from './VisuallyImpairedMode';

export default function Header() {
  const [user, setUser] = useState(null);
  const [anketsCount, setAnketsCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setUser(getCurrentUser());
    if (typeof window !== "undefined") {
      const u = getCurrentUser();
      if (u?.email === "Admin@mail.ru") {
        const stored = JSON.parse(localStorage.getItem('ankets') || '[]');
        setAnketsCount(stored.length);
      }
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    router.push('/');
  };

  return (
    <>
      {/* Бегущая строка */}
      <div className="overflow-hidden w-full h-12 bg-gradient-to-r from-blue-600 via-cyan-400 to-green-400 flex items-center shadow-md z-50">
        <div className="animate-marquee whitespace-nowrap font-bold text-white text-base px-4 drop-shadow"
             style={{ animationDuration: '27s' }}>
          ⚡ Регистрация на Черемховский чемпионат по сметному делу ОТКРЫТА! — Подай заявку и участвуй в самом главном событии года! ⚡
        </div>
      </div>
      {/* Шапка */}
      <header className="shadow-lg px-2 sm:px-8 py-3 flex items-center justify-between bg-white/90 backdrop-blur-xl border-b border-blue-200 z-30 relative">
        {/* Логотип и текст — один flex, логотип всегда поверх */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <img
              src="/logo.png"
              alt="Логотип"
              className="w-14 h-14 bg-white rounded-xl border border-blue-200 shadow hover:scale-105 transition cursor-pointer"
              style={{ marginLeft: '4px', marginRight: '4px' }}
            />
          </Link>
          <Link href="/">
            <span className="font-extrabold text-2xl md:text-3xl text-blue-800 drop-shadow cursor-pointer hover:text-green-700 transition select-none">
              Черемховский чемпионат - Сметное дело !
            </span>
          </Link>
        </div>
        {/* Навигация */}
        <nav className="flex flex-wrap items-center gap-1 sm:gap-1 ml-2">
          <Link href="/"><span className="header-nav-link">Главная</span></Link>
          <Link href="/news"><span className="header-nav-link">Новости</span></Link>
          <Link href="/championship"><span className="header-nav-link">Чемпионат</span></Link>
          <Link href="/about"><span className="header-nav-link">О нас</span></Link>
          <Link href="/anketa"><span className="header-nav-link">Анкета</span></Link>
          <Link href="/privacy"><span className="header-nav-link">Политика</span></Link>
          <span className="ml-1"><VisuallyImpairedMode /></span>
          {/* Уведомления для админа */}
          {user && user.email === "Admin@mail.ru" && (
            <Link href="/admin/ankets" title="Новые заявки">
              <span className="relative flex items-center ml-5 cursor-pointer">
                <svg className="w-8 h-8 text-blue-800 hover:text-green-700 transition" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2M21 8l-9 6.5L3 8" />
                </svg>
                {anketsCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-red-600 text-white rounded-full px-2 text-xs font-bold">
                    {anketsCount}
                  </span>
                )}
              </span>
            </Link>
          )}
          {/* Кнопки Вход/Выход */}
          {!user ? (
            <Link href="/login">
              <span className="ml-2 bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-2 rounded-xl font-bold shadow hover:from-blue-700 hover:to-green-600 transition cursor-pointer">
                Вход
              </span>
            </Link>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <span className="text-blue-900 font-semibold px-2">{user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-gray-200 to-blue-200 text-blue-900 px-4 py-2 rounded-xl font-bold shadow hover:from-gray-300 hover:to-blue-300 transition"
              >
                Выйти
              </button>
            </div>
          )}
        </nav>
      </header>
      <style jsx global>{`
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 27s linear infinite;
        }
        @keyframes marquee {
          0%   { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .header-nav-link {
          display: inline-block;
          padding: 0.45rem 1.1rem;
          border-radius: 1.1rem;
          font-weight: 600;
          font-size: 1.07rem;
          color: #1450a3;
          background: transparent;
          transition: background 0.18s, color 0.13s;
          cursor: pointer;
        }
        .header-nav-link:hover {
          background: linear-gradient(90deg, #d3ebff 0%, #a8eec1 100%);
          color: #15803d;
        }
      `}</style>
    </>
  );
}
