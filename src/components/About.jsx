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
        const duration = 2000;

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
    { icon: <FiCode />, value: '10+', label: 'Projects Completed' },
    { icon: <FiBriefcase />, value: '3+', label: 'Years Experience' },
    { icon: <FiAward />, value: '10+', label: 'Certifications' },
    { icon: <FiUsers />, value: '3+', label: 'Organizations' },
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
                    <h2 className="section-title">My Technical Focus</h2>
                    <p className="section-subtitle">
                        Get to know my technical background, core skill set, and software engineering philosophy
                    </p>
                </div>

                <div className="about__wrapper reveal" ref={contentRef}>
                    {/* Entire About Me inside a sleek glass-card Box */}
                    <div className="about__box glass-card">
                        <p className="about__text">
                            Hi! I am <strong>Aditya Rendy Setyawan</strong>, an Informatics Engineering student at Universitas Dian Nuswantoro passionate about building high-impact digital solutions. My core technical skills center around <strong>Fullstack Web Development</strong>, <strong>Data Analysis & Machine Learning</strong>, and <strong>Software Engineering Architecture</strong>.
                            <br /><br />
                            Through hands-on software projects and professional internships, I specialize in engineering modern web applications using <strong>various modern frameworks and technologies</strong>. I am focused on writing clean, scalable code, optimizing database structures, and building responsive UI/UX experiences.
                            <br /><br />
                            Additionally, I leverage data analytics techniques to process complex data into actionable insights and intelligent features, continuously expanding my technical capabilities to build robust, modern applications.
                        </p>
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
