import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import '../App.css';
import Header from "../components/Header";
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useLocation } from "react-router-dom";
const Notes = () => {
    const location= useLocation();
    // const noteId= location.pathname.split("/")[2];
    const address= location.pathname.split("/")[0];
    let [notes, setNotes]= useState([])

    useEffect( () => {
        const getNotes= async () => {
            try {
                let res= await fetch(`https://django-react-note-app.herokuapp.com/api/notes/`)
                res= await res.json()
                // console.log(res)
                setNotes(res)
            } catch(err) {

            }
        }
        getNotes()
    }, [])
    // console.log(notes)
    // let getNotes = async () => {
    //     try {

    //     } catch {

    //     }
    // }

    let getTitle = (note) => {
        
        let title= note.body.split('\n')[0]
        if (title.length>45) {
            return title.slice(0,45)
        }
        return title
    }

    let getTime = (note) => {
        
        return new Date(note.updated).toLocaleDateString()
    }

    let getContent = (note) => {
        let title= note.body.split('\n')[0]
        let content= note.body.replaceAll("\n", " ")
        content.replaceAll(title, "")

        if (content.length>25) {
            return content.slice(0,25)+"..."
        }
        return content
    }

    return (
        <div className="app">
            <Header />
            <div className="app-header">
                
                <FilterListOutlinedIcon style={{color: "#f68657"}} />
                <h2 className="notes-title">List</h2>
                <p className="notes-count">{notes.length}</p>
            </div>
            <div className="note-list">
                {notes.map((note, index)=> (
                    // {console.log(note.id)}
                    <div key={note.id}>
                        <Link to={`/note/${note.id}`}>
                            <div className="notes-list-item">
                                <h3>{getTitle(note)}</h3>
                                <p><span>{getTime(note)}</span><span> {getContent(note)}</span></p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <Link to="/note/new" className="floating-button">
                <AddIcon />
            </Link>
        </div>
    )
}

export default Notes