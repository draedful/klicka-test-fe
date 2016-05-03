//import fetch from 'whatwg-fetch';
import isObject from 'lodash/isObject';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
}

function parseJSON(response) {
    return response.json()
}


export default function(url, data, config) {

    return fetch(API_HOST + url, {
        method:  config ? config.method ? config.method : 'GET' : 'GET',
        body: isObject(data) ? JSON.stringify(data) : data
    })
        .then(checkStatus)
        .then(parseJSON)
        .catch(function(error) {
            console.log('request failed', error)
        })
}