import getConfig from 'next/config';

import { fetchWrapper } from './fetch-wrapper';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export const dataService = {
  getAll,
  insertData
};

function getAll () {
  return fetchWrapper.get(baseUrl + '/datas')
}

function insertData (data: string) {
  return fetchWrapper.post(baseUrl + '/add-data', data)
}
