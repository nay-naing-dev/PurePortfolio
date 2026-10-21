'use strict';

/* ==========================================================================
   Project data
   Cards and filter buttons are built from this array. To add a project,
   add an object here; no HTML changes needed.
   ========================================================================== */

// Every source link below builds on this profile URL.
const GITHUB_URL = 'https://github.com/nay-naing-dev';

const projects = [
    {
        title: 'Nail Art Studio Web App',
        description:
            'A booking app for a nail art studio. Customers upload a photo of their hand, crop it on a canvas ' +
            'and preview designs with a virtual try-on before booking an appointment.',
        category: 'Full-Stack Apps',
        technologies: ['React (Vite)', 'Express.js', 'MongoDB', 'Multer', 'Cloudinary'],
        sourceUrl: `${GITHUB_URL}/NailArtStudioV2`,
        demoUrl: '',
        status: ''
    },
    {
        title: 'Learning Management System',
        description:
            'A learning platform concept with separate admin and student dashboards, video progress tracking, ' +
            'student role management and a daily AI-generated quiz.',
        category: 'Full-Stack Apps',
        technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'AI quiz API'],
        sourceUrl: `${GITHUB_URL}/LMS`,
        demoUrl: '',
        status: 'Concept, in progress'
    },
    {
        title: '3D Interactive Portfolio',
        description:
            'A portfolio site with Three.js 3D scenes and scroll animations, plus a chatbot that answers ' +
            'questions about me through a serverless Gemini AI backend.',
        category: 'Frontend Apps',
        technologies: ['Three.js', 'GSAP', 'JavaScript', 'Gemini API', 'Vercel'],
        sourceUrl: `${GITHUB_URL}/Portfolio`,
        demoUrl: 'https://portfolio-one-blue-12.vercel.app',
        status: ''
    },
    {
        title: 'Movie Search & Discovery',
        description:
            'Search for movies and browse listings with trailers, cast lists and ratings pulled from an ' +
            'external media API, with Firebase for app data.',
        category: 'Frontend Apps',
        technologies: ['Vue.js', 'JavaScript', 'Movie API', 'Firebase'],
        sourceUrl: `${GITHUB_URL}/Movie-chillm`,
        demoUrl: '',
        status: ''
    },
    {
        title: 'Taungoo 1550: 2.5D Action Game',
        description:
            'A Godot action game set in Myanmar\'s Taungoo era. Explore a top-down city of palaces, markets ' +
            'and rice paddies, face King Tabinshwehti as a boss, then fight in side-view stages. ' +
            'Built with an agentic AI coding workflow.',
        category: 'Games',
        technologies: ['Godot 4', 'GDScript', 'Agentic AI coding'],
        sourceUrl: `${GITHUB_URL}/TaumgooEmpire`,
        demoUrl: '',
        status: 'Demo, in progress'
    }
];

/* ==========================================================================
   1. Mobile navigation
   ========================================================================== */

const siteNav = document.getElementById('site-nav');
const menuButton = siteNav.querySelector('.menu-toggle');
// Must match the breakpoint in css/style.css where the menu button appears.
const mobileQuery = window.matchMedia('(max-width: 767.98px)');

function isMenuOpen() {
    return menuButton.getAttribute('aria-expanded') === 'true';
}

function setMenuOpen(isOpen) {
    menuButton.setAttribute('aria-expanded', String(isOpen));
    siteNav.classList.toggle('is-open', isOpen);
}

menuButton.addEventListener('click', () => {
    setMenuOpen(!isMenuOpen());
});

// Choosing a section link scrolls there (default link behavior) and closes the menu.
siteNav.addEventListener('click', (event) => {
    if (event.target.closest('a') && mobileQuery.matches) {
        setMenuOpen(false);
    }
});

// Escape closes the menu and returns focus to the button so keyboard users are not lost.
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMenuOpen()) {
        setMenuOpen(false);
        menuButton.focus();
    }
});

// Clicking anywhere outside the open menu closes it.
document.addEventListener('click', (event) => {
    if (isMenuOpen() && !siteNav.contains(event.target)) {
        setMenuOpen(false);
    }
});

// Going from phone to desktop width resets the menu so the two layouts never mix.
mobileQuery.addEventListener('change', () => setMenuOpen(false));

/* ==========================================================================
   2. Contact form validation
   ========================================================================== */

const MESSAGE_MIN = 20;
const MESSAGE_MAX = 500;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const messageCount = document.getElementById('message-count');

const formFields = {
    name: contactForm.elements.name,
    email: contactForm.elements.email,
    message: contactForm.elements.message
};
// Each rule gets the trimmed value and returns an error message, or '' when valid.
const validationRules = {
    name(value) {
        if (value.length === 0) return 'Please enter your name.';
        if (value.length < 2) return 'Your name must be at least 2 characters.';
        return '';
    },
    email(value) {
        if (value.length === 0) return 'Please enter your email address.';
        if (!EMAIL_PATTERN.test(value)) return 'Please enter a valid email, like name@example.com.';
        return '';
    },
    message(value) {
        if (value.length === 0) return 'Please write a message.';
        if (value.length < MESSAGE_MIN) {
            return `Your message needs at least ${MESSAGE_MIN} characters (it has ${value.length}).`;
        }
        if (value.length > MESSAGE_MAX) {
            return `Your message is ${value.length - MESSAGE_MAX} characters over the ${MESSAGE_MAX} limit.`;
        }
        return '';
    }
};

