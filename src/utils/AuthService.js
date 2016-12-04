import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router';
import isTokenValid from './JwtHelpers.js';

class AuthService {
  constructor(clientId, domain, redirectUrl) {
    this.lock = new Auth0Lock(clientId, domain, {
      auth: { redirectUrl: redirectUrl, responseType: 'token' }
    })

    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.lock.on('authenticated', this.handleAuthentication);
    this.show = this.show.bind(this)
  }

  handleAuthentication(authResult) {
    localStorage.setItem('id_token', authResult.idToken)
    browserHistory.replace('/app')
  }

  show() {
    this.lock.show()
  }

  getToken() {
    return localStorage.getItem('id_token')
  }

  isAuthenticated() {
    return !!this.getToken() && isTokenValid(this.getToken());
  }
}

export default AuthService;
