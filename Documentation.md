# Portfolio Creation Documentation: Cicada 3301 Project

This document outlines the development process of a minimalist, cryptographic-themed portfolio website for a Computer Science student (ML Research Engineer).

## 🛠 Tools Used
- **HTML5 & CSS3**: Core structure and design system.
- **Vanilla JavaScript**: Interactive elements and background animations.
- **Canvas API**: Custom particle system for the "Butterfly Ambient Effect".
- **Google Fonts**: JetBrains Mono for the cryptographic/monospace feel.
- **VS Code**: Primary development environment.

## 🎨 Design Choices
- **Deep-Space Palette**: Using `#050505` (Deep Black) as the base with `#9d4edd` (Deep Violet) as the neon accent to create a high-contrast, premium "hacker" aesthetic.
- **Terminal Headers**: Sections like the Hero use terminal-style window decorations to reinforce the CS focus.
- **Ethereal Butterflies**: Instead of static images, a Canvas-based particle system simulates growth and evolution, appearing to float upwards.
- **Typography**: Exclusive use of monospace fonts to maintain the "puzzle" vibe of the Cicada 3301 mystery.

## 🚀 Step-by-Step Implementation
1. **Foundation**: Created the semantic HTML structure with IDs for each section (Hero, Education, Skills, Projects, Contact).
2. **Styling**: Defined CSS variables for the color palette and implemented the responsive layout using Flexbox and Grid.
3. **Animations**: 
    - Implemented a typewriter effect in JS for the introduction.
    - Built a vertical timeline for the Education section.
    - Added "Data Nodes" for skills with hover transitions.
4. **Butterfly System**: Developed a custom `Butterfly` class in JS that manages particle physics, wing pulse animations, and interactive event listeners.
5. **Interactive Console**: Built a hidden footer console that processes commands like `whois` and `reveal`.
6. **Secret Command**: Integrated an overlay that triggers a Rickroll (YouTube embed) when the user enters the `reveal` command.

## ⚠️ Challenges Faced
- **Canvas Performance**: Ensuring the butterfly effect didn't lag the scroll experience. This was solved by using a lightweight particle class and `requestAnimationFrame`.
- **Responsive Terminal**: Designing a terminal window that looks authentic but also adapts gracefully to mobile screens.
- **Interactive Layers**: Z-indexing the canvas so it remains in the background while still allowing for interaction (clicks/hovers) on the butterflies.

## 🔗 Deployment
- The project is structured for easy deployment on **GitHub Pages**. Simply push the repository and enable static site hosting in settings.
