import { useEffect, useState } from 'react'

import {
  Link,
  useNavigate,
  useOutletContext,
  useParams
} from 'react-router-dom'
import { PageListContent } from '../../components/PageListContent'
import { PageHeader } from '../../components/PageHeader'
import { PageContent } from '../../UI/PageContent'
import { useDispatch, useSelector } from 'react-redux'
import { Negozio } from '../../models/negozio'
import { User } from '../../models/user'
import { PayloadNegozio, actionTypes } from '../../models/dispatch'

import classi from './DettagliNegozio.module.css'

export const DettagliNegozio: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const nomeNegozio = params.nomeNegozio

  const [datiNegozio, setDatiNegozio] = useState<Negozio>({
    nome: '',
    descrizione: '',
    immagine: '',
    articoli: []
  })

  const listaNegozi = useSelector(
    (state: { listaNegozi: Negozio[] }) => state.listaNegozi
  )

  const indexNegozio = listaNegozi.findIndex(
    negozio => negozio.nome === nomeNegozio
  )

  useEffect(() => {
    if (indexNegozio < 0) {
      navigate('/nuovo-negozio')
    } else {
      setDatiNegozio(listaNegozi[indexNegozio])
    }
  }, [])

  const eliminaNegozio: () => void = () => {
    const confirmDel = window.confirm('Vuoi davvero eliminare questo negozio?')

    if (confirmDel) {
      const dispatchObj: { type: string; payload: PayloadNegozio } = {
        type: actionTypes.eliminaNegozio,
        payload: { negozio: null, indexNegozio }
      }

      dispatch(dispatchObj)
      navigate(`/`)
    }

    return
  }

  const userLogged: User = useOutletContext()

  const isLogged = userLogged?.isLogged

  return (
    <>
      <PageHeader
        testoHeader={datiNegozio.nome}
        immagine={datiNegozio.immagine}
      />
      {isLogged && (
        <nav className={classi.navbar}>
          <ul>
            <li>
              <Link to={'modifica-negozio'} className='blurLeaf'>
                Modifica negozio
              </Link>
            </li>
            <li>
              <button className='blurLeaf' onClick={eliminaNegozio}>
                Elimina negozio
              </button>
            </li>
          </ul>
        </nav>
      )}

      <PageContent>
        <PageListContent
          lista={datiNegozio.articoli}
          testoPlaceholder='articolo'
        />
      </PageContent>
    </>
  )
}
