export const logoutHandler = () => {
  localStorage.removeItem('isLogged')
  localStorage.removeItem('userLogged')
}
