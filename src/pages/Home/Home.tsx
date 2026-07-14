import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { asset } from '../../lib/asset'
import './Home.scss'

const NAV_LINKS = [
  { to: '/staff', label: 'Staff' },
  { to: '/contact', label: 'Contact' },
  { to: '/events', label: 'Events' },
  { to: '/patreon', label: 'Patreon' },
  { to: '/join', label: 'Join Us' },
]

const INTRO_KEY = 'vsmp-intro-seen'

function sectionBlend(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  return 1 - Math.min(Math.max(rect.bottom / window.innerHeight, 0), 1)
}

function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const moreRef = useRef<HTMLElement>(null)
  const [heroBlend, setHeroBlend] = useState(0)
  const [aboutBlend, setAboutBlend] = useState(0)
  const [aboutVisible, setAboutVisible] = useState(false)
  const [moreVisible, setMoreVisible] = useState(false)
  const [showIntro] = useState(() => !sessionStorage.getItem(INTRO_KEY))

  useEffect(() => {
    if (showIntro) {
      sessionStorage.setItem(INTRO_KEY, '1')
    }
  }, [showIntro])

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (heroRef.current) setHeroBlend(sectionBlend(heroRef.current))
        if (aboutRef.current) setAboutBlend(sectionBlend(aboutRef.current))
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const about = aboutRef.current
    const more = moreRef.current
    if (!about || !more) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          if (entry.target === about) setAboutVisible(true)
          if (entry.target === more) setMoreVisible(true)
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(about)
    observer.observe(more)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`home${showIntro ? '' : ' home--skip-intro'}`}
      style={
        {
          '--hero-blend': heroBlend,
          '--about-blend': aboutBlend,
        } as CSSProperties
      }
    >
      {showIntro && <div className="intro-wipe" aria-hidden="true" />}

      <div className="home__bg" aria-hidden="true">
        <div className="home__bg-hero" />
        <div className="home__bg-about"/>
        <div className="home__bg-more" />
      </div>

      <section className="hero" ref={heroRef}>
        <div className="hero__texture" aria-hidden="true" />

        <div className="hero__content">
          <img
            src={asset('/assets/vsmp-logo.png')}
            alt="VSMP logo"
            className="hero__logo"
          />
          <div className="hero__title">
            <span className="hero__title-eyebrow">We Are</span>
            <span className="hero__title-name">V-SMP</span>
          </div>
        </div>

        <nav className="hero__nav" aria-label="Primary">
          {NAV_LINKS.map(({ to, label }) => (
            <Link key={label} to={to}>
              {label}
            </Link>
          ))}
        </nav>

        <a href="#about" className="hero__scroll-cue">
          <span className="hero__scroll-badge">
            <img
              src={asset('/assets/arrow-down.svg')}
              alt=""
              className="hero__scroll-arrow"
            />
          </span>
          <span className="hero__scroll-label">About Us</span>
        </a>
      </section>

      <section
        className={`about${aboutVisible ? ' about--visible' : ''}`}
        id="about"
        ref={aboutRef}
      >
        <div className="about__texture" aria-hidden="true" />

        <div className="about__content">
          <div className="about__panel">
            <h2>What is V-SMP?</h2>
            <p>
              V-SMP is a survival Minecraft server built by Vtubers, for
              Vtubers. Something some thing more text and stuff. Feel free to
              edit this and keep going with what you want to say!
            </p>
          </div>

          <img
            src={asset('/assets/vsmp-logo.png')}
            alt="VSMP logo"
            className="about__stamp"
          />
        </div>

        <nav className="about__nav" aria-label="Primary">
          {NAV_LINKS.map(({ to, label }) => (
            <Link key={label} to={to}>
              {label}
            </Link>
          ))}
        </nav>
      </section>

      {/* <section
        className={`more${moreVisible ? ' more--visible' : ''}`}
        id="more"
        ref={moreRef}
      >

        <div className="more__texture" aria-hidden="true" />
        <div className="more__content">
          <img
            src={asset('/assets/vsmp-logo.png')}
            alt="VSMP logo"
            className="more__stamp"
          />

          <div className="more__panel">
            <h2>Ready to join?</h2>
            <p>
              Insert funny catchphrase or cool. More info here. Or completely change the section to your liking!
            </p>
            <Link to="/join" className="more__cta">
              Join Us &rarr;
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  )
}

export default Home
