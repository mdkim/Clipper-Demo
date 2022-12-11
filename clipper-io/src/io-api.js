import axios from 'axios';

const axios_client = axios.create({
  baseURL: 'http://localhost:8080'
})

function buildAuthorization() {
    /*
    return ({headers: {
        'Authorization':
        `Bearer ${authProvider.accessToken}`
    }});*/
}

/*
* getPrograms
*/
const getPrograms = () => {
    return axios_client.get('/api/programs', {});
};

/*
* getProgram
*/
const getProgram = (programId) => {
    return axios_client.get('/api/programs/' + programId, {});
};

/*
* getClips
*/
const getClips = (programId) => {
    return getClips.get('/api/programs/' + programId + '/clips', {});
};

/*
* getClip
*/
const getClip = (clipId) => {
    return axios_client.get('/api/clips/' + clipId, {});
};

export {
    getPrograms,
    getProgram,
    getClips,
    getClip
};
