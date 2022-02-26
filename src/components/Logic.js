import { letters_3, letters_4, letters_5, letters_6, letters_7, letters_8 } from '../assets/ValidWords';
import { sletters_3, sletters_4, sletters_5, sletters_6, sletters_7, sletters_8 } from '../assets/StartingWords';


export function get_word_pair() {
    let length = getRandomInt(3, 5);
    let start, end
    switch (length) {
        case 3:
            start = sletters_3[Math.floor(Math.random() * sletters_3.length)];
            end = sletters_3[Math.floor(Math.random() * sletters_3.length)];
            break;
        case 4:
            start = sletters_4[Math.floor(Math.random() * sletters_4.length)];
            end = sletters_4[Math.floor(Math.random() * sletters_4.length)];
            break;
        case 5:
            start = sletters_5[Math.floor(Math.random() * sletters_5.length)];
            end = sletters_5[Math.floor(Math.random() * sletters_5.length)];
            break;
        case 6:
            start = sletters_6[Math.floor(Math.random() * sletters_6.length)];
            end = sletters_6[Math.floor(Math.random() * sletters_6.length)];
            break;
        case 7:
            start = sletters_7[Math.floor(Math.random() * sletters_7.length)];
            end = sletters_7[Math.floor(Math.random() * sletters_7.length)];
            break;
        case 8:
            start = sletters_8[Math.floor(Math.random() * sletters_8.length)];
            end = sletters_8[Math.floor(Math.random() * sletters_8.length)];
            break;
        default:
            return -1
    }
    return {
        start: start,
        end: end
    }
}

export function ws_is_valid_guess(prev_word, curr_word) {
    // if not valid word
    if (!is_valid_word(curr_word)) {
        console.log("not valid");
        return false;
    }
    // Case 1: Sandwich - if first and last characters are the same
    if ((curr_word.slice(-1) === prev_word.slice(-1)
        && curr_word[0] === prev_word[0]) 
        || (curr_word.slice(-1) === prev_word[0]
        && curr_word[0] === prev_word.slice(-1))) {
        console.log("sandwich");
        return true;
    }
    // Case 2: Filling
    console.log("filling:", prev_word.slice(1,-1), curr_word);
    return contains_letters(prev_word.slice(1,-1), curr_word)

}

export function wt_is_valid_guess(prev_word, curr_word) {
    // if not valid word
    if (!is_valid_word(curr_word)) {
        return false;
    }
    // if not within +- 1 length
    if (Math.abs(curr_word.length - prev_word.length) > 1) {
        return false;
    }

    let edits = number_of_edits(prev_word, curr_word);
    console.log(edits);
    // Case 1: curr_word > prev_word:
    if (curr_word.length > prev_word.length) {
        return edits === 1 || edits === 2
    }
    // Case 2: curr_word < prev_word
    else if (curr_word.length < prev_word.length) {
        return edits === 1 || edits === 2
    }
    // Case 3: curr_word = prev_word
    else {
        return edits === 1
    }
}

function contains_letters(prev_word, curr_word){
	let dict = [];
	for(let i = 0; i < prev_word.length; i++){
		if(dict[prev_word[i]]){
			dict[prev_word[i]]++;
		} else {
			dict[prev_word[i]] = 1;
		}
	}
	for(let j = 0; j < curr_word.length; j++){
		if(dict[curr_word[j]]){
			dict[curr_word[j]]--;
		} else {
			return false;
		}
	}
	return true;
}

// https://www.geeksforgeeks.org/edit-distance-dp-5/
function number_of_edits(prev_word, curr_word) {
    let m = prev_word.length;
    let n = curr_word.length;
    let dp = new Array(m + 1);
    for (let i = 0; i < m + 1; i++) {
        dp[i] = new Array(n + 1);
        for (let j = 0; j < n + 1; j++) {
            dp[i][j] = 0;
        }
    }
    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i === 0)
                dp[i][j] = j;
            else if (j === 0)
                dp[i][j] = i;
            else if (prev_word[i - 1] === curr_word[j - 1])
                dp[i][j] = dp[i - 1][j - 1];
            else
                dp[i][j] = 1
                    + Math.min(dp[i][j - 1],
                        dp[i - 1][j],
                        dp[i - 1]
                        [j - 1]);
        }
    }
    return dp[m][n];
}

function is_valid_word(word) {
    switch (word.length) {
        case 3:
            return letters_3.includes(word);
        case 4:
            return letters_4.includes(word);
        case 5:
            return letters_5.includes(word);
        case 6:
            return letters_6.includes(word);
        case 7:
            return letters_7.includes(word);
        case 8:
            return letters_8.includes(word);
        default:
            return false
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}