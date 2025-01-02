import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getFetcher = async <T>(url: string): Promise<T> => {
  const { data } = await axios.get<T>(url);
  return data;
};

export const postFetcher = async <T, D = unknown>(
  url: string,
  body: D,
): Promise<T> => {
  const { data } = await axios.post<T>(url, body);
  return data;
};

export const putFetcher = async <T, D = unknown>(
  url: string,
  body: D,
): Promise<T> => {
  const { data } = await axios.put<T>(url, body);
  return data;
};

export const patchFetcher = async <T, D = unknown>(
  url: string,
  body: D,
): Promise<T> => {
  const { data } = await axios.patch<T>(url, body);
  return data;
};

export const deleteFetcher = async <T>(url: string): Promise<T> => {
  const { data } = await axios.delete<T>(url);
  return data;
};
