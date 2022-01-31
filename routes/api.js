const PlaylistDB = require("../models/Playlist");
const SongDB = require("../models/Song");
var express = require("express");
var router = express.Router();

//GET operation for the first entity
router.get("/playlists", async (req,ress,next) =>{
    try {
        const playlists = await PlaylistDB.findAll({
            order: [ ['PlaylistID', 'ASC']]       // sort in asceding order by ID
        });
        ress.status(200).json(playlists);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error })
    }
});
//GET operation for the second entity
router.get("/songs", async(req,res,next)=>{
    try {
        const songs = await SongDB.findAll();
        res.status(200).json(songs);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error })
    }
})
router.get("/playlists/:id", async (req, res, next) => {
    try {
        const playlists = await PlaylistDB.findByPk(req.params.id);
        res.status(200).json(playlists);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error })
    }
});
router.get("/songs/:id", async (req, res, next) => {
    try {
        const songs = await SongDB.findByPk(req.params.id);
        res.status(200).json(songs);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error })
    }
});
//GET operation for the second entity as a child resource
router.get("/playlists/:id/songs", async (req, res, next) => {
    try {
        const songs = await SongDB.findAll({ where: { PlaylistID: `${req.params.id}` } })
        if (songs) {
            return res.status(200).json(songs);
        } else {
            return res.status(404).json({ message: "Not found" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error })
    }
})
//Filtering on two field for the first entity
router.get("/playlists/:description/:publishDate", async (req, res, next) => {
    try {
        const playlists = await PlaylistDB.findAll({
            where: {
                Description: req.params.description,
                PublishDate: req.params.publishDate
            }
        })
        if (playlists) {
            return res.status(200).json(playlists);
        }
    } catch (error) {
        console.log(error)
       
    }
})
//POST operation for the first entity
router.post("/playlists", async (req, res, next) => {
    try {
        await PlaylistDB.create(req.body);
        res.status(201).json({ message: "New Playlist has been created." });
    } catch (error) {
        console.log(error)
    }
});
//POST operation for the second entity
router.post("/songs", async (req, res, next) => {
    try {
        await SongDB.create(req.body);
        res.status(201).json({ message: "New Song has been added." });
    } catch (error) {
        console.log(error)
    }
});
//POST operation for the second entity as a child resource
router.post("/playlists/:id/songs", async (req, res, next) => {
    try {
        const playlist = await PlaylistDB.findByPk(req.params.id);
        if (playlist) {
            const song = await SongDB.create(req.body)
            if (song) {
                return res.status(201).json({ message: "Successfully inserted new song in the playlist" })
            }
        }
    } catch (error) {
        console.log(error)
    }
})
//PUT operation for the first entity
router.put("/playlists/:id", async (req, res, next) => {
    try {
        const { Description, PublishDate } = req.body;
        await PlaylistDB.update({
            Description: Description,
            PublishDate: PublishDate
        }, {
            where: {
                PlaylistID: `${req.params.id}`
            }
        })
        return res.status(200).json({ message: "Successfully updated playlist!" });
    } catch (error) {
        console.log(error)
    }
})
//PUT operation for the second entity as a child resource
router.put("/playlists/:id/songs/:songID", async (req, res, next) => {
    try {
        const { PlaylistID, Title, URL, Genre } = req.body;
        const playlist = await PlaylistDB.findByPk(req.params.id);
        if (playlist) {
            const song = await SongDB.findByPk(req.params.songID, { where: { PlaylistID: `${playlist.PlaylistID}` } })
            if (song) {
                await SongDB.update({
                    PlaylistID: PlaylistID,
                    Title: Title,
                    URL: Url,
                    Genre: Genre
                }, {
                    where: {
                        SongID: song.SongID
                    }
                })
            }
            return res.status(200).json({ message: "Successfully updated the song!" })
        }
    } catch (error) {
        console.log(error);
    }
})
//DELETE operation for the first entity
router.delete("/playlists/:id", async (req, res, next) => {
    try {
        await SongDB.destroy({ where: {PlaylistID: `${req.params.id}` }})
        await PlaylistDB.destroy({ where: { PlaylistID: `${req.params.id}` } })
        return res.status(200).json({ message: "Successfully deleted playlist!" });
    } catch (error) {
        console.log(error)
     
    }
})

//DELETE operation for the second entity
router.delete("/songs/:id", async (req, res, next) => {
    try {
        await SongDB.destroy({ where: {SongID: `${req.params.id}` }})
        return res.status(200).json({ message: "Successfully deleted song!" });
    } catch (error) {
        console.log(error)
    }
})

//DELETE operation for the second entity as a child resource
router.delete("/playlists/:id/songs/:songID", async (req, res, next) => {
    try {
        const playlist = await PlaylistDB.findByPk(req.params.id);
        if (playlist) {
            const song = await SongDB.findByPk(req.params.songID, { where: { PlaylistID: `${playlist.PlaylistID}` } })
            if (song) {
                await SongDB.destroy({ where: { SongID : song.SongID } })
            }
            return res.status(200).json({ message: "Successfully deleted the song from the playlisy" })
        }
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;