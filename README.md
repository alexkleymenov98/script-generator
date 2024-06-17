# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Установка

Для установки зависимостей проекта необходимо из корня проекта использовать команду:

#### `yarn` или `yarn install`

```
npm install
```

## Запуск

Для локального запуска проекта необходимо из корня проекта запустить команду:

```
npm run dev
```

## Создание docker контейнера

Для сборки контейнера нужно выполнить команду:

```
docker build -t  NAME_IMAGE .
```

## Запуск docker контейнера

Для запуска контейнера нужно выполнить команду:

```
docker run --env-file ./.env  -d -p 80:80 NAME_IMAGE

```

=== Переменные окружения

Добавить файл .env для переменных окружения
|===
|Переменная |Назначение |Пример

|VITE_API_URL
|URL для доступа к API
|example.ru
