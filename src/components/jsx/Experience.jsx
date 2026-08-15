import { useScrollReveal, useMultiScrollReveal } from '../../hooks/useScrollReveal';
import { FiBriefcase, FiUsers, FiAward, FiGlobe, FiImage } from 'react-icons/fi';
import { useEffect, useState, useRef } from 'react';
import '../css/Experience.css';

const experiences = [
    {
        type: 'work',
        icon: <FiGlobe />,
        title: 'Junior Web Developer & Data Analyst',
        company: 'Freelance / Tech Projects',
        period: '2025 - Present',
        description:
            'Designing and engineering fullstack web applications, RESTful APIs, and implementing data analysis pipelines to empower business operations.',
        tags: ['React.js', 'MongoDB', 'Python', 'Data Analytics', 'Machine Learning', 'SQL', 'REST API'],
        images: [],
    },
    {
        type: 'leadership',
        icon: <FiUsers />,
        title: 'Chairman',
        company: 'Himpunan Mahasiswa Teknik Informatika - UDINUS',
        period: '2025 - 2026',
        description:
            'Leading the Informatics Engineering Student Association. Responsible for strategic planning, directing 20+ work programs, external relations, and fostering tech talent.',
        tags: ['Leadership', 'Strategic Planning', 'Project Management', 'Public Speaking', 'Team Management'],
        images: [
            { src: '/about-1.jpg', caption: 'Program Kerja & Raker HMTI UDINUS' },
            { src: '/about-2.jpg', caption: 'Foto Bersama Ketua Umum ORMAWA FIK UDINUS' },
        ],
    },
    {
        type: 'award',
        icon: <FiAward />,
        title: 'PPK Ormawa HMTI UDINUS 2025',
        company: 'Kementerian Pendidikan & UDINUS',
        period: '2025',
        description:
            'Spearheaded community empowerment initiatives helping local MSMEs and village digitalization, earning national recognition at Abdidaya Ormawa 2025.',
        tags: ['Abdidaya Ormawa', 'Community Empowerment', 'Digitalization', 'Social Impact'],
        images: [
            { src: '/about-3.jpg', caption: 'Penghargaan Juara Abdidaya Ormawa 2025' },
            { src: '/about-4.jpg', caption: 'Dokumentasi Tim GO-SMILE' },
        ],
    },
    {
        type: 'work',
        icon: <FiBriefcase />,
        title: 'Web Development Intern',
        company: 'PT. Lumintu Sejahtera Mandiri',
        period: '2026',
        description:
            'Developed modular web interfaces, resolved critical frontend/backend issues, and collaborated with cross-functional teams on production web systems.',
        tags: ['React', 'JavaScript', 'Problem Solving', 'UI/UX Design'],
        images: [],
    },
];

export default function Experience() {
    const headerRef = useScrollReveal();
    const setRef = useMultiScrollReveal(experiences.length);
    const [selectedImage, setSelectedImage] = useState(null);

    const [scrollProgress, setScrollProgress] = useState(0);
    const timelineRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!timelineRef.current) return;

            const rect = timelineRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const startPos = windowHeight * 0.8;
            const totalDistance = rect.height;
            const currentScrolled = startPos - rect.top;

            let progress = currentScrolled / totalDistance;
            progress = Math.max(0, Math.min(1, progress));

            setScrollProgress(progress * 100);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="experience" className="section experience">
            <div className="container">
                <div className="section-header reveal" ref={headerRef}>
                    <span className="section-label">Professional Milestone</span>
                    <h2 className="section-title">Experience & Journey</h2>
                    <p className="section-subtitle">
                        A detailed timeline of my professional work, internship experience, and organizational leadership
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
                                {exp.icon}
                            </div>
                            <div className="experience__card glass-card">
                                <div className="experience__period">{exp.period}</div>
                                <h3 className="experience__title">{exp.title}</h3>
                                <div className="experience__company">{exp.company}</div>
                                <p className="experience__description">{exp.description}</p>

                                {/* Documentation Photos Gallery */}
                                {exp.images && exp.images.length > 0 && (
                                    <div className="experience__gallery">
                                        <div className="experience__gallery-label">
                                            <FiImage /> Documentation ({exp.images.length})
                                        </div>
                                        <div className="experience__gallery-grid">
                                            {exp.images.map((img, i) => (
                                                <div
                                                    key={i}
                                                    className="experience__gallery-item"
                                                    onClick={() => setSelectedImage(img)}
                                                    title={`Click to view full photo: ${img.caption}`}
                                                >
                                                    <img
                                                        src={img.src}
                                                        alt={img.caption}
                                                        className="experience__gallery-img"
                                                        loading="lazy"
                                                    />
                                                    <div className="experience__gallery-overlay">
                                                        <span>🔍 View Photo</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

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

            {/* Photo Lightbox Modal */}
            {selectedImage && (
                <div className="experience__lightbox" onClick={() => setSelectedImage(null)}>
                    <div className="experience__lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="experience__lightbox-close" onClick={() => setSelectedImage(null)}>✕</button>
                        <img src={selectedImage.src} alt={selectedImage.caption} className="experience__lightbox-img" />
                        <p className="experience__lightbox-caption">{selectedImage.caption}</p>
                    </div>
                </div>
            )}
        </section>
    );
}

