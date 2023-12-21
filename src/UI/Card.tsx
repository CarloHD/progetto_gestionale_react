import classi from './Card.module.css'

export const Card: React.FC<{
  children: React.ReactNode
  bottomText: string
  className?: string
}> = ({ children, className, bottomText }) => {
  return (
    <div className={`blurLeaf  ${classi.card} ${className}`}>
      {children}
      <p>{bottomText}</p>
    </div>
  )
}
