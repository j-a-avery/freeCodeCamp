function rot13(str) { // LBH QVQ VG!
  // Name some constants to avoid magic numbers
  var A_CODE = "A".charCodeAt(0),
      Z_CODE = "Z".charCodeAt(0),
      ROT = 13;
  
  // Convert the string to uppercase, just to be safe
  //  then create an array by splitting it into its individual letters
  //  then map each letter to its rot13 equivalent
  //    (Subtract 65 from the letter to get a simple cipher of A=0, B=1, etc.
  //     Then add 13 to the code,
  //     Make sure the letter is an actual letter of the alphabet (i.e. in range(0 .. 26)
  //     Then add 65 to convert back from the simple encoding to ASCII))
  //  then join the array elements back into a string.
  return str
    .toUpperCase()
    .split('')
    .map(
      function (letter) {
        var AsciiCode = letter.charCodeAt(0);
        if (AsciiCode < A_CODE || AsciiCode > Z_CODE) {
          return String.fromCharCode(AsciiCode);
        } else {
          return String.fromCharCode(((AsciiCode - A_CODE + ROT) % 26) + A_CODE);
        }
      })
    .join('');
}

// Change the inputs below to test
rot13("lbh qvq vg");
