import Cookies from 'js-cookie'

let loginTokenKey = '_syd_identity'

export default {
  SetLoginToken(token) {
    let inFifteenMinutes = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);
    return Cookies.set(loginTokenKey, token,{expires: inFifteenMinutes})
  },

  GetLoginToken() {
      return Cookies.get(loginTokenKey)
  },

  DeleteLoginToken() {
      return Cookies.remove(loginTokenKey)
  },
}
