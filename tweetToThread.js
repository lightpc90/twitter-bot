
const thread = []

//helper function to cut a long fun fact into a list of thread
const tweetToThread = (inputString) => {
    let words200 = ''
    let nextwords = ''
  
    if (inputString.length > 200){
      // Step 1: Extract the first 200 characters
      words200 = inputString.substring(0, 200);
      // Step 2: Check if the last character is a space
      if (words200.charAt(words200.length - 1) === ' ') {
        thread.push(words200)
        nextwords = inputString.substring(words200.length);
        tweetToThread(nextwords)
      }
      else{
        // Step 3: Find the last space before the last character
        const lastSpaceIndex = words200.lastIndexOf(' ');
        words200 = words200.substring(0, lastSpaceIndex);
        thread.push(words200)
        nextwords = inputString.substring(lastSpaceIndex + 1); // Start from the character after the space
        tweetToThread(nextwords)
      }
    }
    else{
      return inputString
    }
  
    // return the arrays of the extracted parts
    return thread;
  }

  module.exports = tweetToThread;