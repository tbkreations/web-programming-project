//filestream module to read json
const fs = require('fs');

//get file data
fs.readFile('./musicData.json', (err, data) => {
    if (err) {
        throw err;
    }
    //parse data into JSON format
    const musicData = JSON.parse(data);
    const dataSize = musicData.length;

    console.log('\nMy Top Artists Unsorted:');
    printData(musicData, dataSize);

    const sortedData = sortByPopularity(musicData);
    console.log('\nMy Top Artists Sorted By Global Popularity:');
    printData(sortedData, dataSize);
});

function printData(musicArr, size) {
    for (i = 0; i < size; i++) {
        console.log(`${i+1}: ${musicArr[i].name} -- ${musicArr[i].popularity}`);
    }
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