import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { HiSun, HiMoon, HiMenuAlt3, HiX } from 'react-icons/hi';
import './Navbar.css';

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = navLinks.map(l => l.href.replace('#', ''));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && el.getBoundingClientRect().top <= 150) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setMobileOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__container container">
                <a href="#home" className="navbar__logo" onClick={(e) => handleNavClick(e, '#home')}>
                    <span className="navbar__logo-text">Rendy Setyawan</span>
                </a>

                <div className={`navbar__menu ${mobileOpen ? 'navbar__menu--open' : ''}`}>
                    <ul className="navbar__links">
                        {navLinks.map(link => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className={`navbar__link ${activeSection === link.href.replace('#', '') ? 'navbar__link--active' : ''}`}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="navbar__actions">
                    <button className="navbar__theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
                        {theme === 'dark' ? <HiSun size={20} /> : <HiMoon size={20} />}
                    </button>
                    <button
                        className="navbar__mobile-btn"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
                    </button>
                </div>
            </div>
            {mobileOpen && <div className="navbar__overlay" onClick={() => setMobileOpen(false)} />}
        </nav>
    );
}
