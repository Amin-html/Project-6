# 📱 TechShop

Магазин техники — Проект 6 из 10.
Первый проект на **Django REST Framework + React**!

## Стек

### Бэкенд
- Python 3.13 + Django 5.2
- Django REST Framework
- JWT аутентификация
- PostgreSQL

### Фронтенд
- React + Vite
- React Router DOM
- Axios
- Context API (корзина + авторизация)

### Инфраструктура
- Docker Compose — 3 контейнера (db, backend, frontend)

## Функционал
- 📱 Каталог техники с фото
- 🏷️ Фильтр по категориям — Телефоны, Ноутбуки, Планшеты
- 🔍 Поиск по названию
- 🛒 Корзина — добавить, убрать, пересчёт итого
- 🔐 Регистрация и вход через JWT токены
- 👤 Имя пользователя в навбаре

## Запуск

```bash
git clone https://github.com/Amin-html/Project-6.git
cd Project-6
docker-compose up --build
```

Бэкенд: `http://localhost:8000`
Фронтенд: `http://localhost:3000`