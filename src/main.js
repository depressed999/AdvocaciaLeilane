/**
 * Script Interativo — Dra. Leilane dos Santos Advocacia
 * Módulos:
 * 1. Segurança & Ofuscação de Contatos (renderização segura client-side)
 * 2. Cabeçalho com Rolagem (Glassmorphism dinâmico)
 * 3. Menu Móvel Acessível (gaveta, trap de teclado e fechamento por Esc)
 * 4. Navegação por Âncoras e Observador de Seção Ativa
 * 5. Scroll Reveal Suave (IntersectionObserver com fallback)
 * 6. CTAs Dinâmicos por Contexto
 * 7. Assistente de Contato com Validação LGPD e Mitigação de Bots (Honeypot)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. SEGURANÇA: DEOFUSCAÇÃO DE CONTATOS (CLIENT-SIDE)
  // ==========================================================================
  // Valores codificados para dificultar raspadores automatizados (web scrapers)
  const SEC_DATA = {
    // btoa('(49) 9 8898-3043') -> 'KDQ5KSA5IDg4OTgtMzA0Mw=='
    p1Disp: atob('KDQ5KSA5IDg4OTgtMzA0Mw=='),
    // btoa('5549988983043') -> 'NTU0OTk4ODk4MzA0Mw=='
    p1Raw: atob('NTU0OTk4ODk4MzA0Mw=='),
    // btoa('(69) 9 8472-5169') -> 'KDY5KSA5IDg0NzItNTE2OQ=='
    p2Disp: atob('KDY5KSA5IDg0NzItNTE2OQ=='),
    // btoa('5569984725169') -> 'NTU2OTk4NDcyNTE2OQ=='
    p2Raw: atob('NTU2OTk4NDcyNTE2OQ=='),
    // btoa('leilanesantos.adv@gmail.com') -> 'bGVpbGFuZXNhbnRvcy5hZHZAZ21haWwuY29t'
    email: atob('bGVpbGFuZXNhbnRvcy5hZHZAZ21haWwuY29t')
  };

  const renderObfuscatedContacts = () => {
    // Injeção de Telefone / WhatsApp 1
    document.querySelectorAll('[data-obf-type="phone1"]').forEach(el => {
      el.textContent = SEC_DATA.p1Disp;
      if (el.tagName === 'A') {
        el.setAttribute('href', `tel:+${SEC_DATA.p1Raw}`);
      }
    });

    document.querySelectorAll('[data-obf-type="wa1"]').forEach(el => {
      if (el.tagName === 'A') {
        el.setAttribute('href', `https://wa.me/${SEC_DATA.p1Raw}`);
      }
    });

    // Injeção de Telefone / WhatsApp 2
    document.querySelectorAll('[data-obf-type="phone2"]').forEach(el => {
      el.textContent = SEC_DATA.p2Disp;
      if (el.tagName === 'A') {
        el.setAttribute('href', `tel:+${SEC_DATA.p2Raw}`);
      }
    });

    document.querySelectorAll('[data-obf-type="wa2"]').forEach(el => {
      if (el.tagName === 'A') {
        el.setAttribute('href', `https://wa.me/${SEC_DATA.p2Raw}`);
      }
    });

    // Injeção de E-mail
    document.querySelectorAll('[data-obf-type="email"]').forEach(el => {
      el.textContent = SEC_DATA.email;
      if (el.tagName === 'A') {
        el.setAttribute('href', `mailto:${SEC_DATA.email}`);
      }
    });
  };

  renderObfuscatedContacts();

  // ==========================================================================
  // 2. CABEÇALHO COM ROLAGEM (GLASSMORPHISM)
  // ==========================================================================
  const siteHeader = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 25) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ==========================================================================
  // 3. MENU MÓVEL ACESSÍVEL (DRAWER COM KEYBOARD TRAP)
  // ==========================================================================
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const toggleMobileMenu = (open) => {
    const isOpen = open !== undefined ? open : !mobileDrawer?.classList.contains('open');
    if (isOpen) {
      mobileDrawer?.classList.add('open');
      mobileBackdrop?.classList.add('open');
      menuToggle?.classList.add('open');
      menuToggle?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        mobileLinks[0]?.focus();
      }, 100);
    } else {
      mobileDrawer?.classList.remove('open');
      mobileBackdrop?.classList.remove('open');
      menuToggle?.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      menuToggle?.focus();
    }
  };

  menuToggle?.addEventListener('click', () => toggleMobileMenu());
  mobileBackdrop?.addEventListener('click', () => toggleMobileMenu(false));

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('open')) {
      toggleMobileMenu(false);
    }
  });

  // ==========================================================================
  // 4. DESTAQUE DO LINK ATIVO NA NAVEGAÇÃO E SCROLL-SPY DETERMINÍSTICO
  // ==========================================================================
  const navLinks = document.querySelectorAll('.nav-link');

  // Mapeamento de seções secundárias para os itens correspondentes do menu
  const sectionNavMap = {
    'inicio': 'inicio',
    'sobre': 'sobre',
    'areas': 'areas',
    'diferenciais': 'diferenciais',
    'atendimento': 'atendimento',
    'nacional': 'atendimento', // "Abrangência Nacional" integra o escopo de atendimento
    'contato': 'contato'
  };

  let isClickScrolling = false;
  let clickScrollTimer = null;

  const setActiveNavLink = (targetId) => {
    const mappedId = sectionNavMap[targetId] || targetId;

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${mappedId}`) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

    mobileLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${mappedId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  // Atualização instantânea ao clicar em qualquer item do menu (desktop e mobile)
  const allNavAnchors = [...navLinks, ...mobileLinks];
  allNavAnchors.forEach(link => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.slice(1);
        setActiveNavLink(targetId);

        // Bloqueia temporariamente o scroll-spy durante a rolagem suave para evitar flickering
        isClickScrolling = true;
        clearTimeout(clickScrollTimer);
        clickScrollTimer = setTimeout(() => {
          isClickScrolling = false;
          updateScrollSpy();
        }, 800);
      }
    });
  });

  const spySectionIds = ['inicio', 'sobre', 'areas', 'diferenciais', 'atendimento', 'nacional', 'contato'];
  const spySections = spySectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  let isSpyTicking = false;
  const updateScrollSpy = () => {
    if (isClickScrolling) return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Topo da página: ativa Início
    if (scrollY < 80) {
      setActiveNavLink('inicio');
      return;
    }

    // Próximo ou no rodapé da página: ativa Contato
    if (scrollY + windowHeight >= docHeight - 80) {
      setActiveNavLink('contato');
      return;
    }

    // Linha focal de leitura (35% da viewport a partir do topo)
    const focalPointY = scrollY + windowHeight * 0.35;
    for (const sec of spySections) {
      const secTop = sec.offsetTop;
      const secBottom = secTop + sec.offsetHeight;
      if (focalPointY >= secTop && focalPointY < secBottom) {
        setActiveNavLink(sec.id);
        break;
      }
    }
  };

  window.addEventListener('scroll', () => {
    if (!isSpyTicking) {
      window.requestAnimationFrame(() => {
        updateScrollSpy();
        isSpyTicking = false;
      });
      isSpyTicking = true;
    }
  }, { passive: true });

  // Executa uma vez no carregamento inicial
  updateScrollSpy();

  // ==========================================================================
  // 5. SCROLL REVEAL SUAVE (INTERSECTION OBSERVER)
  // ==========================================================================
  document.documentElement.classList.add('js-loaded');
  const revealElements = document.querySelectorAll('.reveal-fade');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '120px 0px 50px 0px',
      threshold: 0.05
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // ==========================================================================
  // 6. CTAs DINÂMICOS POR CONTEXTO
  // ==========================================================================
  const areaSelect = document.getElementById('contactArea');
  const messageInput = document.getElementById('contactMessage');

  document.querySelectorAll('[data-cta-area]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const areaName = btn.getAttribute('data-cta-area');
      const ctaContext = btn.getAttribute('data-cta-context') || `Dúvida sobre ${areaName}`;

      if (areaSelect) {
        areaSelect.value = areaName;
      }
      if (messageInput && !messageInput.value.trim()) {
        messageInput.value = `Gostaria de obter orientação jurídica especializada na área de ${areaName}.`;
      }

      // Rolagem suave até a seção de contato
      const contactSection = document.getElementById('contato');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          messageInput?.focus();
        }, 500);
      }
    });
  });

  // ==========================================================================
  // 7. ASSISTENTE DE CONTATO (LGPD + MITIGAÇÃO HONEYPOT + REDIRECIONAMENTO)
  // ==========================================================================
  const btnSendWhatsApp = document.getElementById('btnSendWhatsApp');
  const btnSendEmail = document.getElementById('btnSendEmail');
  const lgpdConsentCheckbox = document.getElementById('lgpdConsent');
  const consentErrorDiv = document.getElementById('consentError');
  const honeypotInput = document.getElementById('contact_hp');

  const getFormData = () => {
    const nameInput = document.getElementById('contactName');
    const phoneInput = document.getElementById('contactPhone');

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const area = areaSelect ? areaSelect.value : '';
    const message = messageInput ? messageInput.value.trim() : '';

    return { name, phone, area, message };
  };

  const buildMessageText = (data) => {
    let msg = `Olá, Dra. Leilane dos Santos.\n\n`;
    if (data.name) {
      msg += `Meu nome é ${data.name}.\n`;
    }
    if (data.phone) {
      msg += `Telefone para contato: ${data.phone}\n`;
    }
    if (data.area) {
      msg += `Área de interesse: ${data.area}\n`;
    }
    if (data.message) {
      msg += `\nSituação / Mensagem:\n${data.message}\n`;
    } else {
      msg += `\nGostaria de obter informações sobre atendimento jurídico.\n`;
    }
    return msg;
  };

  const validateForm = () => {
    // 1. Verificação anti-bot (Honeypot)
    if (honeypotInput && honeypotInput.value.trim() !== '') {
      console.warn('Bot detectado via honeypot.');
      return false;
    }

    // 2. Validação de consentimento LGPD
    if (lgpdConsentCheckbox && !lgpdConsentCheckbox.checked) {
      if (consentErrorDiv) {
        consentErrorDiv.textContent = 'É necessário concordar com os termos de privacidade para solicitar atendimento.';
        consentErrorDiv.classList.add('visible');
      }
      lgpdConsentCheckbox.setAttribute('aria-invalid', 'true');
      lgpdConsentCheckbox.focus();
      return false;
    }

    if (consentErrorDiv) {
      consentErrorDiv.textContent = '';
      consentErrorDiv.classList.remove('visible');
    }
    lgpdConsentCheckbox?.removeAttribute('aria-invalid');
    return true;
  };

  // Limpa erro do checkbox quando marcado pelo usuário
  lgpdConsentCheckbox?.addEventListener('change', () => {
    if (lgpdConsentCheckbox.checked && consentErrorDiv) {
      consentErrorDiv.textContent = '';
      consentErrorDiv.classList.remove('visible');
      lgpdConsentCheckbox.removeAttribute('aria-invalid');
    }
  });

  btnSendWhatsApp?.addEventListener('click', (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = getFormData();
    const text = buildMessageText(data);
    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/${SEC_DATA.p1Raw}?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });

  btnSendEmail?.addEventListener('click', (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = getFormData();
    const subject = encodeURIComponent(`Contato Jurídico — ${data.name || 'Site'}${data.area ? ' (' + data.area + ')' : ''}`);
    const body = encodeURIComponent(buildMessageText(data));
    const mailUrl = `mailto:${SEC_DATA.email}?subject=${subject}&body=${body}`;
    window.location.href = mailUrl;
  });

  // ==========================================================================
  // 8. ATUALIZAÇÃO DINÂMICA DO ANO NO RODAPÉ
  // ==========================================================================
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
