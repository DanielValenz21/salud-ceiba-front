import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

// Debug wrapper to log all requests/responses
const baseQuery: typeof rawBaseQuery = async (args, api, extraOptions) => {
  try {
    const path = typeof args === 'string' ? args : args.url;
    const method = typeof args === 'string' ? 'GET' : (args.method || 'GET');
    const body = typeof args === 'string' ? undefined : args.body;
    const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${path?.startsWith('/') ? '' : '/'}${path}`;
    // Logs on browser console (client-side), helpful to verify URL & payload
    console.log('[RTKQ] Request:', { method, path, fullUrl, body });

    const result = await rawBaseQuery(args, api, extraOptions);

    if ('error' in result && result.error) {
      console.error('[RTKQ] Error:', result.error);
    } else {
      console.log('[RTKQ] Success:', (result as any).data);
    }
    return result;
  } catch (e) {
    console.error('[RTKQ] Unexpected error:', e);
    throw e;
  }
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Auth'],
  endpoints: () => ({}),
});
