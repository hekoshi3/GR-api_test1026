# Веб-клиент для работы с сообщениями в мессенджере с использованием GREEN-API
Демо: https://grapitest.spoons.su/

## Реализовано:
- Вход через idInstance и apiTokenInstance с сохранением в httpOnly Cookie;
- Открытие чата по номеру телефона;
- Отправка сообщений;
- Получение уведомлений через методы receiveNotification и deleteNotification;
- История чата (10 сообщений);
- UI в стиле мессенджера. Адаптировано под экраны шириной от 764 до 1440 пикселей.

## Стек
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

## Архитектура
Основано на архитектуре Feature-Sliced Design
- `src/app/api/v1/proxy/[...path]/route.ts` - универсальный прокси для работы с GREEN-API. Автоматически подставляет Cookie аутентификации в запрос;
- `src/features/...` - фичи (модуль аутентификации, модуль уведомлений);
- `src/widgets/...` - UI-блоки (навигация, чат-лист, чат);
- `src/entities/...` - модели, компоненты;
- `src/_pages/...` - страницы.

# Запуск
Перед запуском сервера необходимо указать URL адрес API-сервера в переменных окружения .env

## Разработка
1. `npm / pnpm install`
2. `npm run dev / pnpm dev`

## Production локально
1. `npm / pnpm install`
2. `npm run build / pnpm build`
3. `npm run start / pnpm start`

## Docker
Файл docker-compose.yml находится в корне проекта

`docker compose up .`

Также можно использовать [образ из GitHub Packages](https://github.com/hekoshi3/GR-api_test1026/pkgs/container/gr-api_test1026)
