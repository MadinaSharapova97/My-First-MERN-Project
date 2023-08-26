import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import close from '../assets/icons/close.svg'
import { ContextProps, MyContext } from '../context/Context'

interface EditModalProps {
    editModal: boolean,
    setEditModal: () => void,
    editNoteId: any
}

export default function EditModal({ editModal, setEditModal, editNoteId }: EditModalProps) {

    const { getNotes } = useContext<ContextProps>(MyContext)


    const [title, setTitle] = useState()
    const [text, setText] = useState()

    useEffect(() => {
        if (!editNoteId) return;
        setTitle(editNoteId.title)
        setText(editNoteId.text)
    }, [editNoteId])

    async function EditNote(body: {}, noteId: string) {
        try {
            const res = await axios.patch("api/notes/" + noteId, body)
            console.log(res);
            if (getNotes) {
                getNotes()
                setEditModal()
            }
        } catch (error) {
            console.log(error);

        }
    }

    return (

        <EditModalStyled>

            <div className={`showAddModal ${!editModal ? "hideAddModal" : ""}`}>
                <div style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center"
                }}>
                    <img src={close} alt="close" onClick={setEditModal} />
                </div>
                <br />
                <input
                    type="text"
                    placeholder='Title'
                    name='title'
                    value={title}
                    onChange={(e: any) => setTitle(e.target.value)}
                /> <br /> <br />
                <textarea
                    name="text"
                    placeholder='Text'
                    value={text}
                    onChange={(e: any) => setText(e.target.value)}
                ></textarea>
                <button className='saveBtn' onClick={() => EditNote({ title, text }, editNoteId._id)}>Edit</button>
            </div>

        </EditModalStyled>

    )
}

const EditModalStyled = styled.div`
.showAddModal{
    background-color: white ;
    width: 360px;
    height: 320px;
    border-radius: 10px;
    padding: 20px;
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-50%,0%);
    z-index: 1;
    transition: 1s linear;
    @media (max-width:370px) {
        width: 350px;
    }
    @media (max-width:350px) {
        width: 320px;
    }
}
  
   input,textarea{
    border: none;
    outline: none;
    border-bottom: 1px solid #4d4b4b;
    width: 100%;
    margin-top: 10px;
   }
   textarea{
    min-height: 100px;
   }

   .hideAddModal{
    transform: translate(-50%,-100%);
    transition: 1s ease-in-out;

   }
   .saveBtn{
        border: none;
        color: #f9fdff;
        padding: 5px 25px;
        border-radius: 5px;
        background-color:#444191 ;
        margin-top: 25px;
        width: 100%;
   }
`
