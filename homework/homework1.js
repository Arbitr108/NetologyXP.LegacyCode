var _getUrl = function () {
    return location.hash.replace(/^#/, '');
};

function _loadURL(url, search, container) {
    "use strict";
    //Here we can provide test logic
    //....
    loadURL(url + search, container);
}

function _updateHash(hash) {
    "use strict";
    //Here we can provide test logic
    //....
    window.location.hash = hash;
}

function createGetUrl(isTestMode) {
    if (isTestMode) {
        return function () {
            return "https://google.com/#page1"
        }
    }
    return _getUrl;
}

function createLoadUrl(isTestMode) {
    if (isTestMode) {

    }
    return _getUrl;
}

function checkURL(isTestMode) {
    isTestMode = isTestMode || false;
    _getUrl = createGetUrl(isTestMode);

    //get the url by removing the hash
    var url = _getUrl();

    container = $('#content');
    // Do this if url exists (for page refresh, etc...)
    if (url) {
        // remove all active class
        $('nav li.active').removeClass("active");
        // match the url and add the active class
        $('nav li:has(a[href="' + url + '"])').addClass("active");
        var title = ($('nav a[href="' + url + '"]').attr('title'))

        // change page title from global var
        document.title = (title || document.title);
        //console.log("page title: " + document.title);

        // parse url to jquery
        _loadURL(url, location.search, container);
    } else {

        // grab the first URL from nav
        var $this = $('nav > ul > li:first-child > a[href!="#"]');

        //update hash
        _updateHash($this.attr('href'));
    }

}

checkURL();