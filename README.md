# Gravity with AI

Gravity with AI is a professional, interactive educational website designed for learning international trade theory. This project focuses on **Module 1: Ricardian Foundations of Trade**, including the classic two-good trade models and Dornbusch-Fischer-Samuelson (DFS) continuum models, using Farid Farrokhi's 2025 lecture notes as the academic baseline.

The platform provides a beginner-friendly path with:
- Clear theoretical explanations of absolute and comparative advantage, PPFs, CPFs, and market-clearing conditions.
- Five dynamic, interactive economic graphs built with Plotly.js to visualize mathematical outcomes in real-time.
- AI Tutor Tips to demystify complex terms and mathematical concepts.
- An 8-question self-assessment quiz with explanatory feedback.
- Dark theme styling by default, with a toggle for light mode.

## Tech Stack
- **Framework**: React 19 + Vite 8
- **Plotting Library**: Plotly.js (via `plotly.js-dist-min`)
- **Icons**: Lucide React
- **Deployment**: Static build compiled and deployed via `gh-pages`

---

## Getting Started

### 1. Install Dependencies
To install the required npm packages (`react`, `vite`, `plotly.js-dist-min`, `lucide-react`, `gh-pages`):
```bash
npm install
```

### 2. Run Locally
To run the local development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to interact with the application.

### 3. Build for Production
To compile the static production build into the `dist/` directory:
```bash
npm run build
```

### 4. Deploy to GitHub Pages
To publish the static site onto your GitHub Pages branch:
```bash
npm run deploy
```
This runs the predeploy step (`npm run build`) and uses `gh-pages` to upload the static assets.

---

## Academic Structure: Module 1 Contents

### Submodule 1.1: Two Countries, Two Goods
- **Absolute Advantage**: Comparing absolute unit labor requirements ($a_i$ vs. $a_i^*$).
- **Comparative Advantage**: Determined by comparing opportunity costs ($a_1/a_2$ vs. $a_1^*/a_2^*$).
- **Production Possibility Frontier (PPF)**: Maximum production capacity under worker constraints.
- **Consumption Possibility Frontier (CPF)**: Expands outward under free trade, highlighting the gains from specialization and trade.

### Submodule 1.2: DFS Continuum Ricardian Model
- **Continuum of Goods**: Moving from discrete goods to an infinite range $z \in [0, 1]$ for smoother mathematical tractability.
- **Relative Productivity Schedule $A(z)$**: $a^*(z)/a(z)$, ordered as a decreasing function of $z$.
- **Relative Wage $\omega = w / w^*$**: The ratio of wages between Home and Foreign workers.
- **Marginal Good $z_0$**: Pinned down by the cost-competitiveness intersection where $A(z_0) = \omega$.
- **Demand Schedule $B(z)$**: Derived from Cobb-Douglas expenditures and labor market clearing: $B(z) = \frac{L^*}{L} \cdot \frac{z}{1-z}$.
- **Comparative Statics**: Adjusting the Foreign labor force $L^*$ shifts $B(z)$ and alters the marginal good range and relative wages.
