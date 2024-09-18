# Quran Verse Finder

This is a Quran verse search web application that allows users to recite a verse, search for it, and retrieve results with translations. The app is designed to process and recognize Arabic speech input and match it with verses from the Quran.

## Features

- **Speech Recognition**: Users can recite a verse in Arabic using the built-in speech recognition feature. The app will try to match the recited text with verses from the Quran.
- **Verse Display**: The matched verse is displayed along with its translation.
- **Load More Functionality**: Users can load the following verses of the same surah after a match is found.
- **Support for Arabic and Bengali**: The app displays both the Arabic text of the verse and its translation in Bengali.
- **GitHub and Contact Info**: A section for the developer's contact information and a link to the GitHub repository is provided for feedback or contributions.

## How It Works

1. **Speech Recognition**: Users click the "Start Reciting" button, and the app starts listening for Arabic speech. The recognized text is then processed and matched against the verses in the Quran.
2. **Verse Matching**: The app uses a preprocessed version of the Quran to match the recognized speech and then displays the verse and its translation.
3. **Load More**: Once a verse is found, users can load the next 3 verses from the surah until the end of the surah is reached.

## Project Structure

- **index.html**: Main structure of the webpage, including buttons for speech input and results display.
- **styles.css**: Contains the styles for the page, including the layout for the verse display, contact info, and more.
- **app.js**: Handles the speech recognition, matching the recognized text to verses, and loading more verses on request.
- **quran_bn.json**: Preprocessed JSON file used for searching verses.
- **quran_punctuation_removed.json**: A version of the Quran without punctuation marks to improve search accuracy.

## Limitations

1. **Limited Search for Special Verses**: Some verses, especially those that start with disjointed characters (like Surah Yasin), might not be accurately searched or matched due to their unique structure.
2. **Load More Functionality**: The "Load More" feature works correctly till the end of the surah. Once the last verse is reached, no more verses can be loaded.
3. **Repetitive Verse Matching**: In some cases, repeated verses across different parts of the Quran may return the first encounter in the search results, leading to less accurate matching for repeated verses.
4. **Speech Recognition Accuracy**: The speech recognition tool may have limitations with specific pronunciations, dialects, or accents, leading to imperfect recognition results.

## Contact

For any questions or issues with the project, feel free to contact me at:

**Email**: [eishaenan@gmail.com](mailto:eishaenan@gmail.com)  
**GitHub Repo**: [View on GitHub](https://github.com/EishaEnan/verseFinderJS)
