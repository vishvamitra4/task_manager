import { ImCross } from "react-icons/im";
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-white w-4/5 md:w-1/2 p-6 rounded shadow-lg z-10">
                        {children}
                        <button
                            className="absolute top-3 right-3 mt-4 mr-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                            onClick={onClose}
                        >
                            <ImCross className="text-5xl text-red-800" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
