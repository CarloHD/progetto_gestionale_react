import classi from './CSS/HomeHeader.module.css'

export const HomeHeader: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <header className={classi.header}>
      <div className={classi.backgrounds}>
        <span className={classi.layer1} />
        <span className={classi.layer2} />
        <span className={classi.layer3} />
      </div>
      <h1 className='blurLeaf'>{children}</h1>
    </header>
  )
}
