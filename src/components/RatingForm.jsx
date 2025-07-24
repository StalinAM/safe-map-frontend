import { useState } from 'react'
import { useRatingsStore } from '../store/ratingsStore'

function RatingForm({ placeId, onRated }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [msg, setMsg] = useState('')
  const postRating = useRatingsStore((state) => state.postRating)
  const loading = useRatingsStore((state) => state.loading)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (rating > 0 && rating <= 5 && comment.trim() !== '') {
      const ok = await postRating(placeId, rating, comment)
      if (ok) {
        setMsg('¡Gracias por tu calificación!')
        setRating(0)
        setComment('')
        if (onRated) onRated()
      } else {
        setMsg('Ya enviaste la calificación para este lugar')
      }
    } else {
      setMsg('Selecciona una calificación y escribe un comentario')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-2 mt-4 border-t pt-4'
    >
      <label>
        Califica este lugar:
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className='rounded-lg border border-whitec/20 bg-transparent px-2 py-1'
        >
          <option value={0}>Selecciona</option>
          <option value={1}>1 ⭐</option>
          <option value={2}>2 ⭐</option>
          <option value={3}>3 ⭐</option>
          <option value={4}>4 ⭐</option>
          <option value={5}>5 ⭐</option>
        </select>
      </label>
      <label>
        Comentario:
        <input
          type='text'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='rounded-lg border border-whitec/20 bg-transparent px-2 py-1 w-full mt-1'
          placeholder='Escribe tu comentario'
        />
      </label>
      <button
        className='cursor-pointer bg-blackc rounded-xl px-4 py-2 text-whitec hover:text-white'
        type='submit'
        disabled={loading}
      >
        Enviar
      </button>
      <div className='text-green-600 text-xs'>{msg}</div>
    </form>
  )
}
export default RatingForm
