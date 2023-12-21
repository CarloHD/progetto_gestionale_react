import { Reducer, legacy_createStore } from 'redux'
import { Negozio } from '../models/negozio'
import { Articolo } from '../models/articolo'
import { User } from '../models/user'
import { Payload, actionTypes } from '../models/dispatch'

const listaUsers: User[] = [
  { userName: 'admin', userPass: 'admin', isLogged: false }
]

let listaNegozi: Negozio[] = []

const loadedListaNegozi = localStorage.getItem('listaNegozi')

if (loadedListaNegozi) {
  const loadedStoreObj = JSON.parse(loadedListaNegozi)

  listaNegozi = loadedStoreObj
}

const reducer: Reducer<
  {
    listaNegozi: Negozio[]
    listaUsers: User[]
  },
  {
    type: actionTypes
    payload: any
  }
> = (state = { listaNegozi, listaUsers }, action) => {
  if (action.type === actionTypes.aggiungiNegozio) {
    const nuovoNegozio: Negozio = action.payload.negozio

    return { ...state, listaNegozi: [...state.listaNegozi, nuovoNegozio] }
  }

  if (action.type === actionTypes.eliminaNegozio) {
    const indexNegozio = action.payload.indexNegozio

    const nomeNegozio = state.listaNegozi[indexNegozio].nome

    const updatedListaNegozi = [...state.listaNegozi].filter(
      negozio => negozio.nome !== nomeNegozio
    )

    return { ...state, listaNegozi: updatedListaNegozi }
  }

  if (action.type === actionTypes.modificaNegozio) {
    const indexNegozio = action.payload.indexNegozio
    const updatedNegozio = action.payload.negozio

    const updatedListaNegozi = [...state.listaNegozi]

    updatedListaNegozi.splice(indexNegozio, 1, updatedNegozio)

    return { ...state, listaNegozi: updatedListaNegozi }
  }

  if (action.type === actionTypes.aggiungiArticolo) {
    const nuovoArticolo: Articolo = action.payload.articolo

    const nomeNegozio: string = action.payload.nomeNegozio
    const indexNegozio = state.listaNegozi.findIndex(
      negozio => negozio.nome === nomeNegozio
    )
    const negozio = state.listaNegozi[indexNegozio]

    const updatedNegozio: Negozio = {
      nome: negozio.nome,
      descrizione: negozio.descrizione,
      immagine: negozio.immagine,
      articoli: [...negozio.articoli, nuovoArticolo]
    }

    const updatedListaNegozi = [...state.listaNegozi]
    updatedListaNegozi.splice(indexNegozio, 1, updatedNegozio)

    return { ...state, listaNegozi: updatedListaNegozi }
  }

  if (action.type === actionTypes.modificaArticolo) {
    const indexArticolo: number = action.payload.indexArticolo
    const updatedArticolo: Articolo = action.payload.articolo

    const nomeNegozio: string = action.payload.nomeNegozio
    const indexNegozio: number = state.listaNegozi.findIndex(
      negozio => negozio.nome === nomeNegozio
    )
    const negozio = state.listaNegozi[indexNegozio]

    const updatedNegozio: Negozio = {
      nome: negozio.nome,
      descrizione: negozio.descrizione,
      immagine: negozio.immagine,
      articoli: [...negozio.articoli]
    }
    updatedNegozio.articoli.splice(indexArticolo, 1, updatedArticolo)

    const updatedListaNegozi = [...state.listaNegozi]
    updatedListaNegozi.splice(indexNegozio, 1, updatedNegozio)

    return { ...state, listaNegozi: updatedListaNegozi }
  }

  if (action.type === actionTypes.eliminaArticolo) {
    const indexArticolo: number = action.payload.indexArticolo

    const nomeNegozio: string = action.payload.nomeNegozio
    const indexNegozio: number = state.listaNegozi.findIndex(
      negozio => negozio.nome === nomeNegozio
    )
    const negozio = state.listaNegozi[indexNegozio]

    const updatedNegozio = {
      nome: negozio.nome,
      descrizione: negozio.descrizione,
      immagine: negozio.immagine,
      articoli: [...negozio.articoli]
    }

    updatedNegozio.articoli.splice(indexArticolo, 1)

    const updatedListaNegozi = [...state.listaNegozi]
    updatedListaNegozi.splice(indexNegozio, 1, updatedNegozio)

    return { ...state, listaNegozi: updatedListaNegozi }
  }

  if (action.type === actionTypes.login) {
    const userName = action.payload.userName

    const updatedListaUsers = state.listaUsers.map(user => {
      if (user.userName === userName) {
        user.isLogged = true
      }
      return user
    })

    return {
      ...state,
      listaUsers: updatedListaUsers
    }
  }

  if (action.type === actionTypes.logout) {
    const updatedListaUsers = state.listaUsers.map(user => {
      user.isLogged = false
      return user
    })

    return {
      ...state,
      listaUsers: updatedListaUsers
    }
  }
  return state
}

export const store = legacy_createStore(reducer)

store.subscribe(() => {
  const storeState = store.getState().listaNegozi

  localStorage.setItem('listaNegozi', JSON.stringify(storeState))
})
