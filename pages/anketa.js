import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { getCurrentUser } from '../utils/auth';

const questions = [
  // --- ОБЯЗАТЕЛЬНЫЕ ---
  { label: "Фамилия Имя Отчество", name: "fio", required: true, type: "text", placeholder: "Иванов Иван Иванович" },
  { label: "E-mail", name: "email", required: true, type: "email", placeholder: "mail@example.com", disabled: true },
  { label: "Телефон", name: "phone", required: true, type: "tel", placeholder: "+7 999 123-45-67" },
  { label: "Город", name: "city", required: true, type: "text", placeholder: "г. Черемхово" },
  { label: "Дата рождения", name: "birth", required: true, type: "date" },

  { label: "Организация/учебное заведение", name: "org", required: true, type: "text", placeholder: "Название" },

  // --- ВЫБОР ОТВЕТОВ ---
  {
    label: "Категория участия",
    name: "category",
    required: true,
    type: "radio",
    options: [
      "Студент/учащийся",
      "Преподаватель/мастер",
      "Молодой специалист",
      "Специалист по сметному делу",
      "Другое"
    ]
  },
  {
    label: "Стаж работы по специальности (лет)",
    name: "exp_years",
    required: true,
    type: "select",
    options: [
      "Нет опыта",
      "До 1 года",
      "1-3 года",
      "3-5 лет",
      "5-10 лет",
      "Более 10 лет"
    ]
  },
  {
    label: "Знание программ для сметного дела (можно выбрать несколько)",
    name: "software",
    required: false,
    type: "checkbox",
    options: [
      "ГРАНД-Смета",
      "Смета.RU",
      "ТурбоСмета",
      "Smeta Wizard",
      "Другие",
      "Пока не использую"
    ]
  },
  {
    label: "Какой уровень у вас по сметному делу?",
    name: "skill",
    required: true,
    type: "radio",
    options: [
      "Начинающий",
      "Средний (опыт участия/работы)",
      "Продвинутый (составляю сметы на заказ/работе)",
      "Эксперт (работаю преподавателем/экспертом)"
    ]
  },

  // --- ЧЕКБОКСЫ (сфера участия) ---
  {
    label: "Выберите сферы, в которых применяете сметное дело",
    name: "fields",
    required: false,
    type: "checkbox",
    options: [
      "Строительство",
      "Ремонт",
      "Проектирование",
      "Государственные закупки",
      "Образование",
      "Промышленность",
      "Другое"
    ]
  },
  // --- ОБЯЗАТЕЛЬНЫЕ ---
  {
    label: "Вы участвуете как?",
    name: "role",
    required: true,
    type: "radio",
    options: [
      "Участник",
      "Эксперт",
      "Организатор",
      "Гость"
    ]
  },

  // --- ДЛЯ СТАТИСТИКИ ---
  { label: "Возраст", name: "age", required: true, type: "number", placeholder: "Ваш возраст" },
  { label: "Есть ли у вас удостоверение сметчика?", name: "has_cert", required: true, type: "radio", options: ["Да", "Нет"] },

  // --- ДОП ВОПРОСЫ ---
  { label: "Ваш профиль ВК/Телеграм (необязательно)", name: "social", required: false, type: "text", placeholder: "https://vk.com/..." },
  { label: "Коротко о себе (достижения, интересы)", name: "about", required: false, type: "textarea", placeholder: "Можно не заполнять" },
  { label: "Комментарий для организаторов", name: "comment", required: false, type: "textarea", placeholder: "Любые пожелания или вопросы" },
];

