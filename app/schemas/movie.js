var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var MovieScheme = new Schema({
    director: String,
    title: String,
    language: String,
    country: String,
    summary: String,
    flash: String,
    poster: String,
    year: Number,
    pv: {type: Number, default: 0},
    category: {type: ObjectId, ref: 'Category'},
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

MovieScheme.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
})

MovieScheme.statics = {
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

module.exports = MovieScheme