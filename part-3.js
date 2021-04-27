/*
   This part of code contains below functionality
   1. Read the all sorted files from Directory
   2. Read first elements from every file and store that in to local array.
   3. Point 3 array data will sort using heap sorting and then write it in to final output file.
   4. Then remove elements from existing files.
   5. This process will call recursively till all elements will read and after reading all elements old files will be remove from directory.
   6. During reading elements from file append data in the final output file...
*/


const directoryName = 'E:/Test/Temp';

const fs = require('fs');
let dirBuf = Buffer.from(directoryName);

var finalArray = []
const readSortedFileDirectory =()=>{
    fs.readdir(dirBuf, (err, files) => {
        if(err){
            console.log("Error--"+err.message)
        }
        else{
            if(files.length>0){
                 readDirectoryData(files) 
            }
        }
    
        // Sort final array data using heapsort.
          var sortedArray = heapSort(finalArray)
          writeFinalOutPutFile(sortedArray)
          finalArray = [] // Empty array
          readSortedFileDirectory() // Call function recursively...
      });
}

  const readDirectoryData = (files)=>{ 
    files.forEach((file, index) => {
        var filePath = directoryName+'/'+file
       fileContent = fs.readFileSync(filePath,'utf-8')
       if(fileContent.length>0){
            readFileContent(fileContent, filePath, index)
       }
       else{
           // Delete File from directory if there is not data available
           var filePath = directoryName+"/"+file;
           fs.unlinkSync(filePath)
       }  
    });
  }


  // Read first elements of each file and store in Array, after that save this array in final out put txt file and remove 
  // this index value from every file. Repat same condition till every value will cover
 const readFileContent=(obj, filePath, fileIndex)=>{  
    var localArr = obj.split(',');

    var newArray = [];
    var length = localArr.length;

    // Store Value in Array after reading data...
    finalArray[fileIndex] = localArr[0] 

  // Creating local array and store and data from old array(obj)
    for (var i = 0; i < length; i++) {
           newArray[i] = localArr[i]
      };

 // Remove first element from file
    newArray.shift();
    updateTxtFile(newArray, filePath)
}


// Update File with updated value.
const updateTxtFile = (newArray, filePath)=>{
    // Truncate all content from file
    fs.writeFile(filePath, '', function(){console.log('done')})

    // Write/Update Updated(Sorted) Value to the file
    fs.writeFileSync(filePath,newArray.toString())
}

// Final Out file
const writeFinalOutPutFile = (fileArray)=>{
    fs.appendFileSync('finalOutput.txt',fileArray.toString())
}

// ----------- Sort Final Array Data using Heap Sorting ---------
function heapSort(inputArray){
    if(inputArray.length < 2) 
        return inputArray
    
    let arrayLength = inputArray.length

    for(let i=Math.floor(inputArray.length/2)-1; i>=0; i--){
        sortParentAndChildItem(inputArray, arrayLength, i)
    }
    for(let i=inputArray.length-1; i>0; i--){
        swapValue(inputArray,0,i)
        arrayLength--
        sortParentAndChildItem(inputArray, arrayLength, 0)
    }

    return inputArray;
}

function sortParentAndChildItem(inputArray, arrayLength, parentIndex){
    const leftIndex = parentIndex * 2+1
    const rightIndex = parentIndex * 2+2
    let maxIndex = parentIndex

    if(leftIndex < arrayLength && inputArray[leftIndex]>inputArray[maxIndex]){
        maxIndex = leftIndex
    }
    if(rightIndex < arrayLength && inputArray[rightIndex]>inputArray[maxIndex]){
        maxIndex = rightIndex
    }
    if(maxIndex !== parentIndex){
        swapValue(inputArray, parentIndex, maxIndex)
        sortParentAndChildItem(inputArray, arrayLength, maxIndex)
    }
}

function swapValue(inputArray, parentIndex, maxIndex){
    let temp = inputArray[parentIndex]
    inputArray[parentIndex] = inputArray[maxIndex]
    inputArray[maxIndex] = temp
}

// Execute program from here...
console.log(readSortedFileDirectory())