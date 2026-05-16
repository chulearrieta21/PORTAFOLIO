import { CSSProperties, ElementType, ReactNode, useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { MotionValue, motion, useScroll, useTransform } from 'framer-motion';

type FadeInProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
};

type MagnetProps = {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
};

type Project = {
  number: string;
  name: string;
  category: string;
  description: string;
  layout?: 'desktop' | 'mobile';
  images: [string, string, string];
};

const marqueeImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

const stack = [
  ['01', 'Firebase', 'Servicios backend, autenticación, bases de datos en tiempo real y despliegue de soluciones cloud escalables.'],
  ['02', 'Supabase', 'Arquitecturas backend modernas con PostgreSQL, autenticación, storage y APIs listas para producto.'],
  ['03', 'SQL', 'Modelado, consultas, relaciones y optimización de datos para plataformas con lógica de negocio sólida.'],
  ['04', 'Node.js', 'Desarrollo de APIs, servicios backend, integraciones y flujos server-side orientados a rendimiento.'],
  ['05', 'Next.js', 'Aplicaciones web modernas con renderizado híbrido, rutas optimizadas y experiencias full stack.'],
  ['06', 'Python', 'Automatización, procesamiento de datos, prototipos backend e integración con modelos inteligentes.'],
  ['07', 'React', 'Interfaces dinámicas, componentes reutilizables y experiencias web fluidas para productos digitales.'],
  ['08', 'Java', 'Desarrollo robusto con enfoque en lógica de negocio, aplicaciones estructuradas y soluciones empresariales.'],
  ['09', 'PHP', 'Desarrollo web backend, integración con sistemas existentes y construcción de funcionalidades server-side.'],
  ['10', 'JavaScript', 'Interactividad, lógica frontend/backend y desarrollo de aplicaciones web modernas.'],
  ['11', 'Android Studio', 'Diseño y construcción de aplicaciones móviles nativas para Android.'],
  ['12', 'Inteligencia Artificial', 'Integración de IA en productos digitales para análisis, automatización y asistencia inteligente.'],
  ['13', 'Blender', 'Modelado de objetos 3D, creación de piezas digitales, composición visual y renders para proyectos interactivos.'],
];

const projects: Project[] = [
  {
    number: '01',
    name: 'Control de Troqueles',
    category: 'Mobile App',
    description: 'Aplicación móvil desarrollada para CUERO VELEZ, empresa de Medellín, enfocada en administrar, registrar y controlar troqueles, fortaleciendo la trazabilidad operativa y la gestión interna de activos industriales.',
    layout: 'desktop',
    images: [
      '/projects/project-1/troqueles-inventario.jpg',
      '/projects/project-1/troqueles-creditos.jpg',
      '/projects/project-1/troqueles-inventario.jpg',
    ],
  },
  {
    number: '02',
    name: 'App Médica con IA',
    category: 'AI HealthTech',
    description: 'Aplicación móvil que integra Inteligencia Artificial para analizar incomodidades físicas y entregar sugerencias informativas a los usuarios mediante una experiencia clara, útil y centrada en la confianza.',
    layout: 'mobile',
    images: [
      '/projects/project-2/medica-home.jpg',
      '/projects/project-2/medica-chat.jpg',
      '/projects/project-2/medica-home.jpg',
    ],
  },
  {
    number: '03',
    name: 'Web Corporativa Parquesoft',
    category: 'Corporate Web',
    description: 'Diseño corporativo y desarrollo web para Parquesoft, orientado a una presencia digital moderna, institucional y profesional. El proyecto se encuentra actualmente en proceso de dominio.',
    layout: 'desktop',
    images: [
      '/projects/project-3/parquesoft-1.png',
      '/projects/project-3/parquesoft-2.png',
      '/projects/project-3/parquesoft-1.png',
    ],
  },
  {
    number: '04',
    name: 'Diagnóstico TRL CRL',
    category: 'Web Platform',
    description: 'Plataforma web para diagnosticar y evaluar proyectos según sus niveles TRL y CRL, facilitando decisiones estratégicas sobre madurez tecnológica y comercial.',
    layout: 'desktop',
    images: [
      '/projects/project-4/trl-crl-1.png',
      '/projects/project-4/trl-crl-2.png',
      '/projects/project-4/trl-crl-3.png',
    ],
  },
  {
    number: '05',
    name: 'Comunicación Social UAJMS',
    category: 'Education Platform',
    description: 'Plataforma web desarrollada para estudiantes de Comunicación Social de la Universidad Antonio José de Sucre, pensada para centralizar recursos, procesos y herramientas académicas.',
    layout: 'desktop',
    images: [
      '/projects/project-5/comunicacion-social-1.png',
      '/projects/project-5/comunicacion-social-2.png',
      '/projects/project-5/comunicacion-social-1.png',
    ],
  },
  {
    number: '06',
    name: 'Modelado de Objetos 3D',
    category: 'Blender 3D',
    description: 'Proyecto enfocado en el modelado de objetos 3D en Blender, desde la construcción de formas y materiales hasta la composición visual de renders para experiencias digitales profesionales.',
    layout: 'desktop',
    images: [
      '/projects/project-6/blender-modelado-1.png',
      '/projects/project-6/blender-modelado-2.png',
      '/projects/project-6/blender-modelado-3.png',
    ],
  },
  {
    number: '07',
    name: 'Torneo KODO-TAKAI',
    category: 'Competición Internacional',
    description: 'Participación en el torneo internacional de tecnología KODO-TAKAI, donde mi equipo obtuvo el segundo lugar, desarrollando soluciones innovadoras y demostrando alto nivel competitivo.',
    layout: 'desktop',
    images: [
      '/projects/project-7/kodo-1.png',
      '/projects/project-7/kodo-2.png',
      '/projects/project-7/kodo-3.png',
    ],
  },
];

