const Category = require('../model/category')

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err || !category) {
            return res.status(400).json({
                error: "Request does not exist....."
            })
        }
        req.category = category
        next()
    })
}

exports.create = (req, res) => {
    const category = new Category(req.body)
    category.save((err, data) =>{
        if(err) {
            return res.status(400).json({
                err: "Sorry we cant find your product!"
            })
        }
        res.json({data})
    })
}

exports.read = (req, res) => {
    return res.json(req.category)
}

exports.update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: "Unauthorized"
            })
        }
        res.json(data)
    })
}

exports.remove = (req, res) => {
    const category = req.category;
    category.remove((err, data) => {
        if(err) {
            return res.status(400).json({
                error: "Unauthorized"
            })
        }
        res.json({message: "Cat. deleted successfully"})
    })
}

exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: "oops!....Try again."
            })
        }
        res.json(data)
    })
}
