const httpsBase = 'https://norma.nomoreparties.space/api'


export const url = {
  ingredients : httpsBase + '/ingredients',
  orders : httpsBase + '/orders',
  login : httpsBase + '/auth/login',
  register : httpsBase + '/auth/register',
  logout : httpsBase + '/auth/logout',
  token : httpsBase + '/auth/token',
  passwordReset : httpsBase + '/password-reset',
  doResetPassword : httpsBase +  '/password-reset/reset',
  user : httpsBase + '/auth/user',
};

const wssBase = 'wss://norma.nomoreparties.space'

export const wssUrl = {
  feed : wssBase+ '/orders/all',
  userOrders: wssBase+ '/orders',
}

export const checkResponse = (response: Response) => {
    if (!response.ok) {
      console.log(response)
      throw new Error(`Server Error: ${response.status} ${response.statusText}`);
    }
    return response.json(); // Return the response if it is ok
  };

export const request = (url:string, options?:RequestInit) => {
    // принимает два аргумента: урл и объект опций, как и `fetch
    return fetch(url, options).then(checkResponse)
  }

  export const requestWithRefresh = (url:string, options:RequestInit) => {
    return fetchWithRefresh(url, options)
  }

export const refreshToken = () => {
  return fetch(url.token, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};


export const fetchWithRefresh = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options)
    return await checkResponse(res)
  } catch (err: any) { // Specify the type after the colon, not before
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      localStorage.setItem('accessToken', refreshData.accessToken);
      options.headers = {
        ...options.headers,
        authorization: refreshData.accessToken,
      };
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const api ={
  fetchWithRefresh
}