import { useEffect, useState } from "react";
import dbController from "../Controller/dbController";
import AddSong from "./AddSong";
import './Song.css';
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  makeStyles,
} from "@material-ui/core";
import Button from '@mui/material/Button';



const useStyles = makeStyles({
  table: {
    width: "800px",
    margin: "50px 0 0 50px",
  },
  thead: {
    "& > *": {
      fontSize: 20,
      background: "#008B8B",
      color: "#FFFFFF",
    },
  },
  row: {
    "& > *": {
      fontSize: 18,
    },
  },
});

function Songs(props) {
  const classes = useStyles();

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    dbController.getSongs();
    dbController.emitter.addListener("GET_SONGS_SUCCESS", () => {
        console.log(dbController.data);
      setSongs(dbController.data);
      
    });
  }, []);

  const addSong = async (song) => {
    console.log(song);
    await dbController.addSong(song);
    dbController.emitter.addListener("GET_SONGS_SUCCESS", () => {
      setSongs(dbController.data);
    });
    dbController.getSongs();
  };

  const deteleSong = async (id) => {
    await dbController.deleteSong(id);
    dbController.getSongs();
    dbController.emitter.addListener("GET_SONGS_SUCCESS", () => {
      setSongs(dbController.data);
    });
  };



  return (
    <>
    <div className="container">
    
     <div className="listContainer">
        <Table className={classes.table}>
            <TableHead>
            <TableRow className={classes.thead}>
                <TableCell>Id</TableCell>
                <TableCell>Playlist Id</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>URL</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {songs.map((song) => (
                <TableRow className={classes.row} key={song.SongID}>
                <TableCell>{song.SongID}</TableCell>
                <TableCell>{song.PlaylistID}</TableCell>
                <TableCell>{song.Title}</TableCell>
                <TableCell>{song.URL}</TableCell>
                <TableCell>{song.Genre}</TableCell>
                <TableCell>
                    <Button
                    color="secondary"
                    style={{ marginRight: 10 }}
                    >
                    Edit
                    </Button>
                    <Button
                    color="error"
                    variant="outlined"
                    onClick={() => deteleSong(song.SongID)}
                    >
                    Delete
                    </Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
     </div>
     <div className="addContainer">
        <AddSong onAdd={addSong} />
     </div>
     
    </div>
     
    </>
  );
}

export default Songs;
