// extract-strings.js

const fs = require('fs');

function extractStringsFromFile(filePath) {
    // Read the file content
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Define a regex pattern to match strings
    const stringRegex = /(['"`])(.*?)\1/g; // Matches strings in single quotes, double quotes, or backticks

    let match;
    const stringsFound = [];

    // Iterate over matches found in the file content
    while ((match = stringRegex.exec(fileContent)) !== null) {
        stringsFound.push(match[0]); // match[0] is the entire matched string
    }

    return stringsFound;
}

// Specify the path to your ui.js file
const filePath = './ui.js'; // Adjust the path as per your project structure

// Extract strings from the file
const stringsInFile = extractStringsFromFile(filePath);

// Log the strings found
console.log('Strings found in ui.js:');
stringsInFile.forEach((str, index) => {
    console.log(`${index + 1}. ${str}`);
});
