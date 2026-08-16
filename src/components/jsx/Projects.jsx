import { useState } from 'react';
import { useScrollReveal, useMultiScrollReveal } from '../../hooks/useScrollReveal';
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi';
import '../css/Projects.css';

const projects = [
    {
        title: 'Kolaborasa Muda Website',
        category: 'Website',
        description: 'A digital platform for PT. Kolaborasa Muda Indonesia.',
        tags: ['React', 'MongoDB', 'Firebase', 'Tailwind CSS', 'Cloudflare'],
        image: '/kolaborasamuda.png',
        color: '#0984e3',
        github: 'https://github.com/svckliens/kolaborasa-project',
        demo: 'https://kolaborasamuda.id',
    },
    {
        title: 'Customer Churn Prediction Model',
        category: 'Data & AI',
        description: 'A Machine Learning & data analysis model to detect the tendency of customers to unsubscribe from companies.',
        tags: ['Python', 'Machine Learning', 'Pandas', 'Scikit-Learn', 'Streamlit'],
        image: '/churn-predicition.png',
        color: '#e84393',
        demo: 'https://customer-churn-predicition-rendysetyawan.streamlit.app/',
    },
    {
        title: 'Dangerous Weapon Detection (YOLOv26n)',
        category: 'Data & AI',
        description: 'Real-time weapon detection system based on Computer Vision YOLOv26n.',
        tags: ['YOLO', 'Computer Vision', 'PyTorch', 'Python', 'OpenCV', 'Hugging Face'],
        image: '/deteksi-senjata-berbahaya.jpeg',
        color: '#d63031',
        demo: 'https://huggingface.co/spaces/Bilqiisnabilaa/Gun-and-Knife-Detector',
    },
    {
        title: 'Root Finding Numerical Calculator',
        category: 'Data & AI',
        description: 'A numerical computation calculator based on bisection & regula falsi methods for solving mathematical equations.',
        tags: ['Python', 'Numerical Computing', 'Bisection Method', 'Regula Falsi', 'Vercel'],
        image: '/root-finding-calculator.png',
        color: '#00cec9',
        demo: 'https://numerical-root-calculator.vercel.app/',
    },
    {
        title: 'SmartCampus AI Search Engine',
        category: 'Data & AI',
        description: 'An intelligent system based on Information Retrieval Systems (IRS) and Machine Learning to help the university community manage, search, classify, and analyze information within the university environment automatically and accurately.',
        tags: ['Python', 'Information Retrieval', 'Machine Learning', 'Natural Language Processing', 'Streamlit'],
        image: '/search-engine-ai.png',
        color: '#4f46e5',
        github: 'https://github.com/svckliens/Search-Engine-AI-for-Campus',
        demo: 'https://search-engine-for-campus.streamlit.app/',
    },
    {
        title: 'Mendaki Puncak Sejaya Landing Page',
        category: 'Website',
        description: 'A modern landing page for CV Mendaki Puncak Sejaya.',
        tags: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript'],
        image: '/mps.jpeg',
        color: '#6c5ce7',
        github: 'https://github.com/svckliens/Mendaki-Puncak-Sejaya-Landing-Page',
        demo: 'https://mendaki-puncak-sejaya-landing-page.vercel.app/',
    },
    {
        title: 'Personal Portfolio Website',
        category: 'Website',
        description: 'A modern portfolio website with glassmorphism effects, interactive animations, and high performance.',
        tags: ['React', 'Vite', 'CSS Modules', 'JavaScript'],
        image: '/portfolio.png',
        color: '#00b894',
        github: 'https://github.com/svckliens/Portfolio-Rendy',
        demo: '#home',
    },
];

const categories = ['All', 'Website', 'Data & AI'];

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);
    const headerRef = useScrollReveal();

    const filtered = activeCategory === 'All'
        ? projects
        : projects.filter((p) => p.category === activeCategory);

    const setRef = useMultiScrollReveal(filtered.length, activeCategory);

    return (
        <section id="projects" className="section projects">
            <div className="container">
                <div className="section-header reveal" ref={headerRef}>
                    <span className="section-label">Projects</span>
                    <h2 className="section-title">Featured Work</h2>
                    <p className="section-subtitle">
                        A showcase of real-world applications, digital platforms, and data science / AI models I've engineered
                    </p>
                </div>

                <div className="projects__filters">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`projects__filter-btn ${activeCategory === cat ? 'projects__filter-btn--active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="projects__grid">
                    {filtered.map((project, index) => (
                        <div
                            key={project.title}
                            className="projects__card glass-card reveal"
                            ref={setRef(index)}
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="projects__card-image" style={{ background: `linear-gradient(135deg, ${project.color}22, ${project.color}44)` }}>
                                {project.image.includes('.') ? (
                                    <img src={project.image} alt={project.title} loading="lazy" className="projects__card-img" />
                                ) : (
                                    <span className="projects__card-emoji">{project.image}</span>
                                )}
                                <div className="projects__card-overlay">
                                    <span>View Details</span>
                                </div>
                            </div>
                            <div className="projects__card-content">
                                <div className="projects__card-category">{project.category}</div>
                                <h3 className="projects__card-title">{project.title}</h3>
                                <p className="projects__card-desc">{project.description}</p>
                                <div className="projects__card-tags">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="projects__card-tag">{tag}</span>
                                    ))}
                                </div>
                                <div className="projects__card-links">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} aria-label="GitHub">
                                            <FiGithub size={18} />
                                        </a>
                                    )}
                                    {project.demo && (
                                        <a href={project.demo} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} aria-label="Live Demo">
                                            <FiExternalLink size={18} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {selectedProject && (
                    <div className="projects__modal-overlay" onClick={() => setSelectedProject(null)}>
                        <div className="projects__modal glass-card" onClick={(e) => e.stopPropagation()}>
                            <button className="projects__modal-close" onClick={() => setSelectedProject(null)}>
                                <FiX size={24} />
                            </button>
                            <div className="projects__modal-image" style={{ background: `linear-gradient(135deg, ${selectedProject.color}22, ${selectedProject.color}44)` }}>
                                {selectedProject.image.includes('.') ? (
                                    <img src={selectedProject.image} alt={selectedProject.title} loading="lazy" className="projects__modal-img" />
                                ) : (
                                    <span className="projects__modal-emoji">{selectedProject.image}</span>
                                )}
                            </div>
                            <div className="projects__modal-content">
                                <div className="projects__card-category">{selectedProject.category}</div>
                                <h3 className="projects__modal-title">{selectedProject.title}</h3>
                                <p className="projects__modal-desc">{selectedProject.description}</p>
                                <div className="projects__card-tags">
                                    {selectedProject.tags.map((tag) => (
                                        <span key={tag} className="projects__card-tag">{tag}</span>
                                    ))}
                                </div>
                                <div className="projects__modal-actions">
                                    {selectedProject.github && (
                                        <a href={selectedProject.github} target="_blank" rel="noreferrer" className="btn btn-outline">
                                            <FiGithub /> GitHub
                                        </a>
                                    )}
                                    {selectedProject.demo && (
                                        <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="btn btn-primary">
                                            <FiExternalLink /> Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

