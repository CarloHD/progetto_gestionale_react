import { Link, useLocation } from 'react-router-dom'
import { LoginModal } from '../modal/LoginModal'
import { useState } from 'react'
import { logoutHandler } from '../auth/logout'
import { useDispatch } from 'react-redux'
import { actionTypes } from '../models/dispatch'
import { User } from '../models/user'

import LoginLogo from '../assets/assignment_ind_FILL0_wght400_GRAD0_opsz48.svg'
import iconBack from '../assets/arrow_back_FILL0_wght400_GRAD0_opsz48.svg'
import classi from './CSS/MainNav.module.css'

export const MainNav: React.FC<{ userLogged: User | undefined }> = ({
  userLogged
}) => {
  const [visibleLoginModal, setVisibleLoginModal] = useState(false)
  const path = useLocation().pathname
  const dispatch = useDispatch()

  const toggleVisibilityLoginModal: () => void = () => {
    setVisibleLoginModal(prevState => !prevState)
  }

  const buttonLoginHandler = () => {
    toggleVisibilityLoginModal()
  }

  const buttonLogoutHandler = () => {
    logoutHandler()
    dispatch({ type: actionTypes.logout })
  }

  const isLogged = userLogged?.isLogged

  return (
    <>
      {visibleLoginModal && (
        <LoginModal toggleVisibilityLoginModal={toggleVisibilityLoginModal} />
      )}

      <nav className={classi.mainNav}>
        <div className={classi.control}>
          <Link
            to={'../'}
            relative='path'
            className='blurLeaf'
            style={path === '/' ? { visibility: 'hidden' } : undefined}
          >
            <img src={iconBack} />
          </Link>
        </div>
        <div className={classi.control}>
          <>
            {!isLogged && (
              <button
                className={`blurLeaf ${classi.login}`}
                onClick={buttonLoginHandler}
              >
                Login
                <img src={LoginLogo} />
              </button>
            )}

            {isLogged && (
              <button
                className={`blurLeaf ${classi.login}`}
                onClick={buttonLogoutHandler}
              >
                Logout
                <img src={LoginLogo} />
              </button>
            )}
          </>
        </div>
      </nav>
    </>
  )
}
