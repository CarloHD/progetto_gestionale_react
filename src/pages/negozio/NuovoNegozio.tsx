import { PageContent } from '../../UI/PageContent'
import { PageHeader } from '../../components/PageHeader'
import { FormNegozio } from '../../components/FormNegozio'
import { actionTypes } from '../../models/dispatch'
import { Navigate, useOutletContext } from 'react-router-dom'

import classi from './NuovoNegozio.module.css'

export const NuovoNegozio: React.FC = () => {
  const userLogged = useOutletContext()

  if (!userLogged) {
    return <Navigate to={'/'} replace />
  }
  return (
    <>
      <PageHeader immagine='' testoHeader='Nuovo Negozio' />
      <PageContent>
        <FormNegozio tipoForm={actionTypes.aggiungiNegozio} />
      </PageContent>
    </>
  )
}
