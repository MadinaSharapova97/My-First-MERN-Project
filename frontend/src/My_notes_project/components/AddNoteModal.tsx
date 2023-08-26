import axios from 'axios'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import close from '../assets/icons/close.svg'
import { ContextProps, MyContext } from '../context/Context'


interface AddNoteModalProps {
    showModal: boolean,
    setShowModal: () => void
}

export default function AddNoteModal({ showModal, setShowModal }: AddNoteModalProps) {

    const { getNotes } = useContext<ContextProps>(MyContext)
    interface AddNotesProps {
        title: string,
        text: string
    }
    const [notes, setNotes] = useState({
        title: "",
        text: ""
    })

    async function AddNotes(notes: AddNotesProps) {
        try {
            const res = await axios.post('api/notes/', notes)
            if (getNotes) {
                getNotes()
            }
            setShowModal()
        } catch (error) {
            console.log(error);

        }
    }

    function changeNotes(e: any) {
        const { name, value } = e.target
        setNotes((p) => ({
            ...p,
            [name]: value
        }))
    }

    return (
        <AddNoteModalStyled>

            <div className={`showAddModal ${!showModal ? "hideAddModal" : ""}`}>
                <div style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center"
                }}>
                    <img src={close} alt="close" onClick={setShowModal} />
                </div>
                <br />
                <input
                    type="text"
                    placeholder='Title'
                    name='title'
                    onChange={changeNotes}
                /> <br /> <br />
                <textarea
                    name="text"
                    placeholder='Text'
                    onChange={changeNotes}
                ></textarea>
                <button className='saveBtn' onClick={() => AddNotes(notes)}>Save</button>
            </div>

        </AddNoteModalStyled>
    )
}

const AddNoteModalStyled = styled.div`
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
