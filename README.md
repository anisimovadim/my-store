# 🛒 Modern E-commerce Store (FakeStore)

Современное Single Page Application (SPA) интернет-магазина, построенное на стеке **React + TypeScript** с использованием методологии **FSD (Feature-Sliced Design)**.

Это проект с акцентом на чистую архитектуру, высокую производительность и удобный UX.

---

## ⚡️ Технологический стек

* **Frontend:** React 18 (Vite)
* **Language:** TypeScript
* **Architecture:** Feature-Sliced Design (FSD)
* **State Management:** * **Zustand** — управление состоянием корзины.
    * **TanStack Query (v5)** — серверное состояние, кэширование и синхронизация данных.
* **Routing:** React Router DOM v6
* **Styling:** Tailwind CSS (Utility-First)
* **Icons:** Lucide React
* **API:** [Fake Store API](https://fakestoreapi.com/)

---

## 🌟 Ключевые особенности

### 🏗 Архитектура (FSD)
Проект строго следует методологии **Feature-Sliced Design**, что делает код предсказуемым и масштабируемым:
- **Entities:** Бизнес-логика товаров (API, типы) и стор корзины.
- **Widgets:** Сложные блоки, такие как `ProductList` с интегрированной фильтрацией.
- **Pages:** Чистые страницы приложения (`Home`, `ProductDetails`, `Cart`).
- **Shared:** Переиспользуемые UI-компоненты (Skeletons, API instance).

### 🔍 Функционал
* **Умная фильтрация:** Поиск по названию работает одновременно с фильтрацией по категориям и сортировкой.
* **Динамическая сортировка:** Сортировка товаров по цене (сначала дешевые/дорогие) реализована на клиенте для мгновенного отклика.
* **Детальные страницы:** Динамический роутинг для каждого товара с отображением рейтинга и отзывов.
* **Продвинутая корзина:** * Управление количеством товара (`+`/`-`).
    * Автоматический расчет итоговой суммы.
* **UX/UI:**
    * **Skeleton Screens** — кастомные заглушки, повторяющие форму карточек для предотвращения Layout Shift.
    * **Empty States** — проработанные экраны для пустой корзины или отсутствия результатов поиска.

---

## 📂 Структура проекта

```text
src/
  ├── app/              # Роутер и глобальные провайдеры
  ├── pages/            # Компоненты страниц (Home, ProductDetails, Cart)
  ├── widgets/          # Виджеты: Header, ProductList
  ├── entities/         # Сущности: Product (API, hooks), Cart (Zustand store)
  ├── shared/           # Shared: API инстанс, Skeleton компоненты

```
---
## 🚀 Быстрый старт
* **Клонируйте репозиторий:**
```text
git clone https://github.com/anisimovadim/my-store.git
```

* **Установите зависимости:**
```text
npm install
```

* **Запустите проект в режиме разработки:**
```text
npm run dev
```

