import React, { useEffect, useState } from "react"
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import '../App.css';
import { useNavigate } from "react-router-dom";



const Note = () => {

    const location= useLocation();
    const noteId= location.pathname.split("/")[2];
    const address= location.pathname.split("/")[0];
    // console.log(address)
    let navigate= useNavigate()
    // console.log(noteId)

    const [note, setNote]= useState(null)

    useEffect( ()=> {
        if (noteId==="new") {
            return
        }
        const getNote= async () => {
            try{
                let res= await fetch(`https://web-production-0169.up.railway.app/api/notes/${noteId}/`)
                // console.log(res)
                res= await res.json()
                setNote(res)
                // console.log(res)
            }
            catch(err) {

            }
        }
        getNote()
    }, [noteId])

    let updateNote= async () => {
        try{
            await fetch(`https://web-production-0169.up.railway.app/api/notes/${noteId}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(note)
            })
        }
        catch(err) {

        }
        navigate(-1)
    }

    let handleSubmit = () => {
        // console.log(note)
        if (noteId!=="new" && note!==null && note.body.length===0) {
            handleDelete()
        }
        else if (noteId!=="new" ) {
            updateNote()
        }
        else if (noteId==="new" && note!==null) {
            handleAdd()
        }
        else {
            navigate(-1)
        }
    }

    let handleDelete = async () => {
        await fetch(`https://web-production-0169.up.railway.app/api/notes/${noteId}/`, {
            method: "DELETE",
            header: {
                "Content-type": "application/json"
            }
        })
        navigate(-1)
    }

    let handleAdd = async() => {
        try {
            await fetch(`https://web-production-0169.up.railway.app/api/notes/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(note)
            })
        }
        catch (err) {

        }
        navigate(-1)
    }

    

    // console.log(note)
    return (
        <div className="app">
            <Header />
            <div className="note">
                <div className="note-header">
                    <h3>
                        <ArrowBackOutlinedIcon onClick={handleSubmit} />
                    </h3>
                    {noteId!=="new"? (
                        <button onClick={handleDelete} >Delete</button>
                    ) : (
                        <button onClick={handleSubmit}>Done</button>
                    )
                    }  
                </div>
                <textarea onChange={(e)=> {
                    setNote({...note, "body": e.target.value})
                }} value={note?.body}></textarea>
            </div>
        </div>
    )
}

export default Note