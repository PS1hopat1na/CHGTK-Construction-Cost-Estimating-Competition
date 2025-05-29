import Header from '../components/Header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-green-50 to-blue-200 relative overflow-x-hidden">
      <Header />
      {/* Декоративные боковые полосы */}
      <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-b from-blue-300/30 to-green-200/0 z-0 pointer-events-none rounded-br-3xl" />
      <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-t from-green-300/80 to-blue-200/0 z-0 pointer-events-none rounded-bl-3xl" />

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12 flex-1">
        {/* ...твой контент... */}
        {/* Баннер с лого и картинкой */}
        <section className="relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-50 via-green-50 to-blue-100 rounded-3xl shadow-2xl p-8 md:p-16 mb-10 border-2 border-blue-200/30">
          <div className="flex-1 z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-blue-800 mb-4 drop-shadow-lg tracking-tight animate-fadeIn">
              Черемховский чемпионат по сметному делу
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl animate-fadeIn delay-100">
              Добро пожаловать на официальный сайт регионального этапа Всероссийского чемпионата профессионального мастерства по стандартам <span className="font-bold text-blue-700">Профессионалы Россия</span> в компетенции «Сметное дело» в городе <b>Черемхово</b>!
            </p>
            <a
              href="/anketa"
              className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold px-10 py-4 rounded-2xl text-xl shadow-lg hover:from-green-600 hover:to-blue-600 transition-all duration-150 animate-fadeIn delay-200"
            >
              Стать участником
            </a>
          </div>
          <div className="flex-1 flex justify-center mt-10 md:mt-0 animate-fadeInRight">
            <img
              src="/banner.png"
              alt="Баннер чемпионата"
              className="rounded-2xl w-[340px] h-[340px] object-cover shadow-xl border-4 border-blue-200"
            />
          </div>
          {/* Декор: светящийся круг */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl w-2/3 h-2/3 rounded-full bg-blue-300/10 z-0"></div>
        </section>

        {/* Фичи: 3 блока о чемпионате */}
        <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border-t-4 border-green-300 hover:scale-105 transition-transform duration-200">
            <img src="/81b6b2c4-6a34-4158-832e-4f205402aecc.png" alt="WorldSkills" className="h-120 mb-4" />
            <h3 className="font-bold text-blue-700 text-xl mb-2">Профессионалы Россия</h3>
            <p className="text-gray-600 text-center text-lg">Чемпионат по мировым стандартам. Конкурсанты получают уникальный опыт и признание.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border-t-4 border-blue-300 hover:scale-105 transition-transform duration-200">
            <img src="/9e2aeada-2ca7-48e7-bfd6-53c099d87420.png" alt="Участники" className="h-70 mb-4" />
            <h3 className="font-bold text-blue-700 text-xl mb-2">Кто участвует?</h3>
            <p className="text-gray-600 text-center text-lg">Студенты, молодые специалисты и преподаватели Иркутской области и других регионов.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border-t-4 border-yellow-300 hover:scale-105 transition-transform duration-200">
            <img src="/227aa89b-32c6-444f-b827-5ef37c8a8129.png" alt="Сметное дело" className="h-120 mb-4" />
            <h3 className="font-bold text-blue-700 text-xl mb-2">Сметное дело</h3>
            <p className="text-gray-600 text-center text-lg">Современные технологии и лучшие решения в области составления смет и оптимизации строительства.</p>
          </div>
        </section>

        {/* О чемпионате */}
        <section className="bg-white bg-opacity-95 rounded-2xl shadow-2xl p-10 mb-10 border-l-8 border-blue-400/30">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">О чемпионате</h2>
          <p className="mb-4 text-lg">
            Региональный этап проводится ежегодно на базе <b>Черемховского горнотехнического колледжа имени М. И. Щадова</b> при поддержке Министерства образования Иркутской области.
          </p>
          <ul className="list-disc list-inside mb-2 text-blue-700 text-lg space-y-2">
            <li>Выявление и поддержка талантливых студентов</li>
            <li>Повышение престижа строительных специальностей</li>
            <li>Уникальные стандарты "Профессионалы России"</li>
            <li>Профессиональный рост и новые знакомства</li>
          </ul>
        </section>

        {/* Инфоблоки (Партнеры + Почему участвовать) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-6">
          {/* Партнеры */}
          <div className="bg-gradient-to-tr from-blue-100 via-green-100 to-white rounded-2xl shadow-xl p-8 flex flex-col gap-4 border-b-4 border-blue-200/30">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Партнёры и поддержка</h3>
            <div className="flex items-center gap-6 mb-4 flex-wrap">
              <img src="/81b6b2c4-6a34-4158-832e-4f205402aecc.png" alt="WorldSkills Russia" className="h-30 w-auto rounded-lg bg-white p-1 shadow" title="WorldSkills" />
            </div>
            <ul className="text-gray-700 pl-2 list-disc space-y-2 text-lg">
              <li>
                <span className="font-semibold text-blue-700">Министерство образования Иркутской области</span><br />
                Организатор и поддержка чемпионата, развитие строительных специальностей в регионе.
              </li>
              <li>
		<span className="font-semibold text-blue-700">Профессионалы Россия</span><br />
  		Всероссийское движение, поддерживающее профессиональный рост участников, интеграцию в международное профессиональное сообщество и развитие стандартов качества.
		</li>
              <li>
                <span className="font-semibold text-blue-700">ГРАНД-Смета</span><br />
                Официальное программное обеспечение чемпионата, обучение современным технологиям.
              </li>
              <li>
                <span className="font-semibold text-blue-700">Ведущие строительные предприятия региона</span><br />
                Практические задания, кейсы, предложения о работе для участников.
              </li>
            </ul>
          </div>

          {/* Почему стоит участвовать */}
          <div className="bg-gradient-to-tl from-green-50 via-blue-100 to-white rounded-2xl shadow-xl p-8 flex flex-col gap-4 border-b-4 border-green-200/30">
            <h3 className="text-2xl font-bold text-blue-900 mb-3 text-center">Почему стоит участвовать?</h3>
            {/* Картинка по центру и большая */}
            <div className="w-full flex justify-center mb-5">
              <img 
                src="/A_high-resolution_digital_photograph_shows_five_yo.png" 
                alt="Команда" 
                className="rounded-2xl shadow-lg w-full max-w-xl object-cover"
                style={{ maxHeight: 300 }}
              />
            </div>
            {/* Текст под картинкой */}
            <ul className="list-disc pl-5 text-gray-700 text-lg space-y-2 mb-6">
              <li><b>Настоящий командный дух!</b> Вы работаете плечом к плечу с лучшими молодыми сметчиками региона, обмениваетесь опытом и заводите друзей на всю жизнь.</li>
              <li><b>Современные цифровые технологии.</b> Все этапы чемпионата проходят с использованием новейших программных комплексов, таких как <b>ГРАНД-Смета</b>.</li>
              <li><b>Реальные кейсы от ведущих компаний.</b> Вы работаете с проектами, которые были реализованы на крупных стройках страны — и все это на базе колледжа!</li>
              <li><b>Карьерный старт.</b> Лучшие участники получают предложения о практике, стажировке и работе.</li>
              <li><b>Призы и дипломы.</b> Для победителей и всех участников — памятные сувениры и дипломы чемпионата.</li>
            </ul>
            {/* Призыв внизу */}
            <div className="w-full flex justify-center">
              <span className="text-blue-900 font-extrabold text-xl md:text-2xl mt-2 text-center">
                Присоединяйся! Вперёд к победам!
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Лёгкая анимация фона */}
      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: none; } }
        .animate-fadeIn { animation: fadeIn 0.8s both; }
        .animate-fadeInRight { animation: fadeInRight 1.2s both; }
      `}</style>

      <footer className="relative z-10 w-full bg-gradient-to-r from-blue-200 via-blue-100 to-green-100 border-t border-blue-200/60 py-6 shadow-xl mt-auto">
        <div className="max-w-2xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-blue-800 text-center text-base font-medium gap-4">
          <span>
            © 2025&nbsp; Черемховский чемпионат по сметному делу. Все права защищены.
          </span>
          <span className="text-sm opacity-60">
            Сайт создан студентами группы ИС-21 Овчинников Д. Крыкпаев А.
          </span>
        </div>
      </footer>
    </div>
  );
}
