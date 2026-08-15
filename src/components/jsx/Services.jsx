import { useScrollReveal, useMultiScrollReveal } from '../../hooks/useScrollReveal';
import { FiCode, FiBarChart2, FiUsers, FiCheckCircle } from 'react-icons/fi';
import {
    SiReact, SiJavascript, SiNodedotjs, SiPython,
    SiHtml5, SiPhp, SiMongodb, SiMysql,
    SiGit, SiFigma, SiCanva, SiLaravel,
    SiClaude,
} from 'react-icons/si';
import '../css/Services.css';

const services = [
    {
        id: 'web-dev',
        icon: <FiCode />,
        title: 'Fullstack Web Development',
        subtitle: 'Scalable & Modern Web Solutions',
        description:
            'Building high-performance, responsive, and aesthetic web applications tailored to user needs using various modern frameworks and technologies',
        highlights: [
            'Custom Single-Page & Multi-Page Apps',
            'Restful API & Database Architecture',
            'Sleek UI/UX with Clean Animations',
            'Performance & SEO Optimization',
        ],
        badge: 'Web Dev',
    },
    {
        id: 'data-ai',
        icon: <FiBarChart2 />,
        title: 'Data Analytics & AI / Machine Learning',
        subtitle: 'Data-Driven Insights & Intelligence',
        description:
            'Extracting meaningful insights from complex datasets, building predictive Machine Learning models, and creating interactive data visualization tools.',
        highlights: [
            'Data Analysis',
            'Machine Learning & Deep Learning Models',
            'Data Cleaning, Preprocessing & Wrangling',
            'Data Visualization',
        ],
        badge: 'AI & Data',
    },
];

const techSkills = [
    { name: 'React', icon: <SiReact />, color: '#61DAFB' },
    { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
    { name: 'HTML5', icon: <SiHtml5 />, color: '#E34F26' },
    { name: 'PHP', icon: <SiPhp />, color: '#777BB4' },
    { name: 'Laravel', icon: <SiLaravel />, color: '#FF2D20' },
    { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
    { name: 'Python', icon: <SiPython />, color: '#3776AB' },
    { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
    { name: 'SQL', icon: <SiMysql />, color: '#4479A1' },
    { name: 'Git', icon: <SiGit />, color: '#F05032' },
    { name: 'Figma', icon: <SiFigma />, color: '#F24E1E' },
    { name: 'Canva', icon: <SiCanva />, color: '#00C4CC' },
    { name: 'Claude', icon: <SiClaude />, color: '#00C4CC' },
];

export default function Services() {
    const headerRef = useScrollReveal();
    const setCardRef = useMultiScrollReveal(services.length);

    const marqueeSkills = [...techSkills, ...techSkills, ...techSkills];

    return (
        <section id="services" className="section services">
            <div className="container">
                <div className="section-header reveal" ref={headerRef}>
                    <span className="section-label">Services</span>
                    <h2 className="section-title">What I Offer</h2>
                    <p className="section-subtitle">
                        Delivering end-to-end digital expertise spanning software development and data intelligence
                    </p>
                </div>

                <div className="services__grid">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className="services__card glass-card reveal"
                            ref={setCardRef(index)}
                        >
                            <div className="services__card-header">
                                <div className="services__icon-wrapper">{service.icon}</div>
                                <span className="services__badge">{service.badge}</span>
                            </div>

                            <h3 className="services__title">{service.title}</h3>
                            <p className="services__subtitle">{service.subtitle}</p>
                            <p className="services__description">{service.description}</p>

                            <div className="services__divider"></div>

                            <ul className="services__highlights">
                                {service.highlights.map((item, idx) => (
                                    <li key={idx} className="services__highlight-item">
                                        <FiCheckCircle className="services__check-icon" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Full-Width Edge-to-Edge Infinite Marquee at the bottom of Services */}
            <div className="services__tech-marquee-container">
                <div className="services__tech-marquee-header">
                    <span className="services__tech-marquee-title">Technologies & Tools I Work With</span>
                </div>
                <div className="services__tech-marquee-wrapper">
                    <div className="services__tech-marquee-fade services__tech-marquee-fade--left" />
                    <div className="services__tech-marquee-track">
                        {marqueeSkills.map((skill, idx) => (
                            <div key={idx} className="services__tech-pill glass-card">
                                <span className="services__tech-pill-icon" style={{ color: skill.color }}>
                                    {skill.icon}
                                </span>
                                <span className="services__tech-pill-name">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="services__tech-marquee-fade services__tech-marquee-fade--right" />
                </div>
            </div>
        </section>
    );
}

