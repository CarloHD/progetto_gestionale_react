import { Navigate, useOutletContext } from 'react-router-dom'
import { PageContent } from '../../UI/PageContent'
import { FormArticolo } from '../../components/FormArticolo'
import { PageHeader } from '../../components/PageHeader'
import { actionTypes } from '../../models/dispatch'

import classi from './NuovoArticolo.module.css'

export const NuovoArticolo: React.FC = () => {
  const userLogged = useOutletContext()

  if (!userLogged) {
    return <Navigate to={'../'} replace />
  }

  return (
    <>
      <PageHeader immagine='' testoHeader='Nuovo Articolo' />
      <PageContent>
        <FormArticolo tipoForm={actionTypes.aggiungiArticolo} />
      </PageContent>
    </>
  )
}
