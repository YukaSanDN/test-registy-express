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

                if(authInfo!==null){

                    let salt = authInfo.salt

                    let hexPassword = bcrypt.hashSync(req.body.password, salt); // получаем закодированный пароль

                    if(hexPassword === authInfo.userPassword){


                        let token = bcrypt.hashSync(salt+new Date(), salt);


                        let isToken = await userToken.findOne({
                            where:{
                                'userId':authInfo.userId,
                            }
                        });

                        if(isToken===null){
                            let createToken = await userToken.create({
                                'userId':authInfo.userId,
                                'userToken':token
                            });
                            response.data = createToken.userToken
                            console.log('tokenInfo',createToken);
                        }//if
                        else {
                            let updateToken = await isToken.update({
                                'userToken':token
                            });

                            response.data = updateToken.userToken
                            console.log('tokenInfo',updateToken);
                        }

                        console.log('еуе');
                        response.code = 200;
                        response.message = 'ок';

                        console.log('res',response);
                }//if
                else{
                        response.code = 401;
                        response.message = 'переданны некоректные данные';
                }//else

            }//if
            else{
                response.code = 401;
                response.message = 'переданны некоректные данные ';
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