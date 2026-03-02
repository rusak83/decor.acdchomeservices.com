(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // Dynamic problem options by appliance type
  const applianceSelect = document.querySelector('#appliance-select');
  const brandSelect = document.querySelector('#brand-select');
  const problemSelect = document.querySelector('#problem-select');

  const applianceIssues = {
    'Refrigerator': [
      'Not cooling / warm fridge',
      'Ice maker not working',
      'Water leak under or inside',
      'Noisy or loud operation',
      'Door seal / won’t close',
      'Frost or ice buildup'
    ],
    'Freezer': [
      'Not freezing enough',
      'Ice buildup on coils',
      'Water leak on floor',
      'Runs constantly / won’t shut off',
      'Door gasket issue'
    ],
    'Ice Machine': [
      'No ice production',
      'Slow ice output',
      'Bad taste or cloudy ice',
      'Leaking water',
      'Ice melts in bin'
    ],
    'Oven / Range': [
      'Not heating / no ignition',
      'Uneven baking or temps off',
      'Burner won’t ignite',
      'Error code displayed',
      'Gas smell or shutoff',
      'Door not sealing'
    ],
    'Cooktop': [
      'Burner won’t ignite',
      'Glass top cracked',
      'Uneven flame / yellow flame',
      'Knob broken or stuck'
    ],
    'Microwave': [
      'Not heating food',
      'Loud buzzing or arcing',
      'Turntable not turning',
      'Door switch issue',
      'Error code showing'
    ],
    'Dishwasher': [
      'Not draining',
      'Dishes not cleaning',
      'Leaking from door or below',
      'Won’t start or power on',
      'Bad smell or residue'
    ],
    'Washer': [
      'Not spinning or draining',
      'Won’t start / error code',
      'Water leak or overfilling',
      'Loud banging / vibration',
      'Not filling with water'
    ],
    'Dryer': [
      'No heat or low heat',
      'Takes too long to dry',
      'Drum not turning',
      'Burning smell',
      'Loud squeaking or thumping'
    ],
    'Wine Cooler': [
      'Not cooling / warm zones',
      'Temperature swings',
      'Vibration or noise',
      'Condensation or frost',
      'Control panel issues'
    ]
  };

  const brandCatalog = {
    default: ['Any brand', 'GE', 'LG', 'Samsung', 'Whirlpool', 'KitchenAid', 'Frigidaire', 'Maytag', 'Bosch', 'Miele'],
    premium: ['Sub-Zero', 'Wolf', 'Viking', 'Thermador', 'Miele', 'Bosch'],
    refrigeration: ['Sub-Zero', 'Viking', 'Thermador', 'GE', 'LG', 'Samsung', 'Whirlpool', 'KitchenAid', 'Frigidaire', 'Bosch', 'Miele', 'Maytag'],
    cooking: ['Wolf', 'Viking', 'Thermador', 'GE', 'LG', 'Samsung', 'Whirlpool', 'KitchenAid', 'Frigidaire', 'Bosch', 'Miele'],
    laundry: ['LG', 'Samsung', 'Whirlpool', 'Maytag', 'GE'],
    ice: ['Scotsman', 'Hoshizaki', 'Manitowoc', 'U-Line', 'KitchenAid', 'GE', 'Whirlpool'],
    wine: ['Sub-Zero', 'U-Line', 'Thermador', 'Bosch', 'Miele', 'KitchenAid', 'Frigidaire']
  };

  const applianceBrands = {
    'Refrigerator': brandCatalog.refrigeration,
    'Freezer': brandCatalog.refrigeration,
    'Ice Machine': brandCatalog.ice,
    'Oven / Range': brandCatalog.cooking,
    'Cooktop': brandCatalog.cooking,
    'Microwave': brandCatalog.cooking,
    'Dishwasher': brandCatalog.default,
    'Washer': brandCatalog.laundry,
    'Dryer': brandCatalog.laundry,
    'Wine Cooler': brandCatalog.wine
  };

  function populateProblems(appliance) {
    if (!problemSelect) return;
    const issues = applianceIssues[appliance];
    problemSelect.innerHTML = '';
    if (!issues) {
      problemSelect.disabled = true;
      problemSelect.innerHTML = '<option value=\"\" selected>Select appliance first</option>';
      return;
    }
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select problem';
    defaultOption.selected = true;
    problemSelect.appendChild(defaultOption);

    issues.forEach(issue => {
      const opt = document.createElement('option');
      opt.textContent = issue;
      problemSelect.appendChild(opt);
    });

    const other = document.createElement('option');
    other.textContent = 'Other issue';
    problemSelect.appendChild(other);
    problemSelect.disabled = false;
  }

  function populateBrands(appliance) {
    if (!brandSelect) return;
    const brands = applianceBrands[appliance];
    brandSelect.innerHTML = '';
    if (!brands) {
      brandSelect.disabled = true;
      brandSelect.innerHTML = '<option value=\"\" selected>Select appliance first</option>';
      return;
    }
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select brand';
    defaultOption.selected = true;
    brandSelect.appendChild(defaultOption);

    brands.forEach(brand => {
      const opt = document.createElement('option');
      opt.textContent = brand;
      brandSelect.appendChild(opt);
    });
    const other = document.createElement('option');
    other.textContent = 'Other brand';
    brandSelect.appendChild(other);
    brandSelect.disabled = false;
  }

  if (applianceSelect) {
    populateProblems(); // set initial disabled state
    populateBrands(); // set initial disabled state
    applianceSelect.addEventListener('change', (e) => {
      const appliance = e.target.value;
      populateProblems(appliance);
      populateBrands(appliance);
    });
  }

  // ZIP validation for service area
  const zipInput = document.querySelector('#zip-input');
  const zipError = document.querySelector('#zip-error');
  const submitBtn = document.querySelector('.quick-form .btn.full-width');
  const serviceZips = ['76051', '76053', '76052'];

  function trackQuickForm(payload) {
    const eventName = 'quick_form_submit';
    const eventPayload = Object.assign({
      brandName: 'Dacor',
      pagePath: window.location.pathname
    }, payload || {});

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, eventPayload));

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventPayload);
    }

    if (typeof window.uetq !== 'undefined') {
      window.uetq = window.uetq || [];
      window.uetq.push('event', eventName, eventPayload);
    }

    if (typeof window.ym === 'function') {
      window.ym(105949121, 'reachGoal', eventName, eventPayload);
    }
  }

  function validateZip() {
    if (!zipInput) return false;
    const value = (zipInput.value || '').trim();
    const isValid = serviceZips.includes(value);
    if (!isValid) {
      zipInput.classList.add('invalid');
      if (zipError) zipError.textContent = 'Sorry, this ZIP is outside our service area.';
    } else {
      zipInput.classList.remove('invalid');
      if (zipError) zipError.textContent = '';
    }
    return isValid;
  }

  if (zipInput && submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      const ok = validateZip();
      if (!ok) {
        e.preventDefault();
        return;
      }
      trackQuickForm({
        appliance: applianceSelect ? applianceSelect.value : '',
        brand: brandSelect ? brandSelect.value : '',
        problem: problemSelect ? problemSelect.value : '',
        zip: zipInput.value.trim()
      });
      alert('Callback requested. We will contact you shortly.');
    });
    zipInput.addEventListener('input', validateZip);
  }
})();
