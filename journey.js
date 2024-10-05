let currentPage = 0; // Track the current page index

function openDiary() {
    document.getElementById('closed-diary').style.display = 'none'; // Hide the closed diary
    document.getElementById('open-diary').style.display = 'block'; // Show the open diary
    showPage(currentPage); // Show the first page
}

function showPage(index) {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, i) => {
        page.style.display = (i === index) ? 'block' : 'none'; // Show selected page
    });
    currentPage = index; // Update current page index
}

function goBack(index) {
    if (index > 0) {
        showPage(index - 1); // Go back one page
    }
}

function goNext(index) {
    if (index < document.querySelectorAll('.page').length - 1) {
        showPage(index + 1); // Go to next page
    }
}

// Initialize the diary by hiding all pages and showing the first one
document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none'); // Hide all pages initially
    showPage(currentPage); // Show the first page
});
