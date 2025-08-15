import { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const [stats, setStats] = useState({});
    const [stores, setStores] = useState([]);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        API.get('/admin/dashboard').then(res => setStats(res.data));
        loadStores();
        loadUsers();
    }, []);

    const loadStores = () => {
        API.get('/admin/stores', { params: { search } }).then(res => setStores(res.data));
    };

    const loadUsers = () => {
        API.get('/admin/users', { params: { search } }).then(res => setUsers(res.data));
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <h3>Admin Dashboard</h3>
                <div className="row mb-4">
                    <div className="col">Total Users: {stats.totalUsers}</div>
                    <div className="col">Total Stores: {stats.totalStores}</div>
                    <div className="col">Total Ratings: {stats.totalRatings}</div>
                </div>
                
                <div className="d-flex gap-3 mb-4">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/admin/add-user')}
                    >
                        ➕ Add User
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={() => navigate('/admin/add-store')}
                    >
                        🏬 Add Store
                    </button>
                </div>

                <div>
                    <h5>Store List</h5>
                    <input
                        className="form-control mb-2"
                        placeholder="Search stores"
                        value={search}
                        onChange={e => { setSearch(e.target.value); loadStores(); }}
                    />
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th><th>Email</th><th>Address</th><th>Avg Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stores.map(store => (
                                <tr key={store.id}>
                                <td>{store.name}</td>
                                <td>{store.email}</td>
                                <td>{store.address}</td>
                                <td>{store.averageRating || "No ratings yet"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h5>User List</h5>
                    <input
                        className="form-control mb-2"
                        placeholder="Search users"
                        value={search}
                        onChange={e => { setSearch(e.target.value); loadUsers(); }}
                    />
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th><th>Email</th><th>Address</th><th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
