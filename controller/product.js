const _ = require('lodash')
const fs  =   require('fs')
const Product  = require('../model/product')
const  formidable = require('formidable')
const { exec } = require('child_process')


exports.productById = (req, res, next, id) => {
    Product.findById(id)
    .populate('category')
    .exec((err, product) => {
        if(err || !product) {
            return res.status(400).json({
                error: "Product not found!"
            })
        }
        req.product = product;
        next() 
    })
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: "Image files could not be uploaded"
            })
        }
        // check for empty fields
         const { name, description, price, category , quantity, shipping } = fields

        if(!name || !description || !price || !category || !quantity || !shipping ) {
             return res.status(400).json({
                 error: 'All fields must be filled!'
             })
         }

        let product = new Product(fields)

        // upload photo
        if(files.photo) {
          if(files.photo.size > 1000000) {
              return res.status(400).json({
                  error: 'image should not be more than 1mb'
              })
          }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: "oops!! Could not save, confirm your details please."
                })
            }
            res.json(result)
        })
    })
} 

exports.read = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
}  


exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: "Image files could not be uploaded"
            })
        }
        // check for empty fields
         const { name, description, price, category , quantity, shipping } = fields

        if(!name || !description || !price || !category || !quantity || !shipping ) {
             return res.status(400).json({
                 error: 'All fields must be filled!'
             })
         }

        let product = req.product
        product = _.extend(product, fields)

        if(files.photo) {

          if(files.photo.size > 1000000) {
              return res.status(400).json({
                  error: 'image should not be more than 1mb'
              })
          }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: "oops!! Could not save, confirm your details please."
                })
            }
            res.json(result)
        })
    })
} 

exports.remove = (req, res) => {
    let product = req.product 
    product.remove((err) => {
        if(err) {
            return res.status(400).json({
                error: 'oops! sorry you cant delete...'
            })
        }
        res.json({
            message: "deleted product successfully"
        })
    })
}
// get product by sold/arrival
// by sold = products?sortBy=sort&order=desc&limit=4
// by arrival = products?sortBy=createdAt&order=desc&limit=4
// if no params are sent, then all products are returned

exports.list   = (req, res) => {
    let order  = req.query.order  ? req.query.order  :'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit  = req.query.limit  ? parseInt(req.query.limit ) : 4

    Product.find()
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if(err) {
                return res.status(400).json({
                    error: "Products not found"
                })
        }
        res.json(products)
    })
}

// display products based on req product category 
// * other products that has the same category, will be returned
exports.listRelated = (req, res) => {
     let limit = req.query.limit ? parseInt(req.query.limit) : 6
     Product.find({_id: {$ne: req.product}, category: req.product.category})
     .limit(limit)
     .populate('category', '_id name')
     .exec((err, products) => {
         if(err) {
             return res.status(400).json({
                 error: "Product cant be found"
             })
         }
         res.json(products)
     })
}

exports.listCategories = (req, res) => {
    Product.distinct('category', {}, (err, categories) => {
        if(err) {
            return res.status(400).json({
                error: "Categories not found"
            })
        }
        res.json(categories)
    })
}

/**
 * list products by search
 * we will implement product saerch in react front-end
 * we will display categories in checkbox and price range in radio button
 * once a customer click on those checkbox and radion button
 * we will make api request and display products to th e customer based on his choice
 */
 
 exports.listBySearch = (req, res) => {
        let order  = req.body.order  ? req.body.order  :'asc'
        let sortBy = req.body.sortBy ? req.body.sortBy : '_id'
        let limit  = req.body.limit  ? parseInt(req.body.limit ) :30
        let skip = parseInt(req.body.skip)
        let findArgs = {}

        // console log(order, sortBy, limit, skip, req.body.filter)
        // console.log('findArgs', findArgs)

        for (let key in req.body.filters) {
            if(req.body.filters[key].length > 0 ) {
                if (key === 'price') {
                    // get - greater than price [0-10]
                    // let - less than
                    findArgs[key] = {
                        $gte : req.body.filters[key][key],
                        $lte : req.body.filters[key][1]
                    }
                } else {
                    findArgs[key] = req.body.filters[key]
                }
            }
        }
    
        Product.find(findArgs)
            .select('-photo')
            .populate('category')
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, data) => {
                if (err) {
                  return res.status(400).json({
                   error: "Products not found"
                })
            }
            res.json({
                size: data.length,
                data
            })
        })
    }
    
    exports.photo = (req, res, next) => {
        if (req.product.photo.data) {
            res.set('Content-Type', req.product.photo.contentType)
            return res.send(req.product.photo.data)
        }
        next()
    }

    exports.listSearch = (req, res) => {
        //create query object to hold search value and category value
        const query = {}
        //asign search value to query.name
        if (req.query.search) {
            query.name = {$regex: req.query.search, $options: 'i'}
            //asign cateory value to query.category
            if(req.query.category && req.query.category != 'All') {
                query.category = req.query.category
            }
            //find the product based on query object with 2 properties
            //search and category
            Product.find(query, (err, products) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json(products);
            }).select('-photo')
        }
    };

  