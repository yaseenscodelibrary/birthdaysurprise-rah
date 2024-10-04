// Specify the start date in local time (Year, Month - 1, Day, Hour, Minute, Second)
let startDate = new Date(2024, 4, 12, 3, 47, 50); // May 12, 2024, 3:47 AM (local time)

// Function to calculate time difference and format it
function calculateTimeDifference() {
    let now = new Date(); // Current local date and time

    // Calculate the time difference in milliseconds
    let difference = now - startDate;

    // Convert the time difference into years, months, days, hours, minutes, seconds
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();
    let seconds = now.getSeconds() - startDate.getSeconds();

    // Adjust for negative values (like if the day hasn't completed yet)
    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        let previousMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += previousMonth;
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    return `${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
}

// Typewriter effect function (used only once)
function typeWriter(element, text, index = 0, speed = 50, callback) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => typeWriter(element, text, index + 1, speed, callback), speed); // Speed of typing
    } else if (callback) {
        callback(); // Call the callback function once typing is done
    }
}

// Function to update the timer without typewriter effect
function updateTimer() {
    let timerElement = document.getElementById('timer');
    let timeString = calculateTimeDifference();

    // Simply update the text, no typewriter effect
    timerElement.textContent = timeString;
}

// Initial setup with typewriter effect, then regular updates without typewriter
function initialLoad() {
    let timerElement = document.getElementById('timer');
    let timeString = calculateTimeDifference();

    // Run the typewriter effect only on initial load
    typeWriter(timerElement, timeString, 0, 50, () => {
        // After typewriter effect completes, update the timer immediately and then start regular updates every second
        updateTimer(); // Ensure immediate update after typewriter effect
        setInterval(updateTimer, 1000);
    });
}

// Call the initial load function when the page loads
initialLoad();

// Get the audio element and controls
const backgroundAudio = document.getElementById('backgroundAudio');
const muteButton = document.getElementById('muteButton');
const volumeSlider = document.getElementById('volumeSlider');

// Add a user interaction to allow audio playback (fix for autoplay restrictions)
document.body.addEventListener('click', () => {
    if (backgroundAudio.paused) {
        backgroundAudio.play();
    }
});

// Function to toggle mute
muteButton.addEventListener('click', () => {
    if (backgroundAudio.muted) {
        backgroundAudio.muted = false;
        muteButton.textContent = '🔊'; // Change button to sound icon
    } else {
        backgroundAudio.muted = true;
        muteButton.textContent = '🔇'; // Change button to mute icon
    }
});

// Function to change volume based on slider value
volumeSlider.addEventListener('input', (e) => {
    backgroundAudio.volume = e.target.value;
});

// Fade-in effect function
function fadeIn() {
    const body = document.body;
    body.style.opacity = 0; // Start from transparent
    let fade = setInterval(() => {
        let val = parseFloat(body.style.opacity);
        if (!((val += 0.02) > 1)) {
            body.style.opacity = val;
        } else {
            clearInterval(fade);
        }
    }, 20); // Adjust the speed (higher number = slower fade)
}

// Fade-in effect when the page loads
window.onload = function() {
    fadeIn();
};
