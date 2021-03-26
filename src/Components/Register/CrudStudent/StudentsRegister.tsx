import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import axios from 'axios';

const NUEVO_ALUMNO = gql`
    mutation alumno(
        $name: String!
        $password: String!
        $email: String!
        $surname: String!
    ) {
        agregarAlumno(
            email: $email
            name: $name
            surname: $surname
            password: $password
        ) {
            token
        }
    }
`;

const StudentsRegisterForm: React.FC = () => {
    const history = useHistory();
    const [agregarAlumno] = useMutation(NUEVO_ALUMNO);

    const formik = useFormik({
        initialValues: {
            name: '',
            surName: '',
            password: '',
            email: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Empty input'),
            surName: Yup.string().required('Empty input'),
            email: Yup.string().required('Empty input'),
            password: Yup.string()
                .required('Empty input')
                .min(6, 'Min 6 characters')
        }),
        onSubmit: async (valores, { resetForm }) => {
            console.log('enviando');
            console.log(valores);
            const { name, surName, email, password } = valores;
            console.log(name);
            try {
                const dataMail = { email };
                await axios.post('http://localhost:3001/send-email', dataMail);
                const { data } = await agregarAlumno({
                    variables: {
                        name,
                        surname: surName,
                        email,
                        password
                    }
                });
                const token = data.agregarAlumno.token;
                localStorage.setItem(token, token);
                const authLink = setContext((_, { headers }) => {
                    // get the authentication token from local storage if it exists
                    const token = localStorage.getItem('token');
                    // return the headers to the context so httpLink can read them
                    return {
                        headers: {
                            ...headers,
                            authorization: token ? `Bearer ${token}` : ''
                        }
                    };
                });
                console.log(authLink);
                toast.success('Alumno Creado');
            } catch (error) {
                console.log(error);
                toast.error('error');
            }
            resetForm();
            history.push('/catalogue');
        }
    });

    return (
        <div>
            <div className="flex max-w-sm mx-auto bg-yellow_henry dark:bg-gray-800 rounded-b-lg shadow-lg overflow-hidden lg:max-w-2xl">
                <div className="w-full py-8 px-6 md:px-8 ">
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-white text-center">
                        {`Henry's`}
                    </h2>

                    <p className="text-xl text-gray-600 dark:text-gray-200 text-center">
                        Register
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b border-grayHenry dark:border-gray-600 w-1/5 lg:w-1/4"></span>

                        <a className="text-xs text-center text-gray-500 dark:text-gray-400 uppercase hover:underline">
                            Register as a {`Henry's`} Student
                        </a>

                        <span className="border-b border-grayHenry dark:border-gray-400 w-1/5 lg:w-1/4"></span>
                    </div>
                    {/**FORMULARIO */}
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mt-4">
                            <label
                                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                htmlFor="name">
                                Name*
                            </label>
                            <input
                                id="name"
                                placeholder="name"
                                className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                type="text"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.errors.name && formik.touched.name ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.name}</p>
                            </div>
                        ) : null}

                        <div className="mt-4">
                            <label
                                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                htmlFor="surName">
                                SurName*
                            </label>
                            <input
                                id="surName"
                                placeholder="surName"
                                className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                type="text"
                                value={formik.values.surName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span className="block text-red-700 sm:inline"></span>
                        </div>

                        {formik.errors.surName && formik.touched.surName ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.surName}</p>
                            </div>
                        ) : null}

                        <div className="mt-4">
                            <label
                                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                htmlFor="Email">
                                Email*
                            </label>
                            <input
                                id="email"
                                placeholder="email"
                                className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                type="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.errors.email && formik.touched.email ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.email}</p>
                            </div>
                        ) : null}

                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label
                                    className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                    htmlFor="password">
                                    Password*
                                </label>
                            </div>

                            <input
                                id="password"
                                className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                type="password"
                                placeholder="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.errors.password && formik.touched.password ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.password}</p>
                            </div>
                        ) : null}

                        <div className="mt-8">
                            <button className="bg-grayHenry text-white py-2 px-4 w-full tracking-wide rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-row justify-center max-w-sm mt-10 mb-0 mr-auto ml-auto dark:bg-gray-800 overflow-hidden lg:max-w-2xl">
                        <button className="bg-grayHenry text-white py-4 px-4 w-auto mr-10 ml-10 tracking-wide rounded-full">
                            <svg
                                width="35"
                                height="35"
                                viewBox="0 0 70 70"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <rect
                                    width="70"
                                    height="70"
                                    rx="5"
                                    fill="#3A3A3A"
                                />
                                <path
                                    d="M39.0744 61.2414V37.3364H47.1389L48.3377 27.9768H39.0744V22.0151C39.0744 19.3143 39.8269 17.4651 43.7031 17.4651H48.6148V9.12054C46.225 8.86443 43.8228 8.74077 41.4194 8.75013C34.291 8.75013 29.3969 13.1018 29.3969 21.0905V27.9593H21.3848V37.3189H29.4143V61.2414H39.0744Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                        <button className="bg-grayHenry text-white py-4 px-4 w-auto mr-10 ml-10 tracking-wide rounded-full">
                            <svg
                                width="35"
                                height="35"
                                viewBox="0 0 70 70"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <rect
                                    width="70"
                                    height="70"
                                    rx="5"
                                    fill="#3A3A3A"
                                />
                                <path
                                    d="M60.2246 30.2422H35.5264V40.3936H49.6357C49.0273 43.6748 47.1816 46.4502 44.3994 48.3096C42.0479 49.8818 39.0469 50.8115 35.5195 50.8115C28.6904 50.8115 22.9141 46.1973 20.8496 39.9971C20.3301 38.4248 20.0293 36.7432 20.0293 35.0137C20.0293 33.2842 20.3301 31.6025 20.8496 30.0303C22.9209 23.8369 28.6973 19.2227 35.5264 19.2227C39.375 19.2227 42.8271 20.5488 45.5479 23.1465L53.0674 15.6201C48.5215 11.3818 42.5947 8.78418 35.5264 8.78418C25.2793 8.78418 16.4131 14.6631 12.0996 23.2354C10.3223 26.7764 9.31055 30.7822 9.31055 35.0205C9.31055 39.2588 10.3223 43.2578 12.0996 46.7988C16.4131 55.3711 25.2793 61.25 35.5264 61.25C42.6084 61.25 48.542 58.8984 52.876 54.8926C57.832 50.3262 60.6963 43.5996 60.6963 35.6084C60.6963 33.749 60.5322 31.9648 60.2246 30.2422Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b border-grayHenry dark:border-gray-600 w-1/5 md:w-1/4"></span>

                        <Link
                            to="/login"
                            className="text-xs text-gray-500 dark:text-gray-400 uppercase hover:underline">
                            or Log in
                        </Link>

                        <span className="border-b  border-grayHenry dark:border-gray-600 w-1/5 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentsRegisterForm;
