

export const baseURL = 'https://norma.nomoreparties.space/api'
export const ingredientsURL = baseURL + '/ingredients'
export const urlToOrder = baseURL + '/orders'


export const loginURL = baseURL + '/auth/login'
export const registerURL = baseURL + '/auth/register'
export const logoutURL = baseURL + '/auth/logout'
export const tokenURL = baseURL + '/auth/token'

export const passwordResetURL = baseURL + '/password-reset'
export const doResetPasswordURL = passwordResetURL + '/reset'

// export const loginURL = baseURL + '/auth/login'
// export const loginURL = baseURL + '/auth/login'
// export const loginURL = baseURL + '/auth/login'
// export const loginURL = baseURL + '/auth/login'


export const checkResponse = (response) => {
    if (!response.ok) {
      throw new Error(`Server Error: ${response.status} ${response.statusText}`);
    }
    return response.json(); // Return the response if it is ok
  };

export const request = (url, options) => {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(url, options).then(checkResponse)
  }

