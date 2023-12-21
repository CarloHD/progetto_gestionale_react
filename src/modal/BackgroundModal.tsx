import classi from './BackgroundModal.module.css'

export const BackgroundModal: React.FC<{
  toggleVisibilityLoginModal: () => void
}> = ({ toggleVisibilityLoginModal }) => {
  return (
    <div
      onClick={() => {
        toggleVisibilityLoginModal()
      }}
      className={classi.backgroundModal}
    ></div>
  )
}
