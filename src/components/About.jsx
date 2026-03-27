import { useScrollReveal } from '../hooks/useScrollReveal';
import { FiCode, FiBriefcase, FiAward, FiUsers } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import './About.css';

const CountUp = ({ end, suffix }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        let startTimestamp = null;
        const duration = 2000; // 2 seconds

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOutProgress * end));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [isVisible, end]);

    return <span ref={ref}>{count}{suffix}</span>;
};
const stats = [
    { icon: <FiCode />, value: '10+', label: 'Projects' },
    { icon: <FiBriefcase />, value: '2+', label: 'Years Exp' },
    { icon: <FiAward />, value: '5+', label: 'Certificates' },
    { icon: <FiUsers />, value: '5+', label: 'Happy Clients' },
];

const galleryImages = [
    { src: '/about-1.jpg', alt: 'Program Kerja dari Himpunan Mahasiswa Teknik Informatika' },
    { src: '/about-2.jpg', alt: 'Foto Bersama Ketua Umum Ormawa FIK UDINUS' },
    { src: '/about-3.jpg', alt: 'Juara Abdidaya Ormawa 2025' },
];

export default function About() {
    const headerRef = useScrollReveal();
    const contentRef = useScrollReveal();
    const statsRef = useScrollReveal();

    return (
        <section id="about" className="section about">
            <div className="container">
                <div className="section-header reveal" ref={headerRef}>
                    <span className="section-label">About Me</span>
                    <h2 className="section-title">My Story & Journey</h2>
                    <p className="section-subtitle">
                        Get to know who I am, what drives me, and the path that led me here
                    </p>
                </div>

                <div className="about__grid">
                    {/* 3-Image Gallery */}
                    <div className="about__gallery reveal" ref={contentRef}>
                        {galleryImages.map((img, i) => (
                            <div className={`about__gallery-item about__gallery-item--${i + 1}`} key={i}>
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="about__gallery-img"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextElementSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="about__gallery-placeholder" style={{ display: 'none' }}>
                                    📷 {i + 1}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="about__content-col">
                        <h3 className="about__heading">
                            Innovating at the <span className="gradient-text">Intersection of Tech</span> and Leadership
                        </h3>
                        <p className="about__text">
                            Hi! I am Aditya Rendy Setyawan, an Informatics Engineering student passionate about building impactful digital solutions. My core interests lie at the intersection of AI, Data Analysis, and Project Management, creating technology purposefully designed to solve real world problems.
                            <br />
                            <br />
                            Through my professional internship and various community empowerment programs, I actively apply my technical skills to help local businesses digitalize and support tourism initiatives, driving positive, tangible impact for society.
                        </p>

                        {/* Story Box */}
                        <div className="about__story-box glass-card">
                            <div className="about__story-badge">📌 Currently</div>
                            <p className="about__story-text">
                                Beyond academics, I thrive in collaborative environments. Serving as the General Chair of the Informatics Engineering Student Association has profoundly shaped my leadership, communication, and strategic planning skills. It taught me the true value of teamwork in achieving major milestones—principles I bring into every project I handle.
                            </p>
                        </div>

                        <div className="about__highlights">
                            <div className="about__highlight">
                                <span className="about__highlight-icon">🎯</span>
                                <div>
                                    <strong>Problem Solver</strong>
                                    <p>I love tackling complex challenges</p>
                                </div>
                            </div>
                            <div className="about__highlight">
                                <span className="about__highlight-icon">🌱</span>
                                <div>
                                    <strong>Lifelong Learner</strong>
                                    <p>Always exploring new technologies</p>
                                </div>
                            </div>
                            <div className="about__highlight">
                                <span className="about__highlight-icon">🤝</span>
                                <div>
                                    <strong>Team Player</strong>
                                    <p>Great at collaboration & communication</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about__stats reveal" ref={statsRef}>
                    {stats.map((stat, i) => (
                        <div className="about__stat-card glass-card" key={i}>
                            <div className="about__stat-icon">{stat.icon}</div>
                            <div className="about__stat-value">
                                <CountUp end={parseInt(stat.value)} suffix={stat.value.replace(/[0-9]/g, '')} />
                            </div>
                            <div className="about__stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
