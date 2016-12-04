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

function isTokenValid(token) {
  return getExp(token).valueOf() > new Date().valueOf()
}

export default isTokenValid;
