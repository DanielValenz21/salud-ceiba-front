export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";

export const getAccessToken = () =>
  typeof window !== "undefined" ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;

export const getRefreshToken = () =>
  typeof window !== "undefined" ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;

export const setTokens = (accessToken: string, refreshToken?: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const clearTokens = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};
