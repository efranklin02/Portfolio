var _supportTable = {
    desktop : {
        chrome  : 35,
        firefox : 30,
        "internet explorer" : 9,
        safari  : 6,
        opera: 26
    },
    mobile : {
        iphone : 7,
        ipad   : 7,
        ipod   : 7,

        chrome  : 4.1,
        android : 4.1
    }
};

checkCompatible = function() {

    var browserIsSupported = true;

    var tableIndex = (bowser.mobile || bowser.tablet) ? 'mobile' : 'desktop';

    var deviceSupportTable = _supportTable[tableIndex];
    var browserName        = bowser.name.toLowerCase();

    var browserMinVersion     = parseFloat(deviceSupportTable[browserName], 10);
    var currentBrowserVersion = parseFloat(bowser.version, 10);

    if (!deviceSupportTable[browserName]) {

        // We don't know your funky browser. so goood luck
        browserMinVersion     = 0;
        currentBrowserVersion = 1;

    } else if(bowser.mobile || bowser.tablet) {

        // Mobile modifiers
        if(bowser.android) {

            if(bowser.chrome) {
                browserMinVersion     = parseFloat(deviceSupportTable['android'], 10);
                currentBrowserVersion = parseFloat(bowser['osversion'], 10);
            }
        }
    } else {
        // Desktop modifiers
    }


    if(browserMinVersion > currentBrowserVersion) {
        browserIsSupported = false;
    }

    if(!browserIsSupported) {

        var queryParameters = document.location.search.split('&');

        (queryParameters[0].length === 0) && queryParameters.splice(0,1); //TODO: improve

        queryParameters.push('unsupported=true');

        var newQueryString = queryParameters.join('&');

        document.location.search = newQueryString;
    }



}

checkCompatible();
