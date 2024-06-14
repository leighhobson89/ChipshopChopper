import {getLocalization, setLanguage, setLocalization} from "./constantsAndGlobalVars.js";

let localizationData = {};

async function fetchLocalization() {
    try {
        const response = await fetch('localization.json'); // Adjust the path as per your project structure
        localizationData = await response.json();
    } catch (error) {
        console.error('Error loading localization:', error);
    }
    return localizationData;
}

export async function initLocalization(language) {
    const localization = await fetchLocalization();
    setLocalization(localization);
    setLanguage(language);
}

function localize(key, language, variables = {}) {
    const localizedString = getLocalization()[language][key];
    if (!localizedString) return key;

    let result = localizedString;
    if (variables !== null) {
        Object.keys(variables).forEach(variable => {
            result = result.replace(new RegExp(`{{${variable}}}`, 'g'), variables[variable]);
        });
    }

    return result;
}

export { localize };