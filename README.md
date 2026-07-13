# Gravity with AI

Gravity with AI is a professional, interactive educational website designed for learning international trade theory. The course currently covers **Module 1: Trade and Technology**, **Module 2: Trade and Resources**, **Module 3: GRAVITY with Gravitas**, **Module 4: Monopolistic Competition and Heterogeneous Firms**, **Module 5: Trade Policy and Welfare**, **Module 6: The Structural Gravity Model**, **Module 7: General Equilibrium Structural Gravity**, and **Module 8: Trade, Climate Change, and Agricultural/Environmental Economics**.

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

### Module 5: Trade Policy and Welfare

Module 5 covers the economics, game theory, and political-economy structures of trade policy, tariffs, quotas, subsidies, and lobbies.

#### Submodule 5.1: Partial-Equilibrium Trade Policy
- Small country welfare decomposition: consumer surplus, producer surplus, and deadweight losses ($b + d$)
- Hump-shaped tariff Laffer curve and prohibitive tariff bounds
- Large country terms-of-trade (TOT) extraction rectangle ($e$)
- Johnson's optimal tariff formula $t_{opt} = 1/\epsilon^*$
- Import quotas, license allocation rents, and the failure of tariff-quota equivalence under domestic monopoly

#### Submodule 5.2: Domestic Market Power & the Second Best
- Import competition as a monopolist disciplining/regulation tool
- Tariff price ceilings vs. quota residual demand curves
- Game-theoretic Nash equilibrium stability (determinant $\Delta > 0$)
- Strategic complements vs. substitutes (cross-partial sign $\pi_{ij}$)
- Cramer's rule comparative statics system and the Envelope Theorem

#### Submodule 5.3: Cournot Duopoly Model of Strategic Trade Policy
- Cournot best-response functions and cost shock transmission
- Symmetric cost benchmarks and the U-shaped joint profit curve
- Quasilinear national welfare: consumer surplus, producer profits, and tariff revenues
- First-order consumer loss vs. second-order profit shifting: why the marginal tariff at free trade is welfare-reducing ($dU = -X_2 dt$)

#### Submodule 5.4: Optimum Tariffs, Retaliation & Country Size
- Non-cooperative Johnson retaliation game and Nash equilibria
- Mayer's Pareto-efficient locus $t + t^* + tt^* = 0$
- Cooperative settlements along the negotiable contract curve
- Syropoulos relative size primitives ($\lambda_i$) and tariff-war winning thresholds

#### Submodule 5.5: Strategic Trade Policy Under Imperfect Competition
- Rent extraction from a foreign monopolist and the Brander-Spencer demand convexity sign condition ($R \gtrless -1$)
- Committing to export subsidies: Stackelberg quantity leader replication
- Exporter subsidy war Prisoner's Dilemma
- Bertrand price competition: why the strategic policy recommendation flips to an export tax

#### Submodule 5.6: Political Economy of Trade Policy
- Mayer's endogenous tariff majority voting and median voter theorem
- Right-skewed asset ownership and labor-protection bias
- Costly voting and concentrated benefits vs. diffuse costs ($B_{gg} > -B_{hg}$)
- Grossman-Helpman Protection for Sale lobbying game: Ramsey-type organized vs. unorganized tariff slopes

#### Submodule 5.7: Comprehensive Final Exam
- 16-question final assessment tracing mathematical proofs and economic policy intuitions.

### Module 6: The Structural Gravity Model

Module 6 covers structural gravity: Armington and Eaton-Kortum derivations, inward/outward multilateral resistances, estimation challenges, the distance puzzle, and RTA effects.

#### Submodule 6.1: The Gravity Analogy & the Evolution of Gravity Theory
- Newton's law mapped onto trade flows
- The atheoretical curve-fit era (Tinbergen)
- The theoretical lineage (Anderson/AvW/Eaton-Kortum/ACR) and isomorphism

#### Submodule 6.2: Deriving Structural Gravity from the Demand Side
- The Armington-CES environment and iceberg costs
- Bilateral demand and the CES price index
- Closing the model via market clearing: inward and outward multilateral resistance

#### Submodule 6.3: Size vs. Trade Costs & the Eaton-Kortum Supply-Side Derivation
- Decomposing gravity: size vs. trade costs
- Ricardian/Fréchet supply-side derivation (θ replacing 1-σ)
- Structural equivalence of demand and supply-side derivations

