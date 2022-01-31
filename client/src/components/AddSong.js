import react, { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input} from '@material-ui/core';
import Button from '@mui/material/Button';
import './AddSong.css';


const AddSong = (props) => {
    

    const { onAdd } = props;
    const [PlaylistID, setPlaylistID] = useState("");
    const [Title, setTitle] = useState("");
    const [URL, setURL] = useState("");
    const [Genre,setGenre] = useState("");
    

    const genreOptions = [{          
        label: 'POP',
        value: 'POP'
      }, {
        label: 'ALTERNATIVE',
        value: 'ALTERNATIVE'
      },{
          label: 'ROCK',
          value: 'ROCK'
      },{
          label : "JAZZ",
          value: "JAZZ"
      }]

      const addSong = (evt) => {       //event handler: when the event is sent the three fields are also sent 
        console.warn('called')
        onAdd({
          PlaylistID,
          Title,
          URL,
          Genre
        })
        
      }
    return (
        <FormGroup className='formContainer'>
            <div className='text-center'>
                <h1>Add New Song</h1>
            </div>
            <FormControl>
                <InputLabel htmlFor="my-input">Playlist Id</InputLabel>
                <Input onChange={(evt) => setPlaylistID(evt.target.value)} name='PlaylistID' id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Title</InputLabel>
                <Input onChange={(evt) => setTitle(evt.target.value)} name='Title' id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">URL</InputLabel>
                <Input onChange={(evt) => setURL(evt.target.value)} name='URL' id="my-input" />
            </FormControl>
            <FormControl className='dropdown'>
                <select onChange={(evt) => {setGenre(evt.target.value)}} name='Genre' id="my-input">
                {
                    genreOptions.map((option) => (                
                    <option key={option.value} value={option.value}>{option.label}</option>
                    ))
                }
                </select>

            </FormControl>
            <FormControl >
                <Button variant="contained" color="success" value="add" onClick={addSong}>Submit</Button>
            </FormControl>
        </FormGroup>
    )
}

export default AddSong;