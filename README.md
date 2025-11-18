# Вычислитель отличий (gendiff)

### Статус проверок
[![Actions Status](https://github.com/UnidentifiedRaccoon/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/UnidentifiedRaccoon/frontend-project-46/actions)
[![CI](https://github.com/UnidentifiedRaccoon/frontend-project-46/actions/workflows/ci.yml/badge.svg)](https://github.com/UnidentifiedRaccoon/frontend-project-46/actions/workflows/ci.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=UnidentifiedRaccoon_frontend-project-46&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=UnidentifiedRaccoon_frontend-project-46)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=UnidentifiedRaccoon_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=UnidentifiedRaccoon_frontend-project-46)

## Описание
`gendiff` — это консольная утилита, которая сравнивает два конфигурационных файла и отображает разницу между ними в удобном для чтения формате. Приложение распространяется как npm‑пакет `@hexlet/code`, поэтому его можно установить локально или использовать как библиотеку в своём проекте.

## Установка

```bash
npm install
npm link
```

## Использование

### Справка
```bash
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format
  -h, --help           display help for command
```

### Сравнение плоских JSON файлов
```bash
$ gendiff file1.json file2.json
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

### Сравнение плоских YAML файлов
```bash
$ gendiff file1.yml file2.yml
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

Поддерживаются оба расширения: `.yml` и `.yaml`

### Демонстрация работы
[![asciicast](https://asciinema.org/a/cYjhTZ1O7cqOsd8iSJUCVSEZl.svg)](https://asciinema.org/a/cYjhTZ1O7cqOsd8iSJUCVSEZl)

## Скрипты Makefile

```bash
make install   # npm ci
make test      # npm test
make lint      # npx eslint .
make publish   # npm publish --dry-run
make gendiff   # node bin/gendiff.js
```
