import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NotesApi from '../network/notes.api'


interface NavbarLoggedinWievProps {
    user: User,
    onLogoutSuccesful: () => void
}

const NavbarLoggedinWiev = ({ user, onLogoutSuccesful }: NavbarLoggedinWievProps) => {
    async function logout() {
        try {
            await NotesApi.logout()
            onLogoutSuccesful()
        } catch (error) {
            console.log(error);

        }
    }


    return (
        <>
            <Navbar.Text className="me-2">
                Sign In as : {user.username}
            </Navbar.Text>
            <Button onClick={logout}>Log out</Button>
        </>
    );
}

export default NavbarLoggedinWiev;