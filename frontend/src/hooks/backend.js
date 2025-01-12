import { useState } from 'react';
import axios from '../config/axios';

export const useBackend = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const call = async (endpoint, method = 'GET', body = null, config = {}) => {
        try {
            setLoading(true);
            const response = await axios({
                url: endpoint,
                method,
                data: body,
                ...config,
            });
            return response.data;
        } catch (err) {
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return [call, loading, error];
};
