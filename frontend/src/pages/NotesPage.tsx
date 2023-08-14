import { Container } from 'react-bootstrap'
import styles from "../styles/NotePage.module.css";
import { User } from '../models/user';
import NotesPageLoggedInView from '../components/NotesPageLoggedInView'
import NotesPageLoggedOutView from '../components/NotesPageLoggedOutView'

interface NotesPagesProps {
    loggedInUser:User | null,
}

export default function NotesPage({loggedInUser}:NotesPagesProps) {

  return (
    <Container className={styles.notesPages}>
    <>
      {loggedInUser
        ? <NotesPageLoggedInView />
        : <NotesPageLoggedOutView />
      }
    </>
    </Container>
  )
}
