import './styles.css';

import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import { useEffect, useState } from 'react';

import { Logout } from '../Logout';
import { Link } from 'react-router-dom';

export const NavLeft = () => {

    const [user, setUser] = useState(null);

    useEffect(
        () => {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(user);
                } else {
                    setUser(null);
                }
            })
        }, []
    )
    
    return (
        
        // Don't display the navbar elements unless someone is logged in.
        // Can't do this for the whole div because of styling.

        <div className="nav-left">
            {
                user && <Link to={`/`}>
                            <button> Home </button>
                        </Link>
            }

            {
                user && <Link to={`/me`}>
                            <button> Profile </button>
                        </Link>
            }

            {
                user && <Logout />
            }
        </div>
    );
}