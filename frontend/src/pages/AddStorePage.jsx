import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import API from '../services/api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function AddStorePage() {
    const [owners, setOwners] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        API.get('/admin/users', { params: { role: 'owner' } })
            .then(res => setOwners(res.data));
    }, []);

    const formik = useFormik({
        initialValues: { name: '', email: '', address: '', owner_id: '' },
        onSubmit: async (values, { resetForm }) => {
            await API.post('/admin/stores', values);
            alert('Store added successfully!');
            navigate('/admin');
            resetForm();
        },
    });

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h3>Add New Store</h3>
                <form onSubmit={formik.handleSubmit} className="mb-4">
                    <input
                        name="name"
                        placeholder="Store Name"
                        className="form-control mb-2"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    <input
                        name="email"
                        placeholder="Store Email"
                        className="form-control mb-2"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    <input
                        name="address"
                        placeholder="Store Address"
                        className="form-control mb-2"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                    />
                    <select
                        name="owner_id"
                        className="form-control mb-2"
                        value={formik.values.owner_id}
                        onChange={formik.handleChange}
                    >
                        <option value="">Select Owner</option>
                        {owners.map(owner => (
                            <option value={owner.id} key={owner.id}>
                                {owner.name}
                            </option>
                        ))}
                    </select>
                    <button className="btn btn-success">Add Store</button>
                </form>
            </div>
        </div>
    );
}
