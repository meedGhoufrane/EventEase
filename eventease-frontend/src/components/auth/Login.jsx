import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const Login = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axiosInstance.post('/api/users/login', {
                    email: values.email,
                    password: values.password,
                });

            
                const { user, token } = response.data;
                
                localStorage.setItem('authToken', token);
                localStorage.setItem('username', user.username);

                toast.success('Login successful! Redirecting...', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setTimeout(() => navigate('/dashboard'), 3000);
            } catch (err) {
                if (err.response?.status === 400) {
                    toast.error('Invalid email or password. Please try again.', {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.error('An error occurred during login. Please try again later.', {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg">
                <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">Login to Your Account</h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email Address"
                            {...formik.getFieldProps('email')}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-sm">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className="mb-6">
                        <input
                            type="password"
                            placeholder="Password"
                            {...formik.getFieldProps('password')}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500 text-sm">{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 transition duration-300"
                    >
                        {formik.isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    Don't have an account?{' '}
                    <a href="/register" className="text-blue-600 hover:underline">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
