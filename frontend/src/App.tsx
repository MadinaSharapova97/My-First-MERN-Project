import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import LoginModal from './components/LoginModal';
import NavBar from './components/Navbar';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import styles from "./styles/App.module.css";
import * as NotesApi from "./network/notes.api";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotesPage from './pages/NotesPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import { log } from 'console';


function App() {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser()
        setLoggedInUser(user)
      } catch (error) {
        console.log(error);

      }
    }
    fetchLoggedInUser()
  }, [])

  return (
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowSignUpModal(true)}
          onSignUpClicked={() => setShowLoginModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />
        <Container className={styles.pageContainer}>
          <Routes>
            <Route path='/' element={<NotesPage loggedInUser={loggedInUser} />} />
            <Route path='privacy' element={<PrivacyPage />} />
            <Route path='/*' element={<NotFoundPage />} />
          </Routes>
        </Container>
        {showLoginModal &&
          <SignUpModal
            onDismiss={() => setShowSignUpModal(false)}
            onSignupSuccessful={(user) => {
              setLoggedInUser(user)
              setShowSignUpModal(false)
            }}
          />
        }
        {showSignUpModal &&
          <LoginModal
            onDismiss={() => setShowLoginModal(false)}
            onLoginSuccessful={(user) => {
              setLoggedInUser(user)
              setShowLoginModal(false)
            }}
          />
        }
      </div>



    </BrowserRouter>

  );
}

export default App;
