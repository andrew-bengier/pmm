import axios from 'axios';

export function http() {
    return axios.create({baseURL: 'http://localhost:8080/api', headers: generateJsonHeaders()})
}

export function generateJsonHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Content-Type': 'application/json',
        'X-User-ID': 'pmm-ui'
    };
}