import { useState, useCallback, useRef, useEffect, useContext } from 'react';

import axios from 'axios';

const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const activeHttpRequest = useRef([]);

    const baseUrl = 'http://localhost:8800/';

    const sendRequest = useCallback(async (url, method = 'get', body = null, config = {}) => {
        const options = { headers: { ...config, Authorization: `Bearer` } };

        setIsLoading(true);
        try {
            const response = await axios[method](baseUrl + url, body);
            const responseData = await response;
            setIsLoading(false);
            return responseData;
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    }, []);

    const clearError = () => setError(null);

    useEffect(() => {
        return () => {
            activeHttpRequest.current.forEach((abortCtrl) => abortCtrl.abort());
        };
    }, []);
    return { isLoading, error, sendRequest, clearError, baseUrl };
};

export default useHttpClient;
