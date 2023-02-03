const Axios = require('axios');

const BASE_URL = 'https://api.wtf.academy/';

let request = Axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
});

// request.interceptors.request.use(async (config) => {
//     const accountInfo = localStorage.getItem('supabase.auth.token');
//
//     if (accountInfo) {
//         let access_token = JSON.parse(accountInfo)['currentSession']['access_token'];
//
//         console.log("token过期：", accountInfo.expiresAt);
//         if (+new Date() >= accountInfo.expiresAt * 1000) {
//             console.log('过期')
//             access_token = await refreshSession();
//         }
//
//         config.headers.Authorization = `Bearer ${access_token}`;
//     }
//
//     return config;
// })

export default request;