function FadeIn({ children, as = 'div', delay = 0, duration = 0.7, x = 0, y = 30, className }: FadeInProps) {
  const Component = motion.create(as);

  return (
    <Component
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Component>
  );
}

function Magnet({ children, padding = 150, strength = 3, activeTransition = 'transform 0.3s ease-out', inactiveTransition = 'transform 0.6s ease-in-out', className }: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({ transform: 'translate3d(0, 0, 0)', transition: inactiveTransition, willChange: 'transform' });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const withinX = event.clientX >= rect.left - padding && event.clientX <= rect.right + padding;
      const withinY = event.clientY >= rect.top - padding && event.clientY <= rect.bottom + padding;

      if (withinX && withinY) {
        const moveX = (event.clientX - centerX) / strength;
        const moveY = (event.clientY - centerY) / strength;
        setStyle({ transform: `translate3d(${moveX}px, ${moveY}px, 0)`, transition: activeTransition, willChange: 'transform' });
      } else {
        setStyle({ transform: 'translate3d(0, 0, 0)', transition: inactiveTransition, willChange: 'transform' });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [activeTransition, inactiveTransition, padding, strength]);

  return <div ref={ref} className={className} style={style}>{children}</div>;
}

function ContactButton() {
  return (
    <a
      href="https://github.com/chulearrieta21"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 outline-offset-[-3px] outline-white transition duration-200 hover:scale-105 sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      style={{ background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)', boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset' }}
    >
      Ver GitHub
    </a>
  );
}

function LiveProjectButton() {
  return (
    <a href="https://github.com/chulearrieta21" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base">
      Proyecto <ExternalLink size={18} />
    </a>
  );
}

function AnimatedCharacter({ char, index, total, progress }: { char: string; index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total;
  const end = Math.min(start + 0.18, 1);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const content = char === ' ' ? '\u00A0' : char;

  return (
    <span className="relative inline-block">
      <span className="opacity-0">{content}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {content}
      </motion.span>
    </span>
  );
}

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });

  return (
    <p ref={ref} className="max-w-[560px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]">
      {text.split('').map((char, index) => <AnimatedCharacter key={`${char}-${index}`} char={char} index={index} total={text.length} progress={scrollYProgress} />)}
    </p>
  );
}

