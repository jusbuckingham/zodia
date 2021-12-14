const axios = require('axios');
const API_KEY = "3d143eff77msh6039e0b14e7fccfp1c7584jsn25fe684757ac";

const searchTerm = 'scorpio';

axios.get(`https://sameer-kumar-aztro-v1.p.rapidapi.com/?client_id=${API_KEY}&&query=${searchTerm}`) // /users/:username/photos
.then(response => {
    // console.log(response.data);
    const array = response.data.results;
    for (let i = 0; i < array.length; i++) {
        let photoObj = array[i];
        let fullPhoto = photoObj.urls.full;
        console.log(fullPhoto);
    }
});