// export const BASE_URL = 'https://api.mestogram.students.nomoredomains.work';
export const BASE_URL =
  'http://localhost:3001';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(
      `Error: ${res.status}`
    );
  }
}

function checkEmptyResponse(res) {
  if (res.ok) {
    return Promise.resolve({});
  } else {
    return Promise.reject({
      status: res.status,
      text: `Error: ${res.status}`,
    });
  }
}

export const register = (
  email,
  name,
  about,
  password
) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type':
        'application/json',
    },
    body: JSON.stringify({
      email,
      name,
      about,
      password,
    }),
  }).then(checkResponse);
};

export const login = (
  email,
  password
) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type':
        'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
    credentials: 'include',
  }).then(checkEmptyResponse);
};

export const signout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'GET',
    credentials: 'include',
  }).then(checkEmptyResponse);
};