function HeroSection() {
  return (
    <section className="relative flex h-screen flex-col overflow-x-clip bg-[#0C0C0C]">
      <FadeIn as="nav" delay={0} y={-20} className="relative z-30 flex justify-between px-6 pt-6 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] md:px-10 md:pt-8 md:text-lg lg:text-[1.4rem]">
        {[
          ['Sobre mí', '#about'],
          ['Stack', '#stack'],
          ['Proyectos', '#projects'],
          ['GitHub', 'https://github.com/chulearrieta21'],
        ].map(([item, href]) => (
          <a key={item} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="transition duration-200 hover:opacity-70">{item}</a>
        ))}
      </FadeIn>

      <div className="overflow-hidden">
        <FadeIn as="h1" delay={0.15} y={40} className="hero-heading mt-6 w-full whitespace-nowrap text-center text-[clamp(3.6rem,11.2vw,13.5rem)] font-black uppercase leading-none tracking-tight sm:mt-4 md:-mt-5">
          Daniel Arrieta
        </FadeIn>
      </div>

      <FadeIn delay={0.6} y={30} className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]">
        <Magnet padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
          <div aria-label="Daniel Arrieta visual identity" className="relative aspect-square w-full overflow-hidden rounded-full border border-[#D7E2EA]/20 bg-[#0C0C0C] shadow-2xl shadow-black/60">
            <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(215,226,234,0.95),rgba(42,115,255,0.35)_32%,rgba(156,39,176,0.18)_55%,transparent_72%)] blur-sm" />
            <div className="absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D7E2EA]/25 bg-[linear-gradient(135deg,rgba(215,226,234,0.08),rgba(255,255,255,0.02))]" />
            <div className="absolute left-1/2 top-1/2 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D7E2EA] shadow-[0_0_90px_rgba(215,226,234,0.45)]" />
            <div className="absolute inset-0 bg-[conic-gradient(from_120deg,transparent,rgba(215,226,234,0.3),transparent,rgba(89,126,255,0.4),transparent)] opacity-80" />
          </div>
        </Magnet>
      </FadeIn>

      <div className="relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn as="p" delay={0.35} y={20} className="max-w-[160px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]">
          Full Stack Developer enfocado en Backend, APIs, apps móviles, web platforms e integración de Inteligencia Artificial
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}

function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const rowOne = marqueeImages.slice(0, 11);
  const rowTwo = marqueeImages.slice(11);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.offsetTop;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderRow = (images: string[], direction: 'right' | 'left') => (
    <div className="flex gap-3" style={{ transform: `translateX(${direction === 'right' ? offset - 200 : -(offset - 200)}px)`, willChange: 'transform' }}>
      {[...images, ...images, ...images].map((src, index) => (
        <img key={`${src}-${index}`} src={src} alt="3D motion website preview" loading="lazy" className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover" />
      ))}
    </div>
  );

  return (
    <section ref={sectionRef} className="overflow-hidden bg-[#0C0C0C] pt-24 pb-10 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        {renderRow(rowOne, 'right')}
        {renderRow(rowTwo, 'left')}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10">
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="Moon 3D icon" />
      </FadeIn>
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="3D object" />
      </FadeIn>
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="Lego 3D icon" />
      </FadeIn>
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="3D group" />
      </FadeIn>

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn as="h2" delay={0} y={40} className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
          About me
        </FadeIn>
        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText text="Soy Daniel Arrieta, desarrollador Full Stack con fuerte enfoque en Backend. Construyo plataformas web, aplicaciones móviles, APIs, soluciones con bases de datos e integraciones con Inteligencia Artificial para convertir ideas en productos digitales robustos, escalables y bien diseñados. Además, realizo mantenimiento a impresoras 3D y participé en un torneo internacional donde mi grupo obtuvo el segundo lugar." />
          <ContactButton />
        </div>
      </div>
    </section>
  );
}

