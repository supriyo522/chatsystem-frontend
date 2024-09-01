import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://chatsystem-backend.onrender.com/api';

export const crawlWebsite = (url) => axios.post(`${API_URL}/crawler/crawl`, { url });
export const getWebsites = () => axios.get(`${API_URL}/crawler/websites`);
export const processContent = (websiteId, query) => axios.post(`${API_URL}/ai/process`, { websiteId, query });


