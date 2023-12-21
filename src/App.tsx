import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/GestionaleContext'

import { Root } from './pages/Root'
import { Home } from './pages/Home'
import { DettagliNegozio } from './pages/negozio/DettagliNegozio'
import { DettagliArticolo } from './pages/articolo/DettagliArticolo'
import { ErrorPage } from './pages/PageError'
import { NuovoNegozio } from './pages/negozio/NuovoNegozio'
import { NuovoArticolo } from './pages/articolo/NuovoArticolo'
import { ModificaArticolo } from './pages/articolo/ModificaArticolo'
import { ModificaNegozio } from './pages/negozio/ModificaNegozio'

import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'nuovo-negozio',
        element: <NuovoNegozio />
      },

      {
        path: ':nomeNegozio',
        children: [
          { index: true, element: <DettagliNegozio /> },
          { path: 'modifica-negozio', element: <ModificaNegozio /> },

          { path: 'nuovo-articolo', element: <NuovoArticolo /> },
          {
            path: ':nomeArticolo',
            children: [
              { index: true, element: <DettagliArticolo /> },
              { path: 'modifica-articolo', element: <ModificaArticolo /> }
            ]
          }
        ]
      }
    ]
  }
])

function App () {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
