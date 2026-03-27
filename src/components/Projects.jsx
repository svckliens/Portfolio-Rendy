import { useState } from 'react';
import { useScrollReveal, useMultiScrollReveal } from '../hooks/useScrollReveal';
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi';
import './Projects.css';

const projects = [
    {
        title: 'Mendaki Puncak Sejaya Landing Page',
        category: 'Web',
        description: 'Landing page for Mendaki Puncak Sejaya CV.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        image: '/mps.jpeg',
        color: '#6c5ce7',
        github: 'https://github.com',
        demo: 'https://example.com',
    },
    {
        title: 'Portfolio Website',
        category: 'Web',
        description: 'Portfolio website for myself.',
        tags: ['React', 'Tailwind CSS', 'JavaScript'],
        image: '/portfolio.png',
        color: '#00b894',
        github: 'https://github.com',
        demo: 'https://example.com',
    },
];

const categories = ['All', 'Website', 'Machine Learning'];

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);
    const headerRef = useScrollReveal();
    const setRef = useMultiScrollReveal(projects.length);

    const filtered = activeCategory === 'All'
        ? projects
        : projects.filter((p) => p.category === activeCategory);

    return (
        <section id="projects" className="section projects">
            <div className="container">
                <div className="section-header reveal" ref={headerRef}>
                    <span className="section-label">Projects</span>
                    <h2 className="section-title">Featured Work</h2>
                    <p className="section-subtitle">
                        A showcase of projects that demonstrate my skills and passion for development
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
                                    <img src={project.image} alt={project.title} className="projects__card-img" />
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
                                    <a href={project.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} aria-label="GitHub">
                                        <FiGithub size={18} />
                                    </a>
                                    <a href={project.demo} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} aria-label="Live Demo">
                                        <FiExternalLink size={18} />
                                    </a>
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
                                    <img src={selectedProject.image} alt={selectedProject.title} className="projects__modal-img" />
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
                                    <a href={selectedProject.github} target="_blank" rel="noreferrer" className="btn btn-outline">
                                        <FiGithub /> GitHub
                                    </a>
                                    <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="btn btn-primary">
                                        <FiExternalLink /> Live Demo
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
