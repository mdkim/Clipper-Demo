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

/*
* getFavorites
*/
const getFavorites = async () => {
    let res = await axios_client
        .get('/api/favorites', {});
    return res;
};

/*
* updateFavorite
*/
const updateFavorite = async (clipId, isFavorite) => {
    let res = await axios_client
        .post('/api/favorites', {
            clipId: clipId,
            isFavorite: isFavorite
        }).then(res => {
            return res;
        });
    return res;
};

/*
* updateClientOrgId
*/
const apiUpdateClientOrgId = async (orgId) => {
    let res = await axios_client
        .put('/api/org', {
            orgId: orgId
        }).then(res => {
            return res;
        });
    return res;
};

const get500 = async () => {
    return await axios_client
        .get('/api/error500', {});
}

export {
    getPrograms,
    getProgram,
    getClips,
    getClip,
    getFavorites,
    updateFavorite,
    apiUpdateClientOrgId,
    get500
};
