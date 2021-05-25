# Динамический веб сайт для студента и преподавателя

##Регистрация
Регистрируемся на github. 
Пользователь заходит http://cs204.herokuapp.com через github,
для него создаётся запись в базе данных  и создаётся репозиторий в организации cs204
https://gihtub.com/cs204/{username}.git
Пользователю отправляется письмо, надо принять приглашение (accept invetation), письмо может попасть в спам.
Туда пользователь будет отправлять свои задания.

##Отправка задания на проверку
cd ~ - переходим в домашний каталог
git clone https://github.com/cs204/{username}.git -b main pset{id_pset} - клонируем 
git clone https://github.com/cs204/vadimgb1.git -b main pset2 - пример пользователь vadimgb1 задание 2 
cd pset{id_pset} переходим в репозиторий
cd pset2 - пример перехода в каталог для выполнения 2 задания 
git checkout -b pset{id_pset}  
делаем задание
git add . все файлы добавляем 
git commit -m "какое то пояснение" создаём коммит
git push origin pset{id_pset} - отправляем на gihtub


##Страница для отправки результата на проверку
https://cs204.herokuapp.com/character/pset/{id_pset}/{type}
https://cs204.herokuapp.com/character/pset/2/v -пример для 2 задания форма отчёта скринкаст
https://cs204.herokuapp.com/character/pset/2/c -пример для 2 задания форма отчёта код на github 


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





## создание проверки
git clone https://github.com/cs204/psets/ -b 21
cd psets
mkdir example
cd example
//----------------
vim .cs50.yaml
check50:
	checks:
		search:
			- run: node test.js
			  shdout: |
				hello
				world
			  exit: 0
:wq
//------------------
В директории запускаем тест
check50 --dev ~/psets/example

cd ~/psets
git push origin 2021



