function RatingModal({ setShowRatings, ratings }) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'>
      <div className='bg-blackcc rounded-lg p-6 max-w-md w-full shadow-lg relative'>
        <button
          className='absolute cursor-pointer top-2 right-3 text-white text-xl'
          onClick={() => setShowRatings(false)}
          aria-label='Cerrar'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M18 6l-12 12' />
            <path d='M6 6l12 12' />
          </svg>
        </button>
        <h3 className='text-lg font-bold mb-4 text-white'>Calificaciones</h3>
        {ratings.length === 0 ? (
          <div className='text-whitec/70 text-sm'>
            No hay calificaciones aún.
          </div>
        ) : (
          <ul className='space-y-3'>
            {ratings.map((rating) => (
              <li key={rating.id} className='border-b border-whitec/10 pb-2'>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold text-yellow-300'>
                    {'★'.repeat(rating.score)}
                  </span>
                  <span className='text-xs text-whitec/70 ml-2'>
                    {rating.createdAt ? rating.createdAt : ''}
                  </span>
                </div>
                <div className='text-sm text-white'>{rating.comment}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
export default RatingModal
