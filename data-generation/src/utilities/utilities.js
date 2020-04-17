/** This function approximates a normal-distribution */
function boxMuellerTransform(min, max, skew) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) num = this.randn_bm(min, max, skew); // resample between 0 and 1 if out of range
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
    return num;
}

/** This function generates random string.
 *
 * @param type: String [word, sentence, paragraph]
 * @param length: Integer. Determines how many letters, words or sentences should be generated.
 * @returns {string}
 */
function generateRandomString({type, length}) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let punctuation = '!?,:.';

    let numberOfSentences = 1;
    let numberOfWords = 1;
    let numberOfCharacters = 1;

    switch (type) {
        case 'word':
            numberOfCharacters = length || Math.round(boxMuellerTransform(2, 10, 2));
            break;
        case 'sentence':
            numberOfWords = length || Math.round(boxMuellerTransform(13, 23, 2));
            break;
        case 'paragraph':
            numberOfSentences = length || Math.round(boxMuellerTransform(1, 5, 3));
            break;
        default:
            numberOfCharacters = length || Math.round(boxMuellerTransform(2, 15, 2));
    }
    for (let i = 0; i < numberOfSentences; i++) {
        if (type !== 'sentence' && type !== 'word') {
            numberOfWords = Math.round(boxMuellerTransform(13, 23, 2));
        }
        for (let j = 0; j < numberOfWords; j++) {
            result += " ";
            if (type !== 'word') {
                numberOfCharacters = Math.round(boxMuellerTransform(2, 10, 1));
            }
            for (let k = 0; k < numberOfCharacters; k++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
        }
        if (type !== 'word') {
            result += punctuation.charAt(Math.floor(Math.random() * punctuation.length));
        }
    }
    result = type !== 'word' ? result.substr(0, result.length - 2) + '.' : result;
    return result;
}

export const utilities = {
    generateRandomString,
    boxMuellerTransform
};