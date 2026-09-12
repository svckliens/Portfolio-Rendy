import { useScrollReveal, useMultiScrollReveal } from '../../hooks/useScrollReveal';
import { FiCode, FiBarChart2, FiCheckCircle } from 'react-icons/fi';
import {
    SiReact, SiJavascript, SiNodedotjs, SiPython,
    SiMongodb, SiMysql, SiGit, SiFigma, SiLaravel,
    SiPytorch, SiScikitlearn, SiOpencv, SiHuggingface,
    SiStreamlit, SiPandas, SiDocker, SiTailwindcss, SiNextdotjs
} from 'react-icons/si';
import TiltCard from './TiltCard';
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

// Lane 1: AI & Data Science Stack
const aiTechSkills = [
    { name: 'Python', icon: <SiPython />, color: '#3776AB' },
    { name: 'PyTorch', icon: <SiPytorch />, color: '#EE4C2C' },
    { name: 'Scikit-Learn', icon: <SiScikitlearn />, color: '#F7931E' },
    { name: 'OpenCV', icon: <SiOpencv />, color: '#5C3EE8' },
    { name: 'Hugging Face', icon: <SiHuggingface />, color: '#FFD21E' },
    { name: 'Streamlit', icon: <SiStreamlit />, color: '#FF4B4B' },
    { name: 'Pandas', icon: <SiPandas />, color: '#150458' },
];

// Lane 2: Fullstack & DevOps Stack
const devTechSkills = [
    { name: 'React', icon: <SiReact />, color: '#61DAFB' },
    { name: 'Next.js', icon: <SiNextdotjs />, color: '#ffffff' },
    { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06B6D4' },
    { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
    { name: 'SQL', icon: <SiMysql />, color: '#4479A1' },
    { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
    { name: 'Docker', icon: <SiDocker />, color: '#2496ED' },
    { name: 'Git', icon: <SiGit />, color: '#F05032' },
    { name: 'Laravel', icon: <SiLaravel />, color: '#FF2D20' },
    { name: 'Figma', icon: <SiFigma />, color: '#F24E1E' },
];

export default function Services() {
    const headerRef = useScrollReveal();
    const setCardRef = useMultiScrollReveal(services.length);

    const marqueeAiSkills = [...aiTechSkills, ...aiTechSkills, ...aiTechSkills];
    const marqueeDevSkills = [...devTechSkills, ...devTechSkills, ...devTechSkills];

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
                        <TiltCard
                            key={service.id}
                            className="services__card glass-card reveal"
                            ref={setCardRef(index)}
                            maxTilt={7}
                            scale={1.02}
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
                        </TiltCard>
                    ))}
                </div>
            </div>

            {/* Full-Width Edge-to-Edge Infinite Marquee at the bottom of Services */}
            <div className="services__tech-marquee-container">
                <div className="services__tech-marquee-header">
                    <span className="services__tech-marquee-title">Technologies & Tools I Work With</span>
                </div>

                {/* Lane 1: AI & Data Science Stack */}
                <div className="services__tech-marquee-wrapper">
                    <div className="services__tech-marquee-fade services__tech-marquee-fade--left" />
                    <div className="services__tech-marquee-track">
                        {marqueeAiSkills.map((skill, idx) => (
                            <div key={`ai-${idx}`} className="services__tech-pill glass-card">
                                <span className="services__tech-pill-icon" style={{ color: skill.color }}>
                                    {skill.icon}
                                </span>
                                <span className="services__tech-pill-name">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="services__tech-marquee-fade services__tech-marquee-fade--right" />
                </div>

                {/* Lane 2: Fullstack Software & DevOps Stack (Reverse Direction) */}
                <div className="services__tech-marquee-wrapper" style={{ marginTop: '12px' }}>
                    <div className="services__tech-marquee-fade services__tech-marquee-fade--left" />
                    <div className="services__tech-marquee-track services__tech-marquee-track--reverse">
                        {marqueeDevSkills.map((skill, idx) => (
                            <div key={`dev-${idx}`} className="services__tech-pill glass-card">
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

