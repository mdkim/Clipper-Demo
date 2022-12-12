import axios from 'axios';

const axios_client = axios.create({
  baseURL: 'http://localhost:8080'
})

/*
function buildAuthorization() {
    return ({headers: {
        'Authorization':
        `Bearer ${authProvider.accessToken}`
    }});
}*/

/*
* getPrograms
*/
const getPrograms = async () => {
    return await axios_client.get('/api/programs', {});
};

/*
* getProgram
*/
const getProgram = async (programId) => {
    return await axios_client.get('/api/programs/' + programId, {});
};

/*
* getClips
*/
const getClips = async (programId) => {
    let res = await axios_client
        .get('/api/programs/' + programId + '/clips', {})
        .then(async (res) => {
            let resProgram = await getProgram(programId);
            res = { Clips: res.data.Clips, Program: resProgram.data };
            return res;
        });
    return res;
};

/*
* getClip
*/
const getClip = async (clipId) => {
    return await axios_client.get('/api/clips/' + clipId, {});
};

export {
    getPrograms,
    getProgram,
    getClips,
    getClip
};
