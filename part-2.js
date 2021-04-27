/*
   This part of code contains below functionality

   1. Read the all files from Directory
   2. Sort files using merge sort algorith.
   3. Update every files with sorted data...
*/


const directoryName = 'E:/Test/Temp';
const fs = require('fs');
let dirBuf = Buffer.from(directoryName);

fs.readdir(dirBuf, (err, files) => {
    if(err){
        console.log("Error--"+err.message)
    }
    else{
        files.forEach(file => {
            var filePath = directoryName+'/'+file
           fileContent = fs.readFileSync(filePath,'utf-8')
          readFileContent(fileContent, filePath)
        });
    }
  });

  readFileContent=(obj, filePath)=>{  
      var localArr = obj.split(',');
      var newArray = [];
      var length = localArr.length;

      // Store Value in Array after reading data...
      for (var i = 0; i < length; i++) {
             newArray[i] = localArr[i]
        };
   
    // Pass array to function for sorting
    var sortedResult = mergeSort([1,4,2,6,3,7,5,9]) // Need to pass fetched value from Txt file Majid
    
    // Truncate all content from file
    fs.writeFile(filePath, '', function(){console.log('done')})

    // Write/Update Updated(Sorted) Value to the file
    fs.writeFileSync(filePath,sortedResult.toString())
  
}

/*
Merge Sort Algorith
*/

const mergeSort = array=>{
    // Check if array can be split
     if(array.length < 2) return array;
 
    // Get Middle index
     const middle = Math.floor(array.length/2);
 
     // Split Array In Two Slides
     const leftSide = array.slice(0, middle);
     const rightSide = array.slice(middle, array.length);
 
    // Use recussion to continue splitting
    return merge(mergeSort(leftSide), mergeSort(rightSide));
    
 }
 
 const merge = (left, right)=>{
     // Create New Array
     const result = [];
 
     // Check if left array and right array is empty
     while(left.length && right.length){
 
         // Get Lower value
         if(left[0] <= right[0]){
             // Add left Value
             result.push(left.shift());
         }
         else{
             // Add right value
             result.push(right.shift());
         }
     }
 
     // Merge left array
 while(left.length){
     result.push(left.shift());
 }
 
 // Merge Right array
 while(right.length){
     result.push(right.shift())
 }
 
 // return result of array
 return result;
 }