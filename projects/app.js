import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getStorage, ref as storageRef, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

// Define Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyDiS42BJ1Ppc1z9UNrdyTKWtb8qmkKuQ_Y",
    authDomain: "harshitproto.firebaseapp.com",
    projectId: "harshitproto",
    storageBucket: "harshitproto.firebasestorage.app",
    messagingSenderId: "805078252087",
    appId: "1:805078252087:web:1ca3704d0e672906445db2",
    measurementId: "G-W4LY7TPYZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

let allProjects = [];

// Get DOM Elements
const searchInput = document.getElementById('search-input');
const projectsContainer = document.getElementById('projects-container');
const loadingSpinner = document.getElementById('loading-spinner');
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

// Modal Elements
const modal = document.getElementById('details-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const modalDialog = modal.querySelector('div:first-child');
const closeModalButton = document.getElementById('close-modal');

// --- UTILITY FUNCTIONS ---

/**
 * Converts a Firebase storage reference (gs://) to a direct download URL.
 * @param {string} pathOrUrl The gs:// path or a regular URL.
 * @returns {Promise<string>} The public download URL.
 */
async function getDownloadLink(pathOrUrl) {
    if (pathOrUrl && pathOrUrl.startsWith('gs://')) {
        try {
            const fileRef = storageRef(storage, pathOrUrl);
            return await getDownloadURL(fileRef);
        } catch (error) {
            console.warn("Could not fetch download URL:", error.code);
            return '#'; 
        }
    }
    return pathOrUrl || '#';
}

// --- RENDERING FUNCTIONS ---

function createProjectCardHTML(project) {
    // This function creates the HTML string for a single project card.
    // It's defined here in the JS to keep the index.html clean.
    return `
        <div class="project-card bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col transition duration-400" data-id="${project.id}">
            
            <div class="relative">
                <img src="${project.thumbnail_url || 'https://via.placeholder.com/600x400.png?text=Thumbnail+Missing'}" alt="${project.title} thumbnail" 
                     class="w-full h-48 object-cover cursor-pointer" onclick="openDetailsModal('${project.id}')">
                <div class="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-gray-900/10 dark:from-gray-900/20 to-transparent"></div>
            </div>

            <div class="p-6 flex flex-col flex-grow">
                
                <div class="flex flex-wrap gap-2 mb-3">
                    ${(project.tags || []).slice(0, 3).map(tag => 
                        `<span class="px-3 py-1 text-xs font-semibold rounded-full bg-primary-light/10 text-primary dark:bg-indigo-900/50 dark:text-indigo-300 shadow-sm"><i class="fas fa-microchip mr-1"></i>${tag}</span>`
                    ).join('')}
                </div>

                <h3 class="text-xl font-black text-gray-900 dark:text-white mb-2">${project.title}</h3>
                
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">${project.short_description || ''}</p>
                
                <hr class="border-gray-100 dark:border-gray-700 mb-4 mt-auto">

                <div class="space-y-3">
                    <button onclick="openDetailsModal('${project.id}')"
                        class="w-full px-4 py-2 text-base font-semibold rounded-xl text-white btn-gradient">
                        <i class="fas fa-search mr-2"></i> View Details
                    </button>
                    
                    <a href="${project.github_url}" target="_blank" rel="noopener noreferrer" 
                       class="flex items-center justify-center w-full px-4 py-2 text-base font-semibold rounded-xl text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        <i class="fab fa-github mr-2"></i> View Code
                    </a>
                </div>
            </div>
        </div>
    `;
}

function renderProjects(projectsToRender) {
    projectsContainer.innerHTML = ''; 

    if (projectsToRender.length === 0) {
         projectsContainer.innerHTML = `<div class="text-center py-20 text-gray-500 dark:text-gray-400"><p class="text-xl font-medium">No projects found matching your criteria. 😥</p></div>`;
         return;
    }

    const groupedProjects = projectsToRender.reduce((acc, project) => {
        const category = project.category || 'Uncategorized';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(project);
        return acc;
    }, {});

    for (const [category, projectList] of Object.entries(groupedProjects)) {
        const section = document.createElement('section');
        section.className = 'mb-16';
        
        section.innerHTML = `
            <div class="flex items-center mb-8">
                <h2 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                    <i class="fas fa-code mr-3 text-primary-light"></i>${category}
                </h2>
                <div class="flex-grow h-1 ml-4 rounded-full bg-primary-light/50 dark:bg-primary/50"></div>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                ${projectList.map(createProjectCardHTML).join('')}
            </div>
        `;
        projectsContainer.appendChild(section);
    }
}

// --- MODAL/DETAILS LOGIC ---

window.openDetailsModal = async function(projectId) {
    const project = allProjects.find(p => p.id === projectId);
    if (!project) return;

    modalTitle.textContent = project.title;
    modalContent.innerHTML = '<p class="text-center py-5 dark:text-gray-400"><i class="fas fa-spinner fa-spin mr-2"></i>Fetching details...</p>';
    
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalDialog.classList.remove('scale-95');
        modalDialog.classList.add('scale-100');
    }, 10);

    const downloadLink = await getDownloadLink(project.download_url);
    
    modalContent.innerHTML = `
        <div class="flex flex-col lg:flex-row gap-8">
            <div class="lg:w-1/2 flex flex-col items-center">
                <img id="main-screenshot" src="${project.thumbnail_url || 'https://via.placeholder.com/800x600.png?text=Main+Image'}" alt="${project.title} main image" class="w-full h-auto rounded-xl shadow-2xl shadow-indigo-500/20 mb-4 object-cover max-h-96">
                <div class="flex gap-3 overflow-x-auto pb-2 justify-center w-full">
                    ${(project.screenshots || []).map(url => 
                        `<img src="${url}" class="w-20 h-20 object-cover rounded-md border-2 border-transparent hover:border-primary cursor-pointer transition" alt="Screenshot" onclick="document.getElementById('main-screenshot').src='${url}'">`
                    ).join('')}
                </div>
            </div>

            <div class="lg:w-1/2 space-y-6">
                <div class="flex flex-wrap justify-between items-center text-sm">
                    <span class="font-semibold px-3 py-1 rounded-full bg-primary-light/20 text-primary-light dark:bg-indigo-900/50 dark:text-indigo-300">
                        <i class="fas fa-tag mr-1"></i> Category: ${project.category}
                    </span>
                    <span class="text-gray-500 dark:text-gray-400 mt-2 lg:mt-0">
                        <i class="fas fa-calendar-alt mr-1"></i> Created: ${new Date(project.created_at || new Date()).toLocaleDateString()}
                    </span>
                </div>

                <p class="text-gray-700 dark:text-gray-300 text-base leading-relaxed whitespace-pre-wrap">${project.full_description || project.short_description || 'No detailed description provided.'}</p>
                
                <div class="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    ${(project.tags || []).map(tag => 
                        `<span class="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"><i class="fas fa-wrench mr-1"></i>${tag}</span>`
                    ).join('')}
                </div>

                <div class="pt-4 space-y-4">
                    <a href="${downloadLink}" target="_blank" rel="noopener noreferrer" 
                       class="flex items-center justify-center w-full text-center px-6 py-3 text-lg font-bold rounded-xl text-white btn-gradient">
                        <i class="fas fa-download fa-fw mr-3"></i> Download Project
                    </a>
                    <a href="${project.github_url}" target="_blank" rel="noopener noreferrer" 
                       class="flex items-center justify-center w-full text-center px-6 py-3 text-lg font-bold rounded-xl text-gray-800 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        <i class="fab fa-github fa-fw mr-3"></i> View Source Code
                    </a>
                </div>
            </div>
        </div>
    `;
}

