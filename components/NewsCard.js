export default function NewsCard({ news, isAdmin, onEdit, onDelete }) {
  return (
    <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center relative">
      {isAdmin && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={onEdit}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
            title="Редактировать"
          >
            ✎
          </button>
          <button
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
            title="Удалить"
          >
            ×
          </button>
        </div>
      )}
      {news.image && (
        <img
          src={news.image}
          alt={news.title}
          className="mb-4 rounded-xl max-h-80 object-cover"
          style={{ width: '100%' }}
        />
      )}
      <h3 className="text-xl font-bold mb-2">{news.title}</h3>
      <p className="text-gray-700">{news.description}</p>
      <p className="mt-4 text-xs text-gray-400">{news.date}</p>
    </div>
  );
}
