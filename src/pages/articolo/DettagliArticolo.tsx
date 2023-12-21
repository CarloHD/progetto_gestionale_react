import {
  Link,
  useNavigate,
  useOutletContext,
  useParams
} from 'react-router-dom'
import { PageHeader } from '../../components/PageHeader'

import { PageContent } from '../../UI/PageContent'
import { useEffect, useState } from 'react'
import { Negozio } from '../../models/negozio'
import { Articolo } from '../../models/articolo'
import { User } from '../../models/user'
import { useDispatch, useSelector } from 'react-redux'
import { PayloadArticolo, actionTypes } from '../../models/dispatch'

import classi from './DettagliArticolo.module.css'

export const DettagliArticolo: React.FC = () => {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const userLogged: User = useOutletContext()

  const [datiArticolo, setDatiArticolo] = useState<Articolo>({
    nome: '',
    descrizione: '',
    immagine: '',
    prezzo: 0,
    quantita: 0
  })

  const nomeArticolo = params.nomeArticolo
  const nomeNegozio = params.nomeNegozio!

  const isLogged = userLogged?.isLogged

  const listaNegozi = useSelector(
    (state: { listaNegozi: Negozio[] }) => state.listaNegozi
  )

  const listaArticoli = listaNegozi.find(
    negozio => negozio.nome === nomeNegozio
  )!.articoli

  const indexArticolo = listaArticoli.findIndex(
    articolo => articolo.nome === nomeArticolo
  )

  useEffect(() => {
    if (indexArticolo < 0) {
      navigate('../nuovo-articolo')
    } else {
      setDatiArticolo(listaArticoli[indexArticolo])
    }
  }, [])

  const eliminaArticolo: () => void = () => {
    const confirmDel = window.confirm('Vuoi davvero eliminare questo articolo?')

    if (confirmDel) {
      const dispatchObj: { type: string; payload: PayloadArticolo } = {
        type: actionTypes.eliminaArticolo,
        payload: {
          articolo: null,
          indexArticolo,
          nomeNegozio
        }
      }

      dispatch(dispatchObj)
      navigate(`/${nomeNegozio}`)
    }

    return
  }

  return (
    <>
      <PageHeader testoHeader={nomeArticolo} immagine={datiArticolo.immagine} />
      {isLogged && (
        <nav className={classi.navbar}>
          <ul>
            <li>
              <Link to={'modifica-articolo'} className='blurLeaf'>
                Modifica articolo
              </Link>
            </li>
            <li>
              <button onClick={eliminaArticolo} className='blurLeaf'>
                Elimina articolo
              </button>
            </li>
          </ul>
        </nav>
      )}
      <PageContent>
        <article className={classi.articolo}>
          <p>
            <span>Prezzo: </span>
            <span>{datiArticolo.prezzo}€</span>
          </p>
          <p>
            <span>Quantità: </span>
            <span>{datiArticolo.quantita}</span>
          </p>
          <p>{datiArticolo.descrizione}</p>
        </article>
      </PageContent>
    </>
  )
}
