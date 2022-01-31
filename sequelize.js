const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('postgres://oekvzthvstxhwx:61ecc7219f530a449fb342834840248a4afdf870b76da0af99088654064e0b2a@ec2-54-76-249-45.eu-west-1.compute.amazonaws.com:5432/d9eo20m66k9rtp',
    {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        }
    })

sequelize.sync().then(function () {}).then(
    console.log("Synced.")
);
module.exports = sequelize;