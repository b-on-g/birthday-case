# Birthday Case

Решение кейс-задачи № 2 на [$mol](https://mol.hyoo.ru/).

Приложение последовательно запрашивает день, месяц и год рождения, определяет день недели, високосность года и возраст, а затем выводит дату рождения цифрами из `*` как на электронном табло. ASCII-представление также выводится в консоль браузера.

## Локальный запуск

```bash
git clone https://github.com/hyoo-ru/mam.git
cd mam
npm install
npx mam bog/birthdaycase/app
```

Открыть: `http://localhost:9080/bog/birthdaycase/app/`

## Деплой

GitHub Actions собирает `bog/birthdaycase/app` через `hyoo-ru/mam_build` и публикует результат в GitHub Pages.
