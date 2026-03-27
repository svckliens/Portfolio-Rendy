import './index.css';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className="glass-bg-orbs" aria-hidden="true">
        <div className="orb orb--1"></div>
        <div className="orb orb--2"></div>
        <div className="orb orb--3"></div>
        <div className="orb orb--4"></div>
        <div className="orb orb--5"></div>
      </div>

      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
