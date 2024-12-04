const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const logoPath = path.join(__dirname, 'public/images/logo.png');
fs.access(logoPath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error('Логотип не знайдено:', logoPath);
  } else {
    console.log('Логотип знайдено:', logoPath);
  }
});

// Підключення до статичних файлів (стилі, зображення)
app.use(express.static(path.join(__dirname, 'public'))); // Один виклик достатній

// Налаштування EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Головна сторінка
app.get('/', (req, res) => {
  res.render('index');
});

// Галерея
app.get('/gallery', (req, res) => {
  // Зчитуємо список файлів з директорії 'uploads'
  fs.readdir(path.join(__dirname, 'public/uploads'), (err, files) => {
    if (err) {
      return res.status(500).send('Не вдалося зчитати файли');
    }

    // Фільтруємо тільки зображення
    const images = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
    res.render('gallery', { images });
  });
});

// Сторінка "Про нас"
app.get('/about', (req, res) => {
  res.render('about');
});

// Сторінка "Послуги"
app.get('/services', (req, res) => {
  res.render('services');
});

// Сторінка "Контакти"
app.get('/contact', (req, res) => {
  res.render('contact');
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер працює на http://localhost:3000');
});
