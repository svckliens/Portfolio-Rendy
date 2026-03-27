import { useScrollReveal, useMultiScrollReveal } from '../hooks/useScrollReveal';
import { FiBriefcase, FiBookOpen } from 'react-icons/fi';
import { useEffect, useState, useRef } from 'react';
import './Experience.css';

const experiences = [
    {
        type: 'work',
        title: 'Junior Web Developer and Data Analist',
        company: 'Freelance',
        period: '2025 - Present',
        description: 'Leading website architecture and implementing. Built scalable component systems and improved performance by 40%.',
        tags: ['JavaScript', 'Laravel', 'Python', 'Data Analist', 'Machine Learning', 'Deep Learning', 'AI', 'Data Science'],
    },
    {
        type: 'education',
        title: 'Chairman',
        company: 'Himpunan Mahasiswa Teknik Informatika - UDINUS',
        period: '2025 - 2026',
        description: 'Leading and managing the Computer Engineering student organization, responsible for planning, implementing, and evaluating work programs, as well as representing students in various internal and external forums.',
        tags: ['Leadership', 'Teamwork', 'Communication', 'Project Management', 'Event Planning', 'Public Speaking'],
    },
    {
        type: 'education',
        title: 'Informatics Engineering',
        company: 'Dian Nuswantoro University',
        period: '2023 - Present',
        description: 'Bachelor\'s degree in Informatics Engineering. Focused on web technologies, algorithms, and software engineering. Graduated with honors.',
        tags: ['Algorithms', 'Data Structures', 'Web Development', 'Data Science', 'Machine Learning', 'AI', 'Data Analist'],
    },
    {
        type: 'education',
        title: 'Science Major',
        company: 'SMA N 1 SEMARANG',
        period: '2020 - 2023',
        description: 'High school education with a focus on science and mathematics.',
        tags: ['Science', 'Math', 'English'],
    },
];

export default function Experience() {
    const headerRef = useScrollReveal();
    const setRef = useMultiScrollReveal(experiences.length);
    
    // Scroll progress state for the "snake" line
    const [scrollProgress, setScrollProgress] = useState(0);
    const timelineRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!timelineRef.current) return;
            
            const rect = timelineRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate how much of the timeline has been scrolled past
            // Start progress when the top of timeline enters the bottom of viewport
            // End progress when the bottom of timeline reaches the middle of viewport
            const startPos = windowHeight * 0.8; 
            const endPos = windowHeight * 0.4;
            
            const totalDistance = rect.height;
            const currentScrolled = startPos - rect.top;
            
            let progress = currentScrolled / totalDistance;
            
            // Clamp between 0 and 1
            progress = Math.max(0, Math.min(1, progress));
            
            setScrollProgress(progress * 100);
        };

        window.addEventListener('scroll', handleScroll);
        // Initial call
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="experience" className="section experience">
            <div className="container">
                <div className="section-header reveal" ref={headerRef}>
                    <span className="section-label">Experience</span>
                    <h2 className="section-title">My Journey So Far</h2>
                    <p className="section-subtitle">
                        A timeline of my professional experience and education milestones
                    </p>
                </div>

                <div className="experience__timeline" ref={timelineRef}>
                    <div className="experience__timeline-line">
                        <div 
                            className="experience__timeline-progress" 
                            style={{ height: `${scrollProgress}%` }}
                        />
                    </div>
                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className={`experience__item reveal ${index % 2 === 0 ? 'experience__item--left' : 'experience__item--right'}`}
                            ref={setRef(index)}
                        >
                            <div className="experience__dot" style={{
                                borderColor: scrollProgress > (index / experiences.length) * 100 ? 'var(--accent-primary)' : 'var(--border-color)',
                                transition: 'border-color 0.3s ease'
                            }}>
                                {exp.type === 'work' ? <FiBriefcase /> : <FiBookOpen />}
                            </div>
                            <div className="experience__card glass-card">
                                <div className="experience__period">{exp.period}</div>
                                <h3 className="experience__title">{exp.title}</h3>
                                <div className="experience__company">{exp.company}</div>
                                <p className="experience__description">{exp.description}</p>
                                <div className="experience__tags">
                                    {exp.tags.map((tag) => (
                                        <span key={tag} className="experience__tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
