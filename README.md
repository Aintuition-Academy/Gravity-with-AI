# Gravity with AI

Gravity with AI is a professional, interactive educational website designed for learning international trade theory. The course currently covers **Module 1: Trade and Technology**, **Module 2: Trade and Resources**, **Module 3: GRAVITY with Gravitas**, and **Module 4: Monopolistic Competition and Heterogeneous Firms**.

---

## Features

- **Beginner-friendly explanations** of trade theory concepts with intuition-first teaching
- **Interactive economic graphs and calculators** built with Plotly.js — updated live as you change inputs
- **Descriptive graph titles, labelled axes, and explicit legends** on every chart
- **Hover tooltips** on every data point showing exact values and economic interpretations
- **AI Tutor Tips** that simplify difficult concepts with contextual guidance
- **"What to notice" boxes** that highlight key takeaways after each interactive element
- **Check-your-understanding quizzes** embedded inside lessons for immediate reinforcement
- **Module quizzes** with instant feedback, explanations, and score tracking
- **Dark and light theme toggle** with dark mode enabled by default
- **Responsive layout** — works on desktop and mobile
- **Hosted on GitHub Pages** as a fully static production site

---

## Graph & Visual Standards

Every interactive graph in this course follows a consistent visual standard:

| Element | Standard Applied |
|---|---|
| **Title** | Descriptive title explaining what the graph shows (e.g. "Comparative Advantage: Home vs Foreign PPF") |
| **X-axis** | Named with units (e.g. "Cloth output (units)") |
| **Y-axis** | Named with units (e.g. "Food output (units)") |
| **Legend** | Explicit legend entries for every line/series |
| **Hover tooltips** | Show exact values and economic meaning for each data point |
| **"📊 What this graph shows"** | Contextual description above every Plotly chart |
| **"🔎 What to notice"** | Takeaway box below every chart summarizing the key insight |
| **"🧑‍🏫 Tutor Tip"** | AI-style sidebar tip on the most important conceptual point |



## Live Website

The website is live and available at:

