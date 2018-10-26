'use strict';

const authorization = require('../model/database-model').authorizUserInfo;
const registry = require('../model/database-model').userProfile;
const userContact = require('../model/database-model').userContact;
const contactType = require('../model/database-model').contactType;


const Respone = require('../model/ResponseModel');
const fs = require('fs-extra');

module.exports.Registry = async (req, res)=> {

   let respone = new Respone();

   let login = req.body.login;
   let name = req.body.name;
   let lastName = req.body.lastName;
   let email = req.body.email;
   let birthday= req.body.birthday;
   let phone = req.body.phone;

      console.log(req.body);

   respone.code = 200;
   respone.message = 'регистрация успешна';
   res.send(respone);

};