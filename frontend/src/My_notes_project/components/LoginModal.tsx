import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ContextProps, MyContext } from '../context/Context'
interface LoginModalProps {
    setShowLoginModal: () => void
}

export default function LoginModal({ setShowLoginModal }: LoginModalProps) {
    const { LoginUser } = useContext<ContextProps>(MyContext)
    const [login, setLogin] = useState({
        username: "",
        password: "",
    })

    // async function LoginUser(login: LoginUserProps) {
    //     try {
    //         const res = await axios.post("api/login/", login)
    //     } catch (error) {
    //         console.log(error);

    //     }
    // }

    function changeLogin(e: any) {
        const { name, value } = e.target;
        setLogin((p) => ({
            ...p,
            [name]: value
        }))
    }

    return (

        <Modal show onHide={setShowLoginModal}>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name='username'
                            type="text"
                            placeholder="Name"
                            autoFocus
                            value={login.username}
                            onChange={changeLogin}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name='password'
                            type='password'
                            placeholder='Password'
                            autoFocus
                            value={login.password}
                            onChange={changeLogin}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Link to='/notes' style={{
                    backgroundColor: "#3bca97",
                    border: "none",
                    width: "100%",
                    textAlign: "center",
                    textDecoration: "none",
                    borderRadius: "5px",
                    color: "white",
                    padding: "3px"
                }}
                    onClick={() => { LoginUser && LoginUser(login) }} >
                    Login
                </Link>
            </Modal.Footer>
        </Modal>
    )
}
