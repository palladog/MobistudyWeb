// Simple object store
var user = {
  loggedin: false,
  role: undefined,
  email: undefined,
  _key: undefined,
  token: undefined
}
let userstr = window.localStorage.getItem('user')
if (userstr) {
  try {
    user = JSON.parse(userstr)
  } catch (err) {
    // nothing to be done
  }
}

export default {
  getUser () {
    return user
  },
  login (newuser) {
    user.loggedin = true
    user._key = newuser._key
    user.role = newuser.role
    user.email = newuser.email
    user.token = newuser.token
    window.localStorage.setItem('user', JSON.stringify(user))
  },
  logout () {
    user = {
      loggedin: false,
      role: undefined,
      email: undefined,
      _key: undefined,
      token: undefined
    }
    window.localStorage.removeItem('user')
  }
}
