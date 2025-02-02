import React from 'react';
import { useEffect } from 'react';
import { useBackend } from '../../hooks/backend';
import { ToastContainer, toast } from 'react-toastify';

export const ErrorNotifier = ({ children }) => {
    const notify = (message) => toast(message);
    const { error } = useBackend();

    useEffect(() => {
        if (error != null) {
            console.log(error);
            notify(error);
        }
    }, [error]);

    return (
        <>
            {children}
            <ToastContainer />
        </>
    );
};
