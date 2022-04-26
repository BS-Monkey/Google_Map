import getConfig from 'next/config';

import { fetchWrapper } from './fetch-wrapper';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/actions`;

export const actionService = {
  getAll,
  insertAction
};

function getAll () {
  return fetchWrapper.get(baseUrl)
}

function insertAction (data: string) {
  return fetchWrapper.post(baseUrl + '/add', data)
}
