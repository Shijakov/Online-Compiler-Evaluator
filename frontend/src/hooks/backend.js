import { useCallback, useState } from 'react';
import { useError } from './error';
import axios from '../config/axios';

export const STATUS_OK = 'OK';
export const STATUS_ERROR = 'ERROR';

export const useBackend = () => {
    const { setError } = useError();

    const [loading, setLoading] = useState(true);

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

    const changeError = useCallback(
        (message) => {
            setError(message);
            setTimeout(() => setError(null), 100);
        },
        [setError]
    );

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

                if (config.page) {
                    endpoint = endpoint + '?page=' + config.page;
                }

                const response = await axios({
                    url: endpoint,
                    method,
                    data: body,
                    headers,
                });

                if (Math.floor(response.status / 100) !== 2) {
                    changeError('Response failed');
                }

                return ok(response.data);
            } catch (err) {
                if (err.message) {
                    changeError(err.message);
                }
                if (err.response) {
                    changeError(err.response.data.message);
                }

                return fail(null);
            } finally {
                setLoading(false);
            }
        },
        [changeError]
    );

    return { call, loading };
};