closeModalButton.onclick = () => {
    modal.classList.add('opacity-0');
    modalDialog.classList.remove('scale-100');
    modalDialog.classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
    document.body.classList.remove('overflow-hidden');
};

modal.onclick = (e) => {
    if (e.target === modal) {
         closeModalButton.click();
    }
};


// --- DATA FETCHING ---

async function fetchAndRenderAllProjects() {
    try {
        const projectsCol = collection(db, 'projects');
        const projectSnapshot = await getDocs(projectsCol);
        
        allProjects = projectSnapshot.docs.map(doc => ({ 
            id: doc.id, 
            created_at: doc.data().created_at ? doc.data().created_at.toDate() : new Date(), 
            ...doc.data() 
        }));

        loadingSpinner.style.display = 'none';
        renderProjects(allProjects);

    } catch (error) {
        console.error("Error fetching projects:", error);
        projectsContainer.innerHTML = `<div class="text-center py-20 text-red-500 dark:text-red-400"><p class="text-xl font-medium">Failed to load projects. Please ensure your Firebase setup is correct.</p></div>`;
    }
}

// --- SEARCH LOGIC ---
function filterProjects() {
    const query = searchInput.value.toLowerCase();
    
    const filtered = allProjects.filter(project => {
        const searchString = [
            project.title, 
            project.short_description, 
            (project.tags || []).join(' '),
            project.category
        ].join(' ').toLowerCase();

        return searchString.includes(query);
    });

    renderProjects(filtered);
}

let searchTimeout;
searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(filterProjects, 300);
});

// --- THEME TOGGLE LOGIC ---

function updateThemeIcons(isDark) {
    if (isDark) {
        document.documentElement.classList.add('dark');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

// Initialize theme on load
const isDarkMode = localStorage.getItem('theme') === 'dark' || 
                   (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
updateThemeIcons(isDarkMode);

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    
    localStorage.setItem('theme', newTheme);
    updateThemeIcons(newTheme === 'dark');
});


// Start the application
fetchAndRenderAllProjects();
