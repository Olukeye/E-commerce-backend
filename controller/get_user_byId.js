const User = require('../model/user')

exports.userById = (req , res, next, id) => {
    User.findById(id).exec((err, user ) => {
        if(err || !user._id) {
            return res.status(400).json({
                error: 'User not found!'
            });
        }
        req.profile = user._id;
        next();
    })
}  

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}


// exports.update = (req, res) => {
//     User.findOneAndUpdate(
//         {_id: req.profile._id },
//         { $set: req.body },
//         { new: true }, (err, user) => {
//             if (err) {
//                 return res.status(400).json({
//                     error: "Sorry, you are not the user of this account"
//                 })
//             }
//             user.hashed_password = undefined
//             user.salt = undefined
//             res.json(user)
//         } 
//     );
// };

// exports.update = (req, res) => {
//     const {username, name, password, address, phone, birthday, vehicle_name, avatar } = req.body;
//     User.findOneAndUpdate({ _id: req.profile._id},{$set:req.body},{new: true},(err, user)=> {
//         if(req.body.password) {
//             user.hashed_password = undefined
//             user.salt = undefined
//         } else if (err) {
//             return res.status(400).json({
//             error: "Sorry, you are not the user of this account"
//          })
//         }
//         res.json(user)
//     })
// }

exports.update = (req, res) => {
    // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
    const { name, password } = req.body;

    User.findOne({ _id: req.profile._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        if (!name) {
            return res.status(400).json({
                error: 'Name is required'
            });
        } else {
            user.name = name;
        }

        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    error: 'Password should be min 6 characters long'
                });
            } else {
                user.password = password;
            }
        }

        user.save((err, updatedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'User update failed'
                });
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;
            res.json(updatedUser);
        });
    });
};

// exports.purchaseHistory = (req, res) => {
//     Order.find({user: req.profile._id})
//     .populate('user', '_id: name')
//     .sort('-created')
//     exec((err, orders) => {
//         if(err) {
//             return res.status(400).json({
//                 error: "sorry no history"
//             });
//         }
//         res.json(orders);
//     })
// };