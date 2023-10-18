

export const base = 'https://norma.nomoreparties.space/api'
export const ingredients = base + '/ingredients'
export const orders = base + '/orders'


export const login = base + '/auth/login'
export const register = base + '/auth/register'
export const logout = base + '/auth/logout'
export const token = base + '/auth/token'

export const passwordReset = base + '/password-reset'
export const doResetPassword = passwordReset + '/reset'
export const user = base + '/auth/user'

export const url = {
  base,
  ingredients,
  orders,
  login,
  register,
  logout,
  token,
  passwordReset,
  doResetPassword,
  user
}
// export const loginURL = baseURL + '/auth/login'
// export const loginURL = baseURL + '/auth/login'
// export const loginURL = baseURL + '/auth/login'
// export const loginURL = baseURL + '/auth/login'


export const checkResponse = (response) => {
    if (!response.ok) {
      console.log(response)
      throw new Error(`Server Error: ${response.status} ${response.statusText}`);
    }
    return response.json(); // Return the response if it is ok
  };

// export const checkResponse = (res) => {
//   return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
// };

export const request = (url, options) => {
    // принимает два аргумента: урл и объект опций, как и `fetch
    return fetch(url, options).then(checkResponse)
  }

  export const requestWithRefresh = (url, options) => {
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
  
export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};


export const api ={
  fetchWithRefresh
}