function validateField(fieldName) {
    const input = formFields[fieldName];
    const errorMessage = validationRules[fieldName](input.value.trim());
    const hasError = errorMessage !== '';

    document.getElementById(`${fieldName}-error`).textContent = errorMessage;
    input.setAttribute('aria-invalid', String(hasError));
    input.closest('.form-field').classList.toggle('has-error', hasError);

    return !hasError;
}

function updateMessageCount() {
    const length = formFields.message.value.trim().length;
    messageCount.textContent = `${length} / ${MESSAGE_MAX}`;
    messageCount.classList.toggle('is-over', length > MESSAGE_MAX);
}

function setFormStatus(text) {
    // Clearing first makes screen readers announce the message again on repeat submits.
    formStatus.textContent = '';
    if (text) {
        window.setTimeout(() => {
            formStatus.textContent = text;
        }, 50);
    }
}

Object.keys(formFields).forEach((fieldName) => {
    const input = formFields[fieldName];

    input.addEventListener('input', () => {
        // Only re-check a field that is already showing an error, so the error clears
        // as soon as it becomes valid without nagging while someone is still typing.
        if (input.getAttribute('aria-invalid') === 'true') {
            validateField(fieldName);
        }
        if (fieldName === 'message') {
            updateMessageCount();
        }
        setFormStatus('');
    });

    input.addEventListener('blur', () => {
        if (input.value.trim() !== '') {
            validateField(fieldName);
        }
    });
});

contactForm.addEventListener('submit', (event) => {
    // No server: never let the browser navigate or reload.
    event.preventDefault();

    // filter() runs every rule, so all invalid fields show their errors at once.
    const invalidFields = Object.keys(formFields).filter((fieldName) => !validateField(fieldName));

    if (invalidFields.length > 0) {
        setFormStatus('');
        formFields[invalidFields[0]].focus();
        return;
    }

    setFormStatus('Demo only. Your message has not been sent.');
});

updateMessageCount();

/* ==========================================================================
   3. Project cards and category filters
   ========================================================================== */

const projectGrid = document.getElementById('project-grid');
const filterBar = document.getElementById('project-filters');
const projectCount = document.getElementById('project-count');
const ALL_CATEGORIES = 'All';

let activeCategory = ALL_CATEGORIES;

function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
}

// Link text names the project too, so a screen reader's links list stays clear.
function createProjectLink(label, url, projectTitle) {
    const link = createElement('a', 'card-link', label);
    link.href = url;
    link.append(createElement('span', 'visually-hidden', ` for ${projectTitle}`));
    return link;
}

function createProjectCard(project) {
    const card = createElement('article', 'project-card');

    const meta = createElement('div', 'card-meta');
    meta.append(createElement('span', 'badge badge-category', project.category));
    if (project.status) {
        meta.append(createElement('span', 'badge badge-status', project.status));
    }

    const techList = createElement('ul', 'tech-list');
    techList.setAttribute('aria-label', 'Technologies used');
    project.technologies.forEach((tech) => {
        techList.append(createElement('li', '', tech));
    });

    const links = createElement('div', 'card-links');
    links.append(createProjectLink('Source code', project.sourceUrl, project.title));
    if (project.demoUrl) {
        links.append(createProjectLink('Live demo', project.demoUrl, project.title));
    }

    card.append(
        meta,
        createElement('h3', 'card-title', project.title),
        createElement('p', 'card-description', project.description),
        techList,
        links
    );
    return card;
}

function getVisibleProjects() {
    // filter() returns a new array, so the original projects data is never changed.
    if (activeCategory === ALL_CATEGORIES) return projects;
    return projects.filter((project) => project.category === activeCategory);
}

function renderProjects() {
    const visibleProjects = getVisibleProjects();

    // replaceChildren() swaps out the old cards, so repeated filtering never duplicates them.
    projectGrid.replaceChildren(...visibleProjects.map(createProjectCard));

    const noun = visibleProjects.length === 1 ? 'project' : 'projects';
    const scope = activeCategory === ALL_CATEGORIES ? '' : ` in ${activeCategory}`;
    projectCount.textContent = `Showing ${visibleProjects.length} of ${projects.length} ${noun}${scope}`;
}

function renderFilters() {
    // Categories come from the data, so every filter is guaranteed to match at least one project.
    const categories = [ALL_CATEGORIES, ...new Set(projects.map((project) => project.category))];

    const buttons = categories.map((category) => {
        const total = category === ALL_CATEGORIES
            ? projects.length
            : projects.filter((project) => project.category === category).length;

        const button = createElement('button', 'filter-button', category);
        button.type = 'button';
        button.dataset.category = category;
        button.setAttribute('aria-pressed', String(category === activeCategory));
        button.append(createElement('span', 'filter-total', `(${total})`));
        return button;
    });

    filterBar.replaceChildren(...buttons);
}

filterBar.addEventListener('click', (event) => {
    const button = event.target.closest('.filter-button');
    if (!button) return;

    activeCategory = button.dataset.category;
    filterBar.querySelectorAll('.filter-button').forEach((filterButton) => {
        filterButton.setAttribute('aria-pressed', String(filterButton === button));
    });
    renderProjects();
});

renderFilters();
renderProjects();

/* ==========================================================================
   4. Light and dark theme
   js/theme-init.js applies the saved theme early; this wires up the button.
   ========================================================================== */

const THEME_STORAGE_KEY = 'portfolio-theme';
const themeButton = document.querySelector('.theme-toggle');

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // The button's name stays "Dark mode"; aria-pressed says whether it is on.
    themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
}

function saveTheme(theme) {
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
        // Storage unavailable: the theme still changes for this visit, it just isn't remembered.
    }
}

themeButton.addEventListener('click', () => {
    const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    saveTheme(nextTheme);
});

applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
