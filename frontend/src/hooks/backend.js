import { useCallback, useState } from 'react';
import axios from '../config/axios';

export const STATUS_OK = 'OK';
export const STATUS_ERROR = 'ERROR';

export const useBackend = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const ok = (data) => {
        return {
            status: STATUS_OK,
            data,
        };
    };

    const fail = (data) => {
        return {
            status: STATUS_ERROR,
            data,
        };
    };

    const call = useCallback(
        async (
            endpoint,
            method = 'GET',
            body = null,
            user = null,
            config = {}
        ) => {
            try {
                setLoading(true);

                const headers = { 'Content-Type': 'application/json' };

                if (user) {
                    headers.Authorization = `Bearer ${user.token}`;
                }

                const response = await axios({
                    url: endpoint,
                    method,
                    data: body,
                    headers,
                });

                if (response.status !== 200) {
                    setError('Response failed');
                }

                return ok(response.data);
            } catch (err) {
                setError(err.response.data);

                return fail(null);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return { call, loading, error };
};
