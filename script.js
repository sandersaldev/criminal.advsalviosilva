// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileNav.classList.toggle('hidden');
        mobileNav.classList.toggle('flex');
        const isOpen = mobileNav.classList.contains('flex');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
        
        // Animate hamburger menu
        const hamburgers = mobileMenuBtn.querySelectorAll('.hamburger');
        hamburgers.forEach((hamburger, index) => {
            if (isOpen) {
                if (index === 0) hamburger.style.transform = 'rotate(45deg) translate(6px, 6px)';
                if (index === 1) hamburger.style.opacity = '0';
                if (index === 2) hamburger.style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                hamburger.style.transform = 'rotate(0deg) translate(0px, 0px)';
                hamburger.style.opacity = '1';
            }
        });
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.add('hidden');
            mobileNav.classList.remove('flex');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.setAttribute('aria-label', 'Abrir menu');
            const hamburgers = mobileMenuBtn.querySelectorAll('.hamburger');
            hamburgers.forEach(hamburger => {
                hamburger.style.transform = 'rotate(0deg) translate(0px, 0px)';
                hamburger.style.opacity = '1';
            });
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Background Change on Scroll
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('bg-white/95', 'backdrop-blur-sm');
        header.classList.remove('bg-white');
    } else {
        header.classList.add('bg-white');
        header.classList.remove('bg-white/95', 'backdrop-blur-sm');
    }
});

