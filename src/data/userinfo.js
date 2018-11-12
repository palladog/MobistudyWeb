// Simple object store
var user = {
  loggedin: false,
  role: undefined,
  _key: undefined,
  token: undefined
}
let userstr = window.localStorage.getItem('user')
if (userstr) {
  try {
    user = JSON.parse(userstr)
    console.log('User info set', user)
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
    user.token = newuser.token
    window.localStorage.setItem('user', JSON.stringify(user))
    console.log('User info set', user)
  },
  logout () {
    user = {
      loggedin: false,
      role: undefined,
      _key: undefined,
      token: undefined
    }
    window.localStorage.removeItem('user')
    console.log('User info unset')
  }
}
