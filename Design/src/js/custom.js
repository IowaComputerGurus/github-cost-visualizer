


function handleSimpleDataTable(selector){
    $(selector).DataTable();
}

function handleSimpleDataTableWithState(selector){
    $(selector).DataTable({ stateSave: true });
}

function handleFilePickers(selector){
	$(selector).on('change', function () {
            //get the file name
            var fileName = $(this).val();
            //replace the "Choose fileâ€¦" label
            $(this).next('.custom-file-label').html(fileName);
        });
}
/* Custom Download Tracking */
function setCookie (name, value, expiracy) {
    var exdate = new Date();
    exdate.setTime(exdate.getTime() + expiracy * 1000);
    var c_value = escape(value) + ((expiracy == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = name + "=" + c_value + '; path=/';
}

function getCookie (name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == name) {
            return y ? decodeURI(unescape(y.replace(/\+/g, ' '))) : y; //;//unescape(decodeURI(y));
        }
    }
}

function handleDownloadDialog(selector){
    $(selector).click(function () {
        processingOverlay.show();
        setCookie('downloadStarted', 0, 100); //Expiration could be anything... As long as we reset the value
        setTimeout(checkDownloadCookie, 1000); //Initiate the loop to check the cookie.
    });
}


var downloadTimeout;
function checkDownloadCookie () {
    if (getCookie("downloadStarted") == 1) {
        setCookie("downloadStarted", "false", 100); //Expiration could be anything... As long as we reset the value
        processingOverlay.hide();
    } else {
        downloadTimeout = setTimeout(checkDownloadCookie, 1000); //Re-run this function in 1 second.
    }
}