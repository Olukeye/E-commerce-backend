const User = require('../model/user')



exports.userById = (req , res, next, id) => {
    User.findById(id).exec((err, user ) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'User not found!'
            });
        }
        req.profile = user;
        next();
    })
}  

exports.read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}


exports.update = (req, res) => {
    User.findOneAndUpdate(
        {_id: req.profile._id },
        { $set: req.body },
        { new: true }, (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "Sorry, you are not the user of this account"
                })
            }
            user.hashed_password = undefined
            user.salt = undefined
            res.json(user)
        }
    );
};

exports.purchaseHistory = (req, res) => {
    Order.find({user: req.profile._id})
    .populate('user', '_id: name')
    .sort('-created')
    exec((err, orders) => {
        if(err) {
            return res.status(400).json({
                error: "sorry no history"
            });
        }
        res.json(orders);
    })
};