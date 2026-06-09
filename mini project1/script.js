const button = document.getElementById('colorButton');

// Curated palette of premium background colors
const colors = [
    '#0f172a', // Slate 900 (Default)
    '#312e81', // Indigo 900
    '#1e3a8a', // Blue 900
    '#164e63', // Cyan 900
    '#064e3b', // Emerald 900
    '#4c1d95', // Violet 900
    '#701a75', // Fuchsia 900
    '#831843', // Rose 900
    '#451a03', // Orange 900
    '#171717', // Neutral 900
    '#020617', // Slate 950
];

let currentIndex = 0;

button.addEventListener('click', () => {
    // Pick a random color that is different from the current one
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * colors.length);
    } while (newIndex === currentIndex);
    
    currentIndex = newIndex;
    
    // Apply the new color to the CSS variable for a smooth transition
    document.documentElement.style.setProperty('--bg-color', colors[currentIndex]);
});
