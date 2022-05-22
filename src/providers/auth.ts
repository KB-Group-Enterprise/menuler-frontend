import { AxiosResponse } from 'axios';
import { http } from './http';
import { computed, reactive, readonly, ref } from 'vue';
import { injectStrict } from '../utils/injectStrict';
import { AuthKey } from '../symbols/symbol';

function getTokenFromResponse(response: AxiosResponse<any, any>): string {
  return response.data.data.accessToken;
}

const state = reactive({
  loggedIn: false,
  user: null as any,
});

async function login(credentials: any) {
  try {
    const res = await http.post('/login', credentials);
    const accessToken = getTokenFromResponse(res);
    // set access token to local storage
    console.log('new aceess token', accessToken);
    localStorage.setItem('access_token', accessToken);
    await fetchProfile();
    return res;
  } catch (error: any) {
    console.error(error);
    return error.response;
  }
}

async function loginWithToken(token: string) {
  try {
    // const res = await http.get('/t', { params: { t: token } } );
    // const accessToken = getTokenFromResponse(res);
    // set access token to local storage
    // console.log('new aceess token', accessToken);
    localStorage.setItem('access_token', token);
    await fetchProfile();
    return { };
  } catch (error: any) {
    console.error(error);
    return error.response;
  }
}

async function fetchProfile() {
  try {
    const res = await http.get('/profile');
    const profile = res.data;
    state.loggedIn = true;
    state.user = profile;
    return res;
  } catch (error: any) {
    console.error(error);
    return error.response;
  }
}

async function logout() {
  localStorage.removeItem('access_token');
  state.loggedIn = false;
  state.user = null;
}

export const auth = {
  login,
  logout,
  fetchProfile,
  loginWithToken,
  state: readonly(state),
};

export function useAuth() {
  return injectStrict(AuthKey);
}
