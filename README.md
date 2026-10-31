# Junayed's Corner &bull; Personal Digital Garden

Welcome to the expanded personal website! Built with clean, zero-dependency HTML, CSS, and vanilla JavaScript.

---

## 🧭 Sections Overview

1. **NOW** — Inspired by the Derek Sivers `/now` page movement. Highlights what you're learning, building, playing, and exploring this season.
2. **WORKSHOP** — Projects, prototypes, experiments, and unfinished ideas with category filters (All, In Progress, Prototypes, Experiments, Unfinished Ideas).
3. **NOTEBOOK** — Personal writings, observations, and essays formatted like clean field notes.
4. **GAME ROOM** — Favorite games log, featured review of *Firewatch*, plus a playable **Cozy Memory Match Mini-Game**.
5. **KITCHEN** — Pastry internship diaries, recipes (Tangzhong Milk Bread, All-Butter Croissants, Basque Cheesecake, Shingara), and baker's logs.
6. **DIGITAL GARDEN** — Curated bookmarks of interesting websites, indie webrings, low-tech tools, and internet rabbit holes.
7. **GUESTBOOK** — An interactive visitor ledger. Messages and chosen stickers are saved in the visitor's LocalStorage, with an honest note and an instant "Send via Email" direct option.
8. **USES** — A living list of your hardware, development software, pastry tools, and daily carry items.
9. **PROJECT LOG** — Chronological timeline of updates and progress across your projects.
10. **CONTACT** — Strictly features your two verified contact channels:
    * **Email:** [haideradeeb@proton.me](mailto:haideradeeb@proton.me)
    * **Instagram:** [@me.richb1tch](https://www.instagram.com/me.richb1tch?vrfl=NjRqYnFtdGJpNDBi)

---

## 🛠️ How to Edit Content

All data is structured in clean JavaScript objects at the top of [`script.js`](file:///d:/portfolio/script.js):

* **Update Now Focus:** Edit `NOW_PILLARS` in [`script.js`](file:///d:/portfolio/script.js#L55).
* **Add Projects & Ideas:** Edit `WORKSHOP_PROJECTS` in [`script.js`](file:///d:/portfolio/script.js#L95).
* **Add Personal Essays:** Edit `NOTEBOOK_ENTRIES` in [`script.js`](file:///d:/portfolio/script.js#L185).
* **Add Games & Reviews:** Edit `GAMES_LOG` in [`script.js`](file:///d:/portfolio/script.js#L235).
* **Add Recipes & Photos:** Edit `KITCHEN_RECIPES` in [`script.js`](file:///d:/portfolio/script.js#L390).
* **Add Bookmarks:** Edit `DIGITAL_GARDEN_LINKS` in [`script.js`](file:///d:/portfolio/script.js#L445).
* **Update Gear & Tools:** Edit `USES_DATA` in [`script.js`](file:///d:/portfolio/script.js#L540).
* **Add Timeline Milestones:** Edit `PROJECT_LOG_DATA` in [`script.js`](file:///d:/portfolio/script.js#L590).

---

## ✨ Playful Details & Easter Eggs

* **"I'm bored" Button (🎲):** Transports visitors to a random section, project, note, or mini-game with a smooth scroll, toast notification, and glowing border.
* **Mochi the Desktop Pet (🐾):** Floats in the bottom-right corner. Click to interact, or use the **Snack**, **Pet**, and **Nap** controls.
* **Floating Dock & Index Directory (📑):** Scrollable dock with an expandable directory drawer for one-click jumping to any section.
* **Light / Dark Mode (🌙 / ☀️):** Warm Charcoal default and Warm Paper light mode that persists in `localStorage`.
* **Custom 404 Page (`404.html`):** Custom illustrated error page with Mochi holding a lantern in the misty forest.
* **Easter Eggs:**
  1. Click the header star (`✦`) 5 times.
  2. Type the **Konami Code** on your keyboard: `↑ ↑ ↓ ↓ ← → ← → B A`.
  3. Click the `tinkering` status pill in the top bar to hear a local thought from Dhaka.
  4. Click **Secret 🗝️** in the footer.
