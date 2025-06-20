(() => {
    const body = document.body;
    const toggleBtn = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let darkMode = localStorage.getItem('fb-dark-mode');
    if(darkMode === null) {
      darkMode = prefersDark ? 'true' : 'false';
    }
    function applyTheme(dark) {
      if (dark === 'true') {
        body.style.background = 'linear-gradient(135deg, #111315, #1c1e22)';
        body.style.color = '#e4e6eb';
        icon.textContent = 'dark_mode';
        toggleBtn.setAttribute('aria-pressed', 'true');
      } else {
        body.style.background =
          'linear-gradient(135deg, #f0f2f5, #d8dadf)';
        body.style.color = '#050505';
        icon.textContent = 'light_mode';
        toggleBtn.setAttribute('aria-pressed', 'false');
      }
      localStorage.setItem('fb-dark-mode', dark);
    }
    applyTheme(darkMode);
    toggleBtn.addEventListener('click', () => {
      darkMode = darkMode === 'true' ? 'false' : 'true';
      applyTheme(darkMode);
    });
  })();

  // Sidebar toggle for mobile
  (() => {
    const btn = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      sidebar.classList.toggle('show');
    });

    // Close sidebar on esc key when visible
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  })();

  // Form validation and state management
  (() => {
    const form = document.getElementById('login-form');
    const emailInput = form.email;
    const passwordInput = form.password;
    const loginBtn = document.getElementById('login-btn');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    function validateEmail(email) {
      // Simple email regex for demonstration, improve for production use
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email.trim());
    }
    function validatePassword(password) {
      return password.length >= 6;
    }
    function updateFieldError(input, errorElem, valid, message) {
      if (!valid) {
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
        errorElem.textContent = message;
      } else {
        input.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');
        errorElem.textContent = '';
      }
    }
    function validateForm() {
      const emailVal = emailInput.value;
      const passVal = passwordInput.value;
      const emailValid = validateEmail(emailVal);
      const passValid = validatePassword(passVal);
      updateFieldError(emailInput, emailError, emailValid || emailVal.trim() === '', 'Please enter a valid email address.');
      updateFieldError(passwordInput, passwordError, passValid || passVal === '', 'Password must be at least 6 characters.');
      const formValid = emailValid && passValid;
      loginBtn.disabled = !formValid;
      loginBtn.setAttribute('aria-disabled', String(!formValid));
      return formValid;
    }
    emailInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!validateForm()) return;
      // Simulate login process
      loginBtn.disabled = true;
      loginBtn.textContent = 'Logging in...';
      setTimeout(() => {
        alert('Login successful! (simulated)');
        loginBtn.textContent = 'Log In';
        loginBtn.disabled = false;
      }, 1500);
    });
  })();

