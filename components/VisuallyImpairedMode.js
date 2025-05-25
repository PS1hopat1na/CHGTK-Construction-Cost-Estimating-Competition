import { useState, useEffect } from 'react';

export default function VisuallyImpairedMode() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('visuallyImpaired');
    if (saved === '1') setEnabled(true);
  }, []);

  useEffect(() => {
    if (enabled) {
      document.body.classList.add('visually-impaired');
      localStorage.setItem('visuallyImpaired', '1');
    } else {
      document.body.classList.remove('visually-impaired');
      localStorage.setItem('visuallyImpaired', '0');
    }
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled(e => !e)}
      className={`ml-4 px-3 py-2 rounded-lg font-bold border border-blue-400 ${enabled ? "bg-yellow-200 text-black" : "bg-blue-50 text-blue-800"} hover:bg-yellow-100`}
      title="Мод для слабовидящих"
    >
      {enabled ? "Обычный режим" : "Версия для слабовидящих"}
    </button>
  );
}
