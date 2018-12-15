import { ITEMS_PER_CHUNK } from './constants';
import { apiUrl } from '../../../config.json';


const buildProductsUrl = (pageSize, currentPage) => `${apiUrl}products?searchCriteria[pageSize]=${pageSize}&searchCriteria[currentPage]=${currentPage}`;

export const loadProducts = async (chunkNumber) => {
  const url = buildProductsUrl(ITEMS_PER_CHUNK, chunkNumber);
  const response = await fetch(url);

  if (!response.ok) {
    throw Error('failed to sign in');
  }

  return response.json();
};
