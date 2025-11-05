import { useState, useEffect } from "react";
import "@/App.css";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Check, ArrowRight, Menu, X, Sparkles, Target, Users, TrendingUp, Phone, Mail, Linkedin, Instagram, Youtube } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTeamPage, setCurrentTeamPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  // Team members data
  const teamMembers = [
    {
      name: "Shivam Tiwari",
      role: "Founder",
      description: "I founded OptiCore to help businesses use AI and automation to work smarter and grow faster. With a strong interest in technology and marketing, I focus on building simple, effective systems that deliver real results",
      photo: "/images/team/shivam.png",
      linkedin: "https://www.linkedin.com/in/shivam-tiwari-aa2ab1233/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/_iam_shivam_tiwari/?igsh=cjhnYXFuc2l1ZjV6#"
    },
    {
      name: "Shubham Tiwari",
      role: "Co-Founder",
      description: "marketing strategist with a passion for brand storytelling. I specialize in crafting compelling narratives that connect businesses with their audiences and drive growth.",
      photo: "/images/team/shubham-tiwari.png",
      linkedin: "https://www.linkedin.com/in/shubham-tiwari-5ab30a211/",
      instagram: "https://www.instagram.com/_shubham_3003_?igsh=c2w5ZXY4bGc1bDZm"
    },
    {
      name: "Satyam Tiwari",
      role: "UI/UX Designer & Lead Generater",
      description: "UI/UX designer and Lead generation specialist with expertise in creating intuitive user interfaces and driving customer acquisition through data-driven strategies.",
      photo: "/images/team/satyam-tiwari.png",
      linkedin: "https://www.linkedin.com/in/satyam-tiwari-0365b7326/",
      instagram: "https://www.instagram.com/satyamtiwari_005?igsh=czc0eGJkdXRnemMx"
    },
    {
      name: "Satyam A Tiwari",
      role: "Lead Developer",
      description: "Full-stack developer focused on scalable AI-powered applications.",
      photo: "/images/team/pinaki-tiwari.jpg",
      linkedin: "https://www.linkedin.com/in/satyam-tiwari-1205a3328/",
      instagram: "https://www.instagram.com/pinakiplays?igsh=M2Z2MGlybTFraGp5"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentTeamPage((prev) => (prev + 1) % 2);
      }, 10000); // 10 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  // Pause auto-play when user interacts
  const handleTeamPageChange = (page) => {
    setCurrentTeamPage(page);
    setIsAutoPlaying(false);
    // Resume auto-play after 30 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 30000);
  };

  // Get current team members to display (2 at a time)
  const currentTeamMembers = teamMembers.slice(currentTeamPage * 2, (currentTeamPage + 1) * 2);

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-800/90 backdrop-blur-xl border-b border-slate-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <img 
                src="https://customer-assets.emergentagent.com/job_automate-agency/artifacts/5dm18xmh_Screenshot_2025-11-04_at_8.24.02_PM-removebg-preview.png" 
                alt="OptiCore Logo" 
                className="h-14 w-auto logo-glow"
                data-testid="nav-logo"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-slate-300 hover:text-emerald-400 transition-colors" data-testid="nav-home-btn">Home</button>
              <button onClick={() => scrollToSection('services')} className="text-slate-300 hover:text-emerald-400 transition-colors" data-testid="nav-services-btn">Services</button>
              <button onClick={() => scrollToSection('about')} className="text-slate-300 hover:text-emerald-400 transition-colors" data-testid="nav-about-btn">About Us</button>
              <button onClick={() => scrollToSection('team')} className="text-slate-300 hover:text-emerald-400 transition-colors" data-testid="nav-team-btn">Team</button>
              <Button onClick={() => scrollToSection('contact')} className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white rounded-full px-6" data-testid="nav-contact-btn">
                Contact Us
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white" data-testid="mobile-menu-toggle">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800" data-testid="mobile-menu">
            <div className="px-6 py-4 space-y-4">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left text-slate-300 hover:text-emerald-400 transition-colors" data-testid="mobile-nav-home-btn">Home</button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left text-slate-300 hover:text-emerald-400 transition-colors" data-testid="mobile-nav-services-btn">Services</button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left text-slate-300 hover:text-emerald-400 transition-colors" data-testid="mobile-nav-about-btn">About Us</button>
              <button onClick={() => scrollToSection('team')} className="block w-full text-left text-slate-300 hover:text-emerald-400 transition-colors" data-testid="mobile-nav-team-btn">Team</button>
              <Button onClick={() => scrollToSection('contact')} className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full" data-testid="mobile-nav-contact-btn">
                Contact Us
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Transforming Business with <span className="text-gradient">AI Automation</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                OptiCore helps businesses leverage cutting-edge AI technology and strategic marketing to drive growth, efficiency, and innovation.
              </p>
              <Button onClick={() => scrollToSection('contact')} className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white rounded-full px-8 py-6 text-lg font-semibold" data-testid="hero-cta-btn">
                Book a Meeting <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <div className="relative">
              <div className="hero-image-wrapper">
                <img src="https://images.unsplash.com/photo-1655890006065-edefcd764af6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwzfHxuZXVyYWwlMjBuZXR3b3JrfGVufDB8fHx8MTc2MjI3MjkxNnww&ixlib=rb-4.1.0&q=85" alt="AI Technology" className="rounded-3xl shadow-2xl" data-testid="hero-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Our Services</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Comprehensive AI automation and marketing solutions tailored for your business needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Sparkles className="w-12 h-12 text-emerald-400" />,
                title: "AI Automation",
                description: "Streamline your operations with intelligent automation solutions that reduce manual work and increase efficiency.",
                features: ["Process Automation", "Workflow Optimization", "Custom AI Models"]
              },
              {
                icon: <Target className="w-12 h-12 text-cyan-400" />,
                title: "Strategic Marketing",
                description: "Data-driven marketing strategies that reach your target audience and drive measurable results.",
                features: ["Digital Campaigns", "Content Strategy", "SEO Optimization"]
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-blue-400" />,
                title: "Analytics & Insights",
                description: "Turn your data into actionable insights with advanced analytics and predictive modeling.",
                features: ["Performance Tracking", "Predictive Analytics", "Custom Dashboards"]
              },
              {
                icon: <Users className="w-12 h-12 text-purple-400" />,
                title: "UI/UX Design",
                description: "Create intuitive and engaging user experiences that drive user satisfaction and business growth.",
                features: ["User Research", "Interface Design", "Usability Testing"]
              },
              {
                icon: <Check className="w-12 h-12 text-orange-400" />,
                title: "Website Development",
                description: "Build modern, responsive websites that convert visitors into customers with cutting-edge technology.",
                features: ["Custom Development", "E-commerce Solutions", "Performance Optimization"]
              }
            ].map((service, idx) => (
              <div key={idx} className="service-card" data-testid={`service-card-${idx}`}>
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{service.title}</h3>
                <p className="text-slate-400 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-slate-300">
                      <Check className="w-5 h-5 text-emerald-400 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="why-choose-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Why Choose OptiCore?</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">We combine technical expertise with strategic thinking to deliver exceptional results</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Sparkles className="w-8 h-8" />, title: "Innovation", description: "Cutting-edge AI solutions" },
              { icon: <Users className="w-8 h-8" />, title: "Collaboration", description: "Partner-focused approach" },
              { icon: <Target className="w-8 h-8" />, title: "Excellence", description: "Quality-driven delivery" },
              { icon: <TrendingUp className="w-8 h-8" />, title: "Results", description: "Measurable business impact" }
            ].map((item, idx) => (
              <div key={idx} className="why-card" data-testid={`why-card-${idx}`}>
                <div className="icon-circle">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{item.title}</h3>
                <p className="text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Meet Our Team</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">The experts behind OptiCore's AI automation and marketing solutions</p>
          </div>

          {/* Team Members Display */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {currentTeamMembers.map((member, idx) => (
              <div key={idx} className="team-card" data-testid={`team-member-${idx}`}>
                <div className="team-photo">
                  <img src={member.photo} alt={member.name} className="w-full h-[36rem] object-cover rounded-xl" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{member.name}</h3>
                  <p className="text-emerald-400 font-medium mb-3">{member.role}</p>
                  <p className="text-slate-400 text-sm mb-4">{member.description}</p>
                  <div className="flex space-x-3">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-400 transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots and Buttons */}
          <div className="flex justify-center items-center space-x-4">
            <Button
              onClick={() => handleTeamPageChange(0)}
              variant={currentTeamPage === 0 ? "default" : "outline"}
              className={`w-3 h-3 rounded-full p-0 ${currentTeamPage === 0 ? 'bg-emerald-500' : 'border-slate-600'}`}
              data-testid="team-page-1"
            />
            <Button
              onClick={() => handleTeamPageChange(1)}
              variant={currentTeamPage === 1 ? "default" : "outline"}
              className={`w-3 h-3 rounded-full p-0 ${currentTeamPage === 1 ? 'bg-emerald-500' : 'border-slate-600'}`}
              data-testid="team-page-2"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form - Left Side */}
            <div className="contact-container">
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 rounded-xl"
                  required
                  data-testid="contact-name-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 rounded-xl"
                  required
                  data-testid="contact-email-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project..."
                  className="w-full bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 rounded-xl min-h-[150px]"
                  required
                  data-testid="contact-message-input"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white rounded-xl py-6 text-lg font-semibold"
                data-testid="contact-submit-btn"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
            </div>

            {/* Contact Information - Right Side */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Get In Touch</h2>
                <p className="text-lg text-slate-400 mb-8">Ready to transform your business with AI automation.</p>
              </div>

              <div className="space-y-6">
                <div className="contact-info-card">
                  <div className="flex items-center justify-center w-12 h-12 bg-emerald-500/20 rounded-full mb-4">
                    <Mail className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">Email</h3>
                  <p className="text-slate-400">info.opticoreai@gmail.com</p>
                </div>

                <div className="contact-info-card">
                  <div className="flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-full mb-4">
                    <Phone className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">Phone</h3>
                  <p className="text-slate-400">(+91) 8928800538</p>
                  <p className="text-slate-400">(+91) 9967805358</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="mb-4">
                <img 
                  src="https://customer-assets.emergentagent.com/job_automate-agency/artifacts/5dm18xmh_Screenshot_2025-11-04_at_8.24.02_PM-removebg-preview.png" 
                  alt="OptiCore Logo" 
                  className="h-14 w-auto logo-glow"
                  data-testid="footer-logo"
                />
              </div>
              <p className="text-slate-400">AI Automation & Marketing Solutions</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('home')} className="block text-slate-400 hover:text-emerald-400 transition-colors">Home</button>
                <button onClick={() => scrollToSection('services')} className="block text-slate-400 hover:text-emerald-400 transition-colors">Services</button>
                <button onClick={() => scrollToSection('about')} className="block text-slate-400 hover:text-emerald-400 transition-colors">About Us</button>
                <button onClick={() => scrollToSection('team')} className="block text-slate-400 hover:text-emerald-400 transition-colors">Team</button>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <p className="text-slate-400">info.opticoreai@gmail.com</p>
              <p className="text-slate-400">(+91) 8928800538</p>
              <p className="text-slate-400">(+91) 9967805358</p>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400">© 2025 OptiCore. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="https://www.linkedin.com/company/opticoreai/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/opticoreai/?igsh=MWU2Ym90ejg3aHE2cw%3D%3D#" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-400 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://youtube.com/@opticore" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-400 transition-colors">
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;