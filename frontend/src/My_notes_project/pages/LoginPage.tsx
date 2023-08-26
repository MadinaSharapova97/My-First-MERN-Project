import axios from 'axios'
import React, { useState } from 'react'
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../assets/icons/logo.svg'
import paper from '../assets/images/img3.jpg'
import LoginModal from '../components/LoginModal'

export default function LoginPage() {

    const [LoginShowModal, setLoginShowModal] = useState(false)



    return (
        <StyledSignUpPage>
            <Navbar expand="sm" sticky='top'>
                <Container>
                    <Navbar.Brand >
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px"

                        }}>
                            <img src={logo} alt="" />
                            <h3>Note App</h3>

                        </div>

                    </Navbar.Brand>

                    <p onClick={() => setLoginShowModal(true)}>Log in</p>
                </Container>
            </Navbar>
            <Container>
                <Row className='paper' xs={1} md={2} xl={2}>
                    <Col className='write'>
                        <div>

                            <h1>Write your <br /> <span>Notes</span> here</h1>
                        </div>
                    </Col>

                    <Col>
                        <img src={paper} alt="img" />

                    </Col>
                </Row>
            </Container>
            {LoginShowModal ? <LoginModal setShowLoginModal={() => setLoginShowModal(false)}/> : null}

        </StyledSignUpPage>
    )
}

const StyledSignUpPage = styled.div`
padding-top: 20px;

h3{
    font-size:25px;
    color:#29474f;

}
 p{
    cursor: pointer;
    text-decoration:none;
    color:#29474f;
 }
 .paper{
    display: flex;
    align-items: center;
    margin-top: 45px;
    .write{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    h1{
        font-size: 60px;
        color:#29474f;
        @media (max-width:350px) {
            font-size: 50px;
        }
        @media (max-width:330px) {
            font-size: 40px;
        }
       
        span{
            color: #3bca97;
        }
    }
    img{
         width: 100%;
         height: 350px;
         @media (max-width:765px) {
            height: 300px;
         }
         @media (max-width:450px) {
            height: 250px;
         }
       
         @media (max-width:330px) {
            margin-top: 40px;
            height: 200px;
         }

    }
  
 }
`
