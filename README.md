# Khan Academy Curriculum Browser

A React-based curriculum management tool that connects to Khan Academy's API to help parents and homeschoolers organize personalized learning paths for their children across mathematics, science, computing, arts, and economics.

## Purpose

My first React project, built out of necessity while homeschooling my son. I needed a way to browse Khan Academy's extensive course catalog and create focused study plans without losing track of which courses we'd selected across different subjects. What started as a practical parenting solution became my introduction to React development and later, my learning ground for modern React patterns.

## Tech Stack

<img src="https://raw.githubusercontent.com/foxtrottwist/foxtrottwist/main/assets/brider-codes.png" alt="Bridge Builder Fox mascot coding" width="600" height="400" align="right">

*Bridger is here to help make educational content discovery more accessible for homeschooling families.*

**Framework & Core:**
- React 16.8.6 - Originally built with class components, refactored to Hooks
- Styled Components 4.3.2 - Component-scoped styling with CSS-in-JS
- React Scripts 3.0.1 - Create React App for zero-configuration setup

**API Integration:**
- Khan Academy API v1 - Direct access to their course hierarchy
- Local Storage - Persistent curriculum lists across browser sessions

**Development & Tools:**
- Prettier 1.18.2 - Automated code formatting with pre-commit hooks
- ESLint with React Hooks plugin - Enforcing proper Hooks usage patterns
- Husky 2.7.0 - Git hooks ensuring code quality

## Key Features

**Subject Navigation:**
- Browse five Khan Academy subject areas: Math, Science, Computing, Arts & Humanities, Economics & Finance
- Drill down through topics to find specific courses
- Real-time API integration for current course information

**Study Plan Management:**
- Add courses to personalized curriculum lists with confirmation modal
- Remove courses with simple click interaction
- Automatic duplicate prevention keeps lists clean
- Browser storage maintains lists between sessions

**Parent-Friendly Interface:**
- Clean two-column layout separating browsing from planning
- Modal course preview before adding to curriculum
- Visual feedback for all interactions
- Intuitive navigation matching Khan Academy's structure

## Getting Started

**Prerequisites:**
- Node.js 
- Internet connection for Khan Academy API

**Installation:**
```bash
git clone https://github.com/foxtrottwist/khan-curriculum-lists.git
cd khan-curriculum-lists
npm install
```

**Development:**
```bash
npm start
```
Opens at `http://localhost:3000` with live reloading.

**Production Build:**
```bash
npm run build
```

## Project Context

This was my entry point into React development, driven by the practical need to organize my son's homeschool curriculum. Originally built using React class components when I first learned the framework, I later rewrote the entire application using Hooks when React 16.8 introduced them. This refactoring became an invaluable learning experience in modern React patterns.

The evolution from classes to Hooks transformed how I approached state management - what once required `this.setState` and lifecycle methods like `componentDidMount` became clean, functional approaches with `useState` and `useEffect`. The modal system particularly benefited from the Hooks refactor, with `useRef` and `useEffect` providing cleaner event handling than the previous class-based implementation.

**Technical Evolution:**
- Started with React class components and lifecycle methods
- Refactored to functional components with useState and useEffect
- Learned modern React patterns through practical application
- Component composition improved through Hooks-based architecture
- State management became more predictable and easier to reason about

**Learning Outcomes:**
- Hands-on experience with both React paradigms (classes → Hooks)
- API integration patterns with fetch and Promise handling
- Component composition and modern React patterns
- CSS-in-JS styling with styled-components
- Local storage for client-side persistence

This project represents both my introduction to React and my adaptation to its evolution. What started as a parenting tool became the foundation for understanding how React development practices have modernized, giving me firsthand experience with the framework's progression from classes to Hooks.