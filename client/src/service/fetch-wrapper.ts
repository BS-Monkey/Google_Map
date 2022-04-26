import getConfig from 'next/config';

import { cityService, actionService, dataService } from '../service';

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};

function get(url: string) {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(url, requestOptions);
}

function post(url: string, body: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    };
    // return fetch(url, requestOptions).then(handleResponse);
    return fetch(url, requestOptions);
}

function put(url: string, body: JSON) {
  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
  };
  return fetch(url, requestOptions);    
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url: string) {
  const requestOptions = {
      method: 'DELETE',
  };
  return fetch(url, requestOptions);
}