// Constants
const PEXELS_IMAGES = [
    'https://images.pexels.com/photos/3222686/pexels-photo-3222686.jpeg',
    'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg',
    'https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg',
    'https://images.pexels.com/photos/3222685/pexels-photo-3222685.jpeg',
    'https://images.pexels.com/photos/2832432/pexels-photo-2832432.jpeg'
];

// DOM Elements
const artForm = document.getElementById('artForm');
const loadingState = document.getElementById('loadingState');
const resultSection = document.getElementById('resultSection');
const errorMessage = document.getElementById('errorMessage');
const generatedImage = document.getElementById('generatedImage');
const resultDescription = document.getElementById('resultDescription');
const artGrid = document.getElementById('artGrid');
const emptyState = document.getElementById('emptyState');

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Handle art form submission
    if (artForm) {
        artForm.addEventListener('submit', handleFormSubmit);
    }

    // Load history if on history page
    if (window.location.pathname.includes('history.html')) {
        loadHistory();
    }
});

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    const description = document.getElementById('description').value.trim();
    
    if (!description) {
        showError('Please enter a description for your artwork.');
        return;
    }

    showLoading();
    generateArt(description);
}

// Simulate AI art generation
function generateArt(description) {
    // Simulate API call delay
    setTimeout(() => {
        try {
            // Randomly select an image from Pexels
            const randomImage = PEXELS_IMAGES[Math.floor(Math.random() * PEXELS_IMAGES.length)];
            
            // Show the result
            generatedImage.src = randomImage;
            resultDescription.textContent = description;
            
            hideLoading();
            showResult();

            // Add event listeners to buttons
            const saveButton = document.getElementById('saveToHistory');
            if (saveButton) {
                saveButton.onclick = function(e) {
                    e.preventDefault();
                    try {
                        const artHistory = JSON.parse(localStorage.getItem('artHistory')) || [];
                        const newArt = {
                            id: Date.now(),
                            image: generatedImage.src,
                            description: resultDescription.textContent,
                            date: new Date().toLocaleDateString()
                        };
                        
                        artHistory.unshift(newArt);
                        localStorage.setItem('artHistory', JSON.stringify(artHistory));
                        
                        showSuccess('Artwork saved to history!');
                        
                        // Redirect to history page after saving
                        setTimeout(() => {
                            window.location.href = 'history.html';
                        }, 1500);
                    } catch (error) {
                        console.error('Error saving to history:', error);
                        showError('Failed to save artwork to history.');
                    }
                };
            }

            const generateNewButton = document.getElementById('generateNew');
            if (generateNewButton) {
                generateNewButton.onclick = function(e) {
                    e.preventDefault();
                    generateNew();
                };
            }
        } catch (error) {
            console.error('Error generating art:', error);
            showError('Failed to generate artwork. Please try again.');
            hideLoading();
        }
    }, 2000);
}

// Generate new art
function generateNew(e) {
    if (e) e.preventDefault();
    
    artForm.reset();
    hideResult();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show the result section
function showResult() {
    resultSection.classList.remove('hidden');
}

// Load art history
function loadHistory() {
    try {
        const artHistory = JSON.parse(localStorage.getItem('artHistory')) || [];
        console.log('Loaded art history:', artHistory);
        
        if (artHistory.length === 0) {
            showEmptyState();
            return;
        }

        hideEmptyState();
        renderArtHistory(artHistory);
    } catch (error) {
        console.error('Error loading history:', error);
        showError('Failed to load art history.');
    }
}

// Render art history grid
function renderArtHistory(artHistory) {
    if (!artGrid) return;
    
    artGrid.innerHTML = '';
    const template = document.getElementById('artItemTemplate');
    
    artHistory.forEach(art => {
        const clone = template.content.cloneNode(true);
        
        const img = clone.querySelector('img');
        img.src = art.image;
        img.alt = art.description;
        
        const description = clone.querySelector('p');
        description.textContent = art.description;
        
        const date = clone.querySelector('span');
        date.textContent = art.date;
        
        const deleteBtn = clone.querySelector('button');
        deleteBtn.dataset.id = art.id;
        deleteBtn.onclick = () => deleteArtItem(art.id);
        
        artGrid.appendChild(clone);
    });
}

// Delete art item from history
function deleteArtItem(id) {
    try {
        const artHistory = JSON.parse(localStorage.getItem('artHistory')) || [];
        const updatedHistory = artHistory.filter(art => art.id !== id);
        localStorage.setItem('artHistory', JSON.stringify(updatedHistory));
        
        if (updatedHistory.length === 0) {
            showEmptyState();
        }
        
        // Remove the art item from DOM
        const artItem = document.querySelector(`button[data-id="${id}"]`).closest('.bg-gray-800');
        if (artItem) {
            artItem.remove();
        }
        
        showSuccess('Artwork deleted successfully!');
    } catch (error) {
        console.error('Error deleting artwork:', error);
        showError('Failed to delete artwork.');
    }
}

// Clear all history
function clearHistory() {
    if (!confirm('Are you sure you want to clear all history? This action cannot be undone.')) {
        return;
    }
    
    try {
        localStorage.removeItem('artHistory');
        artGrid.innerHTML = '';
        showEmptyState();
        showSuccess('History cleared successfully!');
    } catch (error) {
        console.error('Error clearing history:', error);
        showError('Failed to clear history.');
    }
}

// UI Helper Functions
function showLoading() {
    loadingState.classList.remove('hidden');
    hideError();
}

function hideLoading() {
    loadingState.classList.add('hidden');
}

function hideResult() {
    resultSection.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}

function showEmptyState() {
    if (emptyState) {
        emptyState.classList.remove('hidden');
    }
    if (artGrid) {
        artGrid.classList.add('hidden');
    }
}

function hideEmptyState() {
    if (emptyState) {
        emptyState.classList.add('hidden');
    }
    if (artGrid) {
        artGrid.classList.remove('hidden');
    }
}

function showSuccess(message) {
    // Create a temporary success message
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    // Remove the message after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}
