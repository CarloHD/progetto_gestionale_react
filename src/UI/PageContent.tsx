import classi from './PageContent.module.css'

export const PageContent: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => {
  return (
    <div className={`${classi.content} ${className}`}>
           {children}
    </div>
  )
}
