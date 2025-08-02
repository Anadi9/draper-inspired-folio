import { useEffect, useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Send, Star, Sparkles, Heart, Zap, MessageCircle } from 'lucide-react';
import { gsap } from 'gsap';
import Footer from './Footer';

interface ContactProps {
  isVisible?: boolean;
  scrollDirection?: 'up' | 'down';
  animationTrigger?: boolean;
}

const Contact = ({ isVisible = true, scrollDirection = 'down', animationTrigger = true }: ContactProps) => {
  const [animationsVisible, setAnimationsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (animationTrigger && !hasAnimated.current && containerRef.current) {
      hasAnimated.current = true;
      setAnimationsVisible(true);
      
      const tl = gsap.timeline();
      
      // Animate background
      if (backgroundRef.current) {
        tl.fromTo(backgroundRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
        );
      }
      
      // Animate floating particles
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        gsap.fromTo(particles,
          { opacity: 0, scale: 0, y: 100, rotation: 0 },
          { 
            opacity: 1, scale: 1, y: 0, rotation: 360, 
            duration: 1.2, 
            stagger: 0.2,
            ease: "back.out(1.7)",
            delay: 0.3
          }
        );
        
        // Add continuous floating animation
        gsap.to(particles, {
          y: -15,
          duration: 4,
          yoyo: true,
          repeat: -1,
          stagger: 0.2,
          ease: "power2.inOut"
        });
      }
      
      // Animate title with character reveal
      if (titleRef.current) {
        const titleText = titleRef.current.textContent || '';
        titleRef.current.innerHTML = '';
        
        titleText.split('').forEach((char, index) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.opacity = '0';
          span.style.transform = 'translateY(50px)';
          titleRef.current?.appendChild(span);
        });
        
        const titleSpans = titleRef.current.querySelectorAll('span');
        tl.fromTo(titleSpans,
          { opacity: 0, y: 50, rotationX: -90 },
          { 
            opacity: 1, y: 0, rotationX: 0, 
            duration: 0.8, 
            stagger: 0.03,
            ease: "back.out(1.7)" 
          },
          "-=1"
        );
      }
      
      // Animate subtitle
      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current,
          { opacity: 0, y: 30, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.3"
        );
      }
      
      // Animate form with stagger
      if (formRef.current) {
        const formElements = formRef.current.querySelectorAll('input, textarea, button');
        tl.fromTo(formElements,
          { opacity: 0, y: 50, scale: 0.8 },
          { 
            opacity: 1, y: 0, scale: 1,
            duration: 0.6, 
            stagger: 0.1,
            ease: "back.out(1.7)" 
          },
          "-=0.5"
        );
      }
      
      // Animate contact info cards
      if (contactInfoRef.current) {
        const cards = contactInfoRef.current.querySelectorAll('.contact-card');
        tl.fromTo(cards,
          { opacity: 0, x: 50, rotationY: -90 },
          { 
            opacity: 1, x: 0, rotationY: 0,
            duration: 0.8, 
            stagger: 0.1,
            ease: "back.out(1.7)" 
          },
          "-=0.8"
        );
      }
      
    } else if (!animationTrigger) {
      setAnimationsVisible(false);
      hasAnimated.current = false;
    }
  }, [animationTrigger]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'anadithakur97@gmail.com',
      href: 'mailto:anadithakur97@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 74669-14279',
      href: 'tel:+917466914279'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Gurugam, India',
      href: '#'
    }
  ];

  return (
    <section ref={containerRef} id="contact" className="relative min-h-screen overflow-hidden">
      {/* Subtle overlay effects */}
      <div ref={backgroundRef} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/2 via-transparent to-white/2"></div>
      </div>
      
      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${20 + (i * 10) % 60}%`,
              top: `${30 + (i * 15) % 40}%`,
              animationDelay: `${i * 0.4}s`
            }}
          >
            {i % 4 === 0 ? (
              <MessageCircle className="w-5 h-5 text-primary/40" />
            ) : i % 4 === 1 ? (
              <Mail className="w-4 h-4 text-accent/50" />
            ) : i % 4 === 2 ? (
              <Star className="w-3 h-3 text-primary/30" />
            ) : (
              <Heart className="w-4 h-4 text-red-400/40" />
            )}
          </div>
        ))}
      </div>

      <div className="container-fluid pt-24 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Let's Work</span>
            <span className="text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Together</span>
          </h2>
          <p ref={subtitleRef} className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life? Get in touch and let's create something amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 pb-24 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="card-glass p-8 hover-lift transition-all duration-500 hover:shadow-glow-primary relative overflow-hidden">
            <h3 className="text-2xl font-semibold mb-6 text-shimmer">Send a Message</h3>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={`bg-background/50 border-border/50 focus:border-primary transition-all duration-500 hover:shadow-glow-primary/20 ${
                    focusedField === 'name' ? 'shadow-glow-primary/30' : ''
                  }`}
                  required
                />
                {focusedField === 'name' && (
                  <div className="absolute -top-2 -right-2 animate-bounce">
                    <Star className="w-4 h-4 text-primary" />
                  </div>
                )}
              </div>
              
              <div className="relative">
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`bg-background/50 border-border/50 focus:border-primary transition-all duration-500 hover:shadow-glow-primary/20 ${
                    focusedField === 'email' ? 'shadow-glow-primary/30' : ''
                  }`}
                  required
                />
                {focusedField === 'email' && (
                  <div className="absolute -top-2 -right-2 animate-bounce">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                )}
              </div>
              
              <div className="relative">
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className={`bg-background/50 border-border/50 focus:border-primary transition-all duration-500 min-h-32 hover:shadow-glow-primary/20 ${
                    focusedField === 'message' ? 'shadow-glow-primary/30' : ''
                  }`}
                  required
                />
                {focusedField === 'message' && (
                  <div className="absolute -top-2 -right-2 animate-bounce">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                )}
              </div>
              
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/80 transition-all duration-300 hover-lift hover:shadow-glow-primary relative overflow-hidden group"
                onMouseEnter={(e) => {
                  gsap.to(e.target, { scale: 1.02, duration: 0.3, ease: "back.out(1.7)" });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.target, { scale: 1, duration: 0.3, ease: "back.out(1.7)" });
                }}
              >
                <Send size={20} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-shimmer">Send Message</span>
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div ref={contactInfoRef} className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-shimmer">Get in Touch</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                I'm always open to discussing new opportunities, creative projects, 
                or potential collaborations. Feel free to reach out!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card
                  key={info.title}
                  className="contact-card card-glass p-6 hover-lift transition-all duration-500 hover:shadow-glow-primary relative overflow-hidden group"
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { 
                      x: 5, 
                      rotationY: 3,
                      duration: 0.3, 
                      ease: "power2.out" 
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { 
                      x: 0, 
                      rotationY: 0,
                      duration: 0.3, 
                      ease: "power2.out" 
                    });
                  }}
                >
                  <a
                    href={info.href}
                    className="flex items-center space-x-4 group"
                  >
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110">
                      <info.icon size={24} className="text-primary group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 text-shimmer">
                        {info.title}
                      </h4>
                      <p className="text-muted-foreground">{info.value}</p>
                    </div>
                  </a>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <div>
              <Card className="card-glass p-6 text-center hover-lift hover:shadow-glow-primary transition-all duration-500 relative overflow-hidden group">
                <h4 className="text-xl font-semibold mb-3 text-shimmer">Ready to Start?</h4>
                <p className="text-muted-foreground mb-4">
                  Let's discuss your project and turn your vision into reality.
                </p>
                <Button
                  variant="outline"
                  className="border-glow hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover-lift group"
                  onMouseEnter={(e) => {
                    gsap.to(e.target, { scale: 1.05, duration: 0.3, ease: "back.out(1.7)" });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.target, { scale: 1, duration: 0.3, ease: "back.out(1.7)" });
                  }}
                >
                  <Zap size={16} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-shimmer">Schedule a Call</span>
                </Button>
                
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-radial opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              </Card>
            </div>
          </div>
        </div>
      <Footer/>
      </div>
    </section>
  );
};

export default Contact;