import { useState } from 'react';
import { useScrollReveal, useMultiScrollReveal } from '../../hooks/useScrollReveal';
import { FiAward, FiExternalLink, FiX, FiCheckCircle, FiCalendar } from 'react-icons/fi';
import '../css/Certificates.css';

const certificatesData = [
    {
        id: 'ibm-ai-engineering',
        title: 'AI Engineering Specialization',
        issuer: 'IBM',
        year: '2026',
        category: 'AI & Data',
        image: '/certificate-3.png',
        description:
            'Professional certification from IBM AI Engineering obtained during my studies, covering Machine Learning, Deep Learning, PyTorch, Keras, and Neural Networks.',
        skills: ['Machine Learning', 'Deep Learning', 'PyTorch', 'Computer Vision', 'Data Science'],
    },
    {
        id: 'ibm-devops-software',
        title: 'DevOps and Software Engineering Specialization',
        issuer: 'IBM',
        year: '2026',
        category: 'Software Engineering',
        image: '/certificate-4.png',
        description:
            'Professional certification from IBM DevOps and Software Engineering obtained during my studies, covering CI/CD pipelines, Microservices, Cloud Native, and Agile Software Engineering.',
        skills: ['DevOps', 'CI/CD', 'Software Architecture', 'Microservices', 'Agile & Git'],
    },
    {
        id: 'abdidaya-juara-1-2025',
        title: '1st Place for Most Innovative Project Team - Abdidaya Ormawa 2025',
        issuer: 'Ministry of Education, Culture, Research, and Technology',
        year: '2025',
        category: 'National Awards',
        image: '/certificate-5.png',
        description:
            'Penghargaan Juara 1 Tim Pelaksana Paling Inovatif tingkat nasional pada Program Pengabdian & Pemberdayaan Masyarakat (Abdidaya Ormawa 2025).',
        skills: ['Social Innovation', 'Community Empowerment', 'Project Leadership', 'National Award'],
    },
    {
        id: 'abdidaya-peserta-2025',
        title: 'Participant & Finalist Certificate - Abdidaya Ormawa 2025',
        issuer: 'Ministry of Education, Culture, Research, and Technology',
        year: '2025',
        category: 'National Awards',
        image: '/certificate-6.png',
        images: ['/certificate-6.png', '/certificate-7.png'],
        description:
            'Sertifikat apresiasi sebagai Peserta dan Finalis Abdidaya Ormawa 2025 atas pelaksanaan program pemberdayaan masyarakat desa.',
        skills: ['Abdidaya Ormawa', 'Community Service', 'Teamwork', 'Social Impact'],
    },
    {
        id: 'glocolis-2023',
        title: 'Silver Medal - Global Competition for Life Sciences 2023',
        issuer: 'Global Competition for Life Sciences',
        year: '2023',
        category: 'International Science Awards',
        image: '/certificate-2.png',
        description:
            'Silver Medal award at the international life sciences competition GloCoLIS 2023 in the life sciences category.',
        skills: ['Life Sciences Research', 'Analytical Thinking', 'Scientific Writing', 'Presentation'],
    },
    {
        id: 'i2aspo-2022',
        title: 'Silver Medal - International Applied Science Project Olympiad 2022',
        issuer: 'International Applied Science Project Olympiad',
        year: '2022',
        category: 'International Science Awards',
        image: '/certificate-1.png',
        description:
            'Silver Medal award at the international scientific work competition I2ASPO 2022 in the functional food category.',
        skills: ['Scientific Research', 'Applied Science', 'Innovation', 'International Competition'],
    },
];

const categories = ['All', 'National Awards', 'International Science Awards', 'AI & Data', 'Software Engineering'];