// Highlight active nav link on scroll
function highlightNavOnScroll() {
    const sections = ['home', 'about', 'services', 'contact']
        .map(id => document.getElementById(id))
        .filter(Boolean);
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const scrollPos = window.scrollY + headerHeight + 1;

    let currentId = null;
    sections.forEach(sec => {
        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) currentId = sec.id;
    });

    const links = document.querySelectorAll('header a[href^="#"]');
    links.forEach(a => {
        a.classList.remove('text-brand-blue', 'font-semibold');
        a.classList.add('text-gray-600');
        const href = a.getAttribute('href');
        if (currentId && href === `#${currentId}`) {
            a.classList.remove('text-gray-600');
            a.classList.add('text-brand-blue', 'font-semibold');
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);
window.addEventListener('load', highlightNavOnScroll);

// Contact Button Actions
document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp button
    const whatsappBtn = document.querySelector('.btn-whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            const phoneNumber = '5593992241438'; // Número do WhatsApp
            const message = 'Olá! Gostaria de agendar uma consulta jurídica.';
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }
    
    // Contact buttons
    const contactBtns = document.querySelectorAll('.btn-primary');
    contactBtns.forEach(btn => {
        if (btn.textContent.includes('ENTRE EM CONTATO') || btn.textContent.includes('Entre em contato')) {
            btn.addEventListener('click', function() {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = contactSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
});

// Animation on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .contact-card, .stat-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.remove('opacity-0', 'translate-y-5');
            element.classList.add('opacity-100', 'translate-y-0');
        }
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.service-card, .contact-card, .stat-item');
    elements.forEach(element => {
        element.classList.add('opacity-0', 'translate-y-5', 'transition-all', 'duration-700');
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});

// Inject modern SVG icons into service and contact cards
function injectServiceAndContactIcons() {
    // Service cards: add a justice scales icon before the heading if not present
    document.querySelectorAll('.service-card').forEach(card => {
        if (card.querySelector('.service-icon')) return;
        const h3 = card.querySelector('h3');
        if (!h3) return;
        const wrapper = document.createElement('div');
        wrapper.className = 'service-icon mb-4 text-brand-gold';
        wrapper.innerHTML = `
          <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="4" y1="19" x2="20" y2="19"></line>
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="6" y1="8" x2="18" y2="8"></line>
            <path d="M6 8 L9 14 L3 14 Z"></path>
            <path d="M18 8 L21 14 L15 14 Z"></path>
          </svg>`;
        h3.parentNode.insertBefore(wrapper, h3);
    });

    // Contact cards: add specific icons by index (email, office, hours)
    const contactCards = document.querySelectorAll('#contact .contact-card');
    contactCards.forEach((card, idx) => {
        if (card.querySelector('.contact-icon')) return;
        const h4 = card.querySelector('h4');
        if (!h4) return;
        const icon = document.createElement('div');
        icon.className = 'contact-icon mb-2';
        let svg = '';
        if (idx === 0) {
            // envelope
            svg = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="10" rx="2" ry="2"></rect><path d="M3 7l9 6 9-6"></path></svg>`;
        } else if (idx === 1) {
            // map pin
            svg = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-6-5.686-6-10a6 6 0 1112 0c0 4.314-6 10-6 10z"></path><circle cx="12" cy="11" r="2.5"></circle></svg>`;
        } else {
            // clock
            svg = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 7v5l3 2"></path></svg>`;
        }
        icon.innerHTML = svg;
        h4.parentNode.insertBefore(icon, h4);
    });
}

document.addEventListener('DOMContentLoaded', injectServiceAndContactIcons);

// Fix mojibake (encoding issues) and enhance headings/typography
function replaceInTextNodes(root, replacements) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(node => {
        let txt = node.nodeValue;
        Object.entries(replacements).forEach(([bad, good]) => {
            if (txt.includes(bad)) txt = txt.split(bad).join(good);
        });
        node.nodeValue = txt;
    });
}

function fixMojibake() {
    const map = {
        'In��cio': 'Início',
        'Servi��os': 'Serviços',
        'tǸcnica': 'técnica',
        'Forma��ǜo': 'Formação',
        's��lida': 'sólida',
        'dedica��ǜo': 'dedicação',
        'estratǸgias': 'estratégias',
        'estratǸgico': 'estratégico',
        'jur��dicas': 'jurídicas',
        '�?reas de Atua��ǜo': 'Áreas de Atuação',
        'AssistǦncia': 'Assistência',
        'Jur��dica': 'Jurídica',
        'jur��dica': 'jurídica',
        'atendǦ-lo': 'atendê-lo',
        'excelǦncia': 'excelência',
        'violǦncia': 'violência',
        'domǸstica': 'doméstica',
        'calǧnia': 'calúnia',
        'difama��ǜo': 'difamação',
        'injǧria': 'injúria',
        'Homic��dio': 'Homicídio',
        'Lesǜo': 'Lesão',
        'Interposi��ǜo': 'Interposição',
        'instǽncias': 'instâncias',
        'Prisǜo': 'Prisão',
        'decreta��ǜo': 'decretação',
        'Trǽnsito': 'Trânsito',
        'infra����es': 'infrações',
        'Rǭpido': 'Rápido',
        'SantarǸm': 'Santarém',
        '��s': 'às',
        'EmergǦncias': 'Emergências',
        'C��digo de �%tica': 'Código de Ética',
        '�� 2025': '© 2025',
        'Escrit��rio': 'Escritório',
        'Horǭrio': 'Horário',
        'audiǦncias': 'audiências',
        'inquǸritos': 'inquéritos'
    };
    replaceInTextNodes(document.body, map);
}

function enhanceHeadings() {
    const servicesH2 = document.querySelector('#services h2');
    if (servicesH2) {
        servicesH2.classList.add('tracking-wide', 'uppercase');
        // insert divider if missing
        if (!servicesH2.nextElementSibling || !servicesH2.nextElementSibling.classList.contains('gold-divider')) {
            const div = document.createElement('div');
            div.className = 'gold-divider w-16 h-0.5 bg-brand-gold mx-auto my-4';
            servicesH2.parentNode.insertBefore(div, servicesH2.nextSibling);
        }
    }

    const contactH2 = document.querySelector('#contact h2');
    if (contactH2) {
        contactH2.classList.add('tracking-wide', 'uppercase');
        if (!contactH2.nextElementSibling || !contactH2.nextElementSibling.classList.contains('gold-divider')) {
            const div = document.createElement('div');
            div.className = 'gold-divider w-16 h-0.5 bg-brand-gold mx-auto my-4';
            contactH2.parentNode.insertBefore(div, contactH2.nextSibling);
        }
    }

    const ctaH2 = document.querySelector('section.bg-brand-blue h2');
    if (ctaH2) ctaH2.classList.add('tracking-wide');
}

document.addEventListener('DOMContentLoaded', () => {
    fixMojibake();
    enhanceHeadings();
});

// Form Validation (if needed in the future)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Utility function for smooth animations
function fadeIn(element, duration = 300) {
    element.style.opacity = 0;
    element.style.display = 'block';
    
    let start = performance.now();
    
    function animate(currentTime) {
        let elapsed = currentTime - start;
        let progress = elapsed / duration;
        
        if (progress < 1) {
            element.style.opacity = progress;
            requestAnimationFrame(animate);
        } else {
            element.style.opacity = 1;
        }
    }
    
    requestAnimationFrame(animate);
}
