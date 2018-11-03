'use strict';
const Validator = require('validatorjs');
const authorization = require('../model/database-model').authorizUserInfo;
const profile = require('../model/database-model').userProfile;
const userContact = require('../model/database-model').userContact;
const contactType = require('../model/database-model').contactType;
const imageUser = require('../model/database-model').userImage;
const bcrypt = require('bcrypt');

const FormData = require ( 'form-data' ) ;
const  fs  = require ( 'fs' ) ;

const Response = require('../model/ResponseModel');
//const fs = require('fs-extra');

module.exports.Registry = async (req, res)=> {

    let response = new Response();// создаем объект ответа сервера
/*
    Validator.register('name',(value, requirement, attribute)=>{
        return value.match(/^[a-z а-я]{2,25}$/i);
    },false);


    let validName = Validator.name( req.body.name);*/

    console.log('запрос',req.body);
   try {
        let loginVerification = await authorization.findOne({
            where:{
                userLogin:req.body.login
            }
        });

        let emailVerification = await userContact.findOne({
            where:{
                contactValue:req.body.email
            }
        });
        console.log();

        if(loginVerification==null){
            if(emailVerification==null){
                if(
                    req.body.login&&
                    req.body.password&&
                    req.body.name&&
                    req.body.lastName&&
                    req.body.email&&
                    req.body.birthday&&
                    req.body.phone
                ){

                    let number = Math.floor(Math.random() * (9 - 5+1) ) + 5 //генерируем случайное число символов от 5 до 9
                    let saltStr = bcrypt.genSaltSync(number);// создаем соль
                    let hexPassword = bcrypt.hashSync(req.body.password, saltStr); // получаем закодированный пароль

                    let newAuth = await authorization.create({
                        'userLogin':req.body.login,
                        'userPassword': hexPassword,
                        'salt':saltStr
                    });

                    let newProfile = await profile.create({

                        'userId': newAuth.userId,
                        'userName': req.body.name,
                        'userLastname': req.body.lastName,
                        'userBirthday':req.body.birthday

                    });

                    let Type = await contactType.findAll();

                       for(let i =0;i<Type.length;i++){

                            if(req.body[Type[i].typeTitle] != undefined ){
                                let uContact = await userContact.create({

                                    'profileId':newProfile.profileId,
                                    'typeId': Type[i].typeId,
                                    'contactValue': req.body[Type[i].typeTitle]
                                })
                            }//if
                       }//for пере
                    // бираем значения имеющихся типов контактов в БД, проверяем наличие такого типа в в запросе и добавляем в БД если значение верно

                    response.code = 200;
                    response.message = 'регистрация успешна';
                }//if
                else{
                    response.code = 401;
                    response.message = 'переданны некоректные данные';
                }//else

            }//if loginVerification
            else{
                response.code = 402;
                response.message = 'пользователь с таким email уже сушествует';
            }//else loginVerification //  проверяем login  на наличие в БД если есть отправляем ответ "пользователь с таким логином уже есть"

        }//if emailVerification
       else {
            response.code = 402;
            response.message = 'пользователь с таким логином  уже сушествует';
        }//else emailVerification //проверяем email  на наличие в БД если есть отправляем ответ "пользователь с таким email уже есть"


   }catch (ex){

       response.code = 500;
       response.message = 'ощибка сервера';
       response.data = null;
   }
    res.send(response);

};

module.exports.AddImageUser = async (req, res)=>{



    if(req.files.length!==0){

    }


}