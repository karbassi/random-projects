String.prototype.ucfirst = function() {
  this.toLowerCase().replace(/\b([a-z])/, function(c){
    return c.toUpperCase();
  });
};
