# Terminal Portfolio : 3301

An interactive, cryptography-themed developer portfolio built for K.C. Rasvanth. Designed to break away from traditional web layouts, this portfolio uses a deeply interactive simulated terminal, an ethereal particle system, and dark-space aesthetics to invite users into a "hacker" experience.

## ✨ Core Features

*   **Interactive Terminal Console**: The website is driven by a functional command-line interface. Users can type commands like `whois`, `skills`, `projects`, and `contact` to seamlessly navigate the site.
*   **The Butterfly Effect (Canvas Engine)**: An ambient HTML5 Canvas background rendering a flock of glowing butterflies. Clicking a butterfly triggers a massive "Timeline Anomaly," causing color-shifts and particle explosions.
*   **Terminal-Integrated Contact Flow**: No standard HTML forms. To reach out, users utilize the `sendMail` command directly through the global footer console, utilizing Formspree for backend processing.
*   **Deep-Space Aesthetic**: A minimalist `#050505` background paired with Deep Violet (`#9d4edd`) neon accents, frosted glassmorphism overlays, and rigid monospace typography (JetBrains Mono).
*   **Hidden Interactions**: Secret commands (`reveal`) are hidden for the curious user to discover.

## 🛠 Tech Stack

*   **HTML5**: Structural semantic layout mimicking terminal windows.
*   **CSS3**: Custom variables, frosted glass effects (`backdrop-filter`), CSS transitions, and Flexbox/Grid layouts.
*   **Vanilla JavaScript**: State-machine logic for the terminal command processor, fetch API integration for emails, and object-oriented Canvas animation for the particle system.

## 🚀 Running Locally

1. Clone the repository to your local machine.
2. Navigate into the project directory layout: `cd PortfolioWebsite`
3. Launch a lightweight HTTP server (e.g., Python):
   ```bash
   python3 -m http.server 8000
   ```
4. Open your browser and navigate to `http://localhost:8000`.

---
*Developed by Rasvanth28.*