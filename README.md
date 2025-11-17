# Вычислитель отличий (gendiff)

### Статус проверок
[![Actions Status](https://github.com/UnidentifiedRaccoon/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/UnidentifiedRaccoon/frontend-project-46/actions)
[<img src="https://sonarcloud.io/images/project_badges/sonarcloud-light.svg" alt="SonarCloud" height="20">](https://sonarcloud.io/summary/new_code?id=UnidentifiedRaccoon_frontend-project-46)

## Описание
`gendiff` — это консольная утилита, которая сравнивает два конфигурационных файла и отображает разницу между ними в удобном для чтения формате. Приложение распространяется как npm‑пакет `@hexlet/code`, поэтому его можно установить локально или использовать как библиотеку в своём проекте.

## Установка

```bash
npm install
npm link
```

## Использование
Пока в проекте реализована справка, с которой можно ознакомиться через CLI:

```bash
$ gendiff -h
Usage: gendiff [options]

Compares two configuration files and shows a difference.

Options:
  -V, --version  output the version number
  -h, --help     display help for command
```

По мере реализации движка сравнения появятся примеры вызова с реальными файлами.

## Скрипты Makefile

```bash
make install   # npm ci
make lint      # npx eslint .
make publish   # npm publish --dry-run
make gendiff   # node bin/gendiff.js
```
