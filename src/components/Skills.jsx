import { useScrollReveal, useMultiScrollReveal } from '../hooks/useScrollReveal';
import {
    SiReact, SiJavascript, SiNodedotjs, SiPython,
    SiHtml5, SiPhp, SiMongodb, SiMysql,
    SiGit, SiFigma, SiCanva, SiNextdotjs, SiLaravel,
    SiOpenai, SiGooglegemini,
} from 'react-icons/si';
import './Skills.css';

const skillCategories = [
    {
        title: 'Frontend',
        skills: [
            { name: 'React', icon: <SiReact />, level: 50, color: '#61DAFB' },
            { name: 'JavaScript', icon: <SiJavascript />, level: 70, color: '#F7DF1E' },
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
            { name: 'MongoDB', icon: <SiMongodb />, level: 40, color: '#47A248' },
            { name: 'SQL', icon: <SiMysql />, level: 80, color: '#4479A1' },
        ],
    },
    {
        title: 'Tools & Others',
        skills: [
            { name: 'Git', icon: <SiGit />, level: 70, color: '#F05032' },
            { name: 'Figma', icon: <SiFigma />, level: 50, color: '#F24E1E' },
            { name: 'Canva', icon: <SiCanva />, level: 50, color: '#F24E1E' },
            { name: 'ChatGPT', icon: <SiOpenai />, level: 70, color: '#10A37F' },
            { name: 'Gemini', icon: <SiGooglegemini />, level: 70, color: '#8E75B2' },
        ],
    },
];

export default function Skills() {
    const headerRef = useScrollReveal();
    const setRef = useMultiScrollReveal(skillCategories.length);

    return (
        <section id="skills" className="section skills">
            <div className="container">
                <div className="section-header reveal" ref={headerRef}>
                    <span className="section-label">Skills</span>
                    <h2 className="section-title">Technologies & Tools</h2>
                    <p className="section-subtitle">
                        A curated collection of technologies I work with to build amazing digital products
                    </p>
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
