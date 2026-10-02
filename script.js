/*
  Khan Autos — progressive enhancement
  GSAP is optional: the showcase, navigation, and reveals all have a native fallback.
*/

document.documentElement.classList.add('js')

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const desktopShowcase = window.matchMedia('(min-width: 761px)')

function initHeader() {
  const header = document.querySelector('[data-header]')
  const toggle = document.querySelector('.nav-toggle')
  const navigation = document.querySelector('.primary-nav')

  if (!header) return

  const updateHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 18)
  }

  updateHeader()
  window.addEventListener('scroll', updateHeader, { passive: true })

  if (!toggle || !navigation) return

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false')
    navigation.classList.remove('is-open')
    header.classList.remove('is-menu-open')
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true'
    toggle.setAttribute('aria-expanded', String(!isOpen))
    navigation.classList.toggle('is-open', !isOpen)
    header.classList.toggle('is-menu-open', !isOpen)
  })

  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu))
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) closeMenu()
  })
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu()
  })
}

function initActiveNavigation() {
  const links = [...document.querySelectorAll('.primary-nav a[href^="#"]')]
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean)
    .filter((section) => section.id !== 'home' || section.classList.contains('hero'))

  if (!('IntersectionObserver' in window) || sections.length === 0) return

  const visible = new Map()
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => visible.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0))
      let bestSection = null
      let bestRatio = 0
      visible.forEach((ratio, section) => {
        if (ratio > bestRatio) {
          bestSection = section
          bestRatio = ratio
        }
      })
      if (!bestSection) return
      links.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${bestSection.id}`))
    },
    { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.2, 0.5, 0.8] },
  )

  sections.forEach((section) => observer.observe(section))
}

function initReveals() {
  const items = [...document.querySelectorAll('[data-reveal]')]
  if (items.length === 0) return

  if (prefersReducedMotion) {
    items.forEach((item) => item.classList.add('is-visible'))
    return
  }

  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger)
    items.forEach((item) => {
      const delay = Number(item.dataset.delay || 0) * 0.08
      window.gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.72,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
          once: true,
        },
      })
    })
    return
  }

  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const delay = Number(entry.target.dataset.delay || 0) * 80
        window.setTimeout(() => entry.target.classList.add('is-visible'), delay)
        currentObserver.unobserve(entry.target)
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
  )

  items.forEach((item) => observer.observe(item))
}

function initShowcase() {
  const showcase = document.querySelector('[data-showcase]')
  if (!showcase) return

  const steps = [...showcase.querySelectorAll('[data-step]')]
  const progressButtons = [...showcase.querySelectorAll('[data-progress-step]')]
  const progressBar = showcase.querySelector('[data-progress-bar]')
  const currentStep = showcase.querySelector('[data-current-step]')
  const car = showcase.querySelector('[data-car-illustration]')
  const carLabel = showcase.querySelector('[data-car-label]')
  const zoneName = showcase.querySelector('[data-zone-name]')
  const stepContainer = showcase.querySelector('[data-showcase-steps]')
  if (steps.length === 0) return

  let activeIndex = 0
  const zoneElements = [...showcase.querySelectorAll('.car-zone[data-zone]')]

  const setActiveStep = (index) => {
    const nextIndex = Math.max(0, Math.min(steps.length - 1, index))
    const step = steps[nextIndex]
    const zone = step.dataset.zone
    activeIndex = nextIndex

    steps.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex === nextIndex))
    progressButtons.forEach((button, buttonIndex) => {
      button.classList.toggle('is-active', buttonIndex === nextIndex)
      button.classList.toggle('is-complete', buttonIndex < nextIndex)
      if (buttonIndex === nextIndex) button.setAttribute('aria-current', 'step')
      else button.removeAttribute('aria-current')
    })
    zoneElements.forEach((item) => item.classList.toggle('is-active', item.dataset.zone === zone))
    if (car) car.dataset.activeZone = zone
    if (currentStep) currentStep.textContent = String(nextIndex + 1).padStart(2, '0')
    if (carLabel) carLabel.textContent = step.dataset.label || step.dataset.zone
    if (zoneName) zoneName.textContent = step.querySelector('.step-kicker')?.textContent || 'Diagnostic system'

    if (progressBar) {
      const progress = (nextIndex / (steps.length - 1)) * 100
      progressBar.style.height = `${progress}%`
      progressBar.style.width = `${progress}%`
    }
  }

  const focusStep = (index) => {
    const step = steps[index]
    if (!step) return
    if (desktopShowcase.matches) {
      step.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' })
    } else if (stepContainer) {
      const left = step.offsetLeft - (stepContainer.clientWidth - step.offsetWidth) / 2
      stepContainer.scrollTo({ behavior: prefersReducedMotion ? 'auto' : 'smooth', left })
    }
  }

  progressButtons.forEach((button) => {
    button.addEventListener('click', () => focusStep(Number(button.dataset.progressStep)))
  })

  setActiveStep(0)

  if (!desktopShowcase.matches && 'IntersectionObserver' in window && stepContainer) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveStep(Number(visible.target.dataset.step))
      },
      { root: stepContainer, threshold: [0.35, 0.6, 0.9] },
    )
    steps.forEach((step) => observer.observe(step))
  } else if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger)
    steps.forEach((step, index) => {
      window.ScrollTrigger.create({
        trigger: step,
        start: 'top 56%',
        end: 'bottom 56%',
        onEnter: () => setActiveStep(index),
        onEnterBack: () => setActiveStep(index),
      })
    })
    window.ScrollTrigger.create({
      trigger: showcase,
      start: 'top top+=100',
      end: 'bottom bottom',
      onUpdate: (trigger) => {
        const index = Math.min(steps.length - 1, Math.floor(trigger.progress * steps.length))
        if (index !== activeIndex) setActiveStep(index)
      },
    })
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveStep(Number(visible.target.dataset.step))
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: [0.1, 0.4, 0.8] },
    )
    steps.forEach((step) => observer.observe(step))
  }

  window.addEventListener('resize', () => {
    if (window.gsap && window.ScrollTrigger) window.ScrollTrigger.refresh()
  }, { passive: true })
}

function initImageFallbacks() {
  document.querySelectorAll('img[data-fallback]').forEach((image) => {
    const fallback = image.dataset.fallback
    if (!fallback) return

    const applyFallback = () => {
      if (image.dataset.fallbackApplied === 'true') return
      image.dataset.fallbackApplied = 'true'
      image.src = fallback
    }

    image.addEventListener('error', applyFallback, { once: true })
    if (image.complete && image.naturalWidth === 0) applyFallback()
  })
}

function initContactForm() {
  const form = document.querySelector('[data-contact-form]')
  const status = document.querySelector('[data-form-status]')
  if (!form || !status) return

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    if (!form.reportValidity()) return
    status.textContent = 'Thanks — your request is ready. Connect this form to your preferred email or CRM endpoint before launch.'
    form.reset()
  })
}

function initPlaceholderLinks() {
  document.querySelectorAll('[data-placeholder-link]').forEach((link) => {
    const href = link.getAttribute('href') ?? ''
    if (href === '' || href === '#') {
      link.addEventListener('click', (event) => event.preventDefault())
    }
  })
}

function initYear() {
  const year = document.querySelector('[data-year]')
  if (year) year.textContent = new Date().getFullYear()
}

function init() {
  initHeader()
  initActiveNavigation()
  initReveals()
  initShowcase()
  initImageFallbacks()
  initContactForm()
  initPlaceholderLinks()
  initYear()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true })
} else {
  init()
}
