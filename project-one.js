//filestream module to read json
const fs = require('fs');

class SuperFan {
    constructor(artistName, artistPopularity) {
        this.artistName = artistName;
        this.artistPopularity = artistPopularity;
    }

    getRedditName() {
        return `${(this.artistName).replace(/\s/g, '')}izRap123`;
    }
}

//get file data
fs.readFile('./musicData.json', (err, data) => {
    if (err) {
        throw err;
    }
    //parse data into JSON format
    const musicData = JSON.parse(data);
    const dataSize = musicData.length;
    const sortedData = sortByPopularity(musicData);

    let artistPics = sortedData.map(artist => artist.images[0].url);
    let artistNames = sortedData.map(artist => artist.name);
    let totalClout = sortedData.reduce((clout, artist) => clout + artist.popularity, 0);

    let topDog = new SuperFan(artistNames[2], totalClout);
    console.log(`\nHave I told you my Reddit Name is ${topDog.getRedditName()}?\n`);

    console.log(`Here's a pic of ${topDog.artistName} -> ${artistPics[2]}`);
    
    console.log("\nHere's a list of my current top artists by popularity rating: ")
    printData(sortedData, dataSize);
});

function printData(musicArr, size) {
    for (i = 0; i < size; i++) {
        console.log(`${i+1}: ${musicArr[i].name} -- ${musicArr[i].popularity}`);
    }
    console.log('\n');
}

//sort artists by popularity and display results
function sortByPopularity(artistArr) {
    let smallestIndex = 0;
    let currentIndex = 1;
    let beginningIndex = 0;

    while(beginningIndex < artistArr.length) {
        while (currentIndex < artistArr.length) {
            if (artistArr[smallestIndex].popularity > artistArr[currentIndex].popularity) {
                smallestIndex = currentIndex;
            }
            currentIndex++;
        }
        if (smallestIndex !== beginningIndex) {
            swapArr(artistArr, smallestIndex, beginningIndex);
        }
        beginningIndex++;
        currentIndex = beginningIndex + 1;
        smallestIndex = beginningIndex;
    }
   
    let sortedArtistArr = artistArr.reverse();
    return sortedArtistArr;
}

function swapArr (arr, indexOne, indexTwo) {
    let temp = arr[indexOne];
    arr[indexOne] = arr[indexTwo];
    arr[indexTwo] = temp;
}