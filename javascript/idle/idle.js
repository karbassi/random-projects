// Only run when document is finished loading
$(function() {
  // Timer will go off in x seconds.
  var idleTime = 2;

   // Create an event handler for mousemove
  var mousePreLoadTimer;
  $(this).mousemove(function(e) {
    // Clear prior timeout, if there is any.
    window.clearTimeout(mousePreLoadTimer);

    $('#mouse-called').prepend('Called @ ' + new Date().toTimeString() + "<br />");

    // Create new timeout.
    mousePreLoadTimer = window.setTimeout(mouse_idle, idleTime * 1000);
  });

  // Create an event handler for keydown
  var keyboardPreLoadTimer;
  $(this).keydown(function(e) {
    // Clear prior timeout, if there is any.
    window.clearTimeout(keyboardPreLoadTimer);

    $('#keyboard-called').prepend('Called @ ' + new Date().toTimeString() + "<br />");

    // Create new timeout.
    keyboardPreLoadTimer = window.setTimeout(keyboard_idle, idleTime * 1000);
  });

  // Function that is called when all mouse events are idle.
  function mouse_idle() {
    $('#mouse-loaded').prepend('Finished @ ' + new Date().toTimeString() + "<br />");
  }
  
  // Function that is called when all keyboard events are idle.
  function keyboard_idle() {
    $('#keyboard-loaded').prepend('Finished @ ' + new Date().toTimeString() + "<br />");
  }
});