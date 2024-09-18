let processedData = [];
let currentSurah = null;
let currentVerseNumber = null; // Tracks the last displayed verse number
let isFirstVerse = true; // Flag to track the first verse

// Load the processed JSON data (without punctuation)
fetch('quran_data_bn.json')
    .then(response => response.json())
    .then(data => {
        processedData = data;
        console.log('Processed data loaded successfully.');
    })
    .catch(error => console.error('Error loading processed data:', error));

const startBtn = document.getElementById('startBtn');
const output = document.getElementById('output');
const resultContainer = document.createElement('div'); // Container for results
document.body.appendChild(resultContainer); // Append container for verses

const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = "Load More";
loadMoreBtn.style.display = 'none'; // Initially hidden
loadMoreBtn.classList.add('load-more-btn');
document.body.appendChild(loadMoreBtn); // Add the button to the body

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'ar-SA'; // Set the language to Arabic (Saudi Arabia)
recognition.interimResults = false;
recognition.maxAlternatives = 1;

startBtn.addEventListener('click', () => {
    output.textContent = 'Listening...';
    recognition.start();

    setTimeout(() => {
        recognition.stop();
    }, 5000); // Stop listening after 5 seconds
});

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    output.textContent = `Recognized text: ${transcript}`;
    console.log(`Recognized text: ${transcript}`);

    const searchResult = searchVerse(processedData, transcript);
    if (searchResult) {
        resultContainer.innerHTML = ''; // Clear previous results
        isFirstVerse = true; // Reset flag for first verse
        displayVerse(searchResult.surah_name, searchResult.verse_number);
        currentSurah = searchResult.surah_name;
        currentVerseNumber = searchResult.verse_number;

        // Show the "Load More" button
        loadMoreBtn.style.display = 'block';
        document.body.appendChild(loadMoreBtn); // Ensure button is at the bottom
    } else {
        resultContainer.innerHTML = 'Verse not found.';
    }
};

recognition.onerror = (event) => {
    output.textContent = `Error occurred in recognition: ${event.error}`;
};

// Search function using the processed data
function searchVerse(processedData, searchText, fuzzyThreshold = 0.8) {
    const verseList = [];
    processedData.forEach(surah => {
        surah.verses.forEach(verse => {
            verseList.push({
                surah_name: surah.name,
                transliteration: surah.transliteration,
                verse_number: verse.id,
                text: verse.text
            });
        });
    });

    const options = {
        includeScore: true,
        threshold: 1 - fuzzyThreshold,
        keys: ['text']
    };

    const fuse = new Fuse(verseList, options);
    const result = fuse.search(searchText);

    if (result.length > 0) {
        const bestMatch = result[0].item;
        return {
            surah_name: bestMatch.surah_name,
            transliteration: bestMatch.transliteration,
            verse_number: bestMatch.verse_number
        };
    } else {
        return null;
    }
}

// Display a verse from a specific surah and verse number in a new box
function displayVerse(surahName, verseNumber) {
    const surah = processedData.find(s => s.name === surahName);
    if (surah) {
        const verse = surah.verses.find(v => v.id === verseNumber);
        if (verse) {
            const verseBox = document.createElement('div');
            verseBox.classList.add('verse-box');
            
            const verseNumberDiv = document.createElement('div');
            verseNumberDiv.classList.add('verse-number');
            
            // Show surah name, transliteration, and translation only for the first verse
            if (isFirstVerse) {
                verseNumberDiv.innerHTML = `
                    Surah: ${surah.name} (Transliteration: ${surah.transliteration}), Verse ${verse.id}<br/>
                    <span class="translation">${surah.translation}</span>
                `;
                isFirstVerse = false; // Set flag to false after the first verse
            } else {
                verseNumberDiv.textContent = `Verse ${verse.id}`;
            }

            const verseTextDiv = document.createElement('div');
            verseTextDiv.classList.add('verse-text');
            verseTextDiv.textContent = verse.text;

            const translationDiv = document.createElement('div');
            translationDiv.classList.add('verse-translation');
            translationDiv.textContent = verse.translation; // Display verse translation

            verseBox.appendChild(verseNumberDiv);
            verseBox.appendChild(verseTextDiv);
            verseBox.appendChild(translationDiv); // Append the translation after the verse text
            resultContainer.appendChild(verseBox);
        }
    }
}


// "Load More" button functionality
loadMoreBtn.addEventListener('click', () => {
    loadMoreVerses(currentSurah, currentVerseNumber);
    document.body.appendChild(loadMoreBtn); // Ensure button stays at the bottom
});

// Load 3 more verses from the current surah, without repeating surah info
function loadMoreVerses(surahName, lastVerseNumber) {
    const surah = processedData.find(s => s.name === surahName);
    if (surah) {
        for (let i = 1; i <= 3; i++) {
            const nextVerseNumber = lastVerseNumber + i;
            const nextVerse = surah.verses.find(v => v.id === nextVerseNumber);
            if (nextVerse) {
                displayVerse(surahName, nextVerseNumber);
                currentVerseNumber = nextVerseNumber; // Update the last loaded verse number
            } else {
                loadMoreBtn.style.display = 'none'; // Hide button if no more verses
                break;
            }
        }
    }
}
