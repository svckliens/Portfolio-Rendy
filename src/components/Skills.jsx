import { useScrollReveal, useMultiScrollReveal } from '../hooks/useScrollReveal';
import {
    SiReact, SiJavascript, SiNodedotjs, SiPython,
    SiHtml5, SiPhp, SiMongodb, SiMysql,
    SiGit, SiFigma, SiCanva, SiLaravel,
} from 'react-icons/si';
import './Skills.css';

const allSkills = [
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
];

const skillCategories = [
    {
        title: 'Frontend Development',
        skills: [
            { name: 'React', icon: <SiReact />, level: 70, color: '#61DAFB' },
            { name: 'JavaScript', icon: <SiJavascript />, level: 80, color: '#F7DF1E' },
            { name: 'HTML5', icon: <SiHtml5 />, level: 95, color: '#E34F26' },
            { name: 'PHP', icon: <SiPhp />, level: 75, color: '#777BB4' },
            { name: 'Laravel', icon: <SiLaravel />, level: 75, color: '#FF2D20' },
        ],
    },
    {
        title: 'Backend & Database',
        skills: [
            { name: 'Node.js', icon: <SiNodedotjs />, level: 30, color: '#339933' },
            { name: 'Python', icon: <SiPython />, level: 70, color: '#3776AB' },
            { name: 'MongoDB', icon: <SiMongodb />, level: 60, color: '#47A248' },
            { name: 'SQL', icon: <SiMysql />, level: 80, color: '#4479A1' },
        ],
    },
    {
        title: 'Tools & Design',
        skills: [
            { name: 'Git', icon: <SiGit />, level: 70, color: '#F05032' },
            { name: 'Figma', icon: <SiFigma />, level: 50, color: '#F24E1E' },
            { name: 'Canva', icon: <SiCanva />, level: 50, color: '#00C4CC' },
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
                                    <div key={skill.name} className="skills__card glass-card">
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
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
