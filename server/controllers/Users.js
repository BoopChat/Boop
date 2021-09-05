const db = require("../models");
const User = db.User;

// Find a single User with an id
module.exports.getUser = async (req, res) => {
    let user_id = req.params.id;

    // Need to check that user_id matches the id of the requesting user


    let user = await User.findByPk(user_id);
    if (!user) return res.status(404).send("User not found");
    return res.send(user);
};

// Update a User by the id in the request
exports.updateUser = async (req, res) => {
    let user_id = req.params.id;

    // Need to check that user_id belongs to a valid user and matches the id of the requesting user
    

    await User.update({
        display_name: req.body.display_name,
        first_name: req.body.given_name,
        last_name: req.body.family_name,
        image_url: req.body.image_url,
        // last_active: db.Sequelize.fn('NOW') // update last_active to current time???
    }, {
        where: {
            id: user_id
        },
        returning: true,
        plain: true
    })
    .then(user => {
        return res.send(user[1]);
    })
    .catch(err => {
        return res.status(500).send(err);
    });
};

// // Delete a User with the specified id in the request
// exports.deleteUser = async (req, res) => {
//     let user_id = req.params.id;

//     // Need to check that user_id belongs to a valid user and matches the id of the requesting user


//     await User.destroy({
//         where: {
//             id: user_id
//         }
//     })
//     .then(num => {
//         if (num == 1) {
//             res.send({
//                 message: "User was deleted successfully!"
//             });
//         } else {
//             res.status(404).send({
//                 message: `Cannot delete User with id=${user_id}. Maybe User was not found!`
//             });
//         }
//     })
//     .catch(err => {
//         res.status(500).send({
//             message: "Could not delete User with id=" + user_id
//         });
//     });
// };