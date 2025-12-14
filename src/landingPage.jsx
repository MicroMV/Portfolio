import "./landingPage.css";
import { color, motion } from "framer-motion";
import TextType from './TextType';
import StarBorder from './StarBorder'
import { Component } from "@/components/ui/etheral-shadow";
import { 
  FaReact, 
  FaPhp, 
  FaHtml5, 
  FaCss3Alt, 
  FaJs 
} from 'react-icons/fa';
import { 
  SiFirebase, 
  SiMysql, 
  SiTailwindcss,
  SiFlutter,
  SiDart
} from 'react-icons/si';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { FaLinkedin, FaFacebook } from 'react-icons/fa';
import { SiPython, SiFigma } from 'react-icons/si';



function Header() {
    const [activeSection, setActiveSection] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        // Check localStorage for saved preference, default to dark
        const saved = localStorage.getItem('darkMode');
        return saved !== null ? JSON.parse(saved) : true;
    });

    // Apply theme to body and save preference
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        if (darkMode) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    // Scroll to section function
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(sectionId);
            setMenuOpen(false); 
        }
    };

    // Detect which section is in view
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '-100px 0px -50% 0px', 
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, options);

        // Observe all sections
        const sections = ['home', 'about', 'services', 'skills', 'projects', 'contact'];
        sections.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
                observer.observe(element);
            }
        });

        // Cleanup
        return () => {
            sections.forEach((sectionId) => {
                const element = document.getElementById(sectionId);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, []);

    return (
        <div className="body">
            <Component
                color={darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"}
                animation={{ scale: 80, speed: 60 }}
                noise={{ opacity: 0.6, scale: 1 }}
                sizing="fill"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 0
                }}
            />

            <div className="header">
                <div 
                    className="lt" 
                    onClick={() => scrollToSection('home')}
                    style={{ cursor: 'pointer' }}
                >
                    <img src="../logo.png" className="logo" alt="logo" />
                    <h1 className="title">rngx.dev</h1>
                </div>

                {/* Hamburger Icon - Mobile Only */}
                <div className="hamburger-container">
                    <button 
                        className={`hamburger ${menuOpen ? 'active' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                {/* Desktop Navigation with Theme Toggle */}
                <div className="desktop-nav-container">
                    <ul className="nav desktop-nav">
                        <li 
                            className={activeSection === 'home' ? 'active' : ''} 
                            onClick={() => scrollToSection('home')}
                        >
                            Home
                        </li>
                        <li 
                            className={activeSection === 'about' ? 'active' : ''} 
                            onClick={() => scrollToSection('about')}
                        >
                            About
                        </li>
                        <li 
                            className={activeSection === 'services' ? 'active' : ''} 
                            onClick={() => scrollToSection('services')}
                        >
                            Services
                        </li>
                        <li 
                            className={activeSection === 'skills' ? 'active' : ''} 
                            onClick={() => scrollToSection('skills')}
                        >
                            Skills
                        </li>
                        <li 
                            className={activeSection === 'projects' ? 'active' : ''} 
                            onClick={() => scrollToSection('projects')}
                        >
                            Projects
                        </li>
                        <li 
                            className={activeSection === 'contact' ? 'active' : ''} 
                            onClick={() => scrollToSection('contact')}
                        >
                            Contact
                        </li>
                    </ul>
                    
                    {/* Theme Toggle Button - Desktop */}
                    <button 
                        className="theme-toggle desktop-toggle"
                        onClick={() => setDarkMode(!darkMode)}
                        aria-label="Toggle theme"
                    >
                        <div className={`toggle-track ${darkMode ? 'dark' : 'light'}`}>
                            <div className="toggle-thumb">
                                {darkMode ? '🌙' : '☀️'}
                            </div>
                        </div>
                    </button>
                </div>

                {/* Mobile Menu Drawer */}
                <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                    {/* Theme Toggle - Mobile (at top of menu) */}
                    <div className="mobile-theme-toggle-wrapper">
                        <button 
                            className="theme-toggle mobile-toggle"
                            onClick={() => setDarkMode(!darkMode)}
                            aria-label="Toggle theme"
                        >
                            <div className={`toggle-track ${darkMode ? 'dark' : 'light'}`}>
                                <div className="toggle-thumb">
                                    {darkMode ? '🌙' : '☀️'}
                                </div>
                            </div>
                        </button>
                    </div>

                    <ul className="nav mobile-nav">
                        <li 
                            className={activeSection === 'home' ? 'active' : ''} 
                            onClick={() => scrollToSection('home')}
                        >
                            Home
                        </li>
                        <li 
                            className={activeSection === 'about' ? 'active' : ''} 
                            onClick={() => scrollToSection('about')}
                        >
                            About
                        </li>
                        <li 
                            className={activeSection === 'services' ? 'active' : ''} 
                            onClick={() => scrollToSection('services')}
                        >
                            Services
                        </li>
                        <li 
                            className={activeSection === 'skills' ? 'active' : ''} 
                            onClick={() => scrollToSection('skills')}
                        >
                            Skills
                        </li>
                        <li 
                            className={activeSection === 'projects' ? 'active' : ''} 
                            onClick={() => scrollToSection('projects')}
                        >
                            Projects
                        </li>
                        <li 
                            className={activeSection === 'contact' ? 'active' : ''} 
                            onClick={() => scrollToSection('contact')}
                        >
                            Contact
                        </li>
                    </ul>
                </div>

                {/* Backdrop Overlay */}
                {menuOpen && (
                    <div 
                        className="menu-backdrop" 
                        onClick={() => setMenuOpen(false)}
                    ></div>
                )}
            </div>

            <Section1 />
            <AboutMeSection />
            <Services /> 
            <Skills />
            <Projects />
            <Contact />
        </div>
    );
}


export default Header;


function Section1() {
    return (
        <section className="section1" id="home">
            <div className="intro-container">
                <div className="intro">
                    <h1 className="my-name">
                        <span className="white">Hi, I'm</span> Rongie H. <br/>Murallos
                    </h1>

                    <h2 className="my-role">
                        <TextType 
                            text={["Web Developer", "Mobile App Developer", "UI/UX Designer"]}
                            typingSpeed={75}
                            pauseDuration={1500}
                            showCursor={true}
                            cursorCharacter="|"
                        />
                    </h2>

                    <p className="my-intro">
                        I build websites, mobile apps, and interfaces <br/>that look good and work even better. 
                        <br/>Full-stack development + UI/UX design, <br/>all in one.
                    </p>

                    <div className="buttons">
                        <StarBorder 
                            as="button" 
                            className="btn" 
                            color="#ffffffff" 
                            speed="5s"
                            onClick={() => {
                                const element = document.getElementById('contact');
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            }}
                        >
                            Get In Touch
                        </StarBorder>
                        <StarBorder 
                            as="button" 
                            className="btn1" 
                            color="#ffffffff" 
                            speed="5s"
                            onClick={() => {
                                const element = document.getElementById('projects');
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            }}
                        >
                            View My Works
                        </StarBorder>
                    </div>

                    <div className="social-links">
                        <a 
                            href="https://github.com/MicroMV" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Visit my GitHub profile"
                            title="GitHub"
                        >
                            <FaGithub className="social-icon" />
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/rongie-murallos-b9a816392?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Visit my LinkedIn profile"
                            title="LinkedIn"
                        >
                            <FaLinkedin className="social-icon" />
                        </a>
                        <a 
                            href="https://web.facebook.com/gieron.hubilla" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Visit my Facebook profile"
                            title="Facebook"
                        >
                            <FaFacebook className="social-icon" />
                        </a>
                    </div>
                </div>

                <div className="profile-pic-container">
                    <img src="profile.jpg" alt="Rongie H. Murallos" className="profile-pic" />
                </div>
            </div>
        </section>
    );
}

function AboutMeSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="about-content"
        >
          <h2 className="about-title">About Me</h2>
          <div className="about-text">
          <p className="about-paragraph">
            I'm a 3rd year Bachelor of Science in Information Technology student and consistent 
            Dean's Lister with a passion for full-stack development and design. I'm dedicated to 
            crafting meaningful digital experiences that inspire and empower. With determination, 
            optimism, and a constant drive to grow, I approach every project as an opportunity to 
            learn and make a real impact. I believe success comes from persistence and the courage 
            to keep pushing ideas into reality.
          </p>


            <p className="about-paragraph">
              Beyond writing code, I focus on creating clean, maintainable solutions 
              that people genuinely enjoy using. Whether designing an interface or 
              building a complex system, I pour heart and purpose into every detail 
              to ensure each product feels seamless, thoughtful, and built to last.
            </p>

            <div className="skills-grid">
              <div className="skill-item">Fast Learner</div>
              <div className="skill-item">Problem Solver</div>
              <div className="skill-item">2+ years in programming</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
function Services() {
  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <motion.h2 
          className="services-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Services
        </motion.h2>
        
        <div className="services-grid">
          <motion.div 
            className="service-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="service-number">01</div>
            <h3 className="service-name">Website Development</h3>
            <p className="service-description">
              Custom, responsive websites built with modern technologies and best practices for optimal performance.
            </p>
          </motion.div>

          <motion.div 
            className="service-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="service-number">02</div>
            <h3 className="service-name">Mobile App Development</h3>
            <p className="service-description">
              Cross-platform mobile applications using Flutter for Android and iOS with seamless user experiences.
            </p>
          </motion.div>

          <motion.div 
            className="service-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="service-number">03</div>
            <h3 className="service-name">Landing Pages</h3>
            <p className="service-description">
              High-converting landing pages optimized for user engagement and designed to drive results.
            </p>
          </motion.div>

          <motion.div 
            className="service-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="service-number">04</div>
            <h3 className="service-name">UI/UX Design</h3>
            <p className="service-description">
              Intuitive interfaces focused on creating seamless and delightful user experiences.
            </p>
          </motion.div>

          <motion.div 
            className="service-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="service-number">05</div>
            <h3 className="service-name">Website Updates & Maintenance</h3>
            <p className="service-description">
              Ongoing support, updates, and performance optimization to keep your site running smoothly.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
    const skills = [
    {
      name: "Flutter",
      Icon: SiFlutter,
      description: "Cross-platform mobile framework",
      color: "#02569B"
    },
    {
      name: "Dart",
      Icon: SiDart,
      description: "Client-optimized language",
      color: "#0175C2"
    },
    {
      name: "React",
      Icon: FaReact,
      description: "Component-based UI library",
      color: "#61DAFB"
    },
    {
      name: "JavaScript",
      Icon: FaJs,
      description: "Dynamic programming language",
      color: "#F7DF1E"
    },
    {
      name: "PHP",
      Icon: FaPhp,
      description: "Server-side scripting",
      color: "#777BB4"
    },
    {
      name: "Python",
      Icon: SiPython,
      description: "Versatile programming language",
      color: "#3776AB"
    },
    {
      name: "Firebase",
      Icon: SiFirebase,
      description: "Backend as a Service",
      color: "#FFCA28"
    },
    {
      name: "MySQL",
      Icon: SiMysql,
      description: "Relational database",
      color: "#4479A1"
    },
    {
      name: "HTML",
      Icon: FaHtml5,
      description: "Markup language",
      color: "#E34F26"
    },
    {
      name: "CSS",
      Icon: FaCss3Alt,
      description: "Styling layouts",
      color: "#1572B6"
    },
    {
      name: "Tailwind",
      Icon: SiTailwindcss,
      description: "Utility-first CSS framework",
      color: "#06B6D4"
    },
    {
      name: "Figma",
      Icon: SiFigma,
      description: "UI/UX design tool",
      color: "#F24E1E"
    }
  ];

  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <motion.h2 
          className="skills-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Technical Skills
        </motion.h2>
        
        <div className="skills-grid-new">
          {skills.map((skill, index) => {
            const IconComponent = skill.Icon;
            return (
              <motion.div
                key={skill.name}
                className="skill-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <IconComponent 
                  className="skill-icon-real" 
                  style={{ color: skill.color }}
                />
                <h3 className="skill-name">{skill.name}</h3>
                <p className="skill-description">{skill.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
      title: "SK-Cawit-Portal",
      description: (
        <>
          Information Management website where you can manage files, KK information, Announcements, Achievements, Suggestions & Feedbacks, Generate codes, Inventory of supplies, monitor activity logs and Account management.
          <br /><br />
          Login Credentials:<br />
          • Username: Admin<br />
          • Password: Admin@123 <br />
        </>
      ),
      technologies: ["PHP","JavaScript", "MySQL", "HTML", "CSS"],
      liveLink: "https://sk-cawit-portal.free.nf/Project1-SKPortal/public/index.php",
      githubLink: "https://github.com/MicroMV/SK-Web-Based-System-2025.git",
      image: "/sk-portal-dash.png"
    },
    {
      title: "Barangay Child Health Information System",
      description: (
        <>
          A digital platform for barangay health centers to track children's records, immunization schedules, growth monitoring, and nutritional assessments. Features real-time data visualization and automated reporting to identify at-risk children.
          <br /><br />
          Login Credentials:<br />
          • Username: Admin<br />
          • Password: Admin@123
        </>
      ),
      technologies: ["PHP", "JavaScript", "MySQL", "HTML", "CSS"],
      liveLink: "https://bchis.free.nf/bchis/login.php",
      githubLink: "https://github.com/MicroMV/BCHIS-2025.git",
      image: "/bchis.png"
    },
    {
      title: "StudySwap Application",
      description: (
        <>
          A Flutter mobile marketplace app where students can buy, sell, borrow, and swap textbooks and school materials. Functions and Features include multi-mode marketplace with auto-tracking and deadlines, Dark and light mode, Online and offline status, real-time chat with media sharing, and user ratings and reviews for safer exchanges. Promotes sustainable practices and builds a cost-efficient student community.
          <br /><br />
          Download APK:<br />
          Google Drive Link
        </>
      ),
      technologies: ["Flutter", "Firebase", "Dart"],
      liveLink: "https://drive.google.com/file/d/1zNBrcz7ol5HTd6dqmiiuTnx03dGrYtFW/view?usp=drive_link",
      githubLink: "https://github.com/MicroMV/StudySwap-2025.git",
      image: "/studyswap.png"
    },
    {
      title: "Simple PhotoCard LogIn Form",
      description: (
        <>
          A simple login form that when you login music will autoplay and the images will automatically carousel for you.
          <br /><br />
          Login Credentials:<br />
          • Email: mosang@gmail.com<br />
          • Password: 1234
        </>
      ),
      technologies: ["React", "CSS"],
      liveLink: "https://repo-plum-eta.vercel.app/",
      githubLink: "https://github.com/MicroMV/ReactProject-2025.git",
      image: "/mosang.png"
    },

    {
      title: "Crispy King Online Ordering System",
      description: (
        <>
          A web-based food ordering platform with three specialized dashboards. Customers can browse products, add to cart, place orders, and track order status. Riders can accept orders and update delivery status. Admins manage the entire system including rider assignments, products, discounts, users, and order monitoring.
          <br /><br />
          Login Credentials:<br />
          • Admin: Admin / Admin@123<br />
          • Rider: rider / rider@123<br />
          • Customer: test / test@123
        </>
      ),
      technologies: ["PHP", "JavaScript", "MySQL", "HTML", "CSS"],
      liveLink: "https://crispy-king.free.nf/crispy_king/login.php",
      githubLink: "https://github.com/MicroMV/Crispy-King-Online-Ordering-System-2024.git",
      image: "/crispy-king.png"
    },
    {
      title: "AquaMarine Diving Landing Page",
      description: (
        <>
          Experience breathtaking underwater worlds with AquaMarine Diving. PADI certified instructors, vibrant marine life, and custom dive programs for all skill levels.
        </>
      ),
      technologies: ["React", "CSS"],
      liveLink: "https://aqua-dive.vercel.app/",
      githubLink: "https://github.com/MicroMV/AquaDive-landingPage.git",
      image: "/aqua.png"
    }

  ];

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <motion.h2 
          className="projects-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >

              {project.image && (
                <div className="project-image-container">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="project-image"
                  />
                </div>
              )}
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <div className="project-links">
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <FaGithub /> GitHub
                    </a>
                  )}
                  {project.liveLink && (
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link live-link"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    
    emailjs.sendForm(
      'service_ki7nwl8',      
      'template_evoyjin',     
      form.current,
      'uJgFDODgfWgpTnLuS'       
    )
    .then((result) => {
      console.log('Success:', result.text);
      setSubmitStatus('success');
      setIsSubmitting(false);
      form.current.reset();
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(''), 5000);
    })
    .catch((error) => {
      console.log('Error:', error.text);
      setSubmitStatus('error');
      setIsSubmitting(false);
    });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <motion.h2 
          className="contact-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.h2>

        <div className="contact-content">
          {/* Contact Info */}
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="contact-subtitle">Let's work together</h3>
            <p className="contact-description">
              Have a project in mind or just want to chat? <br/>   
              Feel free to reach out. I'm always open to <br/> discussing 
              new projects and opportunities.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <h4>Email</h4>
                  <p>rongiemurallos123@gmail.com</p>
                </div>
              </div>

              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <div>
                  <h4>Phone</h4>
                  <p>+639674016051</p>
                  <p>+639509276082</p>
                </div>
              </div>

              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <h4>Location</h4>
                  <p>Cawit Casiguran Sorsogon, Philippines</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form ref={form} onSubmit={sendEmail} className="contact-form">
              <div className="form-group">
                <label htmlFor="user_name">Name</label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="user_email">Email</label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Your message here..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <p className="status-message success">
                  ✓ Message sent successfully!
                </p>
              )}

              {submitStatus === 'error' && (
                <p className="status-message error">
                  ✗ Failed to send message. Please try again.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

