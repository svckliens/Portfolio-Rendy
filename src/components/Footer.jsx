import { FiGithub, FiLinkedin, FiInstagram, FiHeart, FiArrowUp } from 'react-icons/fi';
import './Footer.css';

const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    <div className="footer__brand">
                        <a href="#home" className="footer__logo">
                            <span className="footer__logo-text">Portfolio Rendy Setyawan</span>
                        </a>
                        <p className="footer__tagline">
                            Building digital experiences with passion and precision. Let's create something amazing together.
                        </p>
                        <div className="footer__socials">
                            <a href="https://github.com/svkcliens" target="_blank" rel="noreferrer" className="footer__social-link" aria-label="GitHub">
                                <FiGithub size={18} />
                            </a>
                            <a href="https://linkedin.com/in/svkcliens" target="_blank" rel="noreferrer" className="footer__social-link" aria-label="LinkedIn">
                                <FiLinkedin size={18} />
                            </a>
                            <a href="https://instagram.com/rendystywn_" target="_blank" rel="noreferrer" className="footer__social-link" aria-label="Instagram">
                                <FiInstagram size={18} />
                            </a>
                        </div>
                    </div>

                    <div className="footer__links">
                        <h4 className="footer__heading">Quick Links</h4>
                        <ul>
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} className="footer__link">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer__newsletter">
                        <h4 className="footer__heading">Stay Connected</h4>
                        <p className="footer__newsletter-text">
                            Get updates on my latest projects and blog posts.
                        </p>
                        <div className="footer__newsletter-form">
                            <input type="email" placeholder="Your email" className="footer__newsletter-input" />
                            <button className="footer__newsletter-btn">→</button>
                        </div>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © {new Date().getFullYear()} Portfolio. Made with <FiHeart className="footer__heart" /> by Rendy Setyawan
                    </p>
                    <button className="footer__scroll-top" onClick={scrollToTop} aria-label="Back to top">
                        <FiArrowUp size={18} />
                    </button>
                </div>
            </div>
        </footer>
    );
}
