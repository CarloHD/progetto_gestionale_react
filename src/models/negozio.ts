import { Articolo } from './articolo'

export interface Negozio {
  nome: string
  descrizione: string
  immagine: string
  articoli: Articolo[]

  // constructor (
  //   nome: string,
  //   descrizione: string,
  //   immagine: string,
  //   articoli: Articolo[] = []
  // ) {
  //   this.nome = nome
  //   this.descrizione = descrizione
  //   this.immagine = immagine
  //   this.articoli = articoli
  // }
}