export default function Certificates() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedCert, setSelectedCert] = useState(null);

    const headerRef = useScrollReveal();
    
    const filteredCerts =
        activeCategory === 'All'
            ? certificatesData
            : certificatesData.filter((c) => c.category === activeCategory);

    const setCertRef = useMultiScrollReveal(filteredCerts.length, activeCategory);

    return (
        <section id="certificates" className="section certificates">
            <div className="container">
                <div className="section-header reveal" ref={headerRef}>
                    <span className="section-label">Certificates & Achievements</span>
                    <h2 className="section-title">Honors & Credentials</h2>
                    <p className="section-subtitle">
                        Recognitions, national & international science awards, and professional engineering certifications
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="certificates__filters">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`certificates__filter-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="certificates__grid">
                    {filteredCerts.map((cert, index) => (
                        <div
                            key={cert.id}
                            className="certificates__card glass-card reveal"
                            ref={setCertRef(index)}
                        >
                            <div className="certificates__card-badge">
                                <FiAward /> {cert.category}
                            </div>

                            {/* Certificate Image Preview Card */}
                            <div className="certificates__card-img-wrapper" onClick={() => setSelectedCert(cert)}>
                                {cert.images && cert.images.length > 1 ? (
                                    <div className="certificates__card-img-grid">
                                        {cert.images.map((imgSrc, i) => (
                                            <img
                                                key={i}
                                                src={imgSrc}
                                                alt={`${cert.title} ${i + 1}`}
                                                loading="lazy"
                                                className="certificates__card-img-half"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <img
                                        src={cert.image}
                                        alt={cert.title}
                                        loading="lazy"
                                        className="certificates__card-img"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                )}
                                <div className="certificates__card-img-overlay">
                                    <span>🔍 View {cert.images && cert.images.length > 1 ? `${cert.images.length} Certificates` : 'Certificate'}</span>
                                </div>
                            </div>

                            <h3 className="certificates__title">{cert.title}</h3>
                            <div className="certificates__issuer">{cert.issuer}</div>

                            <div className="certificates__meta">
                                <span className="certificates__year">
                                    <FiCalendar /> {cert.year}
                                </span>
                            </div>

                            <p className="certificates__description">{cert.description}</p>

                            <div className="certificates__skills">
                                {cert.skills.map((skill, idx) => (
                                    <span key={idx} className="certificates__skill-tag">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <button
                                className="certificates__btn btn btn-outline"
                                onClick={() => setSelectedCert(cert)}
                            >
                                View Details & Certificate {cert.images && cert.images.length > 1 ? `(${cert.images.length})` : ''} <FiExternalLink />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedCert && (
                <div className="certificates__modal-backdrop" onClick={() => setSelectedCert(null)}>
                    <div
                        className="certificates__modal glass-card"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="certificates__modal-close"
                            onClick={() => setSelectedCert(null)}
                            aria-label="Close modal"
                        >
                            <FiX size={24} />
                        </button>

                        <div className="certificates__modal-content">
                            <div className="certificates__modal-header">
                                <span className="certificates__badge">{selectedCert.category}</span>
                                <h2>{selectedCert.title}</h2>
                                <p className="certificates__modal-issuer">
                                    Issued by <strong>{selectedCert.issuer}</strong> ({selectedCert.year})
                                </p>
                            </div>

                            <div className="certificates__modal-img-wrapper">
                                {selectedCert.images && selectedCert.images.length > 1 ? (
                                    <div className="certificates__modal-images-grid">
                                        {selectedCert.images.map((imgSrc, i) => (
                                            <img
                                                key={i}
                                                src={imgSrc}
                                                alt={`${selectedCert.title} ${i + 1}`}
                                                className="certificates__modal-img-multi"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <img
                                        src={selectedCert.image}
                                        alt={selectedCert.title}
                                        className="certificates__modal-img"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextElementSibling.style.display = 'flex';
                                        }}
                                    />
                                )}
                                <div className="certificates__modal-placeholder" style={{ display: 'none' }}>
                                    🏆 {selectedCert.title}
                                </div>
                            </div>

                            <div className="certificates__modal-body">
                                <p>{selectedCert.description}</p>

                                <h4>Competencies & Skills:</h4>
                                <ul className="certificates__modal-skills">
                                    {selectedCert.skills.map((s, i) => (
                                        <li key={i}>
                                            <FiCheckCircle /> {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

