#Тестирование
sudo ufw disable
npm run strat
http://localhost:8000

# Динамический веб сайт для студента и преподавателя

##Регистрация
Регистрируемся на github. 
Пользователь заходит http://cs204.herokuapp.com через github,
для него создаётся запись в базе данных  и создаётся репозиторий в организации cs204
https://gihtub.com/cs204/{username}.git
https://gihtub.com/cs204/{check_username.git}
Пользователю отправляется письмо, надо принять приглашение (accept invetation), письмо может попасть в спам.
Туда пользователь будет отправлять свои задания.

##Отправка задания на проверку
Проверка задания без отправки на github
npx check204 2021/hello local 
Проверка и отправка на github.
npx check204 2021/hello 

## создание проверки
git clone https://github.com/cs204/psets/ -b 2021
cd psets
создаём файл hello.json. Содержимое файла ниже.
{
	"files":["hello.js"],
	"output":"Hello, World!\n",
	"run":"hello.js"
}
Отправляем обновлённые тесты
git push origin 2021





##Страница для отправки результата на проверку
https://cs204.herokuapp.com/character/pset/{id_pset}/{type}
https://cs204.herokuapp.com/character/pset/2021/website/v -пример для 2 задания форма адрес сайта. 
https://cs204.herokuapp.com/character/pset/2021/hello/c -пример для 2 задания форма отчёта код на github 


## Структура папок MVC
1. bin/www - выполняемый файл, запуск сайта.
2. app.js - настраивает приложение, загружает модули, экспортирует app
3. routes - module.exports = route  
	1. routes/index.js задание стартовая страничка 
	2. routes/teacher.js
4. public/images - картинки
5. public/javascript - коды
6. views/ - шаблоны страниц
	views/partial/head.ejs Общая часть для шаблонов
	index/
	teacher/ - шаблны страниц преподавателя

## Устанавливаемые модули смотри packege.json
1. express
2. nodemon
3. ejs
4. node-fetch
5. body-parser  

## авто запуск
sudo npm install -g pm2
pm2 start bin/www -i max
pm2 startup -копируем генерированный скрипт
pm2 save - сохраняем в $home/.pm2/dump.pm2
pm2 unstartup


## router
192.168.1.1
access->virtual server
 
## debian disable/enable graphics
sudo systemctl set-default multi-user
sudo systemctl set-default graphical






//
Тестирование изменений
npm start
90.188.117.161:8000
отправка на github
git add, git commit, git push origin develop
обновление на vgb2
ssh vadim@vgb2
cd students/cs204
git pull
