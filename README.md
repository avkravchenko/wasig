# Wasig

Мобильное приложение на React Native + Expo.

## Что есть сейчас

- авторизация по номеру телефона (включая SMS шаг);
- онбординг профиля пользователя (имя, пол, дата рождения, город, цели, интересы, фото);
- домашний экран с вкладками (`Лента`, `Встречи`, `Профиль`);
- UI-компоненты и тесты для ключевых элементов.

## Технологии

- Expo 54
- React 19
- React Native 0.81
- TypeScript
- React Navigation
- TanStack Query
- Axios
- Jest + Testing Library

## Требования

- Node.js 20+ (рекомендуется LTS)
- npm 10+ (или Yarn 1.x)
- Xcode (для iOS) / Android Studio + SDK (для Android)

## Установка

```bash
npm install
```

или

```bash
yarn install
```

## Запуск

```bash
npm run start
```

Отдельные платформы:

```bash
npm run ios
npm run android
npm run web
```

## Проверки качества

```bash
npm run lint
npm run type-check
npm run test
```

## Структура проекта

```text
src/
  app/         # инициализация приложения, навигация, роуты
  screens/     # экраны
  features/    # бизнес-фичи (логин, лента, профиль)
  widgets/     # крупные UI-блоки (например, вкладки)
  entities/    # доменные сущности
  shared/      # переиспользуемые UI, API, утилиты, константы
assets/        # иконки, шрифты, изображения
```

## API

Базовый URL API сейчас задан в коде:

`src/shared/constants/apiConstants.ts`

При смене окружения обновите значение `API_URL`.
