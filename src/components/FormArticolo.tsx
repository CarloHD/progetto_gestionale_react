import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { PayloadArticolo } from '../models/dispatch'
import { Articolo } from '../models/articolo'

import { useRef } from 'react'

import classi from './CSS/Form.module.css'

export const FormArticolo: React.FC<{
  tipoForm: string
  datiArticolo?: Articolo
  indexArticolo?: number
}> = ({ tipoForm, datiArticolo, indexArticolo }) => {
  const params = useParams()
  const nomeNegozio = params.nomeNegozio!

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const inputNome = useRef<HTMLInputElement>(null)
  const inputDescrizione = useRef<HTMLInputElement>(null)
  const inputImmagine = useRef<HTMLInputElement>(null)
  const inputPrezzo = useRef<HTMLInputElement>(null)
  const inputQuantita = useRef<HTMLInputElement>(null)

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    const nomeArticolo =
      inputNome.current!.value.charAt(0).toUpperCase() +
      inputNome.current!.value.slice(1)

    const type = tipoForm

    const payload: PayloadArticolo = {
      articolo: {
        nome: nomeArticolo,
        immagine: inputImmagine.current!.value,
        descrizione: inputDescrizione.current!.value,
        prezzo: +inputPrezzo.current!.value,
        quantita: +inputQuantita.current!.value
      },

      nomeNegozio,
      indexArticolo
    }

    dispatch({ type, payload })

    navigate(`/${nomeNegozio}`)
  }

  return (
    <form className={classi.form} onSubmit={submitHandler}>
      <label htmlFor='nome'>Nome articolo</label>
      <input
        ref={inputNome}
        required
        type='text'
        id='nome'
        name='nome'
        defaultValue={datiArticolo?.nome}
      />
      <label htmlFor='descrizione'>Descrizione articolo</label>
      <input
        ref={inputDescrizione}
        required
        type='text'
        id='descrizione'
        name='descrizione'
        defaultValue={datiArticolo?.descrizione}
      />
      <label htmlFor='immagine'>Scegli immagine</label>
      <input
        ref={inputImmagine}
        required
        type='text'
        id='immagine'
        name='immagine'
        defaultValue={datiArticolo?.immagine}
      />
      <label htmlFor='quantita'>Quantità articolo</label>
      <input
        ref={inputQuantita}
        required
        type='number'
        id='quantita'
        name='quantita'
        min={0}
        defaultValue={datiArticolo?.quantita || 0}
        step={1}
      />
      <label htmlFor='prezzo'>Prezzo articolo</label>
      <div>
        <input
          ref={inputPrezzo}
          required
          type='number'
          id='prezzo'
          name='prezzo'
          min={0}
          placeholder='0.00'
          step={0.01}
          defaultValue={datiArticolo?.prezzo}
        />
        <span>€</span>
      </div>
      <button>Salva articolo</button>
    </form>
  )
}
