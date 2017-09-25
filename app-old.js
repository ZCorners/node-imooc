// 伪造数据的逻辑实现
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000 //设置环境端口（默认3000），windows环境下可以在git bash中执行： PORT=4000 node app.js
var app = express()

app.set('views', './views/pages') //视图根目录
app.set('view engine', 'jade') //模板引擎
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'bower_components'))) //静态资源获取
app.listen(port)

console.log('imooc started on port:' + port)

/*// 路由页面
// index.jade
app.get('/', function (req, res) {
    res.render('index', {
        title: 'imooc 首页'
    })
})
// detail.jade
app.get('/movie/:id', function (req, res) {
    res.render('detail', {
        title: 'imooc 详情页'
    })
})
// admin.jade
app.get('/admin/movie', function (req, res) {
    res.render('admin', {
        title: 'imooc 后台录入页'
    })
})
// list.jade
app.get('/admin/list', function (req, res) {
    res.render('list', {
        title: 'imooc 列表页'
    })
})*/

// 首页 分割线
app.get('/', function (req, res) {
    res.render('index', {
        title: '电影网站首页',
        movies: [
            {
                title: '异形：契约',
                _id: 1,
                poster: 'https://img3.doubanio.com/view/photo/photo/public/p2459944375.webp'
            },
            {
                title: '异形：契约',
                _id: 2,
                poster: 'https://img3.doubanio.com/view/photo/photo/public/p2459944375.webp'
            },
            {
                title: '异形：契约',
                _id: 3,
                poster: 'https://img3.doubanio.com/view/photo/photo/public/p2459944375.webp'
            },
            {
                title: '异形：契约',
                _id: 4,
                poster: 'https://img3.doubanio.com/view/photo/photo/public/p2459944375.webp'
            },
            {
                title: '异形：契约',
                _id: 5,
                poster: 'https://img3.doubanio.com/view/photo/photo/public/p2459944375.webp'
            }],
    });
});

// 详情页
app.get('/movie/:id', function (req, res) {
    res.render('detail', {
        title: '电影详情',
        movie: {
            director: '雷德利·斯科特',
            country: '美国',
            title: '异形：契约',
            year: 2017,
            poster: 'https://img3.doubanio.com/view/photo/photo/public/p2459944375.webp',
            language: '英语',
            flash: 'http://vali.cp31.ott.cibntv.net/6772ABFA5DB3B71724A1B3D8B/03000A010059C286B0B939000000013E96D93D-FA73-D1D1-71A5-7591F99140BD.mp4?ccode=0502&duration=14&expire=18000&psid=47285a4a36d83a78b5daf54e298b3559&ups_client_netip=124.251.33.19&ups_ts=1506245658&ups_userid=&utid=Z%2FvEEQJuIyACAXz7IRP7YLEn&vid=XMTg4NTM4NjA2NA%3D%3D&vkey=A38da2ddf13a9bb5668080436eb784e13',
            summary: '“科幻之父”雷德利-斯科特将为他所开创的《异形》系列带来新篇章。《异形：契约》的故事发生在《普罗米修斯》10年后，一群新的宇航员乘坐着“契约号”飞船前往遥远的星系寻找殖民地，他们来到一处看似天堂般的星球，实则是黑暗、危险的地狱，在那里他们见到了“普罗米修斯”号唯一的幸存者——由迈克尔·法斯宾德饰演的生化人大卫，一场毁灭性的巨大灾难即将到来。'
        }
    });
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

// 列表页
app.get('/admin/list', function (req, res) {
    res.render('list', {
        title: '电影列表',
        movies: [{
            title: '异形：契约',
            _id: 1,
            director: '雷德利·斯科特',
            country: '美国',
            year: 2017,
            poster: 'https://img3.doubanio.com/img/celebrity/small/32214.jpg',
            language: '英语',
            flash: 'http://119.188.38.131/youku/65743530DBB4C838FBA166544F/0300080100585FB87B799839BBD120136343F3-AD4F-8451-FC2A-A9554D727689.mp4?sid=049846040186412f9e92c&ctype=12&ccode=0401&duration=133&expire=18000&psid=599c21659cf2ed62339a7ba955d34987&ups_client_netip=114.240.103.157&ups_ts=1498460401&ups_userid=&utid=LT%2FBEcSPnjsCAXt3LLqrfLyH&vid=XMTg4NTUxNjQ5Ng%3D%3D&vkey=A57113a190f13ec64fa327c44ec8d116e&nk=411351972806_24974340174&ns=0_22165960&special=true',
            summary: '“科幻之父”雷德利-斯科特将为他所开创的《异形》系列带来新篇章。《异形：契约》的故事发生在《普罗米修斯》10年后，一群新的宇航员乘坐着“契约号”飞船前往遥远的星系寻找殖民地，他们来到一处看似天堂般的星球，实则是黑暗、危险的地狱，在那里他们见到了“普罗米修斯”号唯一的幸存者——由迈克尔·法斯宾德饰演的生化人大卫，一场毁灭性的巨大灾难即将到来。'
        }]
    });
});




