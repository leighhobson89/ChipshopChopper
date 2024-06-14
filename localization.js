import {
    getLocalization, setLanguage, setLocalization,
    Role,
    getTotalEarnedInSales,
    getTotalSpentExcludingInvestments,
    getTotalPeeled,
    getTotalCut,
    getTotalWastedChips,
    getTotalServedCustomers,
    getShiftCounter,
    getSpudsToAddToShift,
    getActualPotatoesInStorage,
    getPotatoStorageQuantity
} from './constantsAndGlobalVars.js';
import {formatToCashNotation} from "./ui.js";

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

function localize(key, language) {
    const localizedString = getLocalization()[language][key];
    if (!localizedString) return key;

    if (localizedString.includes('${')) {
        try {
            return interpolateTemplateLiteral(localizedString);
        } catch (e) {
            console.error(`Error evaluating template literal in localized string for key '${key}':`, e);
            return localizedString;
        }
    } else {
        return localizedString;
    }
}

function interpolateTemplateLiteral(template) {
    return template.replace(/\${(.*?)}/g, (match, expression) => {
        try {
            const value = eval(expression);
            return String(value);
        } catch (e) {
            console.error(`Error evaluating expression '${expression}' in template literal:`, e);
            return match;
        }
    });
}



export { localize };