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
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="form-control mb-2" />
                <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="form-control mb-2" />
                <button className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}
