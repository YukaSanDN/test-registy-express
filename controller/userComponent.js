'use strict';

const authorization = require('../model/database-model').authorizUserInfo;
const profile = require('../model/database-model').userProfile;
const userContact = require('../model/database-model').userContact;
const contactType = require('../model/database-model').contactType;
const imageUser = require('../model/database-model').userImage;
const uToken = require('../model/database-model').userTokenInfo;
const Response = require('../model/ResponseModel');
const formData = require('../model/dataFormResponse');
module.exports.GetUser=async (req,res)=>{

    let response = new Response()
    console.log(req.body.token);

    try{
        if(
            req.body.token
        ){

            let checkToken = await uToken.findOne({
                where:{
                    userToken:req.body.token
                }
            });
            if(checkToken){

                let data = new formData();

                let userLogin = await authorization.findOne({
                    where:{
                        userId:checkToken.userId
                    }
                });

                data.setDataComponent('userLogin',userLogin.userLogin);// добавляем в data логин пользователя

                let userProfile = await profile.findOne({
                    where:{
                        userId:checkToken.userId
                    }
                });

                data.setDataComponent('userName',userProfile.userName);// добавляем в data имя пользователя
                data.setDataComponent('userLastname',userProfile.userLastname);// добавляем в data фамилию пользователя
                data.setDataComponent('userBirthday',userProfile.userBirthday);// добавляем в data день рождения пользователя

                let uContact = await userContact.findAll({
                    where:{
                        profileId:userProfile.profileId
                    }
                });

                for(let i =0;i<uContact.length;i++){

                    let typeContact = await contactType.findOne({
                        where:{
                            typeId:uContact[i].dataValues.typeId
                        }
                    });

                    data.setDataComponent(typeContact.dataValues.typeTitle,uContact[i].dataValues.contactValue);// добавляем в data контакты пользователя
                }//for

                 response.code=200;
                response.message = 'OK';
                response.data = data.dataComponent;
            }
            else{
                response.code = 401;
                response.message = 'переданны некоректные данные';
            }//else

        }//if
        else {
            response.code = 401;
            response.message = 'переданны некоректные данные';
        }//else
    }
    catch (ex){
        response.code = 500;
        response.message = 'ощибка сервера';
        response.data = null;
    }

    res.send(response);
}