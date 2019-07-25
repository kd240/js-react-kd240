const url = 'https://flighter-hw7.herokuapp.com/api/';

export async function get(model) {
  return fetch(`${url}${model}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => (res.errors ? Promise.reject(res.errors) : res));
}

export async function getAuthorized(model, appState) {
  return fetch(`${url}${model}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: appState.sessionToken,
    },
  })
    .then((res) => res.json())
    .then((res) => (res.errors ? Promise.reject(res.errors) : res));
}

export async function post(model, body) {
  return fetch(`${url}${model}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => (res.errors ? Promise.reject(res.errors) : res));
}

export async function postAuthorized(model, body, appState) {
  return fetch(`${url}${model}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: appState.sessionToken,
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => (res.errors ? Promise.reject(res.errors) : res));
}

export async function postImage(appState, image) {
  return fetch('https://isa-js-upload.andreicek.dev/upload', {
    method: 'POST',
    headers: {
      Authorization: appState.sessionToken,
    },
    body: image,
  })
    .then((res) => res.json())
    .then((res) => (res.errors ? Promise.reject(res.errors) : res));
}
