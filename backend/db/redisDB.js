const axios = require('axios');

const REDIS_REST_URL = process.env.UPSTASH_REDIS_URL;     
const REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_TOKEN; 

const headers = {
  Authorization: `Bearer ${REDIS_REST_TOKEN}`,
};

/**
 * Set a key with optional expiry in seconds
 * @param {string} key 
 * @param {string} value 
 * @param {number} [ttl] Optional expiration time in seconds
 */
const set = async (key, value, ttl) => {
  const url = ttl
    ? `${REDIS_REST_URL}/set/${key}/${value}?EX=${ttl}`
    : `${REDIS_REST_URL}/set/${key}/${value}`;
  await axios.post(url, null, { headers });
};

/**
 * Get value by key
 * @param {string} key 
 * @returns {Promise<string|null>}
 */
const get = async (key) => {
  const res = await axios.get(`${REDIS_REST_URL}/get/${key}`, { headers });
  return res.data?.result ?? null;
};

/**
 * Delete key
 * @param {string} key 
 */
const del = async (key) => {
  await axios.post(`${REDIS_REST_URL}/del/${key}`, null, { headers });
};

/**
 * Exists key
 * @param {string} key 
 * @returns {Promise<boolean>}
 */
const exists = async (key) => {
  const res = await axios.get(`${REDIS_REST_URL}/exists/${key}`, { headers });
  return res.data?.result === 1;
};

module.exports = {
  set,
  get,
  del,
  exists,
};
