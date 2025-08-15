import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-light bg-light mb-4">
            <span className="navbar-brand mb-0 h1">Store Rating App</span>
            {user && (
                <>
                    <Link className="btn btn-outline-secondary me-2" to="/change-password">Change Password</Link>
                    <button className="btn btn-outline-danger" onClick={logout}>
                        Logout
                    </button>
                </>
            )}
        </nav>
    );
}
