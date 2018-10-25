'use strick';

const Sequelize = require('sequelize');
const connection = require('../routes/connection');

const authorizUserInfo = connection.define('authorizUserInfo',{
    userId:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
    },
    userLogin:{
        unique: true,
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
    },
    userPassword:{
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
    }
    },
    {
        createdAt: 'created',
        updatedAt: 'updated'
    });

const userProfile = connection.define('userProfile',{

    profileId:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
    },
    userId:{
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    userLogin:{
        allowNull: false,
        unique: true,
        type: Sequelize.DataTypes.STRING,
    },
    userName:{
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
    },
    userLastname:{
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
    },
    userBirthday:{
        allowNull: false,
        type: Sequelize.DataTypes.DATE
    }

    },
    {
        createdAt: 'created',
        updatedAt: 'updated'
    });

const userImage = connection.define('userImage',{
    imageId:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
    },
    profileId:{
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    imagePath:{
        allowNull: false,
        type: Sequelize.DataTypes.STRING(1500),
        validate:{
            min: 2,
            max: 1500
        }
    }

    },
    {
        createdAt: 'created',
        updatedAt: 'updated'
    });

const contactType = connection.define('contactType',{
    typeId:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
    },
    typeTitle:{
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
    }
    },
    {
        createdAt: 'created',
        updatedAt: 'updated'
    });

const userContact = connection.define('userContact',{
    contactId:{
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
    },
    profileId:{
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    typeId:{
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    contactValue:{
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
    }
    },
    {
        createdAt: 'created',
        updatedAt: 'updated'
    });

authorizUserInfo.sync({force: true});
userProfile.sync({force: true});
userImage.sync({force: true});
contactType.sync({force: true});
userContact.sync({force: true});

userProfile.belongsToMany(contactType,{through: userContact, foreignKey: 'profileId'});
contactType.belongsToMany(userProfile,{through: userContact, foreignKey: 'typeId'});

userImage.belongsTo(userProfile , { foreignKey: 'profileId' });
userProfile.belongsTo(authorizUserInfo , { foreignKey: 'userId' });

module.exports.userContact = userContact;
module.exports.contactType = contactType;
module.exports.userImage = userImage;
module.exports.authorizUserInfo = authorizUserInfo;
module.exports.userProfile = userProfile;