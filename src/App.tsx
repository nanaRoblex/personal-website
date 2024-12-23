import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Define a type for banner data
type BannerData = {
  image: string;
  title: string;
  description: string;
};

// Define type for Research Projects data
interface ResearchProject {
  title: string;
  description: string;
  status: string;
  tools: string[];
  languages: string[];
  platforms: string[];
}

interface CategoryDisplayProps {
  title: string;
  items: string[];
  bgColor: string;
  textColor: string;
}


const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  
  const HomePage: React.FC = () => {
    const [currentBannerIndex, setCurrentBannerIndex] = useState<number>(0);
  
    // Banner images with predefined details
    const bannerData: BannerData[] = [
      {
        image: '/images/hpc-banner.webp',
        title: 'High-performance Computing & Computer Architecture',
        description: 'Exploring innovative solutions in computational technologies'
      },
      {
        image: '/images/ai-banner.webp',
        title: 'Artificial Intelligence & Machine Learning',
        description: 'Pushing the boundaries of intelligent computational systems'
      },
      {
        image: '/images/green-banner.jpg',
        title: 'Sustainable Computing & Energy-aware Computing',
        description: 'Developing eco-friendly technological solutions'
      },
      {
        image: '/images/cloud-banner.webp',
        title: 'Edge & Cloud Computing',
        description: 'Innovating distributed computing architectures'
      }
    ];
  
    // Navigation function
    const navigateBanner = useCallback((direction: 'next' | 'prev') => {
      setCurrentBannerIndex((prevIndex) => {
        if (direction === 'next') {
          return (prevIndex + 1) % bannerData.length;
        } else {
          return (prevIndex - 1 + bannerData.length) % bannerData.length;
        }
      });
    }, [bannerData.length]);
  
    // Auto-rotate effect
    useEffect(() => {
      const intervalId = setInterval(() => {
        navigateBanner('next');
      }, 5000);
  
      return () => clearInterval(intervalId);
    }, [navigateBanner]);
  
    return (
      <div className="relative">
        {/* Banner Carousel */}
        <div className="relative h-[560px] overflow-hidden">
          {/* Background Image with Consistent Scaling */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full relative">
              <img 
                src={bannerData[currentBannerIndex].image} 
                alt={bannerData[currentBannerIndex].title}
                className="w-full h-full object-fill object-center" // Changed from object-cover to object-contain
                style={{
                  filter: 'brightness(60%)', // Darken image slightly
                  maxWidth: '100%',
                  maxHeight: '100%',
                  position: 'absolute',
                  top: '0%',
                  left: '0%',
                  transform: 'translate(0%, 0%)'
                }}
              />
            </div>
          </div>
          
          {/* Overlay Content */}
          <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-white text-center px-4 bg-black/50">
            <h1 className="text-4xl font-bold mb-4">
              {bannerData[currentBannerIndex].title}
            </h1>
            <p className="text-xl max-w-2xl">
              {bannerData[currentBannerIndex].description}
            </p>
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={() => navigateBanner('prev')}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-all duration-300 z-20"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
          <button 
            onClick={() => navigateBanner('next')}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-all duration-300 z-20"
          >
            <ChevronRight className="text-white" size={24} />
          </button>
          
          {/* Indicator Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {bannerData.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentBannerIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentBannerIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Rest of home page content */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">Welcome to My Research Portfolio</h2>
          <p className="text-gray-700">
            Dedicated PhD researcher exploring sustainable computing and artificial intelligence.
          </p>
        </div>
      </div>
    );
  };

  const AboutPage = () => {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Personal Photo Section */}
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-full overflow-hidden shadow-lg border-4 border-blue-500">
              <img 
                src="/images/cropped-img_crop.jpg"  // Replace with your actual photo path
                alt="Roblex Nana Tchakoute"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
  
          {/* Personal Story and Research Interests */}
          <div>
            <h2 className="text-3xl font-bold text-blue-800 mb-6">About Me</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                As a passionate PhD researcher at École des Mines de Paris, my journey in computational sciences began with a fascination for the intricate ways technology can solve complex global challenges. Growing up in a rapidly evolving technological landscape, I was always curious about how computing could be both powerful and sustainable.
              </p>
              <p>
                My research focuses on bridging the gap between high-performance computing and energy efficiency. I believe that as we advance technologically, we must also be mindful of our environmental impact, driving innovations that are not just powerful, but also responsible.
              </p>
            </div>
          </div>
        </div>
  
        {/* Research Interests Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-blue-700 mb-6">Research Interests</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xl font-semibold mb-4">Technical Domains</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>High-Performance Computing</li>
                <li>Energy Efficiency in Computing Systems</li>
                <li>Computer Architecture</li>
                <li>Parallel & Distributed Computing</li>
                <li>Performance analysis</li>
                <li>Cloud & Edge computing</li>
                <li>Machine learning</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Academic Background</h4>
              <p className="text-gray-700">
                Currently pursuing a PhD in Sustainable High-Performance Computing at Mines Paris - PSL University. 
                My research aims to develop energy-efficient strategies for complex computational systems, focusing on reducing the energy and carbon footprint of advanced computing technologies.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ResearchPage = () => {
    const researchProjects: ResearchProject[] = [
      {
        title: "Performance Analysis and Energy Optimization of HPC Systems",
        description: "Building on my master's research in ARM vs Intel architectures for graph-based applications, my current work focuses on comprehensive energy efficiency analysis in high-performance computing environments. This research combines performance modeling, energy profiling, and architectural analysis to optimize both computational efficiency and power consumption. Key areas include memory hierarchy impact on energy consumption, irregular access patterns, and cross-platform performance characterization.",
        status: "Ongoing",
        tools: ["LIKWID", "Nvidia-SMI", "ROCm-SMI", "Linux Perf Tools", "PAPI", "EA2P", "Nsight Compute", "Energy Metrics", "Hardware Counters"],
        languages: ["C", "C++", "CUDA", "Python"],
        platforms: ["GRID5000", "Linux", "Docker", "Intel Xeon Servers", "ARM Thunder X2 Servers"]
      },
      {
        title: "Energy-Aware AI Systems Optimization",
        description: "Developing innovative strategies to optimize machine learning algorithms for reduced energy consumption while maintaining performance. This project extends my previous work on architectural performance analysis to the specific challenges of AI workloads, investigating the relationship between model architecture, computational patterns, and energy efficiency. Special focus on memory access patterns and their impact on energy consumption in AI accelerators.",
        status: "In Progress",
        tools: ["TensorFlow", "PyTorch", "JAX", "CuPy", "Numpy", "TensorRT", "sklearn"],
        languages: ["Python", "CUDA", "C++"],
        platforms: ["GRID5000", "Linux", "Docker", "NVIDIA GPUs"]
      },
      {
        title: "Cross-Architecture System Characterization & Performance Modeling",
        description: "Comprehensive benchmarking and characterization of parallel computing systems across diverse architectures, from ARM to x86 and accelerated computing platforms. Building on my previous research in ARM TX2 architectures, this work develops sophisticated performance models for irregular applications and memory-bound workloads. Includes analysis of sparse matrix operations, graph algorithms, and their energy implications across different architectural paradigms.",
        status: "Ongoing",
        tools: ["LIKWID", "OpenMP", "MPI", "Linux Perf Tools", "PAPI", "EA2P", "Nsight Compute", "Performance Metrics", "Hardware Counters"],
        languages: ["C", "C++", "Python", "CUDA"],
        platforms: ["GRID5000", "Linux", "Docker", "Intel Xeon Servers", "ARM Thunder X2 Servers"]
      }
    ];
  
    const CategoryDisplay: React.FC<CategoryDisplayProps> = ({ title, items, bgColor, textColor }) => (
      <div className="mb-2">
        <span className="font-semibold text-blue-600 mr-2">{title}:</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {items.map((item, index) => (
            <span 
              key={index} 
              className={`${bgColor} ${textColor} px-3 py-1 rounded-full text-sm hover:opacity-90 transition-opacity duration-200`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  
    return (
      <div className="p-8">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Research Projects</h2>
        {researchProjects.map((project, index) => (
          <div key={index} className="mb-8 p-6 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-blue-700 mb-3">{project.title}</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <span className="font-semibold text-blue-600 mr-2">Status:</span>
                <span className="bg-blue-100 px-3 py-1 rounded-full text-blue-800">{project.status}</span>
              </div>
              <CategoryDisplay 
                title="Programming Languages"
                items={project.languages}
                bgColor="bg-purple-100"
                textColor="text-purple-800"
              />
              <CategoryDisplay 
                title="Platforms"
                items={project.platforms}
                bgColor="bg-green-100"
                textColor="text-green-800"
              />
              <CategoryDisplay 
                title="Tools"
                items={project.tools}
                bgColor="bg-gray-100"
                textColor="text-gray-700"
              />
            </div>
          </div>
        ))}
      </div>
    );
  };  

  const CVPage = () => {
	  const workExperience = [
		{
		  company: "École des Mines de Paris -- PSL",
		  position: "PhD Research Fellow",
		  period: "2023.02 - Present",
		  responsibilities: [
		    "State of the art on energy consumption of HPC systems and AI applications",
		    "Energy tools development and experimentations",
		    "Energy/performance measurement, benchmarking, and optimization strategies",
		    "Scientific paper writing for publication in conferences and journals"
		  ]
		},
		{
		  company: "Mégasoft Sarl",
		  position: "Junior Software Enginer",
		  period: "2022.06 - 2022.12",
		  responsibilities: [
		    "Wrote automated test programs in Java, Selenium, and MDAL (The enterprise software backbone)",
		    "Synchronized databases (MySQL, Postgres) with triggers",
		    "Managed data import/export and FTP transfers",
		    "Collaborated with developers and interns"
		  ]
		},
		{
		  company: "GENI-ELECT",
		  position: "IT Technician (Part-time)",
		  period: "2019.01 - 2022.06",
		  responsibilities: [
		    "Installation and configuration of workstations, printers, and CCTV cameras",
		    "Configured Sage Ligne 100 software for accounting and sales management",
		    "Trained company personnel in IT tools and management software",
		    "Supported decentralized cash entry and stock management modules"
		  ]
		}
	  ];

	  const licensesAndCertifications = [
		{
		  title: "Scientific Computing and Python for Data Science",
		  issuer: "WORLDQUANT UNIVERSITY",
		  date: "2019.12",
		  verificationLink: "https://wqu.thedataincubator.com/certificate/4530343319175168"
		},
		{
		  title: "Machine Learning and Statistical Analysis",
		  issuer: "WORLDQUANT UNIVERSITY",
		  date: "2020.03",
		  verificationLink: "https://wqu.thedataincubator.com/certificate/4931942994673664"
		}
	  ];

	  return (
		<div className="container mx-auto px-4 py-8">
		  <h2 className="text-3xl font-bold mb-6">Professional Journey</h2>
		  
		  {/* Professional Experience Section */}
		  <div className="mb-8">
		    <h3 className="text-2xl font-semibold text-blue-700 mb-4">Professional Experience</h3>
		    {workExperience.map((job, index) => (
		      <div key={index} className="mb-6 p-4 border rounded-lg">
		        <h4 className="text-xl font-semibold">{job.position}</h4>
		        <p className="text-gray-600 mb-2">{job.company} | {job.period}</p>
		        <ul className="list-disc list-inside text-gray-700">
		          {job.responsibilities.map((resp, respIndex) => (
		            <li key={respIndex}>{resp}</li>
		          ))}
		        </ul>
		      </div>
		    ))}
		  </div>

		  {/* Licenses and Certifications Section */}
		  <div>
		    <h3 className="text-2xl font-semibold text-blue-700 mb-4">Licenses and Certifications</h3>
		    {licensesAndCertifications.map((cert, index) => (
		      <div key={index} className="mb-6 p-4 border rounded-lg">
		        <h4 className="text-xl font-semibold">{cert.title}</h4>
		        <p className="text-gray-600 mb-2">
		          {cert.issuer} | {cert.date}
		        </p>
		        {cert.verificationLink && (
		          <a 
		            href={cert.verificationLink}
		            target="_blank"
		            rel="noopener noreferrer"
		            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
		          >
		            Verify Certification
		          </a>
		        )}
		      </div>
		    ))}
		  </div>
		</div>
	  );
	};

  const PublicationsPage = () => {
    const publications = {
      internationalConferences: [
        {
          type: 'conference',
          title: "Experimental Study of Power Consumption of Basic Parallel Programs",
          authors: ["R. Nana Tchakoute", "C. Tadonki"],
          conference: "International Symposium on Computer Architecture and High Performance Computing Workshops (SBAC-PADW)",
          address: "Hilo, United States",
          publisher: "IEEE",
          number: "ISBN: 979-8-3315-0673-5",
          pages: "33-41",
          year: 2024,
          doi: "10.1109/SBAC-PADW64858.2024.00016",
          pdfLink: "https://minesparis-psl.hal.science/hal-04819121v1/file/Wamca2024_Roblex.pdf",
          slidesLink: "/publications/WAMCA/WAMCA_Experimental Study of Power Consumption of Basic Parallel Programs.pdf"
        },
        {
          type: 'conference',
          title: "A Flexible Operational Framework for Energy Profiling of Programs",
          authors: ["R. Nana Tchakoute", "C. Tadonki", "P. Dokladal", "Y. Mesri"],
          conference: "International Symposium on Computer Architecture and High Performance Computing Workshops (SBAC-PADW)",
          address: "Hilo, United States",
          publisher: "IEEE",
          number: "ISBN: 979-8-3315-0673-5",
          pages: "12-22",
          year: 2024,
          doi: "10.1109/SBAC-PADW64858.2024.00014",
          pdfLink: "https://minesparis-psl.hal.science/hal-04819054v1/file/Submission_EA2P_WAMCA.pdf",
          slidesLink: "/publications/WAMCA/WAMCA_A Flexible Operational Framework for Energy Profiling of Programs.pdf"
        }
      ],
      internationalJournals: [
        // Add international journal publications here
        // {
        //   type: 'journal',
        //   title: "Energy Efficiency Strategies in High-Performance Computing",
        //   authors: ["R. Nana Tchakoute", "C. Tadonki"],
        //   journal: "International Journal of High Performance Computing",
        //   volume: "45",
        //   issue: "2",
        //   pages: "123-145",
        //   year: 2024,
        //   doi: "10.1080/xxxxx",
        //   pdfLink: "#"
        // }
      ],
      others: [
        // Add Others publications here
        {
          type: 'others',
          title: "Energy Concerns with HPC Systems and Applications",
          authors: ["R. Nana Tchakoute", "C. Tadonki", "P. Dokladal", "Y. Mesri"],
          conference: "Preprints & research reports",
          year: 2023,
          pdfLink: "https://arxiv.org/pdf/2309.08615"
        }
      ],
      talks: [
        {
          type: 'talk',
          title: "Software-based energy measurement as first step for power-aware application optimization",
          event: "PhD Student TTI.5 Webinar",
          date: "December 2024",
          pdfLink: "/publications/talks/Webinar_TTI.5_18-12-2024.pdf",
          slidesLink: "/publications/talks/Webinar_TTI.5_18-12-2024.pdf"
        },
        {
          type: 'talk',
          title: "A Flexible Tool For Energy Measurmeent Of Programns",
          event: "Journée des doctorant de deuxième année : ED ISMME Mines Paris - PSL",
          date: "Juin 2024",
          pdfLink: "/publications/talks/NANA_TCHAKOUTE_Roblex_CRI-MINES-PARIS_Poster.pdf",
          slidesLink: "/publications/talks/NANA_TCHAKOUTE_Roblex_CRI-MINES-PARIS_Poster.pdf"
        },
        {
          type: 'talk',
          title: "Software-based energy measurement as first step for power-aware application optimization",
          event: "Matinée numérique éco responsable",
          date: "Juin 2024",
          pdfLink: "/publications/talks/Software-based_energy_measurement_as_first_step_for_power-aware_application_optimization.pdf",
          slidesLink: "/publications/talks/Software-based_energy_measurement_as_first_step_for_power-aware_application_optimization.pdf"
        },
        {
          type: 'talk',
          title: "Fine grained Energy Profiling of programs",
          event: "Journées de Recherche en Apprentissage Frugal (JRAF)",
          date: "December 2023",
          pdfLink: "https://jraf-2023.sciencesconf.org/data/pages/tchkoute_1.pdf",
          slidesLink: "https://jraf-2023.sciencesconf.org/data/pages/tchkoute_1.pdf"
        },
        {
          type: 'talk',
          title: "Intelligence artificielle haute performance sensible au carbone",
          event: "The Transition Institute 1.5 : Les enjeux sécuritaires des changements climatiques",
          date: "March 2023",
          pdfLink: "/publications/talks/A-796-POSTER.pdf",
          slidesLink: "/publications/talks/A-796-POSTER.pdf"
        }
      ]
    };
  
    const renderPublicationSection = (sectionTitle: string, publications: any[]) => (
      <div>
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">{sectionTitle}</h3>
        <div className="space-y-4">
          {publications.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <h4 className="text-xl font-semibold">{item.title}</h4>
              <p className="text-gray-600 mb-2">
                {item.conference || item.journal || item.event}, {item.year}
              </p>
              {item.authors && (
                <p className="text-gray-700 mb-2">
                  Authors: {item.authors.join(", ")}
                </p>
              )}
              <div className="flex space-x-4">
                {item.pdfLink && item.pdfLink !== "#" && (
                  <a 
                    href={item.pdfLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    View PDF
                  </a>
                )}
                {item.slidesLink && (
                  <a 
                    href={item.slidesLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    View Slides
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Publications and Talks</h2>
        
        <div className="space-y-8">
          {renderPublicationSection("International Conference Proceedings", publications.internationalConferences)}
          {renderPublicationSection("International Journals", publications.internationalJournals)}
          {renderPublicationSection("Others scientific productions", publications.others)}
          {renderPublicationSection("Posters & Talks", publications.talks)}
        </div>
      </div>
    );
  };

  const ContactPage = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    });
  
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
      type: 'success' | 'error' | null;
      message: string;
    }>({ type: null, message: '' });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [id]: value
      }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus({ type: null, message: '' });
  
      try {
        const result = await emailjs.send(
          'service_k7y3pse', // Replace with your EmailJS service ID
          'template_bz3kj1p', // Replace with your EmailJS template ID
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_name: 'Roblex', // Your name
            reply_to: formData.email,
          },
          'CcPVh2SuDTqj95D_z' // Replace with your EmailJS public key
        );
  
        if (result.status === 200) {
          setSubmitStatus({
            type: 'success',
            message: 'Thank you for your message! I will get back to you soon.'
          });
          setFormData({ name: '', email: '', message: '' });
        }
      } catch (error) {
        setSubmitStatus({
          type: 'error',
          message: 'Failed to send message. Please try again later.'
        });
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return (
      <div className="p-8">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Get in touch with me</h2>
        <div className="max-w-md mx-auto">
          <form 
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label 
                className="block text-gray-700 text-sm font-bold mb-2" 
                htmlFor="name"
              >
                Name
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="name" 
                type="text" 
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label 
                className="block text-gray-700 text-sm font-bold mb-2" 
                htmlFor="email"
              >
                Email
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="email" 
                type="email" 
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label 
                className="block text-gray-700 text-sm font-bold mb-2" 
                htmlFor="message"
              >
                What do you want to discuss?
              </label>
              <textarea 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-32 leading-tight focus:outline-none focus:shadow-outline" 
                id="message" 
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
  
            {submitStatus.message && (
              <div className={`mb-4 p-3 rounded ${
                submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {submitStatus.message}
              </div>
            )}
  
            <div className="flex items-center justify-between">
              <button 
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About Me', icon: 'ℹ️' },
    { id: 'research', label: 'Research', icon: '🔬' },
    { id: 'cv', label: 'CV', icon: '📄' },
    { id: 'publications', label: 'Publications', icon: '📚' },
    { id: 'contact', label: 'Contact', icon: '📧' }
  ];
  
  const renderSection = () => {
    switch(activeSection) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'research':
        return <ResearchPage />;
      case 'cv':
        return <CVPage />;
      case 'publications':
        return <PublicationsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Roblex NANA TCHAKOUTE</div>
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`hover:bg-blue-700 px-3 py-2 rounded flex items-center ${
                  activeSection === item.id ? 'bg-blue-600' : ''
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {renderSection()}
        {/* Other section rendering remains the same */}
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center p-4 mt-8">
        <p>© 2024 Roblex Nana Tchakoute | PhD Researcher</p>
        <div className="mt-2">
          <a href="https://www.linkedin.com/in/roblex-nana-tchakout%C3%A9-183464169/" className="mx-2 hover:text-blue-300">📎 LinkedIn</a>
          <a href="#" className="mx-2 hover:text-blue-300">🌐 ResearchGate</a>
          <a href="https://scholar.google.com/citations?user=zUOVmHAAAAAJ&hl=fr" className="mx-2 hover:text-blue-300">🎓 Google Scholar</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
