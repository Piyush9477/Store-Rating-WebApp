import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="text-center p-4" style={{ maxWidth: "600px" }}>
                <h1 className="fw-bold mb-3">🏪 Store Rating App</h1>
                <p className="lead mb-4">
                    Discover, rate, and review your favorite stores.  
                    View average ratings from 1 ⭐ to 5 ⭐ and share your own experiences  
                    to help others make informed choices.
                </p>
                <p className="mb-4 fw-semibold">
                    To get started, please <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link>.
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <Link to="/login" className="btn btn-primary btn-lg">Login</Link>
                    <Link to="/signup" className="btn btn-success btn-lg">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}
