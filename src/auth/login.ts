export const loginHandler: (
  listaUsers: { userName: string; userPass: string }[],
  userValue: string,
  passValue: string
) => boolean = (listaUsers, userValue, passValue) => {
  let correctUser = false
  let correctPass = false

  listaUsers.forEach(user => {
    if (user.userName === userValue) {
      correctUser = true
    }
    if (user.userPass === passValue) {
      correctPass = true
    }
  })

  if (!correctUser || !correctPass) {
    alert('user non corretto')
  }

  if (correctUser && correctPass) {
    localStorage.setItem('isLogged', '1')
    localStorage.setItem('userLogged', userValue)

    return true
  }

  return false
}
