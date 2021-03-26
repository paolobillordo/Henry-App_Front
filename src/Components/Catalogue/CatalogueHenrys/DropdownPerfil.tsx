import React, { createRef } from 'react';
import Popper from 'popper.js';
import { useHistory } from 'react-router';

const DropdownPerfil: React.FC = () => {
    // dropdown props
    const history = useHistory();
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef: React.RefObject<any> = createRef();
    const popoverDropdownRef: React.RefObject<any> = createRef();
    const openDropdownPopover = () => {
        new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: 'bottom-start'
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };
    const exitLogout = () => {
        localStorage.removeItem('token');
        history.push('/');
    };

    return (
        <div className="flex flex-wrap">
            <div className="sm:w-6/12 md:w-4/12">
                <div className="hidden text-grayHenry md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none">
                    <button
                        type="button"
                        className="w-10 h-10 overflow-hidden border-grayHenry rounded-full text-grayHenry"
                        ref={btnDropdownRef}
                        onClick={() => {
                            dropdownPopoverShow
                                ? closeDropdownPopover()
                                : openDropdownPopover();
                        }}>
                        <svg
                            className="object-cover w-full h-full fill-grayHenry"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M16 9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13C10.9391 13 9.92172 12.5786 9.17157 11.8284C8.42143 11.0783 8 10.0609 8 9C8 7.93913 8.42143 6.92172 9.17157 6.17157C9.92172 5.42143 10.9391 5 12 5C13.0609 5 14.0783 5.42143 14.8284 6.17157C15.5786 6.92172 16 7.93913 16 9V9ZM14 9C14 9.53043 13.7893 10.0391 13.4142 10.4142C13.0391 10.7893 12.5304 11 12 11C11.4696 11 10.9609 10.7893 10.5858 10.4142C10.2107 10.0391 10 9.53043 10 9C10 8.46957 10.2107 7.96086 10.5858 7.58579C10.9609 7.21071 11.4696 7 12 7C12.5304 7 13.0391 7.21071 13.4142 7.58579C13.7893 7.96086 14 8.46957 14 9V9Z"
                                fill="currentColor"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 1C5.925 1 1 5.925 1 12C1 18.075 5.925 23 12 23C18.075 23 23 18.075 23 12C23 5.925 18.075 1 12 1ZM3 12C3 14.09 3.713 16.014 4.908 17.542C5.74723 16.4399 6.8299 15.5467 8.07143 14.9323C9.31297 14.3179 10.6797 13.9988 12.065 14C13.4323 13.9987 14.7819 14.3095 16.0109 14.9088C17.2399 15.508 18.316 16.3799 19.157 17.458C20.0234 16.3216 20.6068 14.9952 20.8589 13.5886C21.111 12.182 21.0244 10.7355 20.6065 9.36898C20.1886 8.00243 19.4512 6.75505 18.4555 5.73004C17.4598 4.70503 16.2343 3.93186 14.8804 3.47451C13.5265 3.01716 12.0832 2.88877 10.6699 3.09997C9.25652 3.31117 7.91379 3.85589 6.75277 4.68905C5.59175 5.52222 4.64581 6.61987 3.99323 7.8912C3.34065 9.16252 3.00018 10.571 3 12V12ZM12 21C9.93395 21.0031 7.93027 20.2923 6.328 18.988C6.97293 18.0647 7.83134 17.3109 8.83019 16.7907C9.82905 16.2705 10.9388 15.9992 12.065 16C13.1772 15.9991 14.2735 16.2636 15.2629 16.7714C16.2524 17.2793 17.1064 18.0159 17.754 18.92C16.1393 20.2667 14.1026 21.0029 12 21V21Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                    <div
                        ref={popoverDropdownRef}
                        className={
                            (dropdownPopoverShow ? 'block ' : 'hidden ') +
                            'py-8 text-center rounded mr-14 overflow-hidden'
                        }
                        style={{ minWidth: '8rem' }}>
                        <a
                            href="#pablo"
                            className={
                                'text-sm text-white py-2 font-normal block whitespace-no-wrap bg-grayHenry'
                            }
                            onClick={(e) => e.preventDefault()}>
                            Ver Perfil
                        </a>
                        <a
                            href="#pablo"
                            className={
                                'text-sm text-white py-2 font-normal block whitespace-no-wrap bg-grayHenry '
                            }
                            onClick={(e) => e.preventDefault()}>
                            Editar Perfil
                        </a>
                        <a
                            href="#pablo"
                            className={
                                'text-sm text-white py-2 font-normal block whitespace-no-wrap bg-grayHenry '
                            }
                            onClick={() => exitLogout()}>
                            Salir
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropdownPerfil;
