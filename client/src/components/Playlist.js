import { useEffect, useState } from "react";
import dbController from "../Controller/dbController";
import AddPlaylist from "./AddPlaylist";
import './Playlist.css';

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
    width: "90%",
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

function Playlist(props) {
  const classes = useStyles();

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    dbController.getPlaylists();
    dbController.emitter.addListener("GET_PLAYLISTS_SUCCESS", () => {
        console.log(dbController.data);
      setPlaylists(dbController.data);
      
    });
  }, []);

  const addPlaylist = async (playlist) => {
    console.log(playlist);
    await dbController.addPlaylist(playlist);
    dbController.emitter.addListener("GET_PLAYLISTS_SUCCESS", () => {
      setPlaylists(dbController.data);
    });
    dbController.getPlaylists();
  };

  const deletePlaylist = async (id) => {
    await dbController.deletePlaylist(id);
    dbController.getPlaylists();
    dbController.emitter.addListener("GET_PLAYLISTS_SUCCESS", () => {
      setPlaylists(dbController.data);
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
                <TableCell>Description</TableCell>
                <TableCell>Publish Date</TableCell>
                <TableCell></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {playlists.map((playlist) => (
                <TableRow className={classes.row} key={playlist.PlaylistID}>
                <TableCell>{playlist.Description}</TableCell>
                <TableCell>{playlist.PublishDate}</TableCell>
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
                    onClick={() => deletePlaylist(playlist.PlaylistID)}
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
        <AddPlaylist onAdd={addPlaylist} />
     </div>
     
    </div>
     
    </>
  );
}

export default Playlist;
