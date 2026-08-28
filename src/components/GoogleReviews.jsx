import { useEffect, useState } from 'react'
import site from '../data/site'
import './GoogleReviews.css'

function StarRating({ rating }) {
  return (
    <div className="google-review__stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          className={star <= Math.round(rating) ? 'star--filled' : 'star--empty'}
          aria-hidden="true"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  )
}

const CACHED = {}

function relativeTime(iso) {
  const then = new Date(iso)
  const diffMs = Date.now() - then.getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'} ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`
  const years = Math.floor(months / 12)
  return `${years} year${years === 1 ? '' : 's'} ago`
}

export default function GoogleReviews() {
  const [place, setPlace] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const placeId = site.placeId
    if (!placeId) return

    if (CACHED[placeId]) {
      setPlace(CACHED[placeId])
      return
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    const url = `https://places.googleapis.com/v1/places/${placeId}?fields=displayName,rating,userRatingCount,reviews,googleMapsUri&key=${apiKey}`

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Places API error: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        CACHED[placeId] = data
        setPlace(data)
      })
      .catch((err) => {
        console.error('Failed to load Google reviews:', err)
        setError(true)
      })
  }, [])

  if (error || (!place && !site.placeId)) return null

  if (!place) {
    return (
      <div className="google-reviews google-reviews--loading">
        <div className="google-reviews__summary loading-spinner" aria-label="Loading reviews" />
      </div>
    )
  }

  const reviews = place.reviews || []

  if (reviews.length === 0) return null

  return (
    <div className="google-reviews">
      <div className="google-reviews__summary">
        <div>
          <span className="google-reviews__rating">{place.rating || '—'}</span>
          <StarRating rating={place.rating || 0} />
          <span className="google-reviews__count">
            Based on {place.userRatingCount || 0} Google reviews
          </span>
        </div>
        <a className="google-reviews__all" href={place.googleMapsUri} target="_blank" rel="noopener noreferrer">
          Read all reviews on Google
        </a>
      </div>

      <div className="google-reviews__grid">
        {reviews.map((review, i) => (
          <div className="google-review" key={i}>
            <div className="google-review__head">
              {review.authorAttribution?.photoUri && (
                <img
                  className="google-review__avatar"
                  src={review.authorAttribution.photoUri}
                  alt={review.authorAttribution.displayName || 'Reviewer'}
                  loading="lazy"
                  width="36"
                  height="36"
                />
              )}
              <div>
                <p className="google-review__name">
                  {review.authorAttribution?.displayName || 'Google User'}
                </p>
                <div className="google-review__meta">
                  <StarRating rating={review.rating || 0} />
                  <span className="google-review__time">
                    {review.publishTime ? relativeTime(review.publishTime) : ''}
                  </span>
                </div>
              </div>
            </div>
            <p className="google-review__body">
              {review.originalText?.text || review.text?.text}
            </p>
          </div>
        ))}
      </div>

      <p className="google-reviews__attribution">Powered by Google</p>
    </div>
  )
}