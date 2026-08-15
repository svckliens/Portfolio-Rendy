import './index.css';
import CustomCursor from './components/jsx/CustomCursor';
import Navbar from './components/jsx/Navbar';
import Hero from './components/jsx/Hero';
import About from './components/jsx/About';
import Services from './components/jsx/Services';
import Experience from './components/jsx/Experience';
import Education from './components/jsx/Education';
import Certificates from './components/jsx/Certificates';
import Projects from './components/jsx/Projects';
import Contact from './components/jsx/Contact';
import Footer from './components/jsx/Footer';

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
        <Services />
        <Experience />
        <Education />
        <Certificates />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
