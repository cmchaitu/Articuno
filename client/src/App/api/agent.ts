import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";

axios.defaults.baseURL = 'http://localhost:7070/api/';
axios.defaults.withCredentials = true;
const responsebody = (response: AxiosResponse) => response.data
const sleep = () => { new Promise(resolve => setTimeout(resolve, 100000)) }
//above arrow fn is similar to below
//function responsebosyfn(response: AxiosResponse) {
//    return response.data;
//}
//const resbody = responsebosyfn(response)

axios.interceptors.response.use(async response => {
    await sleep();
    return response
}, (error: AxiosError) => {
    const { data, status } = error.response! as any;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelstateerrors: string[] = []
                for (const problem in data.errors) {
                    modelstateerrors.push(data.errors[problem])
                }
                throw modelstateerrors.flat();
            }
            toast.error(data.title)
            break;
        case 401:
            toast.error(data.title)
            break;
        case 500:
            history.push({
                pathname: '/server-error',
                state: { error: data }
            })
            break;
        default:
            break;
    }
    return Promise.reject(error.response)
})
const requests = {
    'get': (url: string) => axios.get(url).then(responsebody),
    'post': (url: string, body: {}) => axios.post(url, body).then(responsebody),
    'put': (url: string, body: {}) => axios.put(url, body).then(responsebody),
    'delete': (url: string) => axios.delete(url).then(responsebody)
}

const catalog = {
    list: () => requests.get('products'),
    details: (id: string) => requests.get(`products/${id}`)
}

const testerrors = {
    get404error: () => requests.get('error/not-found'),
    get400error: () => requests.get('error/bad-request'),
    get401error: () => requests.get('error/unauthorized'),
    getvalidationerror: () => requests.get('error/validation-error'),
    get500error: () => requests.get('error/server-error'),
}
const Basket = {
    get: () => requests.get('basket'),
    addItem: (productid: number, quantity = 1) => requests.post(`basket?productID=${productid}&quantity=${quantity}`, {}),
    removeItem: (productid: number, quantity = 1) => requests.delete(`basket?productID=${productid}&quantity=${quantity}`)
}
const agent = {
    catalog,
    testerrors,
    Basket
}

//const requests = {
//    get: (url: string) => axios.get(url, { headers: { "Access-Control-Allow-Credentials": "true" } }).then(responseBody),
//    post: (url: string, body: {}) => axios.post(url, body, { headers: { "Access-Control-Allow-Credentials": "true" }, }).then(responseBody),
//    put: (url: string, body: {}) => axios.put(url, body, { headers: { "Access-Control-Allow-Credentials": "true" }, }).then(responseBody), delete: (url: string) => axios.delete(url, { headers: { "Access-Control-Allow-Credentials": "true" } }).then(responseBody),
//};

export default agent