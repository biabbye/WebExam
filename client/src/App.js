import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import dbController from './Controller/dbController';
import Playlist from './components/Playlist';
import Songs from './components/Song';
import HomePage from './components/HomePage';

function App() {

  const [ids, setIds] = useState([])

  useEffect(() => {
    dbController.getSongs();
    dbController.emitter.addListener('GET_SONGS_SUCCESS', () => {
      setIds(dbController.data)
    })
  }, [])

  return (
    <Router>
       <NavBar />
       <Routes>
       <Route exact path="/" element={<HomePage/>} />
        <Route exact path="/playlists" element={<Playlist/>} />
        <Route exact path="/songs" element={<Songs/>} />
      
          {/* {ids.map((crewMember)=>{
            let id = crewMember.CrewMemberID;
            return <Route path={"/" + id} element = {<CrewMember key = {crewMember.CrewMemberID} member = {crewMember}/>}/>
          })} */}
       </Routes>
    </Router>
  );
}

export default App;