#### Submodule 6.4: Estimation Challenges 1–3: Multilateral Resistances, Zeros, and Heteroscedasticity
- The "Gold Medal Mistake" (omitting MR)
- Four solutions to unobserved MR terms: directional fixed effects as the modern standard
- The zero-trade-flows problem and PPML
- Why PPML solves the heteroscedasticity and Jensen's inequality inconsistency

#### Submodule 6.5: Estimation Challenges 4–8: Trade Costs, Endogeneity, and Non-Discriminatory Policy
- Specifying bilateral trade costs and recovering σ
- The pair-fixed-effects solution to policy endogeneity
- The intra-national-trade trick for non-discriminatory policy
- Lags (interval panels) and sectoral separability

#### Submodule 6.6: The Comprehensive, Theory-Consistent Estimating Equation
- Assembling all recommendations into the generic specification
- The dual statistical and econometric role of pair fixed effects

#### Submodule 6.7: Interpreting Gravity Estimates: Trade Volumes and Tariff Equivalents
- Continuous elasticities vs. indicator trade-volume effects
- Backing out tariff equivalents using only an external σ

#### Submodule 6.8: Consistent Aggregation of Bilateral Trade Costs
- The volume-equivalent uniform trade cost bCU(i)
- Importer/exporter fixed effects as aggregation weights

#### Submodule 6.9: Gravity Data: Sources, Coverage, and Limitations
- Aggregate and merchandise datasets (DOTS, COMTRADE, BACI)
- Mirroring, value added, and intra-national trade data construction
- Geography and tariff databases (GeoDist, WITS)

#### Submodule 6.10: Traditional Gravity Estimates: OLS, Remoteness, Fixed Effects, PPML
- The four-specification horse race (Table 1)
- Multilateral resistance bias and Ramsey RESET misspecification tests

#### Submodule 6.11: The Distance Puzzle Resolved
- Disdier and Head's puzzle: persistent distance effects
- Yotov's resolution using intra-national trade as the internal benchmark (Table 2)
- Home-bias dummy interpretation

#### Submodule 6.12: RTA Effects: Endogeneity, Phasing, and Globalization
- The six successive RTA specifications (Table 3)
- Strict exogeneity tests (RTA lead) and time-varying border controls

#### Submodule 6.13: Comprehensive Final Exam
- 15-question multiple-choice final exam verifying trade data estimations and structural gravity theory.

### Module 7: General Equilibrium Structural Gravity

Module 7 covers general equilibrium counterfactuals, dynamic growth considerations, normalization-dependent/free indexes, GEPPML estimation algorithms, and empirical applications (Trade Without Borders and NAFTA).

#### Submodule 7.1: The GE Gravity System & Six Properties of the Multilateral Resistances
- The five core equations of the GE gravity system
- Krugman's Mars remoteness logic and properties of the multilateral resistances
- Normalization requirements and degrees of freedom

#### Submodule 7.2: Three Channels: Partial, Conditional GE, and Full Endowment GE
- Defining and differentiating the three channels of policy feedback
- Interactive network ripple effects and trade creation/diversion transmission

#### Submodule 7.3: Nesting Gravity Inside a Dynamic Growth Model
- Household optimization, production with capital, and capital accumulation dynamics
- Two new growth feedback loops: price effects and resistance indexes
- Simulated dynamic capital-accumulation responses to trade shocks

#### Submodule 7.4: GE Indexes That Require Normalization
- Inward and outward multilateral resistances as access indicators
- Disconnecting inward MR from headline Consumer Price Index (CPI)

#### Submodule 7.5: GE Indexes Independent of Normalization (CTB, Terms of Trade, ACR Welfare)
- Constructed Trade Bias (CTB) properties
- Exporter-to-importer price terms of trade
- The Arkolakis-Costinot-Rodríguez-Clare sufficient-statistics welfare gain formula

#### Submodule 7.6: The Standard Five-Step Approach
- Baseline solve, calibration vs estimation vs estibration hybrid
- Defining counterfactual policy shocks and solving MR systems
- Bootstrap confidence intervals for counterfactual outcomes

#### Submodule 7.7: GEPPML: Baseline and Conditional GE via PPML Fixed Effects
- Equivalence of estimated PPML fixed effects and multilateral resistance terms
- Two-stage Anderson-Yotov regression for missing trade-cost values
- Re-estimating baseline matrices under locked policy coefficients

