const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize")

const Song = sequelize.define("Songs", {
    SongID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },

    PlaylistID: {
        type: DataTypes.INTEGER,
        references: { model: "Playlists", key: 'PlaylistID'},
        allowNull: true
    },

    Title: {
        type: DataTypes.STRING,
        validate: {
            len:[5,255]
        },
        allowNull: false
    },
    URL: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true, 
        },
        allowNull: false
    },

    Genre: {
        type: DataTypes.ENUM("POP", "ALTERNATIVE", "ROCK", "JAZZ")
    }, 
})

module.exports = Song;