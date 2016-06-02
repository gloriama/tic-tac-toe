exports.repeatedChar = function(char, numTimes) {
  var result = '';
  for (var i = 0; i < numTimes; i++) {
    result += char;
  }
  return result;
};