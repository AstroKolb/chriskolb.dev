import axios from 'axios';

const PORT = process.env.PORT || 3001;

const getBaseUrl = (host: string): string => {
   if (host.includes('localhost') || host.includes('192')) return `http://${host}:${PORT}/api`;
   return '/api';
};

export const baseUrl = getBaseUrl(window.location.hostname);

export const getStorage = (): Promise<any> => {
   const request = axios.get(`${baseUrl}/storage`);
   return request.then((response) => response.data);
};

export const postStorage = (data: Record<string, any>): Promise<any> => {
   const request = axios.post(`${baseUrl}/storage`, data);
   return request.then((response) => response.data);
};
