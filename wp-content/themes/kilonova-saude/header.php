<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Kilonova Saúde — Especialistas em Medicina da Dor. Consulta da Dor, Acupuntura Auricular e Procedimentos Minimamente Invasivos na Região Centro." />
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

  <!-- COOKIE BANNER -->
  <div id="cookie-banner" class="cookie-banner" role="dialog" aria-label="Aviso de cookies">
    <div class="cookie-content">
      <p data-i18n="cookie_text">Este site utiliza cookies para melhorar a sua experiência e garantir o funcionamento do formulário de contacto, em conformidade com o RGPD.</p>
      <div class="cookie-actions">
        <button class="cookie-link" onclick="openModal('privacy-modal')" data-i18n="cookie_policy">Política de Privacidade</button>
        <button id="cookie-accept" data-i18n="cookie_accept">Aceitar</button>
      </div>
    </div>
  </div>

  <!-- PRIVACY MODAL -->
  <div id="privacy-modal" class="modal-overlay" role="dialog" aria-modal="true" aria-label="Política de Privacidade">
    <div class="modal-box">
      <button class="modal-close" onclick="closeModal('privacy-modal')" aria-label="Fechar">&times;</button>
      <div class="modal-content">
        <h2 data-i18n="modal_privacy_title">Política de Privacidade</h2>
        <p class="modal-updated" data-i18n="modal_privacy_updated">Última atualização: Janeiro de 2025</p>
        <h3 data-i18n="modal_p1_title">1. Responsável pelo Tratamento de Dados</h3>
        <p data-i18n="modal_p1_body">Kilonova Saúde, representada pela Dra. Luísa Martins Ferreira, é responsável pelo tratamento dos dados pessoais recolhidos através deste website (kilonovasaude.pt), em conformidade com o RGPD. Contacto: info@kilonovasaude.pt · 914 993 586.</p>
        <h3 data-i18n="modal_p2_title">2. Dados Recolhidos</h3>
        <p data-i18n="modal_p2_body">Através do formulário de contacto recolhemos: nome completo, número de telefone, endereço de email, serviço de interesse e informações clínicas facultadas voluntariamente. Também recolhemos dados de navegação através de cookies técnicos essenciais.</p>
        <h3 data-i18n="modal_p3_title">3. Finalidade e Base Legal</h3>
        <p data-i18n="modal_p3_body">Os seus dados são tratados para resposta ao pedido de marcação de consulta (base legal: execução de contrato, Art. 6.º n.º 1 al. b) do RGPD) e para comunicações relacionadas com os serviços prestados (base legal: interesse legítimo, Art. 6.º n.º 1 al. f) do RGPD).</p>
        <h3 data-i18n="modal_p4_title">4. Conservação dos Dados</h3>
        <p data-i18n="modal_p4_body">Os dados são conservados pelo período estritamente necessário à finalidade que motivou a sua recolha, e no máximo por 5 anos após a última interação.</p>
        <h3 data-i18n="modal_p5_title">5. Partilha de Dados</h3>
        <p data-i18n="modal_p5_body">Os seus dados não são vendidos nem cedidos a terceiros para fins comerciais. Podem ser partilhados com prestadores de serviços técnicos exclusivamente para efeitos de prestação do serviço.</p>
        <h3 data-i18n="modal_p6_title">6. Os Seus Direitos</h3>
        <p data-i18n="modal_p6_body">Nos termos do RGPD, tem direito de acesso, retificação, apagamento, limitação, portabilidade e oposição. Para exercer estes direitos contacte info@kilonovasaude.pt. Tem ainda o direito de reclamação junto da CNPD (www.cnpd.pt).</p>
        <h3 data-i18n="modal_p7_title">7. Cookies</h3>
        <p data-i18n="modal_p7_body">Este site utiliza apenas cookies técnicos essenciais. Não utilizamos cookies de rastreamento ou publicidade.</p>
      </div>
    </div>
  </div>

  <!-- TERMS MODAL -->
  <div id="terms-modal" class="modal-overlay" role="dialog" aria-modal="true" aria-label="Termos de Uso">
    <div class="modal-box">
      <button class="modal-close" onclick="closeModal('terms-modal')" aria-label="Fechar">&times;</button>
      <div class="modal-content">
        <h2 data-i18n="modal_terms_title">Termos de Uso</h2>
        <p class="modal-updated" data-i18n="modal_terms_updated">Última atualização: Janeiro de 2025</p>
        <h3 data-i18n="modal_t1_title">1. Identificação</h3>
        <p data-i18n="modal_t1_body">O presente website é propriedade de Kilonova Saúde, representada pela Dra. Luísa Martins Ferreira, Especialista em Anestesiologia e Medicina da Dor. Contacto: info@kilonovasaude.pt · 914 993 586.</p>
        <h3 data-i18n="modal_t2_title">2. Objeto e Âmbito</h3>
        <p data-i18n="modal_t2_body">O presente website tem carácter exclusivamente informativo e destina-se a apresentar os serviços da Kilonova Saúde. A utilização deste site implica a aceitação integral dos presentes termos.</p>
        <h3 data-i18n="modal_t3_title">3. Informação Clínica</h3>
        <p data-i18n="modal_t3_body">Toda a informação médica disponível neste site tem carácter meramente informativo e educacional. Não constitui conselho médico, diagnóstico ou prescrição terapêutica.</p>
        <h3 data-i18n="modal_t4_title">4. Propriedade Intelectual</h3>
        <p data-i18n="modal_t4_body">Todos os conteúdos deste website são propriedade exclusiva da Kilonova Saúde e encontram-se protegidos pelas leis de propriedade intelectual aplicáveis.</p>
        <h3 data-i18n="modal_t5_title">5. Responsabilidade</h3>
        <p data-i18n="modal_t5_body">A Kilonova Saúde não se responsabiliza por danos resultantes da utilização indevida das informações disponibilizadas neste site.</p>
        <h3 data-i18n="modal_t6_title">6. Lei Aplicável</h3>
        <p data-i18n="modal_t6_body">Os presentes termos regem-se pela lei portuguesa. Qualquer litígio será submetido aos tribunais da comarca competente.</p>
      </div>
    </div>
  </div>

  <!-- HEADER -->
  <header id="header">
    <div class="container header-inner">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="logo-link">
        <img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt="Kilonova Saúde" class="logo logo-dark" />
        <img src="<?php echo get_template_directory_uri(); ?>/images/logo-white.png" alt="Kilonova Saúde" class="logo logo-white" />
      </a>
      <nav id="main-nav">
        <ul>
          <li><a href="#about" data-i18n="nav_about">Sobre</a></li>
          <li><a href="#services" data-i18n="nav_services">Serviços</a></li>
          <li><a href="#events" data-i18n="nav_events">Eventos</a></li>
          <li><a href="#testimonials" data-i18n="nav_testimonials">Testemunhos</a></li>
          <li><a href="#contact" class="nav-cta" data-i18n="nav_contact">Marcar Consulta</a></li>
        </ul>
      </nav>
      <div class="header-right">
        <div class="lang-dropdown" id="lang-dropdown">
          <button class="lang-current-btn" id="lang-current-btn" aria-haspopup="listbox" aria-expanded="false">
            <span id="lang-flag">🇵🇹</span>
            <span id="lang-label">Português</span>
            <svg class="lang-chevron" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
          <ul class="lang-list" id="lang-list" role="listbox">
            <li><button data-lang="pt" class="lang-option active"><span>🇵🇹</span> Português</button></li>
            <li><button data-lang="en" class="lang-option"><span>🇬🇧</span> English</button></li>
            <li><button data-lang="fr" class="lang-option"><span>🇫🇷</span> Français</button></li>
            <li><button data-lang="de" class="lang-option"><span>🇩🇪</span> Deutsch</button></li>
          </ul>
        </div>
        <button class="hamburger" id="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
