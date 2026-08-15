import { useScrollReveal, useMultiScrollReveal } from '../../hooks/useScrollReveal';
import { FiAward, FiBookOpen, FiCalendar, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import '../css/Education.css';

const educationList = [
    {
        degree: 'S1 Teknik Informatika (B.S. in Informatics Engineering)',
        institution: 'Universitas Dian Nuswantoro (UDINUS)',
        location: 'Semarang, Indonesia',
        period: '2023 - Present',
        status: 'Active Student',
        description:
            'Comprehensive study focused on software development, data structures, algorithms, data analysis, and artificial intelligence.',
        highlights: [
            'Chairman of Himpunan Mahasiswa Teknik Informatika (HMTI) 2025-2026',
            'Active in Community Empowerment & Business Digitalization Programs',
            'Selected to represent HMTI UDINUS in PPK ORMAWA 2025',
            'Scholarship Recipient of Abdidaya Ormawa (2025-2027)',
            'Core Courses: Web Engineering, Data Science, Machine Learning, Database Systems',
        ],
        icon: <FiBookOpen />,
    },
    {
        degree: 'Science (MIPA)',
        institution: 'SMA Negeri 1 Semarang',
        location: 'Semarang, Indonesia',
        period: '2020 - 2023',
        status: 'Graduated',
        description:
            'Pre-university science program building rigorous analytical skills, mathematics proficiency, and foundational logic.',
        highlights: [
            'Strong foundation in Advanced Mathematics and Physics',
            'Active participation in student organizations and tech events',
            'Graduated with strong academic distinction',
        ],
        icon: <FiAward />,
    },
];

export default function Education() {
    const headerRef = useScrollReveal();
    const setEduRef = useMultiScrollReveal(educationList.length);

    return (
        <section id="education" className="section education">
            <div className="container">
                <div className="section-header reveal" ref={headerRef}>
                    <span className="section-label">Academic Background</span>
                    <h2 className="section-title">Education & Credentials</h2>
                    <p className="section-subtitle">
                        My formal academic journey and educational foundation in technology and sciences
                    </p>
                </div>

                <div className="education__grid">
                    {educationList.map((edu, index) => (
                        <div
                            key={index}
                            className="education__card glass-card reveal"
                            ref={setEduRef(index)}
                        >
                            <div className="education__top">
                                <div className="education__icon">{edu.icon}</div>
                                <div className="education__meta">
                                    <span className="education__status">{edu.status}</span>
                                    <div className="education__period">
                                        <FiCalendar /> {edu.period}
                                    </div>
                                </div>
                            </div>

                            <h3 className="education__degree">{edu.degree}</h3>
                            <h4 className="education__institution">{edu.institution}</h4>
                            <div className="education__location">
                                <FiMapPin /> {edu.location}
                            </div>

                            <p className="education__description">{edu.description}</p>

                            <div className="education__highlights-title">Key Highlights:</div>
                            <ul className="education__highlights">
                                {edu.highlights.map((item, i) => (
                                    <li key={i}>
                                        <FiCheckCircle className="education__check" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

