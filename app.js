// 连接mongo的逻辑实现
var express = require('express')
var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var session = require('express-session')
var multipart = require('connect-multiparty')()
var logger = require('morgan'); // express.logger 中间件已经独立
var mongoose = require('mongoose')
var mongoStore = require('connect-mongo')(session) // 这里传入session，不然不可用

var port = process.env.PORT || 3000 //设置环境端口（默认3000），windows环境下可以在git bash中执行： PORT=4000 node app.js
var app = express()
var dbUrl = 'mongodb://localhost/imooc'

// models loading
var models_path = __dirname + '/app/models'
var walk = function(path) {
    fs
        .readdirSync(path)
        .forEach(function(file) {
            var newPath = path + '/' + file
            var stat = fs.statSync(newPath)

            if (stat.isFile()) {
                if (/(.*)\.(js|coffee)/.test(file)) {
                    require(newPath)
                }
            }
            else if (stat.isDirectory()) {
                walk(newPath)
            }
        })
}
walk(models_path)

mongoose.Promise = global.Promise // 解决Promise过期问题
mongoose.connect(dbUrl, {useMongoClient: true}) // useMongoClient参数解决由于版本导致的open警告

app.set('views', './app/views/pages') //视图根目录
app.set('view engine', 'jade') //模板引擎
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(multipart)
app.use(session({
    secret: 'imooc',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}))

if('development' === app.get('env')){
    app.set('showStaticError', true)
    // app.use(logger(':method :url :status'))
    app.locals.pretty = true
    mongoose.set('debug', true)
}

require('./config/routes')(app)

app.use(express.static(path.join(__dirname, 'public'))) //静态资源获取
app.locals.moment = require('moment')
app.listen(port)


console.log('imooc started on port:' + port)






