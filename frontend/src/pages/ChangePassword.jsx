import { useFormik } from 'formik';
import * as yup from 'yup';
import API from '../services/api';

const validationSchema = yup.object({
    oldPassword: yup.string().required(),
    newPassword: yup.string()
        .min(8).max(16)
        .matches(/(?=.*[A-Z])(?=.*[^A-Za-z0-9])/, "Must have uppercase and special character")
        .required(),
});

export default function ChangePassword() {
    const formik = useFormik({
        initialValues: { oldPassword: '', newPassword: '' },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
        try {
            await API.put('/auth/change-password', values);
            alert('Password changed!');
            resetForm();
        } catch (err) {
            alert(err.response?.data?.msg || 'Change failed');
        }
        }
    });

    return (
        <div className="container mt-5">
            <h3>Change Password</h3>
            <form onSubmit={formik.handleSubmit}>
                <input name="oldPassword" type="password" placeholder="Old Password"
                    className={`form-control mb-2 ${formik.touched.oldPassword && formik.errors.oldPassword ? 'is-invalid' : ''}`}
                    value={formik.values.oldPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.oldPassword && formik.errors.oldPassword && <div className="invalid-feedback">{formik.errors.oldPassword}</div>}
                <input name="newPassword" type="password" placeholder="New Password"
                    className={`form-control mb-2 ${formik.touched.newPassword && formik.errors.newPassword ? 'is-invalid' : ''}`}
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.newPassword && formik.errors.newPassword && <div className="invalid-feedback">{formik.errors.newPassword}</div>}
                <button className="btn btn-primary" type="submit">Change</button>
            </form>
        </div>
    );
}
