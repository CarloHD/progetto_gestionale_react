import ReactDOM from 'react-dom'
import { BackgroundModal } from './BackgroundModal'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { loginHandler } from '../auth/login'
import { User } from '../models/user'

import classi from './LoginModal.module.css'
import { actionTypes } from '../models/dispatch'

export const LoginModal: React.FC<{
  toggleVisibilityLoginModal: () => void
}> = ({ toggleVisibilityLoginModal }) => {
  const userInput = useRef<HTMLInputElement>(null)
  const passInput = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const listaUsers = useSelector(
    (state: { listaUsers: User[] }) => state.listaUsers
  )

  const onLoginSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const userValue = userInput.current!.value
    const passValue = passInput.current!.value

    const loginResult = loginHandler(listaUsers, userValue, passValue)

    if (loginResult) {
      dispatch({ type: actionTypes.login, payload: { userName: userValue } })
      toggleVisibilityLoginModal()
    }
  }

  return (
    <>
      {ReactDOM.createPortal(
        <BackgroundModal
          toggleVisibilityLoginModal={toggleVisibilityLoginModal}
        />,
        document.getElementById('background-modal-root')!
      )}
      {ReactDOM.createPortal(
        <div className={classi.formLogin}>
          <form onSubmit={onLoginSubmit} className='blurLeaf'>
            <label htmlFor='user'>Utente</label>
            <input ref={userInput} className='blurLeaf' type='text' id='user' />
            <label htmlFor='password'>Password</label>
            <input
              ref={passInput}
              className='blurLeaf'
              type='password'
              id='password'
            />
            <button className='blurLeaf'>Login</button>
          </form>
        </div>,
        document.getElementById('modal-root')!
      )}
    </>
  )
}