function StackSection() {
  return (
    <section id="stack" className="rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <FadeIn as="h2" className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
        Stack
      </FadeIn>
      <div className="mx-auto max-w-5xl">
        {stack.map(([number, name, description], index) => (
          <FadeIn key={number} delay={index * 0.1} className="flex gap-6 border-t border-[rgba(12,12,12,0.15)] py-8 last:border-b sm:gap-10 sm:py-10 md:gap-16 md:py-12">
            <div className="min-w-[92px] text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#0C0C0C] sm:min-w-[150px] md:min-w-[220px]">{number}</div>
            <div className="flex flex-col justify-center gap-3">
              <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase leading-tight">{name}</h3>
              <p className="max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60">{description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, totalCards }: { project: Project; index: number; totalCards: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={ref} className={project.layout === 'mobile' ? 'min-h-[115vh] pb-16' : 'min-h-[95vh] pb-16'}>
      <motion.article style={{ scale, top: `calc(6rem + ${index * 28}px)` }} className="sticky rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:top-32 md:rounded-[60px] md:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-5 md:mb-8">
          <span className="text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#D7E2EA]">{project.number}</span>
          <span className="text-sm font-medium uppercase tracking-widest text-[#D7E2EA]/70 sm:text-base">{project.category}</span>
          <div className="max-w-3xl">
            <h3 className="text-[clamp(1.6rem,5vw,4.8rem)] font-black uppercase leading-none tracking-tight text-[#D7E2EA]">{project.name}</h3>
            <p className="mt-4 max-w-2xl text-[clamp(0.9rem,1.45vw,1.15rem)] font-light leading-relaxed text-[#D7E2EA]/70">{project.description}</p>
          </div>
          <LiveProjectButton />
        </div>
        {project.layout === 'mobile' ? (
          <div className="grid gap-5 md:grid-cols-3">
            {project.images.map((image, imageIndex) => (
              <div key={`${project.name}-${imageIndex}`} className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[34px] border border-[#D7E2EA]/15 bg-[#151515] p-5 shadow-2xl shadow-black/40 sm:min-h-[520px] md:min-h-[560px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(215,226,234,0.12),transparent_45%)]" />
                <img src={image} alt={`${project.name} preview ${imageIndex + 1}`} loading="lazy" className="relative z-10 h-[380px] w-auto rounded-[24px] object-contain shadow-2xl shadow-black/60 sm:h-[480px] md:h-[520px]" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-[52fr_48fr]">
            <div className="grid gap-5">
              <div className="flex aspect-video items-center justify-center overflow-hidden rounded-[34px] border border-[#D7E2EA]/15 bg-[#151515] p-3 shadow-2xl shadow-black/40 sm:rounded-[44px] md:rounded-[54px]">
                <img src={project.images[0]} alt={`${project.name} preview one`} loading="lazy" className="h-full w-full rounded-[26px] object-contain" />
              </div>
              <div className="flex aspect-video items-center justify-center overflow-hidden rounded-[34px] border border-[#D7E2EA]/15 bg-[#151515] p-3 shadow-2xl shadow-black/40 sm:rounded-[44px] md:rounded-[54px]">
                <img src={project.images[1]} alt={`${project.name} preview two`} loading="lazy" className="h-full w-full rounded-[26px] object-contain" />
              </div>
            </div>
            <div className="flex items-center justify-center overflow-hidden rounded-[34px] border border-[#D7E2EA]/15 bg-[#151515] p-4 shadow-2xl shadow-black/40 sm:rounded-[44px] md:rounded-[54px]">
              <img src={project.images[2]} alt={`${project.name} preview three`} loading="lazy" className="h-full max-h-[620px] w-full rounded-[26px] object-contain" />
            </div>
          </div>
        )}
      </motion.article>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32">
      <FadeIn as="h2" className="hero-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
        Proyectos
      </FadeIn>
      <div className="mx-auto max-w-7xl">
        {projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} totalCards={projects.length} />)}
      </div>
    </section>
  );
}

function App() {
  return (
    <main id="contact" className="min-h-screen overflow-x-clip bg-[#0C0C0C] font-kanit">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <StackSection />
      <ProjectsSection />
    </main>
  );
}

export default App;
