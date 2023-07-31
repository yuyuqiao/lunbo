import requests from './https'
// const baseUrl = 'http://113.12.81.82:10700/db'
// const baseUrl = 'http://219.159.133.35:10700/db'
// const baseUrl = 'http://192.168.1.198:8088/db'
// const baseUrl = 'http://192.168.1.187:80/db'
const baseUrl = import.meta.env.VITE_API_DOMAIN +'db'
export function db(params:any) {
    return requests.post(baseUrl, params)
}
