var express = require('express');
var router = express.Router();
var ctrl = require("../controllers/userCtrl");

var tokenCheck = function (req, res, next) {
    if(global.tokens.indexOf(req.body.token) == -1) {
        //invalid token
        res.status(403).send("Invalid Access");
    } else {
        //valid token
        next();
    }
}
 
router.post("/searchUser", tokenCheck, ctrl.searchUser);
router.post("/branches", ctrl.getBranches);
router.post("/customerDetails", tokenCheck, ctrl.customerDetails);
router.post("/saveCustomer", tokenCheck, ctrl.saveCustomer);
router.post("/createAccount", tokenCheck, ctrl.createAccount);
router.post("/updateAccount", tokenCheck, ctrl.updateAccount);
router.post("/createTransaction", tokenCheck, ctrl.createTransaction);
router.post("/updateCustomer", tokenCheck, ctrl.updateCustomer);
router.post("/login", ctrl.login);

module.exports = router;