//Подключение модулей и их настройка
const express = require('express'),
	app = express(),
	path = require('path'),
	bodyParser = require("body-parser"), 
	cookieSession = require('cookie-session')

//Cookie



app.use(
	cookieSession({
		secret: process.env.COOKIE_SECRET 
	}))

//Статичные файл в папке public: images, 
app.use(express.static(path.join(__dirname, 'public')))

//Для пост запросов
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//настройка генерации из шаблонов
app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'))


//--------------------------
//

var indexRouter = require('./routes/index.js')
var teacherRouter = require('./routes/teacher.js')
var problemsetRouter = require('./routes/problemset.js')
var planRouter = require('./routes/plan.js')
var gradebookRouter = require('./routes/gradebook.js')
var resultsRouter = require('./routes/results.js')
var loginRouter = require('./routes/login.js')
var registerRouter = require('./routes/register.js')
var characterRouter = require('./routes/character.js')
var pendingRouter = require('./routes/pending.js')
var emailRouter = require('./routes/email.js')

app.use('/', indexRouter)
app.use('/teacher',  teacherRouter)
app.use('/problemset', problemsetRouter)
app.use('/plan', planRouter)
app.use('/gradebook', gradebookRouter)
app.use('/results', resultsRouter)
app.use('/login/github', loginRouter)
app.use('/register', registerRouter)
app.use('/character', characterRouter)
app.use('/pending', pendingRouter)
app.use('/email', emailRouter)
module.exports = app


