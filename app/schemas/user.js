var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10

var UserScheme = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    password: String,
    // String: user, admin, super admin
    // 0: normal, 1: verified, 2: professional user
    // >10: admin
    role: {
        type: Number,
        default: 0
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
    // __v: mongoose默认还会生成该字段，在第一次生成该文档时mongoose会生成该versionKey
})

UserScheme.pre('save', function (next) {
    var user = this
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if(err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if(err) {
                return next(err)
            }
            user.password = hash
            next()
        })
    })
})

// 静态方法
UserScheme.statics = {
    fetch: function (cb) {
        return this.find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function (id, cb) {
        return this.findOne({_id: id})
            .exec(cb)
    }
}

// 实例方法
UserScheme.methods = {
    comparePassword: function (_password, cb) {
        bcrypt.compare(_password, this.password, function (err, isMatch) {
            if(err) return cb(err)
            cb(null, isMatch)
        })
    }
}



module.exports = UserScheme