import react, { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input} from '@material-ui/core';
import dbController from '../Controller/dbController';
import Button from '@mui/material/Button';

const AddPlaylist = (props) => {
    

    const { onAdd } = props;

    const [Description, setDescription] = useState("");
    const [PublishDate, setPublishDate] = useState("");


      const addPlaylist = (evt) => {       //event handler: when the event is sent the three fields are also sent 
        console.warn('called')
        onAdd({
          Description,
          PublishDate
        })
        
      }
    return (
        <FormGroup className='formContainer'>
            <div className='text-center'>
                <h1>Add New Playlist</h1>
            </div>
            <FormControl>
                <InputLabel htmlFor="my-input">Description</InputLabel>
                <Input onChange={(evt) => setDescription(evt.target.value)} name='Description' id="my-input" />
            </FormControl>
            <FormControl>
                {/* <label for="start">Publish Date:</label>

                <input type="date" onChange={(evt) => setPublishDate(evt.target.value)} name='PublishDate' id="my-input"
                    value="2022-01-31"
                    min="2017-01-01" max="2022-12-31"></input> */}
                <InputLabel htmlFor="my-input">Publish Date</InputLabel>
                <Input onChange={(evt) => setPublishDate(evt.target.value)} name='PublishDate' id="my-input" />
            </FormControl>
            <FormControl className='button'>
                <Button variant="contained" color="success" value="add" onClick={addPlaylist}>Submit</Button>
            </FormControl>
        </FormGroup>
    )
}

export default AddPlaylist;