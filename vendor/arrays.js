Array.prototype.remove = function(e) {
  for (var i = 0; i < this.length; i++)
    if (e == this[i]) return this.splice(i, 1);
}

Array.prototype.each = function(fn) {
  for (var i = 0; i < this.length; i++) fn(this[i]);
}

Array.prototype.reverse = function(fn) {
  for (var i = this.length - 1; i >= 0; i--) fn(this[i]);
}
