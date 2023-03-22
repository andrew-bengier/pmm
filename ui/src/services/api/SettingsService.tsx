import axios, {AxiosPromise} from 'axios';
import {generateJsonHeaders} from '../utilService';

export async function getSyncServices(): Promise<AxiosPromise> {
    return axios.get('/api/syncservices', {headers: generateJsonHeaders(), timeout: 120000});
}