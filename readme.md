# Динамический веб сайт для студента и преподавателя
##Использование
https://cs204.herokuapp.com/pset/{id_pset}/{type}
https://cs204.herokuapp.com/pset/2/v -пример для 2 задания форма отчёта скринкаст
https://cs204.herokuapp.com/pset/2/c -пример для 2 задания форма отчёта код на github 


## Структура папок MVC
1. bin/www - выполняемый файл, запуск сайта.
2. app.js - настраивает приложение, загружает модули, экспортирует app
3. routes - module.exports = route  
	1. routes/index.js задание стартовая страничка 
	2. routes/teacher.js
4. public/images - картинки
5. views/ - шаблоны страниц
	views/partial/head.ejs Общая часть для шаблонов
	index/
	teacher/ - шаблны страниц преподавателя

## Устанавливаемые модули
1. express
2. nodemon
6. ejs








