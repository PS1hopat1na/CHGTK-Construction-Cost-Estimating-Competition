import Header from '../components/Header';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-8 bg-white bg-opacity-80 rounded-xl shadow-lg mt-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">О нас</h1>
        <p className="mb-4 text-gray-700">
          <b>Организатор чемпионата:</b> <br />
          <b>Черемховский горнотехнический колледж имени М.И, Щадова</b>
          <br />
          <br />
          <b>Адрес:</b> Иркутская область, г. Черемхово, ул. Ленина, 26 <br />
          <b>Телефон:</b> +7 (395-46) 5-61-42, 5-60-31<br />
          <b>E-mail:</b> <a href="mailto:chgtk@bk.ru" className="text-blue-600 underline">chgtk@bk.ru</a>
        </p>

        <h2 className="text-xl font-bold text-blue-700 mt-8 mb-2">Контакты для связи:</h2>
        <ul className="mb-4 text-gray-700">
          <li><b>Директор:</b> Сычев Сергей Николаевич</li>
          <li><b>Ответственный за чемпионат:</b> Чемезов Станислав Александрович</li>
          <li><b>Телеграм:</b> <a href="https://Telegram: View @chgtk_official" className="text-blue-600 underline">Telegram: View @chgtk_official</a></li>
          <li><b>Город:</b> Черемхово, Иркутская область</li>
          <li><b>Страна:</b> Россия</li>
        </ul>

        <h2 className="text-xl font-bold text-blue-700 mt-18 mb-2">Карта:</h2>
        <div className="rounded-xl overflow-hidden shadow-xl mb-8">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A16668690f7aaa755c9fcf7687b57722d7490610553a6d2ed78ca975c85276871&amp;width=1280&amp;source=constructor"
            width="100%"
            height="420"
            frameBorder="0"
            allowFullScreen={true}
            title="Карта Черемхово"
          ></iframe>
        </div>

        <h2 className="text-xl font-bold text-blue-700 mt-8 mb-2">О колледже:</h2>
        <p className="text-gray-700">
          Черемховский горнотехнический колледж – современное образовательное учреждение, осуществляющее подготовку специалистов по востребованным направлениям горной, строительной и сметной сферы.<br /><br />
          Мы гордимся нашими студентами и выпускниками, успешно реализующими себя на предприятиях России и за рубежом.
        </p>
      </main>
    </div>
  );
}