**[https://Aintuition-Academy.github.io/Gravity-with-AI/](https://Aintuition-Academy.github.io/Gravity-with-AI/)**

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 + Vite 8 | UI framework and build tooling |
| Plotly.js | Interactive economic graphs and charts |
| Lucide React | Icon library |
| GitHub Pages | Static site hosting and deployment |

---

## Deployment

This project is deployed to GitHub Pages using static build files.

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Website

```bash
npm run build
```

This creates the production-ready static files inside the `dist/` folder.

### 3. Deploy to GitHub Pages

```bash
npm run deploy
```

This publishes the contents of `dist/` to the GitHub Pages branch.

---

## Academic Structure

### Module 1: Trade and Technology

Module 1 introduces the core logic of international trade. It explains why countries trade, how comparative advantage works, and how specialization creates gains from trade.

#### Submodule 1.1: Two Countries, Two Goods

Covers the basic Ricardian model with two countries and two goods:

- Absolute advantage and comparative advantage
- Unit labor requirement and labor productivity
- Opportunity cost
- Production Possibility Frontier (PPF)
- Consumption Possibility Frontier (CPF)
- Specialization based on relative price
- Gains from trade
- Free trade equilibrium with world relative supply and demand

#### Submodule 1.2: DFS Continuum Ricardian Model

Extends the Ricardian model from two goods to a continuum of goods:

- Continuum of goods indexed by z on [0, 1]
- Relative productivity schedule A(z)
- Relative wage ω and the marginal good z₀
- Demand schedule B(z) and labor market clearing
- DFS equilibrium where A(z) = B(z)
- Comparative statics with changing population and technology

---

### Module 2: Trade and Resources

Module 2 explores how differences in factor endowments drive trade patterns. It covers the Heckscher-Ohlin model, the relationship between goods prices and factor earnings, and how economists measure gains from trade.

#### Submodule 2.1: Heckscher-Ohlin Model (Lessons 1–5)

- Why resources matter in trade
- Factors of production and their payments
- Factor abundance (K/L ratios) — interactive calculator with bar chart
- Factor intensity — interactive calculator with bar chart
- Heckscher-Ohlin trade prediction — dynamic prediction box

#### Submodule 2.2: Unit Cost, Cost Shares, and Hat Algebra (Lessons 6–8)

- Unit cost of production: c = wL + rK
- Cost shares (θ_L, θ_K) — interactive calculator with pie chart
- Hat algebra: ĉ = θ_K × r̂ + θ_L × ŵ — interactive calculator

#### Submodule 2.3: Stolper-Samuelson Theorem (Lessons 9–12)

- How goods price changes affect factor earnings
- Two-good, two-factor setup with cost share equations
- Numerical Stolper-Samuelson solver — interactive calculator with bar chart
- Real earnings and purchasing power — mini calculator

#### Submodule 2.4: Rybczynski Theorem (Lessons 13–14)

- How resource supply changes affect production
- Output effects of capital and labor growth — interactive calculator with bar chart

#### Submodule 2.5: Measuring Gains from Trade (Lessons 15–18)

- Why measure gains from trade
- Autarky vs free trade welfare — PPF diagram with bundles A and B
- Welfare change calculator: ΔW = W_B − W_A
- Gains from trade using trade and production data — editable 3-good table

---

### Module 3: GRAVITY with Gravitas

Module 3 explores the gravity model of trade. It covers basic gravity relations, structural gravity with multilateral resistances, the Armington microfoundation, general equilibrium wages, and exact hat algebra.

#### Submodule 3.1: The Basic Gravity Equation (Lessons 1–4)
- Naive gravity and the role of size and distance
- Log-linear gravity regressions

#### Submodule 3.2: Structural Gravity (Lessons 5–7)
- Outward and Inward Multilateral Resistance
- Direct bilateral links vs. multilateral alternatives

#### Submodule 3.3: Armington Model Foundation (Lessons 8–13)
- Differentiation of goods by origin
- Iceberg trade costs
- CES demand structure and spending shares
- CES Price Index and Trade Share determinants

#### Submodule 3.4: General Equilibrium in the Armington Model (Lessons 14–15)
- Labor market clearing
- Endogenous wage determination

#### Submodule 3.5: Numerical Simulation (Lessons 16–20)
- Wage iteration algorithm
- Dampening parameters for updates
- Newton's method (scalar and multivariate)

#### Submodule 3.6: Exact Hat Algebra (Lessons 21–25)
- Proportional changes (hat algebra)
- Policy shock simulation (tariffs / trade agreements)

#### Submodule 3.7: Gains from Trade in Gravity (Lessons 26–28)
- Real welfare change measures
- Domestic expenditure share sufficient statistic (GFT = 1 - π_nn^(1/(1-σ)))

---

### Module 4: Monopolistic Competition and Heterogeneous Firms

Module 4 introduces firm heterogeneity and monopolistic competition. It covers Krugman's increasing returns framework and the Melitz sorting model of trade.

#### Submodule 4.1: Krugman 1979: Variable Markups & Closed Economy
- Preferences over a continuum of varieties and variable markups
- The pricing curve (PP) and free entry curve (ZZ)
- Sunk entry costs and zero profits
- Costless trade opening ($L \to 2L$ variety gains proof)

#### Submodule 4.2: Krugman 1980: CES & Gravity
- Dixit-Stiglitz constant elasticity preferences
- Pricing and firm size invariance
- Gravity trade flows and shifters
- The Home-Market Effect

#### Submodule 4.3: Melitz Model: Closed Economy
- Productivity draws and entry lottery
- Zero-cutoff profit (ZCP) and free entry (FE) conditions
- Endogenous cutoff productivity threshold

#### Submodule 4.4: Melitz Model: Open Economy
- Fixed export costs and self-selection of firms
- Three performance zones: Exit, Domestic Only, and Exporting Elite
- Shift in ZCP and welfare gains via intra-industry labor reallocation

#### Submodule 4.5: Melitz-Pareto: Distorted Gravity
- Upper-tier and lower-tier nested CES demand
- Pareto productivity distribution and superstar convergence bound
- Bilateral access fees and entry masses
- Chaney's margin decomposition (Intensive vs. Extensive margins)

---

## Course Roadmap

The full course contains **8 modules**. Modules 1, 2, 3, and 4 are currently active:

| Module | Status |
|---|---|
| Module 1: Trade and Technology | ✅ Active |
| Module 2: Trade and Resources | ✅ Active |
| Module 3: GRAVITY with Gravitas | ✅ Active |
| Module 4: Monopolistic Competition and Heterogeneous Firms | ✅ Active |
| Module 5 | 🔒 Coming Soon |
| Module 6 | 🔒 Coming Soon |
| Module 7 | 🔒 Coming Soon |
| Module 8 | 🔒 Coming Soon |

---

© 2026 Gravity with AI. Built with React, Vite, and Plotly.js.
