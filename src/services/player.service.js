import useHttpClient from 'hooks/useHttpClient';

const usePlayerService = () => {
    const { sendRequest } = useHttpClient();

    const path = 'players';

    const addPlayer = async (player) => {
        const response = await sendRequest(path, 'post', player, {
            'content-type': 'multipart/form-data'
        });
        console.log('response', response);
        if (response) {
            return response;
        }
    };
    const getAllPlayers = async () => {
        const response = await sendRequest(path, 'get');

        return response.data.response;
    };

    const editPlayer = async (data) => {
        const response = await sendRequest(path, 'put', data);
        console.log(response);

        return response;
    };

    const deletePlayer = async (id) => {
        console.log(id);
        const response = await sendRequest(`${path}/` + id, 'delete');
        console.log(response);
        return response;
    };

    const getPlayerById = async (id) => {
        const response = await sendRequest(`${path}/` + id, 'get');
        console.log(response);
        return response;
    };

    return {
        addPlayer,
        getAllPlayers,
        editPlayer,
        deletePlayer,
        getPlayerById
    };
};

export default usePlayerService;
