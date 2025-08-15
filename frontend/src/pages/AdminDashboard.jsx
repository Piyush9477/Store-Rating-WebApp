import { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import { useFormik } from 'formik';
import * as yup from 'yup';

const userSchema = yup.object({
    name: yup.string().min(20).max(60).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(16).matches(/(?=.*[A-Z])(?=.*[^A-Za-z0-9])/).required(),
    address: yup.string().max(400).required(),
    role: yup.string().oneOf(['user', 'admin', 'owner']).required(),
});

function AddUserForm({ onSuccess }) {
    const formik = useFormik({
        initialValues: { name: '', email: '', password: '', address: '', role: 'user' },
        validationSchema: userSchema,
        onSubmit: async (values, { resetForm }) => {
            await API.post('/admin/users', values);
            alert('User added');
            resetForm();
            onSuccess && onSuccess();
        }
    });
    return (
        <form onSubmit={formik.handleSubmit} className="mb-4">
            {['name','email','password','address','role'].map(field => (
                <input
                    key={field}
                    name={field}
                    type={field==='password'?'password':'text'}
                    className={`form-control mb-2`}
                    placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
                    value={formik.values[field]}
                    onChange={formik.handleChange}
                />
            ))}
            <button className="btn btn-success">Add User</button>
        </form>
    );
}

function AddStoreForm({ onSuccess }) {
    const [owners, setOwners] = useState([]);
    useEffect(() => {
        API.get('/admin/users', { params: { role: 'owner' } }).then(res => setOwners(res.data));
    }, []);
    const formik = useFormik({
        initialValues: { name: '', email: '', address: '', owner_id: '' },
        onSubmit: async (values, { resetForm }) => {
            await API.post('/admin/stores', values);
            alert('Store added');
            resetForm();
            onSuccess && onSuccess();
        }
    });
    return (
        <form onSubmit={formik.handleSubmit} className="mb-4">
            <input name="name" placeholder="Store Name" className="form-control mb-2" value={formik.values.name} onChange={formik.handleChange} />
            <input name="email" placeholder="Store Email" className="form-control mb-2" value={formik.values.email} onChange={formik.handleChange} />
            <input name="address" placeholder="Store Address" className="form-control mb-2" value={formik.values.address} onChange={formik.handleChange} />
            <select name="owner_id" className="form-control mb-2" value={formik.values.owner_id} onChange={formik.handleChange}>
                <option value="">Select Owner</option>
                {owners.map(owner => <option value={owner.id} key={owner.id}>{owner.name}</option>)}
            </select>
            <button className="btn btn-success">Add Store</button>
        </form>
    );
}

export default function AdminDashboard() {
    const [stats, setStats] = useState({});
    const [stores, setStores] = useState([]);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

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

                <h5>Add New User</h5>
                <AddUserForm onSuccess={loadUsers} />

                <h5>Add New Store</h5>
                <AddStoreForm onSuccess={loadStores} />

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
