import { Outlet } from 'react-router-dom'
import { MainNav } from '../components/MainNav'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from '../models/dispatch'
import { User } from '../models/user'

export const Root: React.FC = () => {
  const dispatch = useDispatch()

  /**
   *
   * Load sessione in login
   *
   */

  useEffect(() => {
    const isLogged = localStorage.getItem('isLogged')

    if (isLogged) {
      const userLogged = localStorage.getItem('userLogged')

      dispatch({ type: actionTypes.login, payload: { userName: userLogged } })
    }
  }, [])

  /**
   *
   *  User loggato
   *
   */

  const listaUsers = useSelector(
    (state: { listaUsers: User[] }) => state.listaUsers
  )

  const userLogged = listaUsers.find(user => user.isLogged === true)

  return (
    <>
      <MainNav userLogged={userLogged} />
      <Outlet context={userLogged} />
    </>
  )
}
