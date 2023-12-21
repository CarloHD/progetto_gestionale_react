import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PayloadNegozio } from '../models/dispatch'
import { Negozio } from '../models/negozio'
import { useRef } from 'react'

import classi from './CSS/Form.module.css'

export const FormNegozio: React.FC<{
  tipoForm: string
  datiNegozio?: Negozio
  indexNegozio?: number
}> = ({ tipoForm, datiNegozio, indexNegozio }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const inputNome = useRef<HTMLInputElement>(null)
  const inputDescrizione = useRef<HTMLInputElement>(null)
  const inputImmagine = useRef<HTMLInputElement>(null)

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    const nomeNegozio =
      inputNome.current!.value.charAt(0).toUpperCase() +
      inputNome.current!.value.slice(1)

    const type = tipoForm

    const payload: PayloadNegozio = {
      negozio: {
        nome: nomeNegozio,
        descrizione: inputDescrizione.current!.value,
        articoli: datiNegozio!.articoli,
        immagine: inputImmagine.current!.value
      },

      indexNegozio
    }

    dispatch({ type, payload })

    navigate('/')
  }

  return (
    <form className={classi.form} onSubmit={submitHandler}>
      <label htmlFor='nome'>Nome negozio</label>
      <input
        ref={inputNome}
        required
        type='text'
        id='nome'
        name='nome'
        defaultValue={datiNegozio?.nome}
      />
      <label htmlFor='descrizione'>Descrizione negozio</label>
      <input
        ref={inputDescrizione}
        required
        type='text'
        id='descrizione'
        name='descrizione'
        defaultValue={datiNegozio?.descrizione}
      />
      <label htmlFor='immagine'>Scegli logo</label>
      <input
        ref={inputImmagine}
        required
        type='text'
        id='immagine'
        name='immagine'
        defaultValue={datiNegozio?.immagine}
      />

      <button>Salva negozio</button>
    </form>
  )
}