#### Submodule 7.8: GEPPML: The Full Endowment GE Iterative Loop
- The four-stage GEPPML loop (price, size, re-estimation, convergence check)
- Convergence algorithms mapping price fluctuations to zero

#### Submodule 7.9: Application: Trade Without Borders
- Setting all international borders to zero in a global trade matrix
- Comparing export responses and real GDP gains across large and small countries

#### Submodule 7.10: Application: NAFTA in General Equilibrium
- Recreating Table 4 simulation outcomes (exports and GDP shifts)
- Magnitude differences between members and outsiders (first-order vs second-order effects)

#### Submodule 7.11: Comprehensive Final Exam
- 15-question multiple-choice final exam verifying GE estimations and structural gravity theory.

### Module 8: Trade, Climate Change, and Agricultural/Environmental Economics

Module 8 covers Ricardian agricultural sorting under warming climate constraints, technology adoption using imported input margins, structural transformation Euler growth aggregates, selection effects in wage and productivity differences, endogenous political tariffs, and Eaton-Kortum general equilibrium food problem conditions.

#### Submodule 8.1: Climate Change, Comparative Advantage, and the Fréchet Model of Field-Level Yields
- Two margins of adaptation (crop switching and source switching)
- FAO-GAEZ agro-climatic potential yield metrics
- Roy-Fréchet plot sorting and land-share derivations

#### Submodule 8.2: Estimating Demand and Fréchet Supply Parameters, and the Welfare Cost of Climate Change
- Instrumented nested demand regressions and supply parameter NLS identification
- Climate welfare losses across three counterfactual adjustment boundaries

#### Submodule 8.3: Four Empirical Patterns and the Technology-Adoption Model
- Cost shares, imported machinery intensity, and remoteness barriers
- Curved nested technology PPF bounds

#### Submodule 8.4: Gains from Trade, Estimation, and Globalization Counterfactuals
- Multiplicative ACR-FP gains decomposition
- Input-only vs. output-only globalization welfare patterns

#### Submodule 8.5: Stylized Facts and the Benchmark Multi-Sector Growth Model
- Structural transformation measures (employment, value-added, expenditures)
- Multi-sector aggregate growth paths and generalized balanced growth paths (GBGP)

#### Submodule 8.6: Income vs. Price Mechanisms, and the Role of International Trade
- Non-homothetic income effects vs productivity relative-price effects
- Decoupling of production shares and final expenditure shares under trade

#### Submodule 8.7: The Puzzle and the Roy Model of Sectoral Selection
- Cross-country productivity gap differentials (45x agriculture vs. 4x non-agriculture)
- Stone-Geary subsistence Roy sorting

#### Submodule 8.8: Amplification, Fréchet Quantification, and Results
- Selection amplification under positive sorting
- Expected capability changes on sorting limits

#### Submodule 8.9: Measuring Policy and Heat Exposure, and the Core Empirical Pattern
- Nominal Rate of Assistance (NRA) distortions
- Domestic vs. foreign heat shocks shifting trade policy directions

#### Submodule 8.10: A Political-Economy Model of Trade Policy, and Welfare
- Optimal government ad-valorem policy interventions
- Redistribution vs. revenue-seeking border effects

#### Submodule 8.11: Three Facts and the Non-Homothetic CES + Eaton-Kortum Model
- Agriculture heat sensitivity
- Budgets and utility under non-homothetic CES implicit structures

#### Submodule 8.12: The Food Problem Condition, Calibration, and Counterfactuals
- Food problem conditions and open economy corollaries
- Sectoral reallocation feedbacks under global warming

#### Submodule 8.13: Comprehensive Final Exam
- 22-question multiple-choice final exam verifying trade, climate change, and environmental economics theories.

---

## Course Roadmap

The full course contains **8 modules**. All 8 modules are currently active:

| Module | Status |
|---|---|
| Module 1: Trade and Technology | ✅ Active |
| Module 2: Trade and Resources | ✅ Active |
| Module 3: GRAVITY with Gravitas | ✅ Active |
| Module 4: Monopolistic Competition and Heterogeneous Firms | ✅ Active |
| Module 5: Trade Policy and Welfare | ✅ Active |
| Module 6: The Structural Gravity Model | ✅ Active |
| Module 7: General Equilibrium Structural Gravity | ✅ Active |
| Module 8: Trade, Climate Change, and Agricultural/Environmental Economics | ✅ Active |

---

© 2026 Gravity with AI. Built with React, Vite, and Plotly.js.
