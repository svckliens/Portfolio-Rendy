import { useState, useEffect, useCallback } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Testimonials.css';

const testimonials = [
    {
        name: 'Isyeh Salma Bilqis Nabila',
        role: 'Mahasiswa Teknik Informatika',
        avatar: '👩‍💼',
        text: 'Dia adalah teman saya sejak perkuliahan, dia sangat rajin dan berkeinginan tinggi dalam belajar. Dia juga sangat aktif dalam kegiatan organisasi dan selalu berusaha untuk memberikan yang terbaik.',
        rating: 5,
    },
    {
        name: 'Ekaprana Wijaya',
        role: 'CEO of Lumintu Sejahtera Mandiri',
        avatar: '👨‍💻',
        text: 'Dia adalah peserta magang di perusahaan saya, dia sangat kreatif dan memiliki sifat problem solver tinggi. Dia juga sangat aktif dalam kegiatan organisasi dan selalu berusaha untuk memberikan yang terbaik.',
        rating: 5,
    },
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const headerRef = useScrollReveal();
    const cardRef = useScrollReveal();

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
    }, []);

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        if (!isAutoPlaying) return;
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [isAutoPlaying, nextSlide]);

    return (
        <section id="testimonials" className="section testimonials">
            <div className="container">
                <div className="section-header reveal" ref={headerRef}>
                    <span className="section-label">Testimonials</span>
                    <h2 className="section-title">What People Say</h2>
                    <p className="section-subtitle">
                        Feedback from clients and colleagues I've had the pleasure of working with
                    </p>
                </div>

                <div
                    className="testimonials__slider reveal"
                    ref={cardRef}
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    <div className="testimonials__track" style={{ transform: `translateX(-${current * 100}%)` }}>
                        {testimonials.map((t, i) => (
                            <div key={i} className="testimonials__slide">
                                <div className="testimonials__card glass-card">
                                    <div className="testimonials__quote">"</div>
                                    <p className="testimonials__text">{t.text}</p>
                                    <div className="testimonials__stars">
                                        {Array.from({ length: t.rating }).map((_, j) => (
                                            <span key={j} className="testimonials__star">⭐</span>
                                        ))}
                                    </div>
                                    <div className="testimonials__author">
                                        <div className="testimonials__avatar">{t.avatar}</div>
                                        <div>
                                            <div className="testimonials__name">{t.name}</div>
                                            <div className="testimonials__role">{t.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="testimonials__controls">
                        <button className="testimonials__nav-btn" onClick={prevSlide} aria-label="Previous">
                            <FiChevronLeft size={20} />
                        </button>
                        <div className="testimonials__dots">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    className={`testimonials__dot ${i === current ? 'testimonials__dot--active' : ''}`}
                                    onClick={() => setCurrent(i)}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>
                        <button className="testimonials__nav-btn" onClick={nextSlide} aria-label="Next">
                            <FiChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
