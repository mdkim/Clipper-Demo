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
            console.log("getClips() return 1, res.Clips.length=" + res.Clips.length);
            return res;
        });
    console.log("getClips() return 2, res.Clips.length=" + res.Clips.length);
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
            console.log("updateFavorite() return 1, res=" + res);
            return res;
        });
    console.log("updateFavorite() return 2, res=" + res);
    return res;
};

const get500 = async () => {
    await axios_client
        .get('/api/error', {});
}

export {
    getPrograms,
    getProgram,
    getClips,
    getClip,
    getFavorites,
    updateFavorite,
    get500
};
