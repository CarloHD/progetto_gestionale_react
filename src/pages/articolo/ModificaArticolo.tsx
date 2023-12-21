import { Navigate, useOutletContext, useParams } from 'react-router-dom'
import { PageContent } from '../../UI/PageContent'
import { FormArticolo } from '../../components/FormArticolo'
import { PageHeader } from '../../components/PageHeader'

import { useSelector } from 'react-redux'
import { Negozio } from '../../models/negozio'

import classi from './NuovoArticolo.module.css'

export const ModificaArticolo: React.FC = () => {
  const params = useParams()
  const userLogged = useOutletContext()

  const nomeArticolo = params.nomeArticolo
  const nomeNegozio = params.nomeNegozio

  const negozio = useSelector((state: { listaNegozi: Negozio[] }) =>
    state.listaNegozi.find(negozio => negozio.nome === nomeNegozio)
  )

  const indexArticolo = negozio!.articoli.findIndex(
    articolo => articolo.nome === nomeArticolo
  )

  const articolo = negozio!.articoli[indexArticolo]

  if (!userLogged) {
    return <Navigate to={'../'} replace />
  }

  return (
    <>
      <PageHeader immagine='' testoHeader={`Modifica ${nomeArticolo}`} />
      <PageContent>
        <FormArticolo
          tipoForm='modifica-articolo'
          datiArticolo={articolo}
          indexArticolo={indexArticolo}
        />
      </PageContent>
    </>
  )
}
