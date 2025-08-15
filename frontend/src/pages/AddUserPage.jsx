import { useFormik } from 'formik';
import * as yup from 'yup';
import API from '../services/api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const userSchema = yup.object({
    name: yup.string().min(3).max(60).required(),
    email: yup.string().email().required(),
    password: yup
        .string()
        .min(8)
        .max(16)
        .matches(/(?=.*[A-Z])(?=.*[^A-Za-z0-9])/)
        .required(),
    address: yup.string().max(400).required(),
    role: yup.string().oneOf(['user', 'admin', 'owner']).required(),
});

export default function AddUserPage() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { name: '', email: '', password: '', address: '', role: 'user' },
        validationSchema: userSchema,
        onSubmit: async (values, { resetForm }) => {
            await API.post('/admin/users', values);
            alert('User added successfully!');
            navigate('/admin');
            resetForm();
        },
    });

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h3>Add New User</h3>
                <form onSubmit={formik.handleSubmit} className="mb-4">
                    {/* Name */}
                    <input
                        name="name"
                        type="text"
                        className="form-control mb-2"
                        placeholder="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    
                    {/* Email */}
                    <input
                        name="email"
                        type="email"
                        className="form-control mb-2"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    
                    {/* Password */}
                    <input
                        name="password"
                        type="password"
                        className="form-control mb-2"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    
                    {/* Address */}
                    <input
                        name="address"
                        type="text"
                        className="form-control mb-2"
                        placeholder="Address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                    />
                    
                    {/* Role as Select */}
                    <select
                        name="role"
                        className="form-control mb-3"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                    >
                        <option value="user">User</option>
                        <option value="owner">Owner</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button className="btn btn-primary">Add User</button>
                </form>
            </div>
        </div>
    );
}
