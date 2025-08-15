import { useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/login', form);
            login(data.token, data.role);
            if (data.role === 'admin') navigate('/admin');
            else if (data.role === 'user') navigate('/user');
            else navigate('/owner');
        } catch (err) {
            alert(err.response?.data?.msg || 'Login failed');
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%", borderRadius: "15px" }}>
                <h2 className="text-center mb-4 fw-bold">Welcome Back</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                    required
                    />
                </div>

                <button className="btn btn-primary btn-lg w-100">Login</button>

                <div className="text-center mt-3">
                    <small className="text-muted">
                    Don't have an account? <a href="/signup">Sign up</a>
                    </small>
                </div>
                </form>
            </div>
        </div>
    );
}
