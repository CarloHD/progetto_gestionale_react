import { Link, useOutletContext } from 'react-router-dom'
import { Card } from '../UI/Card'
import { Negozio } from '../models/negozio'
import { Articolo } from '../models/articolo'
import { User } from '../models/user'

import classi from './CSS/PageListContext.module.css'

export const PageListContent: React.FC<{
  testoPlaceholder: string
  lista: Negozio[] | Articolo[]
}> = ({ testoPlaceholder, lista }) => {
  const userLogged: User = useOutletContext()

  const isLogged = userLogged?.isLogged

  const listaItem = lista.map(item => (
    <li key={item.nome} title={item.nome}>
      <Card bottomText={item.nome}>
        <div
          className={classi.cardImmagine}
          style={{ backgroundImage: 'url(' + item.immagine + ')' }}
        />
        <Link to={item.nome} />
      </Card>
    </li>
  ))

  return (
    <ul className={classi.lista}>
      {listaItem.length > 0 ? (
        listaItem
      ) : (
        <p
          style={{
            flexBasis: '100%',
            textAlign: 'center',
            fontSize: '1.2rem',
            color: '#ffb700',
            fontWeight: '600'
          }}
        >
          Lista vuota
        </p>
      )}
      {isLogged && (
        <li>
          <Card
            className={classi.cardPlaceholder}
            bottomText={`Aggiungi ${testoPlaceholder}`}
          >
            <div>
              <span className={classi.cardAddIcon} />
            </div>
            <Link to={`nuovo-${testoPlaceholder}`}></Link>
          </Card>
        </li>
      )}
    </ul>
  )
}
