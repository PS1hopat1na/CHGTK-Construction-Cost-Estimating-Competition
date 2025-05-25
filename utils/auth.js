// utils/auth.js

// Хранение пользователей
const USERS_KEY = 'users';
const AUTH_KEY = 'currentUser';

// Стартовый админ
const admin = {
  email: 'Admin@mail.ru',
  password: 'Qq12345',
  role: 'admin',
};

export function getUsers() {
  if (typeof window === "undefined") return [admin];
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  // всегда добавляем админа
  if (!users.find(u => u.email === admin.email)) {
    users.unshift(admin);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  return users;
}

export function registerUser(email, password) {
  const users = getUsers();
  if (users.find(u => u.email === email)) {
    return { error: 'Пользователь с таким email уже есть.' };
  }
  const user = { email, password, role: 'user' };
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return { user };
}

export function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return { error: 'Неверный email или пароль.' };
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return { user };
}

export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem(AUTH_KEY);
  return user ? JSON.parse(user) : null;
}

export function logoutUser() {
  localStorage.removeItem(AUTH_KEY);
}
