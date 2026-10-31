/**
 * ==============================================================================
 * JUNAYED'S CORNER &bull; MAIN SCRIPT
 * ==============================================================================
 * A cozy, indie-web inspired digital garden with zero external frameworks.
 * 
 * QUICK EDIT GUIDE:
 * - Update your current focus        -> Edit NOW_PILLARS below.
 * - Add or edit projects            -> Edit WORKSHOP_PROJECTS below.
 * - Add or edit games & reviews     -> Edit GAMES_LOG below.
 * - Add or edit recipes & kitchen   -> Edit KITCHEN_RECIPES below.
 * - Add or edit personal writings   -> Edit NOTEBOOK_ENTRIES below.
 * - Add or edit bookmarks & links   -> Edit DIGITAL_GARDEN_LINKS below.
 * - Add or edit gear & tools        -> Edit USES_DATA below.
 * - Add or edit timeline updates    -> Edit PROJECT_LOG_DATA below.
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================================
     AUDIO SYNTHESIS ENGINE (Web Audio API - No external sound files needed!)
     ============================================================================ */
  const AudioEngine = {
    ctx: null,
    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
    },
    beep(freq = 440, type = 'sine', duration = 0.12) {
      try {
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        // Audio policy or silent failure
      }
    },
    playCardFlip() {
      this.beep(520, 'sine', 0.08);
    },
    playMatchSuccess() {
      this.beep(659.25, 'triangle', 0.1);
      setTimeout(() => this.beep(880, 'sine', 0.15), 100);
    },
    playVictory() {
      const melody = [523.25, 659.25, 783.99, 1046.50];
      melody.forEach((note, i) => {
        setTimeout(() => this.beep(note, 'triangle', 0.2), i * 140);
      });
    },
    playGuestbookChime() {
      this.beep(587.33, 'triangle', 0.12);
      setTimeout(() => this.beep(880, 'sine', 0.2), 120);
    }
  };


  /* ============================================================================
     1. NOW SECTION (What I'm focused on right now)
     ============================================================================ */
  const NOW_PILLARS = [
    {
      pillar: "Learning",
      icon: "📚",
      headline: "Modern Web APIs & Canvas",
      desc: "Deepening my grasp of vanilla JavaScript patterns, Web Audio API synthesis, local-first state handling, and accessible UI.",
      tag: "Self-study & documentation"
    },
    {
      pillar: "Building",
      icon: "🛠️",
      headline: "RailSeat BD & Cozy Web Tools",
      desc: "Prototyping a crowd-sourced seat comfort guide for Bangladesh Railway trains, plus small interactive web toys.",
      tag: "Active prototypes"
    },
    {
      pillar: "Playing",
      icon: "🎮",
      headline: "Atmospheric Indie Worlds",
      desc: "Revisiting Firewatch's warm Wyoming sunsets and slowly exploring the moody corridors of Hallownest in Hollow Knight.",
      tag: "Evening wind-down"
    },
    {
      pillar: "Exploring",
      icon: "🥐",
      headline: "Pastry Lamination & Hydration",
      desc: "Balancing butter plasticity at tropical temperatures (18°C) and experimenting with cardamom-scented tangzhong doughs.",
      tag: "Apprentice experiments"
    }
  ];

  function renderNowSection() {
    const container = document.getElementById('nowPillarsContainer');
    if (!container) return;

    container.innerHTML = NOW_PILLARS.map(p => `
      <div class="now-card">
        <div class="now-card-header">
          <div class="now-icon-box" aria-hidden="true">${p.icon}</div>
          <span class="now-pillar-title">${p.pillar}</span>
        </div>
        <h3 class="now-headline">${p.headline}</h3>
        <p class="now-desc">${p.desc}</p>
        <div class="now-footer-tag">${p.tag}</div>
      </div>
    `).join('');
  }


  /* ============================================================================
     2. THE WORKSHOP (Projects, Prototypes & Unfinished Ideas)
     ============================================================================ */
  const WORKSHOP_PROJECTS = [
    {
      id: "railseat-bd",
      title: "RailSeat BD",
      icon: "🚆",
      status: "in-progress", // 'in-progress' | 'prototype' | 'experiment' | 'idea'
      statusLabel: "In Progress",
      desc: "A crowd-sourced railway seat review and comfort guide tailored for Bangladesh Railway. Helping commuters discover the best coach seats, window views, and charging ports.",
      tags: ["JavaScript", "Crowd-Source", "Bangladesh"],
      link: "#",
      linkLabel: "View Prototype &rarr;"
    },
    {
      id: "mochi-pet",
      title: "Mochi Desktop Pet",
      icon: "🐾",
      status: "experiment",
      statusLabel: "Active Experiment",
      desc: "A cozy SVG companion living in the corner of your browser. Features idle purrs, interactive snacks, and state-driven sleepy reactions without any external libraries.",
      tags: ["SVG Animation", "State Machine", "Indie Web"],
      link: "#mochiPet",
      linkLabel: "Interact with Mochi &rarr;"
    },
    {
      id: "personal-garden",
      title: "Junayed's Corner",
      icon: "☕",
      status: "in-progress",
      statusLabel: "In Progress",
      desc: "This digital nook! Handcrafted with vanilla HTML/CSS/JS, custom retro illustrations, Web Audio sound synthesis, and indie-web easter eggs.",
      tags: ["Vanilla JS", "Design", "Cozy Web"],
      link: "#home",
      linkLabel: "Explore Features &rarr;"
    },
    {
      id: "bakers-clock",
      title: "Baker's Proofing Clock",
      icon: "⏱️",
      status: "prototype",
      statusLabel: "Prototype",
      desc: "A weather-aware fermentation calculator for humid tropical kitchens. Computes proofing rates based on ambient humidity and room temperature in Dhaka.",
      tags: ["Baking Math", "PWA Prototype", "Tools"],
      link: "#kitchen",
      linkLabel: "View Baker Notes &rarr;"
    },
    {
      id: "bangla-typography",
      title: "Bangla Type Experiments",
      icon: "✍️",
      status: "experiment",
      statusLabel: "Experiment",
      desc: "Explorations combining classical Bengali letterforms with geometric monospace typography for modern terminal layouts and code editors.",
      tags: ["Typography", "Design", "CSS"],
      link: "#",
      linkLabel: "View Spec Sheet &rarr;"
    },
    {
      id: "midnight-radio",
      title: "Midnight Ambient Radio",
      icon: "📻",
      status: "idea",
      statusLabel: "Unfinished Idea",
      desc: "A minimalist white-noise synthesizer combining rain on tin roofs, tea stall murmurs, and old cassette tape hiss for late-night focus.",
      tags: ["Audio Synthesis", "Relaxation", "Concept"],
      link: "#",
      linkLabel: "Listen to Concept &rarr;"
    },
    {
      id: "rickshaw-patterns",
      title: "Rickshaw Art Pattern Generator",
      icon: "🎨",
      status: "prototype",
      statusLabel: "Prototype",
      desc: "Procedural SVG generator recreating the vivid floral borders, peacocks, and typography traditionally hand-painted onto Dhaka rickshaws.",
      tags: ["Generative Art", "SVG", "Dhaka"],
      link: "#",
      linkLabel: "View Canvas Demo &rarr;"
    },
    {
      id: "recipe-ratio-calc",
      title: "Baker's Percentage Calculator",
      icon: "⚖️",
      status: "idea",
      statusLabel: "Unfinished Idea",
      desc: "A lightweight CLI tool to scale bread formulas by baker's percentage (flour = 100%) so you can quickly double a sourdough batch without recalculating by hand.",
      tags: ["CLI", "Baking Utilities"],
      link: "#",
      linkLabel: "Read Formula Notes &rarr;"
    }
  ];

  function renderWorkshop(filter = "all") {
    const grid = document.getElementById('workshopGrid');
    if (!grid) return;

    const filtered = filter === "all" 
      ? WORKSHOP_PROJECTS 
      : WORKSHOP_PROJECTS.filter(p => p.status === filter);

    grid.innerHTML = filtered.map(p => `
      <article class="project-card" id="project-${p.id}">
        <div class="project-card-header">
          <div class="project-icon" aria-hidden="true">${p.icon}</div>
          <span class="status-badge ${p.status}">${p.statusLabel}</span>
        </div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="project-tag">#${t}</span>`).join('')}
        </div>
        <a href="${p.link}" class="project-link-btn" onclick="${p.link.startsWith('#') ? '' : 'event.preventDefault(); showToast(\"Project preview: ' + p.title + ' (In development)\");'}">
          ${p.linkLabel}
        </a>
      </article>
    `).join('');
  }

  // Workshop filter buttons
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderWorkshop(pill.getAttribute('data-filter'));
    });
  });


  /* ============================================================================
     3. THE NOTEBOOK (Thoughts & Essays)
     ============================================================================ */
  const NOTEBOOK_ENTRIES = [
    {
      id: "rebuilding-things",
      title: "On Rebuilding Things from Scratch",
      date: "October 2026",
      readTime: "3 min read",
      tags: ["Code", "Craft", "Philosophy"],
      content: `
        <p>There's an odd impulse in modern software to immediately install 40 npm packages before writing a single line of application logic. But whenever I strip things down to raw HTML, CSS, and vanilla JavaScript, I remember how robust the browser really is.</p>
        <p>Building from first principles teaches you what the abstractions are actually doing. It feels like making puff pastry by hand: tedious at first, but once you feel the layers, you never look at a pre-made sheet the same way again.</p>
      `
    },
    {
      id: "flour-and-code",
      title: "The Unexpected Symmetry Between Pastry and Programming",
      date: "September 2026",
      readTime: "4 min read",
      tags: ["Pastry", "Web Dev", "Observations"],
      content: `
        <p>In pastry, hydration percentage and oven spring dictate your loaf's entire destiny. In code, system inputs and boundary conditions determine whether a function behaves gracefully or crashes silently.</p>
        <p>Both disciplines require respecting invisible physical laws—one governed by enzymatic yeast reactions, the other by runtime call stacks. And in both, precision only matters if the final result actually brings someone joy.</p>
      `
    },
    {
      id: "old-web-soul",
      title: "Why Old Personal Websites Had Soul",
      date: "August 2026",
      readTime: "3 min read",
      tags: ["Indie Web", "Aesthetics"],
      content: `
        <p>The early web was filled with animated under-construction GIFs, visitor counters, guestbooks, and quirky 88x31 badges. It was messy, human, and delightfully unpolished.</p>
        <p>Today's web has optimized every corner for enterprise conversion funnels. This little website is my small rebellion: a space with desktop pets, secret notes, warm fonts, and things built purely for the joy of building.</p>
      `
    }
  ];

  function renderNotebook() {
    const container = document.getElementById('notebookContainer');
    if (!container) return;

    container.innerHTML = NOTEBOOK_ENTRIES.map(e => `
      <article class="notebook-entry" id="note-${e.id}">
        <div class="entry-header">
          <span class="entry-date">${e.date}</span>
          <span class="entry-read-time">${e.readTime}</span>
        </div>
        <h3 class="entry-title">${e.title}</h3>
        <div class="entry-content">
          ${e.content}
        </div>
        <div class="entry-tags">
          ${e.tags.map(t => `<span class="entry-tag">#${t}</span>`).join('')}
        </div>
      </article>
    `).join('');
  }


  /* ============================================================================
     4. THE GAME ROOM (Favorite Games Log & Playable Memory Game)
     ============================================================================ */
  const GAMES_LOG = [
    {
      name: "Hollow Knight",
      genre: "Metroidvania / Atmospheric",
      note: "The melancholic beauty of Hallownest and the sublime soundtrack by Christopher Larkin."
    },
    {
      name: "Outer Wilds",
      genre: "Space Mystery / Exploration",
      note: "Roasting marshmallows while contemplating the fleeting nature of the solar system."
    },
    {
      name: "Stardew Valley",
      genre: "Farming Sim / Cozy",
      note: "The perfect antidote to a stressful week. Rainy days in Pelican Town are peak comfort."
    },
    {
      name: "A Short Hike",
      genre: "Wholesome Exploration",
      note: "Short, sweet, and wonderfully written. Gliding down Hawk Peak feels like pure flight."
    }
  ];

  function renderGamesLog() {
    const container = document.getElementById('gamesLogGrid');
    if (!container) return;

    container.innerHTML = GAMES_LOG.map(g => `
      <div class="mini-game-item">
        <div class="mini-game-name">${g.name}</div>
        <div class="mini-game-genre">${g.genre}</div>
        <div class="mini-game-note">${g.note}</div>
      </div>
    `).join('');
  }

  /* --- PLAYABLE MINI-GAME: COZY MEMORY MATCH --- */
  const MEMORY_ICONS = ["🥐", "☕", "🎮", "💾", "📷", "🐱"];
  let memoryCards = [];
  let flippedCards = [];
  let matchedPairs = 0;
  let movesCount = 0;
  let gameTimerInterval = null;
  let elapsedSeconds = 0;
  let isCheckingMatch = false;

  function initMemoryGame() {
    const grid = document.getElementById('memoryGrid');
    const winBanner = document.getElementById('gameWinBanner');
    if (!grid) return;

    clearInterval(gameTimerInterval);
    gameTimerInterval = null;
    elapsedSeconds = 0;
    movesCount = 0;
    matchedPairs = 0;
    flippedCards = [];
    isCheckingMatch = false;

    updateScoreboard();
    if (winBanner) winBanner.classList.add('hidden');

    memoryCards = [...MEMORY_ICONS, ...MEMORY_ICONS]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon: icon,
        matched: false
      }));

    grid.innerHTML = '';
    memoryCards.forEach((card) => {
      const cardEl = document.createElement('button');
      cardEl.className = 'memory-card';
      cardEl.setAttribute('aria-label', 'Hidden card');
      cardEl.dataset.id = card.id;

      cardEl.innerHTML = `
        <div class="card-inner">
          <div class="card-back">?</div>
          <div class="card-front">${card.icon}</div>
        </div>
      `;

      cardEl.addEventListener('click', () => handleCardClick(cardEl, card));
      grid.appendChild(cardEl);
    });
  }

  function startTimerIfNeeded() {
    if (!gameTimerInterval) {
      gameTimerInterval = setInterval(() => {
        elapsedSeconds++;
        const mins = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
        const secs = String(elapsedSeconds % 60).padStart(2, '0');
        const timerEl = document.getElementById('gameTimer');
        if (timerEl) timerEl.textContent = `${mins}:${secs}`;
      }, 1000);
    }
  }

  function updateScoreboard() {
    const movesEl = document.getElementById('gameMoves');
    const matchesEl = document.getElementById('gameMatches');
    const timerEl = document.getElementById('gameTimer');

    if (movesEl) movesEl.textContent = movesCount;
    if (matchesEl) matchesEl.textContent = matchedPairs;
    if (timerEl && elapsedSeconds === 0) timerEl.textContent = "00:00";
  }

  function handleCardClick(cardEl, card) {
    if (isCheckingMatch) return;
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

    startTimerIfNeeded();
    AudioEngine.playCardFlip();

    cardEl.classList.add('flipped');
    flippedCards.push({ element: cardEl, data: card });

    if (flippedCards.length === 2) {
      movesCount++;
      updateScoreboard();
      checkCardMatch();
    }
  }

  function checkCardMatch() {
    isCheckingMatch = true;
    const [first, second] = flippedCards;

    if (first.data.icon === second.data.icon) {
      setTimeout(() => {
        AudioEngine.playMatchSuccess();
        first.element.classList.add('matched');
        second.element.classList.add('matched');
        first.data.matched = true;
        second.data.matched = true;
        matchedPairs++;
        updateScoreboard();

        flippedCards = [];
        isCheckingMatch = false;

        if (matchedPairs === MEMORY_ICONS.length) {
          handleGameWin();
        }
      }, 350);
    } else {
      setTimeout(() => {
        first.element.classList.remove('flipped');
        second.element.classList.remove('flipped');
        flippedCards = [];
        isCheckingMatch = false;
      }, 850);
    }
  }

  function handleGameWin() {
    clearInterval(gameTimerInterval);
    AudioEngine.playVictory();

    const winBanner = document.getElementById('gameWinBanner');
    const winSummary = document.getElementById('winSummary');
    if (winSummary) {
      const mins = Math.floor(elapsedSeconds / 60);
      const secs = elapsedSeconds % 60;
      winSummary.textContent = `Completed in ${movesCount} moves and ${mins > 0 ? `${mins}m ` : ''}${secs}s! Mochi is cheering for you!`;
    }
    if (winBanner) winBanner.classList.remove('hidden');

    triggerMochiSpeech("🎉 You won the memory game! High five!");
  }

  document.getElementById('resetGameBtn')?.addEventListener('click', initMemoryGame);
  document.getElementById('playAgainBtn')?.addEventListener('click', initMemoryGame);


  /* ============================================================================
     5. THE KITCHEN (Baking Experiments & Pastry Notes)
     ============================================================================ */
  const KITCHEN_RECIPES = [
    {
      id: "shokupan",
      title: "Cardamom Tangzhong Milk Bread",
      tag: "Bread & Viennoiserie",
      illustration: "🍞",
      desc: "Japanese milk bread method combined with crushed green cardamom pods. Incredibly feathery crumb that stays soft for days.",
      bakerLog: "Key lesson: Tangzhong paste must cool down to 30°C before pitching yeast to prevent thermal shock.",
      temp: "175°C / 32 min",
      difficulty: "Intermediate"
    },
    {
      id: "croissant",
      title: "All-Butter Flaky Croissant",
      tag: "Lamination",
      illustration: "🥐",
      desc: "3-day process: Day 1 Poolish & D&eacute;trempe; Day 2 Butter lock-in with 1 double turn & 1 single turn; Day 3 Final proof & bake.",
      bakerLog: "Key lesson: Keep butter at 16-18°C. If butter fractures, layers merge into brioche rather than honeycomb.",
      temp: "205°C &rarr; 180°C / 20 min",
      difficulty: "Advanced"
    },
    {
      id: "basque-cheesecake",
      title: "Burnt Basque Cheesecake",
      tag: "Pastry & Dessert",
      illustration: "🍰",
      desc: "High-heat scorched exterior with a custardy, almost molten center flavored with fresh vanilla bean paste and a whisper of sea salt.",
      bakerLog: "Key lesson: Don't panic when the top turns nearly black; that caramelization balances the rich creaminess.",
      temp: "240°C / 28 min",
      difficulty: "Accessible"
    },
    {
      id: "shingara-crust",
      title: "Flaky Kalojire Shingara",
      tag: "Bangladeshi Pastry",
      illustration: "🥟",
      desc: "Traditional Bengali samosa crust infused with kalojire (nigella seeds) and ghee. Crisp, flaky pastry pocket filled with spiced potato and cauliflower.",
      bakerLog: "Key lesson: Low and slow frying in warm oil allows the dough to blister gently without becoming oily.",
      temp: "Deep fry @ 150°C",
      difficulty: "Intermediate"
    }
  ];

  function renderKitchen() {
    const grid = document.getElementById('kitchenGrid');
    if (!grid) return;

    grid.innerHTML = KITCHEN_RECIPES.map(r => `
      <article class="recipe-card" id="recipe-${r.id}">
        <div class="food-visual-container">
          <div class="food-art-illustration" aria-hidden="true">${r.illustration}</div>
          <span class="food-tag-overlay">${r.tag}</span>
        </div>
        <div class="recipe-body">
          <h3 class="recipe-title">${r.title}</h3>
          <p class="recipe-notes">${r.desc}</p>
          <div class="baker-log">${r.bakerLog}</div>
          <div class="recipe-meta">
            <span>🔥 ${r.temp}</span>
            <span>⭐ ${r.difficulty}</span>
          </div>
        </div>
      </article>
    `).join('');
  }


  /* ============================================================================
     6. DIGITAL GARDEN (Bookmarks & Internet Rabbit Holes)
     ============================================================================ */
  const DIGITAL_GARDEN_LINKS = [
    {
      title: "Robin Sloan's Garden",
      category: "Indie Web",
      desc: "Author, media inventor, and olive oil maker. One of the best models for thoughtful, handcrafted internet writing.",
      url: "https://www.robinsloan.com",
      urlDisplay: "robinsloan.com"
    },
    {
      title: "The Wiby Search Engine",
      category: "Web Archaeology",
      desc: "A search engine specifically built for exploring the non-commercial, HTML-first web of personal homepages.",
      url: "https://wiby.me",
      urlDisplay: "wiby.me"
    },
    {
      title: "100 Rabbits",
      category: "Low-Tech & Art",
      desc: "An artist-engineer duo living aboard a sailboat, building offline-first, solar-powered software tools.",
      url: "https://100r.co",
      urlDisplay: "100r.co"
    },
    {
      title: "Marginalia Search",
      category: "Independent Search",
      desc: "An independent search index focusing on text-rich, independent blogs and quirky personal corners.",
      url: "https://search.marginalia.nu",
      urlDisplay: "search.marginalia.nu"
    },
    {
      title: "Low-tech Magazine",
      category: "Solar Powered",
      desc: "A website hosted on a solar-powered server in Barcelona that goes offline when the sun stops shining.",
      url: "https://solar.lowtechmagazine.com",
      urlDisplay: "solar.lowtechmagazine.com"
    },
    {
      title: "Fonts In Use",
      category: "Design Archive",
      desc: "An invaluable public archive indexing typographic design across books, record sleeves, and ephemera.",
      url: "https://fontsinuse.com",
      urlDisplay: "fontsinuse.com"
    }
  ];

  function renderDigitalGarden() {
    const grid = document.getElementById('gardenGrid');
    if (!grid) return;

    grid.innerHTML = DIGITAL_GARDEN_LINKS.map(link => `
      <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="garden-card">
        <div class="garden-card-top">
          <span class="garden-category-tag">${link.category}</span>
          <span class="garden-external-arrow" aria-hidden="true">&nearr;</span>
        </div>
        <h3 class="garden-title">${link.title}</h3>
        <p class="garden-desc">${link.desc}</p>
        <span class="garden-url-badge">${link.urlDisplay}</span>
      </a>
    `).join('');
  }


  /* ============================================================================
     7. GUESTBOOK (Interactive with LocalStorage & Direct Mailto Link)
     ============================================================================ */
  const INITIAL_GUESTBOOK_ENTRIES = [
    {
      name: "Sourdough Traveler",
      sticker: "🍞",
      message: "Stumbled here from an indie webring! The note on butter temperature at 18°C is spot on.",
      date: "October 2026"
    },
    {
      name: "Pelican Town Resident",
      sticker: "🎮",
      message: "Firewatch walkie-talkie banter 10/10 rating is completely accurate. Cozy corner of the internet you got here!",
      date: "October 2026"
    },
    {
      name: "Tea Stall Philosopher",
      sticker: "☕",
      message: "Sending warm greetings from Chittagong! Looking forward to seeing RailSeat BD take shape.",
      date: "September 2026"
    }
  ];

  function getSavedGuestbookEntries() {
    try {
      const stored = localStorage.getItem('junayed_guestbook_entries');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("LocalStorage access failed:", e);
    }
    return INITIAL_GUESTBOOK_ENTRIES;
  }

  function saveGuestbookEntries(entries) {
    try {
      localStorage.setItem('junayed_guestbook_entries', JSON.stringify(entries));
    } catch (e) {
      console.warn("Could not save to LocalStorage:", e);
    }
  }

  function renderGuestbook() {
    const container = document.getElementById('guestbookNotesContainer');
    if (!container) return;

    const entries = getSavedGuestbookEntries();
    container.innerHTML = entries.map(entry => `
      <div class="guestbook-sticky-note">
        <div class="sticky-note-header">
          <span class="sticky-author">${escapeHtml(entry.name)}</span>
          <span class="sticky-sticker" aria-hidden="true">${entry.sticker}</span>
        </div>
        <p class="sticky-message">${escapeHtml(entry.message)}</p>
        <div class="sticky-date">Signed: ${entry.date}</div>
      </div>
    `).join('');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Guestbook Sticker Picker
  let selectedSticker = "🥐";
  const stickerButtons = document.querySelectorAll('.sticker-btn');
  stickerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      stickerButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedSticker = btn.dataset.sticker;
      AudioEngine.beep(640, 'sine', 0.05);
    });
  });

  // Guestbook Form Submission
  const guestbookForm = document.getElementById('guestbookForm');
  guestbookForm?.addEventListener('submit', () => {
    const nameInput = document.getElementById('guestbookName');
    const msgInput = document.getElementById('guestbookMsg');

    const name = nameInput.value.trim() || "Anonymous Wanderer";
    const message = msgInput.value.trim();

    if (!message) return;

    const newEntry = {
      name: name,
      sticker: selectedSticker,
      message: message,
      date: "Just now"
    };

    const currentEntries = getSavedGuestbookEntries();
    currentEntries.unshift(newEntry);
    saveGuestbookEntries(currentEntries);

    renderGuestbook();
    AudioEngine.playGuestbookChime();

    // Reset inputs
    nameInput.value = "";
    msgInput.value = "";

    showToast("✍️ Note saved to your browser! Thank you for signing!", "📖");
    triggerMochiSpeech("🐾 A new note! Thank you for visiting!");
  });


  /* ============================================================================
     8. USES SECTION (Hardware, Software, Baking & Everyday Tools)
     ============================================================================ */
  const USES_DATA = [
    {
      category: "Hardware & Daily Carry",
      icon: "💻",
      items: [
        { name: "Apple MacBook Air", desc: "Lightweight, silent, and reliable for writing code and drafts at neighborhood tea stalls." },
        { name: "Custom 65% Mechanical Keyboard", desc: "Gateron Brown tactile switches for a responsive, satisfying typing rhythm." },
        { name: "Digital Milligram Scale & Probe", desc: "Crucial for precise yeast percentages, hydration ratios, and tempered chocolate." },
        { name: "Sony Alpha / Phone Camera", desc: "Capturing monsoon light, street geometry in Dhaka, and blistered bread crusts." }
      ]
    },
    {
      category: "Software & Development",
      icon: "⚡",
      items: [
        { name: "VS Code / Antigravity IDE", desc: "Configured with minimal syntax themes and distraction-free editor chrome." },
        { name: "Firefox Dev Edition & Brave", desc: "My daily browsers for responsive layout testing and devtools inspection." },
        { name: "Obsidian", desc: "Offline markdown vault for pastry formulas, project ideas, and book highlights." },
        { name: "Figma", desc: "Fast wireframing, color palette experiments, and typography pairings." }
      ]
    },
    {
      category: "Kitchen & Pastry Gear",
      icon: "🥐",
      items: [
        { name: "French Tapered Rolling Pin", desc: "Solid beechwood with no handles—gives complete fingertip tactile feedback over dough thickness." },
        { name: "Stainless Steel Bench Scraper", desc: "The unsung hero of baking: divides dough cleanly and scrapes workbenches spotless." },
        { name: "Heavy Cordierite Baking Stone", desc: "Retains high thermal mass to recreate artisan hearth-oven spring at home." },
        { name: "Microplane Zester", desc: "For fresh lemon zest, nutmeg, and finely grated spices." }
      ]
    }
  ];

  function renderUses() {
    const container = document.getElementById('usesContainer');
    if (!container) return;

    container.innerHTML = USES_DATA.map(cat => `
      <div class="uses-card">
        <div class="uses-category-header">
          <span class="uses-category-icon" aria-hidden="true">${cat.icon}</span>
          <h3 class="uses-category-title">${cat.category}</h3>
        </div>
        <div class="uses-item-list">
          ${cat.items.map(item => `
            <div class="uses-item">
              <span class="uses-item-title">${item.name}</span>
              <span class="uses-item-desc">${item.desc}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }


  /* ============================================================================
     9. PROJECT LOG (Chronological Timeline)
     ============================================================================ */
  const PROJECT_LOG_DATA = [
    {
      date: "October 2026",
      project: "Junayed's Corner",
      title: "Full Website Expansion & Interactive Suite",
      desc: "Added the /now broadcast, Digital Garden directory, local-first Guestbook, Uses gear inventory, and Project Log timeline. Polished Web Audio synthesizers.",
      next: "Add real photograph gallery to The Kitchen."
    },
    {
      date: "September 2026",
      project: "RailSeat BD",
      title: "Data Schema & Coach Layout Prototypes",
      desc: "Drafted data structures for coach seating layouts across intercity trains (e.g. Suborno Express, Parabat Express). Researched window-to-seat alignment.",
      next: "Implement interactive SVG coach selector."
    },
    {
      date: "August 2026",
      project: "Mochi Desktop Pet",
      title: "State Machine & SVG Animation Suite",
      desc: "Handcrafted Mochi as a pure SVG vector character. Programmed dynamic idle, feeding, petting, and sleeping states without third-party frameworks.",
      next: "Add customizable mini hats and tea cup accessories."
    },
    {
      date: "July 2026",
      project: "Personal Experiments",
      title: "First Digital Garden Prototype",
      desc: "Stepped away from generic portfolio boilerplates to build a cozy, dark charcoal personal website inspired by the indie web and retro micro-arcades.",
      next: "Build out the memory matching arcade cabinet."
    }
  ];

  function renderProjectLog() {
    const container = document.getElementById('projectLogContainer');
    if (!container) return;

    container.innerHTML = PROJECT_LOG_DATA.map(entry => `
      <div class="timeline-item">
        <div class="timeline-dot" aria-hidden="true"></div>
        <div class="timeline-card">
          <div class="timeline-header">
            <span class="timeline-date">${entry.date}</span>
            <span class="timeline-project-badge">${entry.project}</span>
          </div>
          <h3 class="timeline-title">${entry.title}</h3>
          <p class="timeline-desc">${entry.desc}</p>
          <div class="timeline-next-tag">Next step: <span>${entry.next}</span></div>
        </div>
      </div>
    `).join('');
  }


  /* ============================================================================
     10. DESKTOP PET: MOCHI INTERACTIONS
     ============================================================================ */
  const mochiPet = document.getElementById('mochiPet');
  const mochiInteractiveArea = document.getElementById('mochiInteractiveArea');
  const mochiBubble = document.getElementById('mochiBubble');
  const mochiMessage = document.getElementById('mochiMessage');
  const mochiAccessory = document.getElementById('mochiAccessory');

  const MOCHI_DIALOGUES = [
    "purr... cozy in here!",
    "did you drink water today?",
    "smells like warm butter 🥐",
    "inspecting your code... looks clean!",
    "click me again!",
    "just stretching my little paws 🐾",
    "ready for another round of games?",
    "dhaka evening vibes ☕",
    "reading through the guestbook 📖",
    "thinking about warm sourdough..."
  ];

  let mochiTimeout = null;

  function triggerMochiSpeech(text, duration = 3500) {
    if (!mochiBubble || !mochiMessage) return;
    clearTimeout(mochiTimeout);

    mochiMessage.textContent = text;
    mochiBubble.style.opacity = '1';
    mochiBubble.style.transform = 'translateY(0)';

    mochiTimeout = setTimeout(() => {
      mochiBubble.style.opacity = '0';
      mochiBubble.style.transform = 'translateY(6px)';
    }, duration);
  }

  mochiInteractiveArea?.addEventListener('click', () => {
    AudioEngine.beep(780, 'sine', 0.1);
    if (mochiPet.classList.contains('sleeping')) {
      mochiPet.classList.remove('sleeping');
      if (mochiAccessory) mochiAccessory.textContent = "✨";
      triggerMochiSpeech("yawn... I'm awake!");
    } else {
      const randomText = MOCHI_DIALOGUES[Math.floor(Math.random() * MOCHI_DIALOGUES.length)];
      triggerMochiSpeech(randomText);
    }
  });

  document.getElementById('feedMochiBtn')?.addEventListener('click', () => {
    AudioEngine.beep(880, 'triangle', 0.15);
    mochiPet.classList.remove('sleeping');
    if (mochiAccessory) mochiAccessory.textContent = "🥐";
    triggerMochiSpeech("nom nom nom! Fresh croissant! 🥐");
    setTimeout(() => {
      if (mochiAccessory) mochiAccessory.textContent = "✨";
    }, 2500);
  });

  document.getElementById('petMochiBtn')?.addEventListener('click', () => {
    AudioEngine.beep(660, 'sine', 0.12);
    mochiPet.classList.remove('sleeping');
    if (mochiAccessory) mochiAccessory.textContent = "💖";
    triggerMochiSpeech("*purrs contentedly* 🥰");
    setTimeout(() => {
      if (mochiAccessory) mochiAccessory.textContent = "✨";
    }, 2500);
  });

  document.getElementById('sleepMochiBtn')?.addEventListener('click', () => {
    AudioEngine.beep(440, 'sine', 0.15);
    const isSleeping = mochiPet.classList.toggle('sleeping');
    if (isSleeping) {
      if (mochiAccessory) mochiAccessory.textContent = "💤";
      triggerMochiSpeech("zzz... dreaming of dough...");
    } else {
      if (mochiAccessory) mochiAccessory.textContent = "✨";
      triggerMochiSpeech("wide awake now! ☀️");
    }
  });

  const toggleMochiControlsBtn = document.getElementById('toggleMochiControls');
  const mochiControls = document.getElementById('mochiControls');
  toggleMochiControlsBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = mochiControls.classList.toggle('hidden');
    toggleMochiControlsBtn.textContent = isHidden ? '+' : '×';
  });


  /* ============================================================================
     11. "I'M BORED" RANDOM SURPRISE BUTTON
     ============================================================================ */
  const RANDOM_DESTINATIONS = [
    { targetId: "now", note: "Jumped to Now: See what's occupying my thoughts this season!" },
    { targetId: "workshop", note: "Jumped to The Workshop: Check out RailSeat BD and active experiments!" },
    { targetId: "game-room", note: "Jumped to The Game Room: How about a round of Cozy Memory Match?" },
    { targetId: "kitchen", note: "Jumped to The Kitchen: Smells like fresh Cardamom Milk Bread!" },
    { targetId: "notebook", note: "Jumped to The Notebook: A quick thought on craftsmanship." },
    { targetId: "digital-garden", note: "Jumped to Digital Garden: Explore an interesting corner of the web!" },
    { targetId: "guestbook", note: "Jumped to the Guestbook: Leave a note or stamp a sticker!" },
    { targetId: "uses", note: "Jumped to Uses: Take a peek at my hardware, pastry & dev tools." },
    { targetId: "project-log", note: "Jumped to Project Log: Browse the chronological milestones." },
    { targetId: "contact", note: "Jumped to Contact: Say hi via Proton Mail or Instagram!" }
  ];

  function showToast(message, icon = "🎲") {
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMessage');
    const toastIcon = toast?.querySelector('.toast-icon');

    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    if (toastIcon) toastIcon.textContent = icon;

    toast.classList.remove('hidden');

    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3800);
  }

  function handleImBored() {
    AudioEngine.beep(580, 'sine', 0.15);
    const destination = RANDOM_DESTINATIONS[Math.floor(Math.random() * RANDOM_DESTINATIONS.length)];
    const el = document.getElementById(destination.targetId);

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      el.style.transition = 'outline 0.3s ease, box-shadow 0.3s ease';
      el.style.outline = '2px solid var(--accent-amber)';
      el.style.boxShadow = '0 0 25px var(--accent-amber-glow)';
      
      setTimeout(() => {
        el.style.outline = 'none';
        el.style.boxShadow = 'none';
      }, 1500);

      showToast(destination.note, "🎲");
    }
  }

  document.getElementById('boredBtn')?.addEventListener('click', handleImBored);
  document.getElementById('footerBoredBtn')?.addEventListener('click', handleImBored);


  /* ============================================================================
     12. EASTER EGGS & SUBTLE INTERACTIONS
     ============================================================================ */
  const modal = document.getElementById('easterEggModal');
  const secretTrigger = document.getElementById('secretTrigger');
  let secretClicks = 0;

  function openEasterEgg() {
    AudioEngine.playVictory();
    if (modal) modal.classList.remove('hidden');
  }

  function closeEasterEgg() {
    if (modal) modal.classList.add('hidden');
  }

  // Easter Egg 1: Header star 5 clicks
  secretTrigger?.addEventListener('click', () => {
    secretClicks++;
    AudioEngine.beep(500 + secretClicks * 80, 'sine', 0.08);

    if (secretClicks === 1) {
      showToast("✦ The star twinkled curiously...", "✨");
    } else if (secretClicks >= 5) {
      secretClicks = 0;
      openEasterEgg();
    }
  });

  // Easter Egg 2: Footer Secret Link
  document.getElementById('easterEggHintBtn')?.addEventListener('click', openEasterEgg);

  // Easter Egg 3: Konami Code sequence (↑ ↑ ↓ ↓ ← → ← → b a)
  const konamiSequence = [
    'ArrowUp', 'ArrowUp', 
    'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 
    'ArrowLeft', 'ArrowRight', 
    'b', 'a'
  ];
  let konamiIndex = 0;

  window.addEventListener('keydown', (e) => {
    if (e.key === konamiSequence[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiSequence.length) {
        konamiIndex = 0;
        openEasterEgg();
        showToast("🎮 KONAMI CODE ACCEPTED! Welcome to the Midnight Terminal!", "🌟");
      }
    } else {
      konamiIndex = 0;
    }
  });

  // Easter Egg 4: Click the "tinkering" status badge for random local thoughts
  const headerStatusBadge = document.getElementById('headerStatusBadge');
  const DHAKA_THOUGHTS = [
    "Evening breeze carrying the scent of roadside cardamom tea ☕",
    "Listening to rain patter against tin awnings in Old Dhaka 🌧️",
    "Checking yeast hydration before the morning bake 🍞",
    "Current status: 90% green tea, 10% code 💻"
  ];
  headerStatusBadge?.addEventListener('click', () => {
    AudioEngine.beep(700, 'triangle', 0.08);
    const thought = DHAKA_THOUGHTS[Math.floor(Math.random() * DHAKA_THOUGHTS.length)];
    showToast(thought, "📍");
  });

  // Modal Listeners
  document.getElementById('closeModalBtn')?.addEventListener('click', closeEasterEgg);
  document.getElementById('closeModalActionBtn')?.addEventListener('click', closeEasterEgg);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeEasterEgg();
  });

  document.getElementById('secretSoundBtn')?.addEventListener('click', () => {
    const melody = [
      { f: 523.25, d: 150 },
      { f: 587.33, d: 150 },
      { f: 659.25, d: 150 },
      { f: 783.99, d: 250 },
      { f: 659.25, d: 150 },
      { f: 783.99, d: 350 },
      { f: 1046.50, d: 400 }
    ];

    let offset = 0;
    melody.forEach(note => {
      setTimeout(() => {
        AudioEngine.beep(note.f, 'triangle', note.d / 1000);
      }, offset);
      offset += note.d + 50;
    });

    triggerMochiSpeech("🎵 Mochi is dancing along!");
  });


  /* ============================================================================
     13. LIGHT / DARK THEME TOGGLE
     ============================================================================ */
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('junayed-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  themeToggle?.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlRoot.setAttribute('data-theme', newTheme);
    localStorage.setItem('junayed-theme', newTheme);
    AudioEngine.beep(newTheme === 'dark' ? 380 : 620, 'sine', 0.1);

    showToast(`Switched to ${newTheme === 'dark' ? 'Dark Charcoal' : 'Warm Paper'} mode!`, newTheme === 'dark' ? '🌙' : '☀️');
  });


  /* ============================================================================
     14. DIRECTORY POPUP DRAWER & DOCK ACTIVE OBSERVER
     ============================================================================ */
  const toggleDrawerBtn = document.getElementById('toggleDrawerBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const directoryDrawer = document.getElementById('directoryDrawer');

  toggleDrawerBtn?.addEventListener('click', () => {
    AudioEngine.beep(600, 'sine', 0.08);
    directoryDrawer?.classList.toggle('open');
  });

  closeDrawerBtn?.addEventListener('click', () => {
    directoryDrawer?.classList.remove('open');
  });

  // Close drawer when clicking a link inside it
  document.querySelectorAll('.directory-link').forEach(link => {
    link.addEventListener('click', () => {
      directoryDrawer?.classList.remove('open');
    });
  });

  // Dock items observer
  const dockItems = document.querySelectorAll('.dock-item');
  const observedSections = document.querySelectorAll('section[id]');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        dockItems.forEach(item => {
          if (item.getAttribute('data-section') === id) {
            item.classList.add('active');
            // Auto scroll dock to keep active item in view on mobile
            item.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  observedSections.forEach(sec => sectionObserver.observe(sec));


  /* ============================================================================
     15. INITIALIZATION
     ============================================================================ */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Render all dynamic sections
  renderNowSection();
  renderWorkshop();
  renderNotebook();
  renderGamesLog();
  initMemoryGame();
  renderKitchen();
  renderDigitalGarden();
  renderGuestbook();
  renderUses();
  renderProjectLog();

  // Welcome speech from Mochi
  setTimeout(() => {
    triggerMochiSpeech("purr... welcome to my corner! ✨", 4000);
  }, 1800);

});
