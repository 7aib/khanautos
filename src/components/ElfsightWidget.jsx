import { useEffect } from 'react'
import site from '../data/site'
import './ElfsightWidget.css'

export default function ElfsightWidget() {
  const { elfsight } = site

  useEffect(() => {
    if (!elfsight?.appId) return
    if (document.querySelector('script[data-elfsight-platform]')) return

    const script = document.createElement('script')
    script.src = elfsight.platformScript || 'https://static.elfsight.com/platform/platform.js'
    script.setAttribute('data-elfsight-platform', elfsight.useServiceCore ? 'true' : '')
    script.async = true
    script.defer = true
    document.body.appendChild(script)
  }, [elfsight])

  if (!elfsight?.appId) return null

  return (
    <div className="elfsight-widget">
      <div
        className={`elfsight-app-${elfsight.appId}`}
        data-elfsight-app-lazy=""
        data-elfsight-app-id={elfsight.appId}
        {...(elfsight.alias ? { 'data-elfsight-app-alias': elfsight.alias } : {})}
      />
    </div>
  )
}