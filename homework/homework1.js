var _getUrl = function () {
    return location.hash.replace(/^#/, '');
};

var _loadURL = function (url, search, container) {
    loadURL(url + search, container);
};

var _updateHash = function (hash) {
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
        return function (url, search, container) {
            console.log("in test mode in loadUrl");
        }
    }
    return _loadURL;
}

function checkURL(isTestMode) {
    isTestMode = isTestMode || false;
    _getUrl = createGetUrl(isTestMode);
    _loadURL = createLoadUrl(isTestMode);
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
        _loadURL.call(this, url, location.search, container);
    } else {

        // grab the first URL from nav
        var $this = $('nav > ul > li:first-child > a[href!="#"]');

        //update hash
        _updateHash($this.attr('href'));
    }

}

checkURL();