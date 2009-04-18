String.prototype.ucfirst = function() {
  // Split the string into words if string contains multiple words.
  var x = this.split(/\s+/g);
  for (var i = 0; i < x.length; i++) {
    // Splits the word into two parts. One part being the first letter,
    // second being the rest of the word.
    var parts = x[i].match(/(\w)(\w*)/);

    // Put it back together but uppercase the first letter and lowercase the 
    // rest of the word.
    x[i] = parts[1].toUpperCase() + parts[2].toLowerCase();
  }

  // Rejoin the string and return.
  return x.join(' ');
};