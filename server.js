const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

// Настройка CORS
app.use(cors());

// Создание подключения к базе данных
const db = mysql.createConnection({
    host: 'MySQL-8.2',
    user: 'root',
    password: '',
    database: 'mysql'
});

// Проверка подключения
db.connect(err => {
    if (err) {
        console.error('Ошибка подключения к базе данных: ' + err.stack);
        return;
    }
    console.log('Подключено к базе данных как id ' + db.threadId);
});

// Обработка GET-запроса на главную страницу
app.get('/api/main', (req, res) => {
    db.query('SELECT * FROM Главная', (error, results) => {
        if (error) {
            console.error('Ошибка выполнения запроса: ', error);
            return res.status(500).send(error);
        }
        res.json(results);
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});