import classi from './CSS/PageHeader.module.css'

export const PageHeader: React.FC<{
  testoHeader?: string
  immagine: string
}> = ({ testoHeader, immagine }) => {
  return (
    <>
      <header className={classi.header}>
        <img src={immagine} alt='' />
        <h1 className='blurLeaf'>{testoHeader}</h1>
      </header>
    </>
  )
}
