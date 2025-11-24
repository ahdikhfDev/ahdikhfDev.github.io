    //  JAVASCRIPT 
      // --- DATA ---
      const PALETTES = {
        cyber: {
          name: "Cyberpunk",
          primary: "#D946EF",
          secondary: "#00FFFF",
          gradient: "linear-gradient(to right, #D946EF, #8B5CF6, #00FFFF)",
        },
        toxic: {
          name: "Biohazard",
          primary: "#A855F7",
          secondary: "#CCFF00",
          gradient: "linear-gradient(to right, #A855F7, #9333EA, #CCFF00)",
        },
        royal: {
          name: "Majesty",
          primary: "#7E22CE",
          secondary: "#FFD700",
          gradient: "linear-gradient(to right, #7E22CE, #A855F7, #FFD700)",
        },
        ocean: {
          name: "Abyss",
          primary: "#3B82F6",
          secondary: "#14B8A6",
          gradient: "linear-gradient(to right, #3B82F6, #6366F1, #14B8A6)",
        },
      };

      let state = {
        currentPalette: "cyber",
      };

      // --- CORE FUNCTIONS ---

      function renderIcons() {
        lucide.createIcons();
      }

      function updateCSSVariables() {
        const p = PALETTES[state.currentPalette];
        const root = document.documentElement;
        root.style.setProperty("--primary", p.primary);
        root.style.setProperty("--secondary", p.secondary);

        renderPaletteList();
        renderIcons();
      }

      function scrollToSection(id) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }

      // --- INTERACTIONS ---

      function togglePalettePicker() {
        document.getElementById("palette-picker").classList.toggle("hidden");
      }

      function setPalette(key) {
        state.currentPalette = key;
        updateCSSVariables();
        togglePalettePicker();
      }

      function renderPaletteList() {
        const list = document.getElementById("palette-list");
        list.innerHTML = Object.entries(PALETTES)
          .map(
            ([key, p]) => `
                <button onclick="setPalette('${key}')" class="w-full flex items-center justify-between p-2 rounded-lg transition-all ${
              state.currentPalette === key
                ? "bg-white/10 border border-white/20"
                : "hover:bg-black/5 border border-transparent"
            }">
                    <span class="text-sm font-mono text-gray-300">${
                      p.name
                    }</span>
                    <div class="flex gap-1">
                        <div class="w-3 h-3 rounded-full" style="background: ${
                          p.primary
                        }"></div>
                        <div class="w-3 h-3 rounded-full" style="background: ${
                          p.secondary
                        }"></div>
                    </div>
                </button>
            `
          )
          .join("");
      }

      function toggleCmdPalette() {
        const el = document.getElementById("cmd-palette");
        const input = document.getElementById("cmd-input");
        el.classList.toggle("hidden");
        if (!el.classList.contains("hidden")) {
          input.value = "";
          input.focus();
          renderCmdResults("");
        }
      }

      function renderCmdResults(query) {
        const results = document.getElementById("cmd-results");
        const menu = ["Home", "About", "project", "Contact"];
        let html = menu
          .map(
            (item) => `
                <button onclick="scrollToSection('${item.toLowerCase()}'); toggleCmdPalette();" class="w-full text-left px-4 py-3 rounded-lg flex justify-between items-center group transition-all hover:bg-white/5 text-gray-400 hover:text-white">
                    <span class="flex items-center gap-3"><i data-lucide="terminal" class="w-3 h-3" style="color: var(--primary);"></i> ${item}</span>
                    <i data-lucide="arrow-right" class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" style="color: var(--secondary);"></i>
                </button>
            `
          )
          .join("");
        results.innerHTML = html;
        renderIcons();
      }

      // --- LISTENERS ---

      document
        .getElementById("cmd-input")
        .addEventListener("input", (e) => renderCmdResults(e.target.value));

      document.addEventListener("keydown", (e) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          toggleCmdPalette();
        }
        if (e.key === "Escape") {
          document.getElementById("cmd-palette").classList.add("hidden");
          document.getElementById("palette-picker").classList.add("hidden");
        }
      });

      // Initialize
      window.onload = () => {
        updateCSSVariables();
      };