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

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Handle art form submission
    if (artForm) {
        artForm.addEventListener('submit', handleFormSubmit);
    }

    // Set up generate new button
    const generateNewButton = document.getElementById('generateNew');
    if (generateNewButton) {
        generateNewButton.addEventListener('click', function(e) {
            e.preventDefault();
            generateNew();
        });
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
        } catch (error) {
            console.error('Error generating art:', error);
            showError('Failed to generate artwork. Please try again.');
            hideLoading();
        }
    }, 2000);
}

// Generate new art
function generateNew() {
    artForm.reset();
    hideResult();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show the result section
function showResult() {
    resultSection.classList.remove('hidden');
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
