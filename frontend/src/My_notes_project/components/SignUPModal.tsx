import React, { useContext, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ContextProps, MyContext } from '../context/Context';

interface SignUpModalProps {
    setShowModal: () => void,
}

export default function SignUPModal({ setShowModal }: SignUpModalProps) {
    const { signUpUser } = useContext<ContextProps>(MyContext)
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    function changeUser(e: any) {
        const { value, name } = e.target;
        setUser((p) => ({
            ...p,
            [name]: value,
        }))
    }

    return (

        <Modal show onHide={setShowModal}>
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
                            value={user.username}
                            onChange={changeUser}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            name='email'
                            type="email"
                            placeholder="Email"
                            autoFocus
                            value={user.email}
                            onChange={changeUser}
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
                            value={user.password}
                            onChange={changeUser}
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
                    onClick={() => { signUpUser && signUpUser(user) }} >
                    Sign Up
                </Link>
            </Modal.Footer>
        </Modal>

    )
}
