import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';

import './styles.css';

export const Logout = () => {

    const logoutUser = async() => {
        const auth = getAuth();
        try {
            await signOut(auth);
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <button className="logout-btn" onClick={logoutUser}>
        Logout
        </button>
    )
}