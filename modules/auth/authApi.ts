import { baseApi } from '@/lib/api/baseApi';
import { getRefreshToken, clearTokens } from '@/lib/authStorage';

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
    logout: build.mutation<{ message?: string }, void>({
      query: () => {
        const rt = getRefreshToken();
        return {
          url: '/auth/logout',
          method: 'POST',
          body: rt ? { refreshToken: rt } : {},
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
          // ignore
        } finally {
          clearTokens();
          dispatch(baseApi.util.resetApiState());
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useLogoutMutation } = authApi;
