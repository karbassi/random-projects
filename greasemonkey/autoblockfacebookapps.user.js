// Auto-Block Facebook Apps
//
// Version 1.2
//
// Date Written: 2007-09-18
// Last Modified: 2009-01-22 02:18 PM (14:18)
//
// (c) Copyright 2007 Ali Karbassi.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Auto-Block Facebook Apps", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// After the facebook profile page is loaded, it finds all the
// applications that your friends have invited you to and blocks them.
// Do not worry though, you can go to
// http://facebook.com/privacy.php?view=platform&tab=all and unblock
// them
//
// NOTE: This does not alter, delete, edit, add, or anything else to
//       your facebook profile. Just remove or disable this script and
//       everything will be displayed the same as it used to
// --------------------------------------------------------------------
//
// ==UserScript==
// @name        Auto-Block Facebook Apps 1.2
// @author      Ali Karbassi
// @namespace   http://www.karbassi.com
// @description This script will block app invites sent to you by friends.
//              After the facebook profile page is loaded, it finds all the
//              applications that your friends have invited you to and blocks
//              them. Do not worry though, you can go 
//              http://facebook.com/privacy.php?view=platform&tab=all and
//              unblock them.
// @include     http://*facebook.tld/home.php*
// @include     http://*facebook.tld/reqs.php*
// ==/UserScript==
// Find Subdomain
var subDomain = getSubDomain();

// Get links on the front page/request page
var anchors = document.getElementsByTagName('a');
var appReqExp = /reqs\.php#confirm_(\d*)_(.*)/;

for (var i = 0; i < anchors.length; i++) {
  if (appReqExp.exec(anchors[i].href)) {
    prep(RegExp.$1, anchors[i]);
  }
}

// Remove any notifications about apps.
removeNotifications();

// Functions
// PLEASE DO NOT TOUCH IF YOU HAVE NO IDEA WHAT YOU'RE DOING.
// YOU MIGHT BREAK IT.
// Prepares everything. When things are correct, it calls BlockApp.
function prep(appID, appNode) {
  var postformMatch = /name="post_form_id" value="(\w+)"/;
  var post_form_id = 0;

  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.facebook.com/apps/block.php?id=' + appID
         + '&action=block',
    headers: {
      'User-Agent': window.navigator.userAgent,
      'Accept': 'text/html',
    },
    onload: function(responseDetails) {
      var searchString = 'This will not prevent you from seeing';
      if ((responseDetails.status == 200) 
          && (responseDetails.responseText.indexOf(searchString) != -1)) {
            
        // Show that we are working on it.
        appNode.removeAttribute('href');
        appNode.innerHTML = 'Reading confirmation page...';

        postformMatch.exec(responseDetails.responseText);

        // Calls function to block the app
        BlockApp(RegExp.$1, appID, appNode);
      }
    }
  });
}

function BlockApp(post_form_id, appID, appNode) {
  GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://' + subDomain + 'facebook.com/apps/block.php?id=' + appID
         + '&action=block',
    headers: {
      'User-Agent': window.navigator.userAgent,
      'Accept': 'text/xml',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: 'post_form_id=' + post_form_id + '&save=1',
    onload: function(responseDetails) {
      if (responseDetails.status == 200) {
        appNode.innerHTML = 'App Blocked!'
        appNode.href = 'http://facebook.com/reqs.php';
      }
    },
    onerror: function(responseDetails) {
      appNode.removeAttribute('href');
      appNode.innerHTML = 'App Block failed!';
    }
  });
}

function removeNotifications() {
  var inputs = document.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value == 'Ignore') {
      for (var j = 0; j < inputs[i].attributes.length; j++) {
        if ((inputs[i].attributes[j].nodeName == 'onclick') && 
        (inputs[i].attributes[j].nodeValue.indexOf('click_add_platform_app') != -1)) {
          var js = (inputs[i].attributes[j].nodeValue).split(' ');
          js.shift();
          js = js.join(' ');
          location.href = 'javascript:' + js;
        }
      }
    }
  }
}

function getSubDomain() {
  var subDomainRegExp = /http:\/\/(.*\.)facebook\.com/;
  var subDomain = '';
  if (subDomainRegExp.exec(document.location) != 0) {
    subDomain = RegExp.$1;
  }
  return subDomain;
}