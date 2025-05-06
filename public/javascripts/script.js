// Journal Entry Form

const entryForm = document.querySelector('#entryForm');
const entryResultsSection = document.querySelector('#entryResultsSection');
const entryResultRow = document.querySelector('.entryResultRow');
const getEntryTitle = document.querySelector('.entry-text-title');
const getEntryText = document.querySelector('.entry-text-box');

function addEntryToDom(event) {
    event.preventDefault();
    const currentDate = new Date();
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();

    // Adding Div
    const entryDiv = document.createElement('div');
    entryDiv.className = 'single-entry-div';
    entryResultRow.appendChild(entryDiv);

    // Adding Entry Title
    const entryHeading = document.createElement('h3');
    entryHeading.className = 'single-entry-heading';
    entryHeading.textContent = getEntryTitle.value;
    entryDiv.appendChild(entryHeading);

    // Adding Entry Date
    const entryDate = document.createElement('p');
    entryDate.className = 'single-entry-date';
    entryDate.textContent = `Date Added: ${day} ${month} ${year}`;
    entryDiv.appendChild(entryDate);

    // Adding Entry Content
    const entryParagraph = document.createElement('p');
    entryParagraph.className = 'single-entry-text';
    entryParagraph.textContent = getEntryText.value;
    entryDiv.appendChild(entryParagraph);

    // Clear form fields
    getEntryTitle.value = '';
    getEntryText.value = '';
}

entryForm.addEventListener('submit', addEntryToDom);