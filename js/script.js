// Function to get URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return params.get('emojis');
}

// Function to create and append emoji elements
function createEmojiElements(emojis) {
    const container = document.querySelector('.wallpaper-container');
    // create grid
    for (let row = 0; row < 29; row++) {
        for (let column = 0; column < 11; column++) {
            const emojiElement = document.createElement('div');
            emojiElement.classList.add('emoji');
            emojiElement.id = `emoji-${row}-${column}`;
            container.appendChild(emojiElement);
        }
    }
    // change the emoji array and put the last emoji in the first position
    const lastEmoji = emojis.pop();
    emojis.unshift(lastEmoji);
    // fill grid with emojis
    for (let row = 0; row < 29; row++) {
        for (let column = (row + 1) % 2; column < 11; column+=2) {
            const emojiIndex = Math.floor(row) % emojis.length;
            const emojiElement = document.getElementById(`emoji-${row}-${column}`);
            emojiElement.textContent = emojis[emojiIndex];
            if (row % 4 == 0) {
                if (column % 4 == 3) {
                    emojiElement.style.scale = 2;
                } 
            }
            else if (row % 4 == 2) {
                if (column % 4 == 1) {
                    emojiElement.style.scale = 2;
                }
            }
        }
    }
}

// Function to correctly split emoji string
function splitEmojis(emojiString) {
    return emojiString.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|\p{Emoji}/gu);
}

// Get emojis from URL and create elements
const emojiParam = getUrlParams();
if (emojiParam) {
    const emojis = splitEmojis(emojiParam);
    createEmojiElements(emojis);
} else {
    // Default emojis if none are provided in the URL
    const defaultEmojis = ['😅', '💧', '🌧️'];
    createEmojiElements(defaultEmojis);
}
