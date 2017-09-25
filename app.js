// 连接mongo的逻辑实现
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var _ = require('underscore')
var Movie = require('./models/movie')
var port = process.env.PORT || 3000 //设置环境端口（默认3000），windows环境下可以在git bash中执行： PORT=4000 node app.js
var app = express()

mongoose.Promise = global.Promise // 解决Promise过期问题
mongoose.connect('mongodb://localhost/imooc', {useMongoClient: true}) // useMongoClient参数解决由于版本导致的open警告

app.set('views', './views/pages') //视图根目录
app.set('view engine', 'jade') //模板引擎
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))) //静态资源获取
app.locals.moment = require('moment')
app.listen(port)

console.log('imooc started on port:' + port)

// 首页
app.get('/', function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }
        res.render('index', {
            title: '电影网站首页',
            movies: movies
        });
    })
});

// 详情页
app.get('/movie/:id', function (req, res) {
    var id = req.params.id
    Movie.findById(id, function (err, movie) {
        res.render('detail', {
            title: '电影详情:' + movie.title,
            movie: movie
        });
    })
});

// 后台录入页
app.get('/admin/movie', function (req, res) {
    res.render('admin', {
        title: '电影录入',
        movie: {
            title: '',
            director: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    });
});

// admin update movie
app.get('/admin/update/:id', function (req, res) {
    var id = req.params.id
    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: '电影录入',
                movie: movie
            })
        })
    }
})

// admin post movie
app.post('/admin/movie/new', function (req, res) {
    var id = req.body.movie._id
    var movieObj = req.body.movie
    var _movie
    if (id !== 'undefined') {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err)
            }
            _movie = _.extend(movie, movieObj)
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/movie/' + movie._id)
            })
        })
    } else {
        _movie = new Movie({
            director: movieObj.director,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        })
        _movie.save(function (err, movie) {
            if (err) {
                console.log(err)
            }
            res.redirect('/movie/' + movie._id)
        })
    }
})

//admin list remove
app.delete('/admin/list', function (req, res) {
    var id = req.query.id
    if (id) {
        Movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err)
            }
            else {
                res.json({success: 1})
            }
        })
    }
})

// 列表页
app.get('/admin/list', function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }
        res.render('list', {
            title: '电影网站首页',
            movies: movies
        });
    })
});






