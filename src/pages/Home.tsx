import { useSelector } from 'react-redux'
import { PageContent } from '../UI/PageContent'
import { HomeHeader } from '../components/HomeHeader'
import { PageListContent } from '../components/PageListContent'

import { Negozio } from '../models/negozio'

export const Home: React.FC = () => {
  const listaNegozi = useSelector(
    (state: { listaNegozi: Negozio[] }) => state.listaNegozi
  )

  return (
    <>
      <HomeHeader>Centro Shopping</HomeHeader>
      <PageContent>
        <PageListContent testoPlaceholder='negozio' lista={listaNegozi} />
      </PageContent>
    </>
  )
}
