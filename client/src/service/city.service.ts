import getConfig from 'next/config';

import { fetchWrapper } from './fetch-wrapper';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/cities`;

export const cityService = {
  getAll,
  insertCity
};

function getAll () {
  return fetchWrapper.get(baseUrl)
}

function insertCity (data: string) {
  return fetchWrapper.post(baseUrl + '/add', data)
}
