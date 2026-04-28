  <!-- FOOTER -->
  <footer id="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <img src="<?php echo get_template_directory_uri(); ?>/images/logo-white.png" alt="Kilonova Saúde" class="footer-logo" />
        <p data-i18n="footer_tagline">Especialistas em Medicina da Dor</p>
        <p class="footer-region" data-i18n="footer_region">Região Centro · Coimbra · Viseu · Castelo Branco</p>
      </div>
      <div class="footer-links">
        <a href="#about" data-i18n="nav_about">Sobre</a>
        <a href="#services" data-i18n="nav_services">Serviços</a>
        <a href="#events" data-i18n="nav_events">Eventos</a>
        <a href="#contact" data-i18n="nav_contact">Marcar Consulta</a>
        <button class="footer-legal-link" onclick="openModal('privacy-modal')" data-i18n="footer_privacy">Política de Privacidade</button>
        <button class="footer-legal-link" onclick="openModal('terms-modal')" data-i18n="footer_terms">Termos de Uso</button>
      </div>
      <div class="footer-contact">
        <a href="mailto:info@kilonovasaude.pt">info@kilonovasaude.pt</a>
        <a href="tel:+351914993586">914 993 586</a>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <p data-i18n="footer_copy">&copy; 2026 Kilonova Saúde. Todos os direitos reservados.</p>
        <p data-i18n="footer_disclaimer">A informação disponível neste site tem carácter informativo e não substitui a consulta médica.</p>
      </div>
    </div>
  </footer>

<?php wp_footer(); ?>
</body>
</html>
