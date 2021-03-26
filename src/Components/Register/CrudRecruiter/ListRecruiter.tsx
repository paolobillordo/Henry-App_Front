import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Recruiter } from '../../../types/Recruiters';
import RecruiterC from './RecruiterC';

const QUERY = gql`
    query empresas {
        empresas {
            name
            email
            description
            picture
            _id
        }
    }
`;

const ListRecruiter: React.FC = () => {
    const { data, loading } = useQuery(QUERY);
    console.log(data);
    return (
        <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
            {loading ? (
                <div>loading...</div>
            ) : (
                <div className="py-8">
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead className="bg-yellow_henry">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                            Recruiter
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                            Description
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                            Delete
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data &&
                                        data.empresas.map(
                                            (recruiter: Recruiter) => (
                                                <RecruiterC
                                                    key={recruiter._id}
                                                    recruiter={recruiter}
                                                />
                                            )
                                        )}
                                </tbody>
                            </table>
                            {/*                         <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
                                    <svg
                                        width="9"
                                        fill="currentColor"
                                        height="8"
                                        className=""
                                        viewBox="0 0 1792 1792"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 ">
                                    1
                                </button>
                                <button
                                    type="button"
                                    className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                                    2
                                </button>
                                <button
                                    type="button"
                                    className="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100">
                                    3
                                </button>
                                <button
                                    type="button"
                                    className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                                    4
                                </button>
                                <button
                                    type="button"
                                    className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100">
                                    <svg
                                        width="9"
                                        fill="currentColor"
                                        height="8"
                                        className=""
                                        viewBox="0 0 1792 1792"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListRecruiter;
