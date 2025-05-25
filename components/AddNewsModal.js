import { useState, useEffect } from 'react';

export default function AddNewsModal({ onClose, onAdd, initialData }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setImage(initialData.image || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    onAdd({
      ...initialData,
      title,
      description,
      image: image || '/background.jpg',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 shadow-xl w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold"
          title="Закрыть"
        >×</button>
        <h3 className="text-xl font-bold mb-4">{initialData ? 'Редактировать новость' : 'Добавить новость'}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Заголовок"
            className="border p-2 rounded"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Текст новости"
            className="border p-2 rounded"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="URL картинки (опционально)"
            className="border p-2 rounded"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 font-bold"
          >Сохранить</button>
        </form>
      </div>
    </div>
  );
}
