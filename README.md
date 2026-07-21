# ManitFood Landing

Лендинг для сервиса ИИ-фуд-фотографии. Стек: **Astro**, **React**, **Tailwind CSS**, **shadcn/ui**.

## Архитектура

- **Astro** — статический сайт (`output: static`)
- **shadcn/ui** — компоненты (Button, Card)
- **Yandex Object Storage / S3** — хранение контентных картинок (через CDN)
- **Nginx** — reverse proxy + SSL на VPS Timeweb Cloud
- **GitHub Actions** — CI/CD → деплой на VPS по SSH

## Структура

```
.
├── .github/workflows/deploy.yml   # CI/CD pipeline
├── infra/
│   ├── nginx/manitfood.conf       # Nginx конфиг (SSL, gzip, cache)
│   └── scripts/
│       ├── setup-server.sh        # Настройка сервера (Nginx + Certbot)
│       └── deploy.sh              # Локальный деплой через rsync
├── src/
│   ├── components/ui/             # shadcn/ui компоненты
│   ├── layouts/Layout.astro         # Базовый layout
│   ├── lib/
│   │   ├── s3.ts                  # Yandex S3 клиент + helper URL
│   │   └── utils.ts               # cn() — merge tailwind classes
│   ├── pages/index.astro          # Главная (placeholder)
│   └── styles/global.css          # Tailwind + CSS переменные shadcn
├── .env.example                   # Переменные окружения
└── astro.config.mjs               # Astro конфиг
```

## Быстрый старт (локально)

```bash
# 1. Установка зависимостей
npm install

# 2. Скопировать .env и заполнить

# S3 / CDN
S3_REGION=ru-central1
S3_ENDPOINT=https://storage.yandexcloud.net
S3_ACCESS_KEY_ID=your_access_key_id
S3_SECRET_ACCESS_KEY=your_secret_access_key
PUBLIC_CDN_URL=https://your-cdn.domain.com

# Site
PUBLIC_SITE_URL=https://manitfood.ru

# 3. Запуск dev-сервера
npm run dev

# 4. Сборка
npm run build
```

## Развёртывание на VPS Timeweb Cloud

### Первоначальная настройка сервера (один раз)

1. Купите VPS на [Timeweb Cloud](https://timeweb.cloud/) (Ubuntu 22.04/24.04).
2. Настройте DNS A-запись `manitfood.ru` → IP сервера.
3. Залейте проект и запустите скрипт:

```bash
ssh user@your-vps-ip
git clone https://github.com/kononenko-e/manitfood-landing.git
cd manitfood-landing
./infra/scripts/setup-server.sh
```

Скрипт установит: Nginx, Certbot (SSL), создаст директории, скопирует конфиг.

### Деплой

**Автоматический (CI/CD):**

Пуш в `main` → GitHub Actions собирает проект и деплоит на VPS.

Нужно добавить Secrets в репозиторий (Settings → Secrets → Actions):

| Secret | Описание |
|--------|----------|
| `REMOTE_HOST` | IP VPS |
| `REMOTE_USER` | SSH user (обычно `root` или `ubuntu`) |
| `SSH_PRIVATE_KEY` | Приватный ключ для SSH |
| `REMOTE_TARGET` | Путь на сервере (`/var/www/manitfood-landing/dist`) |
| `PUBLIC_CDN_URL` | Базовый URL CDN |

**Ручной деплой:**

```bash
export REMOTE_HOST=your-vps-ip
export REMOTE_USER=root
export REMOTE_TARGET=/var/www/manitfood-landing/dist
./infra/scripts/deploy.sh
```

## S3 / CDN — работа с картинками

```typescript
import { cdnImage } from '@/lib/s3';

// В компоненте
<img src={cdnImage('uploads/dish.jpg')} alt="Dish" />
// → https://your-cdn.domain.com/uploads/dish.jpg
```

### Что хранить в S3 vs `/public`

| Тип | Где | Почему |
|-----|-----|--------|
| Favicon, OG-image, logo | `/public` | Маленькие, критичные для SSR |
| Контентные фото, видео | **S3 + CDN** | Тяжёлые, часто обновляются |
| Шрифты | `/public` или Google Fonts | Контроль или скорость |

## Yandex Object Storage

- [Документация](https://yandex.cloud/ru/docs/storage/)
- [AWS SDK для JS v3](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html)
- Endpoint: `https://storage.yandexcloud.net`
- Region: `ru-central1`

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер на `localhost:4321` |
| `npm run build` | Сборка в `dist/` |
| `npm run preview` | Предпросмотр production-сборки |
| `./infra/scripts/setup-server.sh` | Настройка VPS (Nginx, SSL) |
| `./infra/scripts/deploy.sh` | Ручной деплой на VPS |

## Лицензия

MIT
