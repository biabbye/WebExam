import { EventEmitter } from 'fbemitter';
import Axios from 'axios';

class dbController {
    constructor(){
        this.data = [];
        this.axios = Axios.create();
        this.emitter = new EventEmitter();
    }

    async getSongs() {
        this.axios.get("http://localhost:3001/api/songs").then((response) => {
            this.data = response.data;
            console.log(this.data)
            this.emitter.emit("GET_SONGS_SUCCESS");
        }).catch((error) => {
            console.warn(error)
            this.emitter.emit("GET_SONGS_FAILED");
        })
    }
    
    async getPlaylists() {
    
        this.axios.get("http://localhost:3001/api/playlists").then((response) => {
            this.data = response.data;
            console.log(this.data)
            this.emitter.emit("GET_PLAYLISTS_SUCCESS");
        }).catch((error) => {
            console.warn(error)
            this.emitter.emit("GET_PLAYLISTS_FAILED");
        })
    }
    
    async addSong(song) {
        console.log(song);
        const resp = await this.axios.post("http://localhost:3001/api/songs", song);
        console.log(resp);
        return resp;
    }

    async addPlaylist(playlist) {
        console.log(playlist);
        const resp = await this.axios.post("http://localhost:3001/api/playlists", playlist);
        console.log(resp);
        return resp;
    }

    async deleteSong(id){
        console.log(id);
        return await this.axios.delete("http://localhost:3001/api/songs/"+id);
    }
    async deletePlaylist(id){
        console.log(id);
        return await this.axios.delete("http://localhost:3001/api/playlists/"+id);
    }

    async editSong(id,song) {
        console.log(id);
        console.log(song);
        return await this.axios.put("http://localhost:3001/api/songs/"+id,song);
    }
}

const controller = new dbController();

export default controller;