const url = 'https://flighter-hw7.herokuapp.com/api/';

export async function get(model) {
  return fetch(`${url}${model}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => (res.ok ? res.json() : new Error(res.status)));
}

export async function getAuthorized(model, AppState) {
  return fetch(`${url}${model}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: AppState.sessionToken,
    },
  })
    .then((res) => (res.ok ? res.json() : new Error(res.status)));
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
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
}

export async function postAuthorized(model, body, AppState) {
  return fetch(`${url}${model}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: AppState.sessionToken,
    },
    body: JSON.stringify(body),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
}
