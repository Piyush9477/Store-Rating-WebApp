import { useFormik } from 'formik';
import * as yup from 'yup';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    name: yup.string().min(20).max(60).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(16).matches(/(?=.*[A-Z])(?=.*[^A-Za-z0-9])/).required(),
    address: yup.string().max(400),
});

export default function Signup() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { name: '', email: '', password: '', address: '' },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await API.post('/auth/signup', values);
                alert('Signup successful. Please login.');
                navigate('/login');
            } catch (err) {
                alert(err.response?.data?.msg || 'Signup failed');
            }
        }
    });

    return (
        <div className="container mt-5">
            <h2>Sign Up</h2>
            <form onSubmit={formik.handleSubmit}>
                {['name', 'email', 'password', 'address'].map((field) => (
                    <div className="mb-2" key={field}>
                        <input
                            name={field}
                            type={field === 'password' ? 'password' : 'text'}
                            className={`form-control ${formik.touched[field] && formik.errors[field] ? 'is-invalid' : ''}`}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={formik.values[field]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched[field] && formik.errors[field] && (
                            <div className="invalid-feedback">{formik.errors[field]}</div>
                        )}
                    </div>
                ))}
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
}
