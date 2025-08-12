import { baseApi } from '@/lib/api/baseApi';

type LoginRequest = { email: string; password: string };
type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
  user?: { id: string | number; name?: string; role?: string };
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authApi;
