'use strict';

const authorization = require('../model/database-model').authorizUserInfo;
const profile = require('../model/database-model').userProfile;
const userContact = require('../model/database-model').userContact;
const contactType = require('../model/database-model').contactType;
const imageUser = require('../model/database-model').userImage;
const userToken = require('../model/database-model').userTokenInfo;
const bcrypt = require('bcrypt');
const Response = require('../model/ResponseModel');
module.exports.Auth = async (req,res)=>{

    let response = new Response();

    try{
        if(
            req.body.login&&
            req.body.password
        ){
            let authInfo = await authorization.findOne({
                where:{
                    userLogin: req.body.login
                }
            });//authInfo

                if(authInfo!==undefined){

                    let salt = authInfo.salt

                    let hexPassword = bcrypt.hashSync(req.body.password, salt); // получаем закодированный пароль

                    if(hexPassword === authInfo.userPassword){

                        let token = bcrypt.hashSync(salt+new Date(), salt);

                        let uToken = await userToken.create({
                            'userId':authInfo.userId,
                            'userToken':token
                        });

                        console.log('tokenInfo',uToken);
                        response.code = 200;
                        response.message = 'ок';
                        response.data = uToken.userToken
                }//if
                else{
                        response.code = 401;
                        response.message = 'переданны некоректные данные';
                }//else

            }//if
            else{
                response.code = 401;
                response.message = 'переданны некоректные данные 1';
            }//else
        }//if
        else {
            response.code = 401;
            response.message = 'переданны некоректные данные';
        }
    }
    catch (ex){

        response.code = 500;
        response.message = 'ощибка сервера';
        response.data = null;
    }

    res.send(response);
}