var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var CommentScheme = new Schema({
    movie: {type: ObjectId, ref: 'Movie'},
    from: {type: ObjectId, ref: 'User'},
    reply: [{
        from: {type: ObjectId, ref: 'User'},
        to: {type: ObjectId, ref: 'User'},
        content: String
    }],
    content: String,
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

CommentScheme.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
})

CommentScheme.statics = {
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

module.exports = CommentScheme