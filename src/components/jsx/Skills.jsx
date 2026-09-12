import { useScrollReveal, useMultiScrollReveal } from '../../hooks/useScrollReveal';
import {
    SiReact, SiJavascript, SiNodedotjs, SiPython,
    SiHtml5, SiPhp, SiMongodb, SiMysql,
    SiGit, SiFigma, SiCanva, SiLaravel,
    SiPytorch, SiScikitlearn, SiOpencv, SiHuggingface, SiStreamlit, SiPandas, SiDocker, SiTailwindcss
} from 'react-icons/si';
import TiltCard from './TiltCard';
import '../css/Skills.css';

const allSkills = [
    { name: 'Python', icon: <SiPython />, color: '#3776AB' },
    { name: 'PyTorch', icon: <SiPytorch />, color: '#EE4C2C' },
    { name: 'Scikit-Learn', icon: <SiScikitlearn />, color: '#F7931E' },
    { name: 'OpenCV', icon: <SiOpencv />, color: '#5C3EE8' },
    { name: 'Hugging Face', icon: <SiHuggingface />, color: '#FFD21E' },
    { name: 'Streamlit', icon: <SiStreamlit />, color: '#FF4B4B' },
    { name: 'Pandas', icon: <SiPandas />, color: '#150458' },
    { name: 'React', icon: <SiReact />, color: '#61DAFB' },
    { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06B6D4' },
    { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
    { name: 'SQL', icon: <SiMysql />, color: '#4479A1' },
    { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
    { name: 'Docker', icon: <SiDocker />, color: '#2496ED' },
    { name: 'Git', icon: <SiGit />, color: '#F05032' },
];

const skillCategories = [
    {
        title: 'Artificial Intelligence & Data',
        skills: [
            { name: 'Python', icon: <SiPython />, level: 90, color: '#3776AB' },
            { name: 'PyTorch', icon: <SiPytorch />, level: 85, color: '#EE4C2C' },
            { name: 'Machine Learning', icon: <SiScikitlearn />, level: 85, color: '#F7931E' },
            { name: 'Computer Vision / OpenCV', icon: <SiOpencv />, level: 80, color: '#5C3EE8' },
            { name: 'Hugging Face / LLMs', icon: <SiHuggingface />, level: 75, color: '#FFD21E' },
            { name: 'Streamlit & Pandas', icon: <SiStreamlit />, level: 85, color: '#FF4B4B' },
        ],
    },
    {
        title: 'Fullstack Software Engineering',
        skills: [
            { name: 'React', icon: <SiReact />, level: 85, color: '#61DAFB' },
            { name: 'JavaScript / ES6+', icon: <SiJavascript />, level: 85, color: '#F7DF1E' },
            { name: 'Tailwind & Modern CSS', icon: <SiTailwindcss />, level: 90, color: '#06B6D4' },
            { name: 'Node.js', icon: <SiNodedotjs />, level: 70, color: '#339933' },
            { name: 'SQL / Databases', icon: <SiMysql />, level: 80, color: '#4479A1' },
            { name: 'MongoDB', icon: <SiMongodb />, level: 75, color: '#47A248' },
        ],
    },
    {
        title: 'DevOps, Tools & Architecture',
        skills: [
            { name: 'Git & GitHub', icon: <SiGit />, level: 85, color: '#F05032' },
            { name: 'Docker', icon: <SiDocker />, level: 70, color: '#2496ED' },
            { name: 'PHP / Laravel', icon: <SiLaravel />, level: 75, color: '#FF2D20' },
            { name: 'Figma UI/UX', icon: <SiFigma />, level: 70, color: '#F24E1E' },
        ],
    },
];

export default function Skills() {
    const headerRef = useScrollReveal();
    const setRef = useMultiScrollReveal(skillCategories.length);

    // Duplicate skills for smooth infinite loop animation
    const marqueeSkills = [...allSkills, ...allSkills, ...allSkills];

    return (
        <section id="skills" className="section skills">
            <div className="container">
                <div className="section-header reveal" ref={headerRef}>
                    <span className="section-label">Tech Stack</span>
                    <h2 className="section-title">Technologies & Tools</h2>
                    <p className="section-subtitle">
                        A curated collection of technologies and frameworks I use to build modern digital products
                    </p>
                </div>

                {/* Infinite Moving Logo Marquee Banner (Single Line) */}
                <div className="skills__marquee-wrapper">
                    <div className="skills__marquee-fade skills__marquee-fade--left" />
                    <div className="skills__marquee-track">
                        {marqueeSkills.map((skill, idx) => (
                            <div key={idx} className="skills__pill glass-card">
                                <span className="skills__pill-icon" style={{ color: skill.color }}>
                                    {skill.icon}
                                </span>
                                <span className="skills__pill-name">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="skills__marquee-fade skills__marquee-fade--right" />
                </div>

                <div className="skills__categories">
                    {skillCategories.map((category, catIdx) => (
                        <div key={category.title} className="skills__category reveal" ref={setRef(catIdx)}>
                            <h3 className="skills__category-title">{category.title}</h3>
                            <div className="skills__grid">
                                {category.skills.map((skill) => (
                                    <TiltCard key={skill.name} className="skills__card glass-card" maxTilt={6} scale={1.03}>
                                        <div className="skills__card-header">
                                            <div className="skills__icon" style={{ color: skill.color }}>
                                                {skill.icon}
                                            </div>
                                            <span className="skills__level">{skill.level}%</span>
                                        </div>
                                        <div className="skills__name">{skill.name}</div>
                                        <div className="skills__bar">
                                            <div
                                                className="skills__bar-fill"
                                                style={{
                                                    width: `${skill.level}%`,
                                                    background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                                                }}
                                            />
                                        </div>
                                    </TiltCard>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

