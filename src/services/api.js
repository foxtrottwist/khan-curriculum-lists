const BASE_URL = 'https://www.khanacademy.org/api/v1/topic/'

export const get = endPoint =>
  fetch(BASE_URL + endPoint).then(response => response.json())
