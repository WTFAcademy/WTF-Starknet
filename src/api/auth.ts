import request from "@site/src/api/request";


export const login = (address: string) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({uid: '111', address});
        }, 200);
    })
    // return request.get(`/userinfo?/userinfo?network=stark_net&address=${address}`).then(res => res.data);
}