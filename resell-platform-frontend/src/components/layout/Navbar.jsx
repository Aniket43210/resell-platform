import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logoImg from '../../assets/logo.png'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Home',        href: '#home' },
    { label: 'About',       href: '#about' },
    { label: 'Marketplace', href: '#items' },
    { label: 'Launch',      href: '#launch' },
  ]

  return (
    <>

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-8 ${scrolled ? 'py-3 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm' : 'py-4 bg-transparent'}`}>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>

          {/* ── Logo ── */}
          <a href="#home" className='flex items-center gap-2 text-decoration-none'>
            <img src={logoImg} alt="CampusCycle Logo" className='h-12 w-12 md:h-14 md:w-14 object-contain' />
            <div className='hidden sm:block'>
              <h3 className='text-lg font-bold text-gray-900 m-0 leading-tight'>{import.meta.env.VITE_APP_NAME || 'CampusCycle'}</h3>
              <p className='text-xs text-gray-600 m-0'>Student Marketplace</p>
            </div>
          </a>

          {/* ── Desktop Nav ── */}
          <nav className='hidden md:flex items-center gap-8'>
            {links.map(l => (
              <a key={l.href} href={l.href} className='text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors duration-200 relative after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-amber-600 after:transition-all after:duration-200 hover:after:w-full'>{l.label}</a>
            ))}
          </nav>

          {/* ── Desktop Buttons ── */}
          <div className='hidden md:flex items-center gap-3'>
            <button onClick={() => navigate('/auth')} className='px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200'>
              Sign In
            </button>
            <button onClick={() => navigate('/auth')} className='px-6 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors duration-200'>
              Sign Up
            </button>
          </div>

          {/* ── Mobile Menu Button ── */}
          <button
            type="button"
            onClick={() => setOpen(p => !p)}
            aria-label="Toggle navigation"
            className='md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200'
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        {open && (
          <div className='md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 bg-white rounded-lg shadow-lg px-3'>
            <nav className='flex flex-col gap-4'>
              {links.map(l => (
                <a key={l.href} href={l.href} className='text-base font-medium text-gray-700 hover:text-amber-600 transition-colors duration-200 py-2' onClick={() => setOpen(false)}>{l.label}</a>
              ))}
            </nav>
            <div className='flex flex-col gap-3 mt-6 pt-4 border-t border-gray-200'>
              <button onClick={() => { navigate('/auth'); setOpen(false); }} className='w-full py-3 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 text-center'>
                Sign In
              </button>
              <button onClick={() => { navigate('/auth'); setOpen(false); }} className='w-full py-3 text-base font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors duration-200 text-center'>
                Sign Up
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  )
}