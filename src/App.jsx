import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Github, 
  Mail, 
  Menu,
  X,
  ChevronDown, 
  Database, 
  Server,
  Bot, 
  Mic, 
  Terminal,
  Code2,
  Download,
  BrainCircuit,
  Globe2,
  Cpu
} from 'lucide-react';

// --- 3D Interactive Components ---

// 3D Tilt Card Wrapper
const TiltCard = ({ children, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the motion with a spring physics configuration
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse coordinates to rotation angles
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        perspective: 1200,
      }}
      className={`relative ${className} w-full h-full`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full"
      >
        <div
          style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
          className="h-full w-full rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl relative z-10 overflow-hidden group"
        >
          {/* Dynamic glare effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ transform: "translateZ(60px)" }}
          />
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Floating 3D Background Particles
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-screen filter blur-3xl opacity-20"
          animate={{
            x: [Math.random() * 400 - 200, Math.random() * 400 - 200, Math.random() * 400 - 200],
            y: [Math.random() * 400 - 200, Math.random() * 400 - 200, Math.random() * 400 - 200],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{
            width: Math.random() * 400 + 200,
            height: Math.random() * 400 + 200,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'][i % 4],
          }}
        />
      ))}
    </div>
  );
};


// Smooth Scroll Link
const ScrollLink = ({ to, children, className, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const element = document.getElementById(to);
    if (element) {
      const offset = 80; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    if (onClick) onClick();
  };

  return (
    <a href={`#${to}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`py-20 px-6 md:px-20 relative z-10 ${className}`}>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto"
    >
      {children}
    </motion.div>
  </section>
);

const SkillCard = ({ icon: Icon, title, skills, color }) => (
  <TiltCard>
    <div className="p-8 h-full flex flex-col">
      <div className={`flex items-center gap-4 mb-6 ${color}`}>
        <div className="p-4 rounded-xl bg-slate-800/80 shadow-inner" style={{ transform: "translateZ(30px)" }}>
          <Icon size={32} />
        </div>
        <h3 className="text-2xl font-bold text-slate-100" style={{ transform: "translateZ(20px)" }}>{title}</h3>
      </div>
      <ul className="space-y-4 flex-grow" style={{ transform: "translateZ(40px)" }}>
        {skills.map((skill, idx) => (
          <li key={idx} className="flex items-center gap-3 text-slate-300 font-medium">
            <div className={`w-2 h-2 rounded-full ${color.replace('text-', 'bg-')} shadow-[0_0_8px_currentColor]`} />
            {skill}
          </li>
        ))}
      </ul>
    </div>
  </TiltCard>
);

const ProjectCard = ({ title, desc, tags, icon: Icon, type }) => (
  <TiltCard>
    <div className="p-8 flex flex-col h-full">
      <div className="flex justify-between items-start mb-6" style={{ transform: "translateZ(30px)" }}>
        <div className="p-3 bg-slate-800/80 rounded-xl text-blue-400 group-hover:text-cyan-300 transition-colors shadow-inner">
          <Icon size={28} />
        </div>
        <span className="text-xs font-mono font-semibold text-slate-300 bg-slate-800/50 border border-slate-700 px-3 py-1.5 rounded-full backdrop-blur-md">
          {type}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-4 leading-tight" style={{ transform: "translateZ(40px)" }}>{title}</h3>
      <p className="text-slate-400 mb-8 leading-relaxed flex-grow" style={{ transform: "translateZ(20px)" }}>
        {desc}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto" style={{ transform: "translateZ(35px)" }}>
        {tags.map((tag, i) => (
          <span key={i} className="text-xs font-medium text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded border border-slate-700/50 shadow-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </TiltCard>
);

const ExperienceItem = ({ role, company, date, bullets, current }) => (
  <div className="relative pl-8 md:pl-12 py-6 group">
    <div className="border-l-2 border-slate-800 absolute left-[5px] top-0 h-full group-last:h-1/2"></div>
    <div className={`absolute left-0 top-8 w-3 h-3 rounded-full border-2 z-10 transition-all duration-500 ${current ? 'bg-blue-500 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] scale-125' : 'bg-slate-950 border-slate-600 group-hover:border-blue-400 group-hover:bg-blue-900'}`}></div>
    
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{role}</h3>
      <span className="text-xs font-mono font-bold text-blue-300 px-3 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20 w-fit shadow-sm">
        {date}
      </span>
    </div>
    <p className="text-slate-400 mb-5 font-semibold flex items-center gap-2 text-lg">
      <Server size={16} className={current ? "text-blue-500" : ""} />
      {company}
    </p>
    <ul className="space-y-3">
      {bullets.map((item, i) => (
        <li key={i} className="text-slate-400 text-sm md:text-base leading-relaxed flex items-start gap-3">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0 group-hover:bg-blue-500 transition-colors"></span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMenuOpen]);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* 3D Dynamic Background */}
      <FloatingParticles />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/70 backdrop-blur-xl z-50 border-b border-white/5 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-bold text-white text-2xl tracking-tight flex items-center gap-2">
            <Cpu className="text-blue-500" size={28} />
            Pragadeesh<span className="text-slate-500">.RV</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide">
            {['About', 'Skills', 'Experience', 'Projects'].map((item) => (
              <ScrollLink 
                key={item} 
                to={item.toLowerCase()} 
                className="cursor-pointer text-slate-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all"
              >
                {item}
              </ScrollLink>
            ))}
            <ScrollLink 
              to="contact"
              className="px-6 py-2.5 bg-white text-slate-950 rounded-full font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all cursor-pointer"
            >
              Contact Me
            </ScrollLink>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: '100vh', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden absolute top-20 left-0 w-full bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 overflow-hidden z-40"
            >
              <div className="flex flex-col p-8 space-y-6 text-xl">
                {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
                  <ScrollLink
                    key={item}
                    to={item.toLowerCase()}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-slate-300 hover:text-white py-2 cursor-pointer font-bold border-b border-slate-800"
                  >
                    {item}
                  </ScrollLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 relative z-10">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-bold mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Senior Associate & GenAI Architect
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
              Architecting <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Data & Intelligence
              </span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-lg leading-relaxed font-medium">
              4+ Years in Data Engineering. I build robust enterprise <strong>ETL pipelines</strong> and pioneer custom <strong>Generative AI</strong> solutions, bridging the gap between big data infrastructure and intelligent automation.
            </p>
            <div className="flex flex-wrap gap-5">
              <a 
                href="resume.pdf" 
                download="Pragadeesh_Resume.pdf"
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] cursor-pointer flex items-center gap-2"
              >
                <Download size={20} />
                Download CV
              </a>
              <ScrollLink to="projects" className="px-8 py-3.5 bg-slate-800/80 backdrop-blur-md hover:bg-slate-700 text-white rounded-full font-bold transition-all border border-slate-600 hover:border-slate-400 cursor-pointer flex items-center gap-2">
                View Innovation <ChevronDown size={20} />
              </ScrollLink>
            </div>
          </motion.div>

          {/* Hero 3D Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", delay: 0.2 }}
            className="hidden lg:flex justify-center items-center perspective-1200"
          >
             <TiltCard className="w-[450px] h-[350px]">
                <div className="p-8 h-full flex flex-col justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-10">
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-4" style={{ transform: "translateZ(40px)" }}>
                    <BrainCircuit className="text-purple-400" size={28} />
                    <span className="text-lg font-bold text-white tracking-widest uppercase">System Initialization</span>
                  </div>
                  <div className="font-mono text-sm space-y-3" style={{ transform: "translateZ(60px)" }}>
                    <div className="flex text-slate-400">
                      <span className="text-blue-400 mr-2">➔</span> <span>Loading Data Warehouse modules... <span className="text-green-400">OK</span></span>
                    </div>
                    <div className="flex text-slate-400">
                      <span className="text-blue-400 mr-2">➔</span> <span>Establishing ETL Pipelines... <span className="text-green-400">OK</span></span>
                    </div>
                    <div className="flex text-slate-400">
                      <span className="text-purple-400 mr-2">➔</span> <span>Initializing LLM Agents & RAG... <span className="text-green-400">OK</span></span>
                    </div>
                    <div className="flex text-slate-400">
                      <span className="text-purple-400 mr-2">➔</span> <span>Mounting Comfy-UI Workflows... <span className="text-green-400">OK</span></span>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-800/50 flex items-center">
                      <span className="animate-pulse w-3 h-3 bg-green-500 rounded-full mr-3 shadow-[0_0_10px_#22c55e]"></span>
                      <span className="text-white font-bold tracking-wide">Status: Fully Operational</span>
                    </div>
                  </div>
                </div>
             </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <h2 className="text-4xl font-extrabold text-white tracking-tight">About Me</h2>
        </div>
        
        <div className="grid md:grid-cols-5 gap-12 bg-slate-900/40 border border-slate-800/50 p-8 md:p-12 rounded-3xl backdrop-blur-sm shadow-xl">
          <div className="md:col-span-3 space-y-6 text-lg text-slate-300 leading-relaxed font-medium">
            <p>
              I am a <strong className="text-white">Senior Associate</strong> and an integral part of a specialized QA team performing deep ETL/Database testing, encompassing Source, Stage, ODS/Data Marts, and Migration protocols. 
            </p>
            <p>
              With over 4 years of experience, I have built a strong relationship with leadership to effectively deliver <strong className="text-blue-400">data analytics solutions</strong>. By developing, identifying, and implementing improvements to massive data warehouse systems, I ensure data integrity that directly contributes to business success.
            </p>
            <p>
              Beyond the enterprise data landscape, I am deeply entrenched in <strong className="text-purple-400">Generative AI and Full-Stack Web Development</strong>. From finetuning localized open-source Voice Agents to architecting custom RAG systems, I blend data reliability with AI innovation.
            </p>
          </div>
          
          <div className="md:col-span-2 grid gap-5">
             <TiltCard>
               <div className="p-6 h-full flex flex-col justify-center items-center text-center">
                <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-600 mb-2" style={{ transform: "translateZ(30px)" }}>2026</div>
                <div className="text-sm text-slate-400 font-bold uppercase tracking-widest" style={{ transform: "translateZ(20px)" }}>Promoted to Senior</div>
               </div>
             </TiltCard>
             <TiltCard>
               <div className="p-6 h-full flex flex-col justify-center items-center text-center">
                <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-500 mb-2" style={{ transform: "translateZ(30px)" }}>4+</div>
                <div className="text-sm text-slate-400 font-bold uppercase tracking-widest" style={{ transform: "translateZ(20px)" }}>Years Enterprise Exp</div>
               </div>
             </TiltCard>
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <h2 className="text-4xl font-extrabold text-white tracking-tight">Technical Arsenal</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkillCard 
            icon={Database}
            color="text-blue-400"
            title="ETL & Architecture"
            skills={[
              "SQL Server & MySQL",
              "ETL Testing (Source → ODS)",
              "Data Migration & Validation",
              "Jupiter Automation Tool",
              "Pandas Basics & Python",
              "DB Visualizer & Data Quality"
            ]}
          />
          <SkillCard 
            icon={BrainCircuit}
            color="text-purple-400"
            title="Generative AI"
            skills={[
              "LLMs & Prompt Engineering",
              "Comfy-UI Workflows & Loras",
              "Voice Agents (TTS/ASR)",
              "Finetuned RAG Systems",
              "Image/Audio/Video Gen",
              "Open-source Local Models"
            ]}
          />
          <SkillCard 
            icon={Terminal}
            color="text-emerald-400"
            title="Dev & Management"
            skills={[
              "Python & Open-CV",
              "Machine/Deep Learning Basics",
              "Jira, Zephyr, ADO Boards",
              "Full-Stack Web Development",
              "Strategic Planning",
              "Agile Team Management"
            ]}
          />
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <h2 className="text-4xl font-extrabold text-white tracking-tight">Career Trajectory</h2>
        </div>

        <div className="max-w-4xl border-l-2 border-slate-800/50 ml-4 pl-8 md:pl-12 space-y-12 relative">
          
          <ExperienceItem 
            current={true}
            role="Senior Associate"
            company="Church Mutual Insurance Company"
            date="Feb 2026 - Present"
            bullets={[
              "Conduct daily status calls with the client and technically lead the team on Production change requests and Data expansion enhancements.",
              "Manage Test SQL review, Results Analysis, Defect Reporting, and Retesting using ADO Boards and Jira.",
              "Responsible for preparing architectural understanding documents and presenting execution status to executive stakeholders.",
              "Lead Initial and Incremental Testing alongside deep Report analysis."
            ]}
          />

          <ExperienceItem 
            role="Associate"
            company="Church Mutual Insurance Company"
            date="July 2023 - Dec 2025"
            bullets={[
              "Led analysis of Migration, Integration, PSR, and Data Mart testing requirements.",
              "Authored advanced SQL queries for Migration, Integration, and Policy search business rules validation.",
              "Leveraged Jupiter Automation tool for CMT, Migration, and complex data validation between heterogeneous sources."
            ]}
          />

           <ExperienceItem 
            role="Program Analyst"
            company="Church Mutual Insurance Company"
            date="July 2021 - July 2023"
            bullets={[
              "Instrumental in the successful completion of Release 1 of the Project as an ETL tester.",
              "Designed manual SQL scripts to enforce Data standardization and Data quality checks.",
              "Implemented efficient error-handling methods and created Base Query structures for Data Mart and Migration tracks.",
              "Utilized Db Visualizer and Zephyr Utility for rigorous manual testing."
            ]}
          />
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <h2 className="text-4xl font-extrabold text-white tracking-tight">Innovation & R&D</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          
          <ProjectCard 
            title="OpenAmica & Custom Models"
            type="GenAI Avatar"
            desc="Developing 'OpenAmica', an interactive 3D avatar application. It is seamlessly integrated with a custom local API wrapped around highly optimized open-source models handling TTS, ASR, and LLM processing."
            tags={["Python", "3D Avatar", "TTS/ASR", "Open-source LLMs"]}
            icon={Bot}
          />

          <ProjectCard 
            title="Regional AI Voice Agents"
            type="Local AI"
            desc="Built a robust Local AI Voice Agent focused on Tamil and other regional languages of India. Achieved natural conversational flow by utilizing custom fine-tuned open-source models."
            tags={["Tamil NLP", "Voice AI", "Fine-tuning", "Local Models"]}
            icon={Mic}
          />

          <ProjectCard 
            title="College Alumni RAG System"
            type="Personalized AI"
            desc="Created a specialized Gen-AI model for my alma mater. Implemented deep embeddings and a fine-tuned RAG system for specific university use cases, coupled with integrated voice capabilities."
            tags={["RAG", "Embeddings", "Institution AI", "Prompt Engineering"]}
            icon={Globe2}
          />

          <ProjectCard 
            title="Second You & Game Dev"
            type="Full-Stack Web"
            desc="Vibe coded 'Second You', a full-stack web application simulating alternate life paths based on user decisions. Also developed classic games like 'COWS and BULLS' using Python and hosted via GitHub pages."
            tags={["Web App", "Simulation", "Python", "GitHub Pages"]}
            icon={Code2}
          />

        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="pb-32">
        <TiltCard className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 rounded-2xl p-12 text-center shadow-2xl relative z-10">
            <h2 className="text-4xl font-extrabold text-white mb-6 tracking-tight" style={{ transform: "translateZ(50px)" }}>Let's Build the Future</h2>
            <p className="text-slate-300 mb-10 text-xl font-medium max-w-2xl mx-auto" style={{ transform: "translateZ(30px)" }}>
              Whether it's ensuring the integrity of massive enterprise data lakes or building next-generation localized AI models, I'm ready for the challenge.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6" style={{ transform: "translateZ(60px)" }}>
              <a 
                href="mailto:Pragadeeshvelumani@gmail.com" 
                className="inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
              >
                <Mail size={22} />
                Pragadeeshvelumani@gmail.com
              </a>
              <a 
                href="https://github.com/pragarocks" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-slate-800 text-white px-8 py-4 rounded-full font-bold border border-slate-600 hover:border-slate-400 hover:bg-slate-700 transition-all shadow-lg"
              >
                <Github size={22} />
                GitHub Portfolio
              </a>
            </div>
          </div>
        </TiltCard>
        
        <footer className="mt-20 pt-8 border-t border-white/10 text-center text-slate-500 font-medium">
          <p>© 2026 Pragadeesh R V. Architected with React, Tailwind & Framer Motion.</p>
        </footer>
      </Section>

    </div>
  );
}