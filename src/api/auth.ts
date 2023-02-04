import request from "@site/src/api/request";


export const login = (address: string) => {
    return request.post(`/userinfo`, {
        network: 'stark_net',
        address: address
    }).then(res => res.data);
}