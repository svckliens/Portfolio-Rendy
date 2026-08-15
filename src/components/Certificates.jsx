import { useState } from 'react';
import { useScrollReveal, useMultiScrollReveal } from '../hooks/useScrollReveal';
import { FiAward, FiExternalLink, FiX, FiCheckCircle, FiCalendar } from 'react-icons/fi';
import './Certificates.css';

const certificatesData = [
    {
        id: 'abdidaya-juara-1-2025',
        title: 'Juara 1 Tim Pelaksana Paling Inovatif Abdidaya Ormawa 2025',
        issuer: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi',
        year: '2025',
        category: 'National Awards',
        image: '/certificate-5.png',
        description:
            'Penghargaan Juara 1 Tim Pelaksana Paling Inovatif tingkat nasional pada Program Pengabdian & Pemberdayaan Masyarakat (Abdidaya Ormawa 2025).',
        skills: ['Social Innovation', 'Community Empowerment', 'Project Leadership', 'National Award'],
    },
    {
        id: 'abdidaya-peserta-2025',
        title: 'Sertifikat Peserta & Finalis Abdidaya Ormawa 2025',
        issuer: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi',
        year: '2025',
        category: 'National Awards',
        image: '/certificate-6.png',
        images: ['/certificate-6.png', '/certificate-7.png'],
        description:
            'Sertifikat apresiasi sebagai Peserta dan Finalis Abdidaya Ormawa 2025 atas pelaksanaan program pemberdayaan masyarakat desa.',
        skills: ['Abdidaya Ormawa', 'Community Service', 'Teamwork', 'Social Impact'],
    },
    {
        id: 'i2aspo-2022',
        title: 'Silver Medal I2ASPO 2022',
        issuer: 'Indonesia International Applied Science Project Olympiad (I2ASPO)',
        year: '2022',
        category: 'International Science Awards',
        image: '/certificate-1.png',
        description:
            'Penghargaan Silver Medal pada kompetisi karya ilmiah internasional I2ASPO 2022 sewaktu menempuh pendidikan di SMA N 1 Semarang.',
        skills: ['Scientific Research', 'Applied Science', 'Innovation', 'International Competition'],
    },
    {
        id: 'glocolis-2023',
        title: 'Silver Medal GloCoLIS 2023',
        issuer: 'Global Competition for Life Sciences (GloCoLIS)',
        year: '2023',
        category: 'International Science Awards',
        image: '/certificate-2.png',
        description:
            'Penghargaan Silver Medal pada kompetisi karya ilmiah internasional GloCoLIS 2023 sewaktu menempuh pendidikan di SMA N 1 Semarang.',
        skills: ['Life Sciences Research', 'Analytical Thinking', 'Scientific Writing', 'Presentation'],
    },
    {
        id: 'ibm-ai-engineering',
        title: 'IBM AI Engineering Specialization',
        issuer: 'IBM',
        year: '2024',
        category: 'AI & Data',
        image: '/certificate-3.png',
        description:
            'Sertifikasi profesional IBM AI Engineering yang diperoleh sewaktu perkuliahan, mencakup Machine Learning, Deep Learning, PyTorch, Keras, dan Neural Networks.',
        skills: ['Machine Learning', 'Deep Learning', 'PyTorch', 'Computer Vision', 'Data Science'],
    },
    {
        id: 'ibm-devops-software',
        title: 'IBM DevOps and Software Engineering',
        issuer: 'IBM',
        year: '2024',
        category: 'Software Engineering',
        image: '/certificate-4.png',
        description:
            'Sertifikasi profesional IBM DevOps and Software Engineering yang diperoleh sewaktu perkuliahan, mencakup CI/CD pipelines, Microservices, Cloud Native, dan Agile Software Engineering.',
        skills: ['DevOps', 'CI/CD', 'Software Architecture', 'Microservices', 'Agile & Git'],
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
                    <span className="section-label">Honors & Credentials</span>
                    <h2 className="section-title">Certificates & Achievements</h2>
                    <p className="section-subtitle">
                        Recognitions, national & international science awards, and professional IBM engineering certifications
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
