import React from 'react'
import { User } from '../models/user'
import { Container, Nav, Navbar } from "react-bootstrap"
import NavbarLoggedOutView from './NavabrLoggedOutView'
import NavbarLoggedInView from './NavbarLoggedinWiev'
import { Link } from "react-router-dom"

interface NavBarProps {
    loggedInUser?: User | null,
    onSignUpClicked: () => void
    onLoginClicked: () => void
    onLogoutSuccessful: () => void

}

export default function NavBar({ loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful }: NavBarProps) {
    return (
        <Navbar bg="primary" variant="dark" expand="sm" sticky='top'>
            <Container>
                <Navbar.Brand as={Link} to='/'>
                    Cool Note App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='main-navbar' />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} to='/privacy'>Privacy</Nav.Link>
                    </Nav>
                    <Nav className='ms-auto'>
                        {loggedInUser
                            ? <NavbarLoggedInView user={loggedInUser} onLogoutSuccesful={onLogoutSuccessful} />
                            : <NavbarLoggedOutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}
