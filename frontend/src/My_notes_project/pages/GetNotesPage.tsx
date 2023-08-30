import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Container, Navbar, Row } from 'react-bootstrap'
import styled from 'styled-components'
import logout from '../assets/icons/arrow-left-line.svg'
import edit from '../assets/icons/edit-2-fill.svg'
import del from '../assets/icons/delete-bin-7-fill.svg'
import { MyContext, ContextProps } from '../context/Context'
import { FaPlus } from 'react-icons/fa'
import AddNoteModal from '../components/AddNoteModal'
import EditModal from '../components/EditModal'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { formatDate } from '../utils/formatDate'



export default function GetNotesPage() {
    const { getNotes, getAllNotes } = useContext<ContextProps>(MyContext)
    useEffect(() => {
        if (getNotes) {
            getNotes()
        }

    }, [])

    const navigate = useNavigate();
    const [editModal, setEditModal] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [editNoteId, setEditNoteId] = useState(null)


    function showHideModal() {
        setShowModal((p) => !p)
    }

    async function deletNote(id: string) {
        try {
            const res = await axios.delete("api/notes/" + id)
            if (getNotes) {
                getNotes()
            }
            toast.success("Muvoffaqiyatli o'chirildi")

            console.log(res);

        } catch (error) {
            console.log(error);
        }
    }

    function Logout() {
        localStorage.removeItem("TOKEN")
        localStorage.removeItem("isAuth")
        navigate("/login");
    }



    return (
        <StyledGetNotesPage>
            {showModal ? <AddNoteModal showModal={showModal} setShowModal={() => setShowModal(false)} /> : null}
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>
                        <div className='logoutLink'>
                            <img src={logout} alt="logout" />
                            <Link className='logout' to='/login' onClick={Logout}>Log out</Link>

                        </div>
                    </Navbar.Brand>

                </Container>
            </Navbar>

            <button className='addBtn' onClick={showHideModal}>
                Add new note
                <FaPlus />
            </button>

            <Container>
                {getAllNotes.length > 0 ?
                    <Row xs={1} md={2} xl={3}>

                        {getAllNotes.map((i: any) => (
                            <Col key={i._id} className='cols'>
                                <Card className='card'>
                                    <div>
                                        <h3>{i.title}</h3>
                                        <p>{i.text}</p>
                                    </div>
                                    <div className='createdUpdatedText'>
                                        {i.updatedAt > i.createdAt ?
                                            <p>{formatDate(i.createdAt)}</p> :
                                            <p>{formatDate(i.updatedAt)}</p>

                                        }
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <img src={edit} alt="edit" onClick={() => {
                                            setEditNoteId(i)
                                            setEditModal(true)
                                        }} />
                                        <img src={del} alt="delete" onClick={() => deletNote(i._id)} />
                                    </div>

                                </Card>
                            </Col>
                        ))}
                    </Row> : <div className='no-any-notes'>
                        <p>You don't have any notes yet</p>
                    </div>
                }
            </Container>
            {editModal ? <EditModal setEditModal={() => setEditModal(false)} editModal={editModal} editNoteId={editNoteId} /> : null}

        </StyledGetNotesPage >
    )
}
const StyledGetNotesPage = styled.div`
    background-color: #edf3ff;
    padding-bottom: 40px;
    .addBtn{
        /* display: flex; */
        align-items: center;
        gap: 10px;
        display: block;
        margin: 0 auto 10px auto;
        border: none;
        color: #f9fdff;
        padding: 5px 25px;
        border-radius: 5px;
        background-color:#444191 ;
    }
    
    .logoutLink{
        display: flex;
        align-items: center;
        gap: 5px;
        margin: 20px 0 5px 0;
        cursor: pointer;
        .logout{
            color: #29474f;
            font-size: 25px;
            text-decoration: none;
        }
    }
  
   
    .cols{
        margin-top:20px;
    }
   
    .card{
        background-color: #f9fdff;
        padding: 20px;
        
        h3,p{
            color: #29474f;
        }
    }
    .no-any-notes{
       min-height: calc(100vh - 170px);
       display: flex;
       align-items: center;
       justify-content: center;
       p{
         font-size: 25px;
       }
    }
    .editTitle{
        input{
            width: 100%;
            border-top: none;
            border-left: none;
            border-right: none;
            border-bottom: 1.5px solid #888c94;
            outline: none;
            color: #29474f;
            font-size: calc(1.3rem + .6vw);
            font-weight: 500;
            background-color: transparent;

        }
        img{
            cursor: pointer;
        }
    }
    .editText{
         textarea{
            width: 100%;
            border: none;
            outline: none;
            color: #29474f;
            font-size: 14px;
            background-color: transparent;
            margin-top: 7px;

         }
    }
    .createdUpdatedText{
        background-color:#f9fdff ;
        margin-top: 20px;
        border-top: 1px solid #c0c5d0;
        padding-top: 10px;
    p{
        color: #c0c5d0;
    }
    }
    
`
