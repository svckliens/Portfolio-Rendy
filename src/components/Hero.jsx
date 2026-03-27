import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiInstagram, FiDownload, FiArrowRight } from 'react-icons/fi';
import './Hero.css';

const roles = ['Web Developer', 'Data Analist', 'Critical Thinker', 'Problem Solver', 'Tech Enthusiast'];

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        let timeout;

        if (!isDeleting && text === currentRole) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
        } else {
            timeout = setTimeout(() => {
                setText(isDeleting
                    ? currentRole.substring(0, text.length - 1)
                    : currentRole.substring(0, text.length + 1)
                );
            }, isDeleting ? 40 : 80);
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, roleIndex]);

    return (
        <section id="home" className="hero">
            <div className="hero__bg-effects">
                <div className="hero__orb hero__orb--1" />
                <div className="hero__orb hero__orb--2" />
                <div className="hero__orb hero__orb--3" />
                <div className="hero__grid-pattern" />
            </div>

            <div className="hero__container container">
                <div className="hero__content hero-animate">
                    <div className="hero__badge">
                        <span className="hero__badge-dot" />
                        Available for opportunities
                    </div>

                    <h1 className="hero__title">
                        Hi, I'm <span className="gradient-text">Rendy Setyawan</span>
                    </h1>

                    <div className="hero__typing">
                        <span className="hero__typing-text">{text}</span>
                        <span className="hero__cursor">|</span>
                    </div>

                    <p className="hero__description">
                        Passionate developer who loves building beautiful, performant, and user-friendly digital experiences.
                        Turning ideas into reality through clean code and creative design.
                    </p>

                    <div className="hero__cta">
                        <a href="#contact" className="btn btn-primary">
                            Let's Talk <FiArrowRight />
                        </a>
                        <a href="cv-rendy.pdf" download className="btn btn-outline">
                            <FiDownload /> Download CV
                        </a>
                    </div>

                    <div className="hero__socials">
                        <a href="https://github.com/svckliens" target="_blank" rel="noreferrer" className="hero__social-link" aria-label="GitHub">
                            <FiGithub size={20} />
                        </a>
                        <a href="https://linkedin.com/in/svckliens" target="_blank" rel="noreferrer" className="hero__social-link" aria-label="LinkedIn">
                            <FiLinkedin size={20} />
                        </a>
                        <a href="https://instagram.com/rendystywn_" target="_blank" rel="noreferrer" className="hero__social-link" aria-label="Instagram">
                            <FiInstagram size={20} />
                        </a>
                    </div>
                </div>

                <div className="hero__visual hero-animate hero-animate--delay">
                    <div className="hero__avatar-wrapper">
                        <div className="hero__avatar-ring" />
                        <div className="hero__avatar">
                            <img
                                src="/photo.jpg"
                                alt="Rendy Setyawan"
                                className="hero__avatar-img"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextElementSibling.style.display = 'flex';
                                }}
                            />
                            <div className="hero__avatar-placeholder" style={{ display: 'none' }}>
                                <span>YN</span>
                            </div>
                        </div>
                        <div className="hero__floating-badge hero__floating-badge--1">🔥 Laravel</div>
                        <div className="hero__floating-badge hero__floating-badge--2">🐘 PHP</div>
                        <div className="hero__floating-badge hero__floating-badge--3">🚀 Fast</div>
                    </div>
                </div>
            </div>

            <div className="hero__scroll-indicator">
                <div className="hero__scroll-mouse">
                    <div className="hero__scroll-dot" />
                </div>
                <span>Scroll Down</span>
            </div>
        </section>
    );
}
