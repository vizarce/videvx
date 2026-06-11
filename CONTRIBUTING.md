# Як зробити внесок у VIdevX

Дякуємо, що хочете покращити VIdevX! Будь-який внесок вітається.

---

## Кодекс поведінки

Будьте шанобливі, конструктивні та доброзичливі.  
Будь-яка форма дискримінації або харасменту не допускається.

---

## Як можна допомогти

- 🐛 Повідомити про баг
- 💡 Запропонувати нову функцію
- 📝 Покращити документацію
- 🔧 Надіслати Pull Request

---

## Процес Pull Request

### 1. Форк та клон

```bash
git clone https://github.com/<your-username>/videvx.git
cd videvx
npm install
cp .env.example .env
```

### 2. Створіть гілку

```bash
git checkout -b feat/your-feature-name
# або
git checkout -b fix/your-bug-fix
```

**Назви гілок:**
- `feat/<назва>` — нова функціональність
- `fix/<назва>` — виправлення бага
- `docs/<назва>` — документація
- `refactor/<назва>` — рефакторинг

### 3. Зробіть зміни

- Дотримуйтесь існуючого стилю коду (TypeScript, ESLint, Tailwind)
- Кожна нова функція — окремий компонент/файл
- Не додавайте нові залежності без обговорення в Issue

### 4. Перевірте

```bash
npm run lint    # ESLint перевірка
npm run build   # TypeScript + Vite build
```

### 5. Commit

Дотримуйтесь [Conventional Commits](https://conventionalcommits.org):

```
feat: додати підтримку Swift у пісочниці
fix: виправити відображення тегів без supabase
docs: оновити README — інструкція Supabase
```

### 6. Push та Pull Request

```bash
git push origin feat/your-feature-name
```

Відкрийте PR на GitHub. Заповніть шаблон, опишіть зміни, прикріпіть скріншот якщо є UI-зміни.

---

## Стиль коду

- TypeScript з явними типами
- React функціональні компоненти + хуки
- Tailwind CSS для стилів (без inline-стилів)
- Назви компонентів у `PascalCase`, функцій у `camelCase`
- Коментарі українською або англійською

---

## Структура повідомлення PR

```
## Що змінено
Короткий опис.

## Причина
Навіщо ця зміна потрібна.

## Тестування
Як перевірити зміни вручну.

## Скріншоти (якщо UI)
```

---

## Локальна розробка без Supabase

Для більшості змін достатньо **демо-режиму** — залиште у `.env` плейсхолдер-значення з `.env.example`. Пісочниця і дашборд з моковими даними будуть повністю робочі.

---

## Питання?

Відкрийте [Discussion](https://github.com/vizarce/videvx/discussions) або [Issue](https://github.com/vizarce/videvx/issues).
