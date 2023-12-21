import { Navigate, useOutletContext, useParams } from 'react-router-dom'
import { PageContent } from '../../UI/PageContent'
import { actionTypes } from '../../models/dispatch'
import { useSelector } from 'react-redux'
import { FormNegozio } from '../../components/FormNegozio'
import { Negozio } from '../../models/negozio'
import { PageHeader } from '../../components/PageHeader'

import classi from './NuovoArticolo.module.css'

export const ModificaNegozio: React.FC = () => {
  const userLogged = useOutletContext()
  const params = useParams()
  const nomeNegozio = params.nomeNegozio

  const listaNegozi = useSelector(
    (state: { listaNegozi: Negozio[] }) => state.listaNegozi
  )
  const indexNegozio = listaNegozi.findIndex(
    negozio => negozio.nome === nomeNegozio
  )

  const negozio = listaNegozi[indexNegozio]

  if (!userLogged) {
    return <Navigate to={'../'} replace />
  }

  return (
    <>
      <PageHeader immagine='' testoHeader={`Modifica ${nomeNegozio}`} />
      <PageContent>
        <FormNegozio
          tipoForm={actionTypes.modificaNegozio}
          datiNegozio={negozio}
          indexNegozio={indexNegozio}
        />
      </PageContent>
    </>
  )
}
