import { Articolo } from './articolo'
import { Negozio } from './negozio'

export interface Payload {
  negozio?: Negozio
  indexNegozio?: number
  articolo?: Articolo
  nomeNegozio?: string
  indexArticolo?: number
}

export enum actionTypes {
  aggiungiNegozio = 'aggiungi-negozio',
  aggiungiArticolo = 'aggiungi-articolo',
  modificaNegozio = 'modifica-negozio',
  modificaArticolo = 'modifica-articolo',
  eliminaNegozio = 'elimina-negozio',
  eliminaArticolo = 'elimina-articolo',

  login = 'login',
  logout = 'logout'
}
