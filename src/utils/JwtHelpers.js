import decode from 'jwt-decode';

function getExp(token){
  let decoded = decode(token)
  if(!decoded.exp) {
    return null
  }

  let date = new Date(0)
  date.setUTCSeconds(decoded.exp)
  return date
}

export function getSub(token){
  return decode(token).sub
}

export function isTokenValid(token) {
  return getExp(token).valueOf() > new Date().valueOf()
}
