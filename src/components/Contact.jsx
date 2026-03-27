import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { FiSend, FiMail, FiMapPin, FiPhone, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import './Contact.css';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('');
    const headerRef = useScrollReveal();
    const formRef = useScrollReveal();
    const infoRef = useScrollReveal();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const formDataToSubmit = {
                ...formData,
                access_key: "1fa9f69f-3709-4ce2-8c1a-b3f7d9ad49d6"
            };

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(formDataToSubmit)
            });

            const result = await response.json();
            if (result.success) {
                setStatus('sent');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }

        setTimeout(() => setStatus(''), 5000);
    };

    return (
        <section id="contact" className="section contact">
            <div className="container">
                <div className="section-header reveal" ref={headerRef}>
                    <span className="section-label">Contact</span>
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="section-subtitle">
                        Have a project in mind or want to collaborate? I'd love to hear from you!
                    </p>
                </div>

                <div className="contact__grid">
                    <div className="contact__info reveal-left" ref={infoRef}>
                        <h3 className="contact__info-title">Let's talk about your project</h3>
                        <p className="contact__info-text">
                            Feel free to reach out through the form or via any of the channels below.
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of something amazing.
                        </p>

                        <div className="contact__details">
                            <div className="contact__detail">
                                <div className="contact__detail-icon">
                                    <FiMail />
                                </div>
                                <div>
                                    <span className="contact__detail-label">Email</span>
                                    <span className="contact__detail-value">adityarendys2704@gmail.com</span>
                                </div>
                            </div>
                            <div className="contact__detail">
                                <div className="contact__detail-icon">
                                    <FiMapPin />
                                </div>
                                <div>
                                    <span className="contact__detail-label">Location</span>
                                    <span className="contact__detail-value">Semarang, Indonesia</span>
                                </div>
                            </div>
                            <div className="contact__detail">
                                <div className="contact__detail-icon">
                                    <FiPhone />
                                </div>
                                <div>
                                    <span className="contact__detail-label">Phone</span>
                                    <span className="contact__detail-value">+62 895 0212 5734</span>
                                </div>
                            </div>
                        </div>

                        <div className="contact__socials">
                            <a href="https://github.com/svkcliens" target="_blank" rel="noreferrer" className="contact__social-link" aria-label="GitHub">
                                <FiGithub size={20} />
                            </a>
                            <a href="https://linkedin.com/in/svkcliens" target="_blank" rel="noreferrer" className="contact__social-link" aria-label="LinkedIn">
                                <FiLinkedin size={20} />
                            </a>
                            <a href="https://instagram.com/rendystywn_" target="_blank" rel="noreferrer" className="contact__social-link" aria-label="Instagram">
                                <FiInstagram size={20} />
                            </a>
                        </div>
                    </div>

                    <form className="contact__form glass-card reveal-right" ref={formRef} onSubmit={handleSubmit}>
                        <div className="contact__form-group">
                            <label className="contact__label" htmlFor="name">Your Name</label>
                            <input
                                className="contact__input"
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div className="contact__form-group">
                            <label className="contact__label" htmlFor="email">Your Email</label>
                            <input
                                className="contact__input"
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="contact__form-group">
                            <label className="contact__label" htmlFor="subject">Subject</label>
                            <input
                                className="contact__input"
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Project Collaboration"
                            />
                        </div>
                        <div className="contact__form-group">
                            <label className="contact__label" htmlFor="message">Message</label>
                            <textarea
                                className="contact__textarea"
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell me about your project..."
                                rows={5}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary contact__submit-btn" disabled={status === 'sending'}>
                            <FiSend /> {status === 'sending' ? 'Sending...' : 'Send Message'}
                        </button>
                        {status === 'sent' && (
                            <div className="contact__success">
                                ✅ Message sent successfully! I'll get back to you soon.
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="contact__error" style={{ color: '#ef4444', marginTop: '12px', fontSize: '0.9rem' }}>
                                ❌ Failed to send message. Please check your Access Key or try again later.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