export default function Anketa() {
  const [user, setUser] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);
    if (u) setForm(f => ({ ...f, email: u.email }));
  }, []);

  const handleChange = (name, value) => {
    setForm(f => ({ ...f, [name]: value }));
    setErrors(e => ({ ...e, [name]: false }));
  };

  const handleCheckbox = (name, value) => {
    setForm(f => ({
      ...f,
      [name]: f[name] ? (
        f[name].includes(value)
          ? f[name].filter(v => v !== value)
          : [...f[name], value]
      ) : [value]
    }));
    setErrors(e => ({ ...e, [name]: false }));
  };

  const validate = () => {
    let valid = true;
    let err = {};
    questions.forEach(q => {
      if (q.required) {
        if (!form[q.name] || (Array.isArray(form[q.name]) && !form[q.name].length)) {
          err[q.name] = true;
          valid = false;
        }
      }
    });
    setErrors(err);
    return valid;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    let ankets = JSON.parse(localStorage.getItem('ankets') || '[]');
    ankets.push({ ...form, email: user.email, date: new Date().toISOString() });
    localStorage.setItem('ankets', JSON.stringify(ankets));
    setSubmitted(true);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="flex flex-col items-center justify-center flex-1">
          <div className="bg-white rounded-2xl shadow-xl px-10 py-12 w-full max-w-xl text-center">
            <h2 className="text-2xl font-bold mb-4">Только для зарегистрированных пользователей</h2>
            <a href="/login" className="button">Войти</a>
          </div>
        </main>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="flex flex-col items-center justify-center flex-1">
          <div className="bg-white rounded-2xl shadow-xl px-10 py-12 w-full max-w-xl text-center">
            <h2 className="text-2xl font-bold mb-4">Заявка отправлена!</h2>
            <p>Спасибо за участие! Ваша анкета сохранена.</p>
            <a href="/"className="inline-block bg-gradient-to-r from-blue-600 to-green-400 text-white font-bold py-2 px-6 rounded-xl shadow-lg mt-6 hover:from-blue-700 hover:to-green-500 transition">На главную</a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex flex-col items-center py-8 flex-1">
        <form
          className="bg-white rounded-2xl shadow-xl px-10 py-12 w-full max-w-2xl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-extrabold mb-6 text-blue-900 text-center">Анкета участника чемпионата</h2>
          <div className="space-y-7">
            {questions.map(q => (
              <div key={q.name} className="mb-2">
                <label className="block font-bold mb-2">
                  {q.label}
                  {q.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {q.type === "text" || q.type === "email" || q.type === "tel" || q.type === "date" || q.type === "number" ? (
                  <input
                    type={q.type}
                    name={q.name}
                    disabled={!!q.disabled}
                    className={`w-full border ${errors[q.name] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-300`}
                    placeholder={q.placeholder}
                    value={form[q.name] || ''}
                    onChange={e => handleChange(q.name, e.target.value)}
                  />
                ) : null}
                {q.type === "select" ? (
                  <select
                    name={q.name}
                    className={`w-full border ${errors[q.name] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-300`}
                    value={form[q.name] || ''}
                    onChange={e => handleChange(q.name, e.target.value)}
                  >
                    <option value="">Выберите...</option>
                    {q.options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : null}
                {q.type === "radio" ? (
                  <div className="flex flex-wrap gap-4">
                    {q.options.map(opt => (
                      <label key={opt} className="inline-flex items-center">
                        <input
                          type="radio"
                          name={q.name}
                          value={opt}
                          checked={form[q.name] === opt}
                          onChange={e => handleChange(q.name, opt)}
                          className={`mr-2 ${errors[q.name] ? 'accent-red-500' : 'accent-blue-600'}`}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                ) : null}
                {q.type === "checkbox" ? (
                  <div className="flex flex-wrap gap-4">
                    {q.options.map(opt => (
                      <label key={opt} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name={q.name}
                          value={opt}
                          checked={form[q.name]?.includes(opt) || false}
                          onChange={() => handleCheckbox(q.name, opt)}
                          className="mr-2 accent-blue-600"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                ) : null}
                {q.type === "textarea" ? (
                  <textarea
                    name={q.name}
                    className={`w-full border ${errors[q.name] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 mb-1 min-h-[56px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-300`}
                    placeholder={q.placeholder}
                    value={form[q.name] || ''}
                    onChange={e => handleChange(q.name, e.target.value)}
                  />
                ) : null}
                {errors[q.name] && (
                  <div className="text-red-500 text-sm mt-1">Это поле обязательно</div>
                )}
              </div>
            ))}
          </div>
          <button type="submit" className="button w-full py-3 text-lg mt-8">Отправить анкету</button>
        </form>
      </main>
    </div>
  );
}
