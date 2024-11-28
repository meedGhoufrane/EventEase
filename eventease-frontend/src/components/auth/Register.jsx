import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';


const validationSchema = Yup.object({
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .max(15, 'Username must not exceed 15 characters')
        .matches(/^[A-Za-z]+$/, 'Username must only contain letters')
        .required('Username is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    cin: Yup.string()
        .length(10, 'CIN must be exactly 10 characters')
        .required('CIN is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const Register = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            cin: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axiosInstance.post('/api/users/register', {
                    username: values.username,
                    email: values.email,
                    cin: values.cin,
                    password: values.password,
                });

      
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('username', values.username);


                navigate('/dashboard');
            } catch (err) {

                console.error('Registration error:', err.response?.data?.message || 'Error during registration');
            }
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg">
                <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">Create an Account</h2>


                {formik.errors.username || formik.errors.email || formik.errors.cin || formik.errors.password ? (
                    <div className="text-red-500 text-center mb-4">
                        {formik.errors.username || formik.errors.email || formik.errors.cin || formik.errors.password}
                    </div>
                ) : null}

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Username"
                            {...formik.getFieldProps('username')}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div className="text-red-500 text-sm">{formik.errors.username}</div>
                        ) : null}
                    </div>

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


                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="CIN"
                            {...formik.getFieldProps('cin')}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                        />
                        {formik.touched.cin && formik.errors.cin ? (
                            <div className="text-red-500 text-sm">{formik.errors.cin}</div>
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
                        {formik.isSubmitting ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
