var express = require('express');
var router = express.Router();
var controller = require("../controllers/contacts");

// Manage a single user's contacts
router
    .route("/:user_id")
    .get(controller.getContacts)//get all a user's contacts
    .post(controller.addContact)//add a contact

// router
//     .route("/:user_id/:contact_id")
//     .delete(controller.deleteContact);

module.exports = router;