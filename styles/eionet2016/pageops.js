/* ----- cookie_functions.js ----- */
function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name+"="+escape(value)+expires+"; path=/;";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return unescape(c.substring(nameEQ.length,c.length));
        }
    }
    return null;
}


/* ----- nodeutilities.js ----- */

function hasClassName(node, class_name) {
    return new RegExp('\\b'+class_name+'\\b').test(node.className);
}

function addClassName(node, class_name) {
    if (!node.className) {
        node.className = class_name;
    } else if (!hasClassName(node, class_name)) {
        var className = node.className+" "+class_name;
        // cleanup
        node.className = className.split(/\s+/).join(' ');
    }
}

function removeClassName(node, class_name) {
    var className = node.className;
    if (className) {
        // remove
        className = className.replace(new RegExp('\\b'+class_name+'\\b'), '');
        // cleanup
        className = className.replace(/\s+/g, ' ');
        node.className = className.replace(/\s+$/g, '');
    }
}

function replaceClassName(node, old_class, new_class, ignore_missing) {
    if (ignore_missing && !hasClassName(node, old_class)) {
        addClassName(node, new_class);
    } else {
        var className = node.className;
        if (className) {
            // replace
            className = className.replace(new RegExp('\\b'+old_class+'\\b'), new_class);
            // cleanup
            className = className.replace(/\s+/g, ' ');
            node.className = className.replace(/\s+$/g, '');
        }
    }
}

/* ----- fullscreenmode.js ----- */
function toggleFullScreenMode() {
    var body = document.body;
    if (hasClassName(body, 'fullscreen')) {
        // unset cookie
        removeClassName(body, 'fullscreen');
        createCookie('fullscreenMode', '');
    } else {
        // set cookie
        addClassName(body, 'fullscreen');
        createCookie('fullscreenMode', '1');
    }
}

function fullscreenModeLoad() {
    // based on cookie
    if (readCookie('fullscreenMode') == '1') {
        var body = document.body;
        addClassName(body, 'fullscreen');
    }
}

function startList() {
    if (document.all && document.getElementById) {
        navRoot = document.getElementById("dropdowns");
        for (i=0; i < navRoot.childNodes.length; i++) {
            node = navRoot.childNodes[i];
            if (node.nodeName=="LI") {
                node.onmouseover=function() {
                    addClassName(this, 'over');
                };
                node.onmouseout=function() {
                    removeClassName(this, 'over');
                };
            }
        }
    }
}

/* Fragments */
var currentFragment = null;

function highlightFragment(oEvent) {
    if(oEvent.target) {
        var oTarget = oEvent.target; // DOM
    } else {
        var oTarget = oEvent.srcElement; // IE
    }
    var href = oTarget.getAttribute('href');
    var lookfor = null;
    if (!href) return 0;
    if (document.URL.indexOf('#') >= 0)
        var docurl = document.URL.substring(0, document.URL.indexOf('#'));
    else
        var docurl = document.URL;
    if (href.substring(0,docurl.length+1) == docurl+'#') lookfor = href.substring(docurl.length+1);
    if (href.substring(0,1) == '#') lookfor = href.substring(1);
    if (!lookfor) return 0;
    var myfragment = document.getElementById(lookfor);
    if (myfragment) {
        if (currentFragment) removeClassName(currentFragment,'highlight-fragment');
        addClassName(myfragment,'highlight-fragment');
        currentFragment = myfragment;
    }
}

function scanforFragments() {
    /* Check if we called with a fragment */
    if (location.hash) {
        var myfragment = document.getElementById(location.hash.substring(1));
        if (myfragment) {
            addClassName(myfragment,'highlight-fragment');
            currentFragment = myfragment;
        }
    }
    /* Add onclick handlers on all internal links */
    var links = document.getElementsByTagName('a');
    for (i=0; i < links.length; i++) {
        if ( links[i].getAttribute('href') ) {
            var linkval = links[i].getAttribute('href');
            if (document.URL.indexOf('#') >= 0)
                var docurl = document.URL.substring(0, document.URL.indexOf('#'));
            else
                var docurl = document.URL;
            if ((linkval.substring(0,1) == '#' && linkval.length > 1) ||
                (linkval.substring(0,docurl.length+1) == docurl+'#' && linkval.length > docurl.length+1)) {
               addEvent(links[i],'click', highlightFragment);
            }
        }
    }  
}



/* Use attachEvent for IE */
function addEvent(obj, evType, fn){
 if (obj.addEventListener){
   obj.addEventListener(evType, fn, false);
   return true;
 } else if (obj.attachEvent){
   var r = obj.attachEvent("on"+evType, fn);
   return r;
 } else {
   return false;
 }
}

//addEvent(window,'load',startList);
addEvent(window,'load',fullscreenModeLoad);
addEvent(window,'load',scanforFragments);

