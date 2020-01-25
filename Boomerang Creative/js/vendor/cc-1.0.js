
// variables
var gaDisable = false;
var TrackingId = "UA-2954691-70";
var ContainerId = "GTM-P84DVB";
var arrPerformance = ["_ga", "_gat_" + TrackingId, "_gid"];

function ccLoad() {
    var performanceCookie = "_cperformance", functionalCookie = "_cfunctional", TargetingCookie = "_ctarget", cookiePanel = $('.cookie-warning');

    var performanceValue = getCookie(performanceCookie);
    if (performanceValue == null || performanceValue == "") {
        //setCookie(performanceCookie, "true", "365");
        $('#' + performanceCookie).attr('checked', true);
        cookiePanel.addClass("open");
        cookiePanel.removeClass("closed");
        //ccAddAnalytics();
    }
    else if (performanceValue == "false") {
        $('#' + performanceCookie).attr('checked', false);
        gaDisable = true;
        ccAddAnalytics();
        //eraseGroup(arrPerformance);
    }
    else if (performanceValue == "true") {
        $('#' + performanceCookie).attr('checked', true);
        gaDisable = false;
        ccAddAnalytics();
    }
    ccStatusText(performanceCookie);
}


function ccStatusText(elementId) {
    var chkState = $('#' + elementId).prop('checked');
    var chkStatus = $('#' + elementId).closest(".section-status").find(".status");

    if (chkState == true) {
        chkStatus.text("Active");
        chkStatus.addClass("active");
        chkStatus.removeClass("inactive");
    } else {
        chkStatus.text("Inactive");
        chkStatus.addClass("inactive");
        chkStatus.removeClass("active");
    }
}


function ccAcceptAll() {

    ccRemoveAnalytics();
    setCookie("_cperformance", "true", 365);
    gaDisable = false;
    ccAddAnalytics();
    $('.cookie-warning').addClass("closed");
    $('.cookie-warning').removeClass("open");
}


function ccSave() {

    ccRemoveAnalytics();
    var cookieState = $('#_cperformance').prop('checked');
    if (cookieState == true) {
        setCookie('_cperformance', "true", 365);
        $('#_cperformance').attr('checked', true);
        gaDisable = false;
        ccAddAnalytics();
        $('.cookie-warning').addClass("closed");
        $('.cookie-warning').removeClass("open");
    } else {
        setCookie('_cperformance', "false", 365);
        $('#_cperformance').attr('checked', false);
        gaDisable = true;
        ccAddAnalytics();
        $('.cookie-warning').addClass("closed");
        $('.cookie-warning').removeClass("open");
    }
    console.log("save settings");
}


function ccSaveMessage() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $(".cookie-saved").fadeIn("slow");
}


function ccAddAnalytics() {

    var TmHeadCode = "window['ga-disable-' + '" + TrackingId + "'] = " + gaDisable + "; (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','" + ContainerId + "');";

    // insert tag manager code in to <head>
    var script = document.createElement("script");
    script.id = "tmHead";
    script.innerText = TmHeadCode;
    document.head.appendChild(script);
}


function ccRemoveAnalytics() {
    removeElement("tmHead");
}


function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    if (element !== null) {
        // element is not part of the DOM
        element.parentNode.removeChild(element);
    }
}






function ccUi(elementId) {
    //var cookieValue = getCookie(elementId);
    var cookieState = $('#' + elementId).prop('checked');
    ccStatusText(elementId);
    ccRemoveAnalytics();
    if (cookieState == true) {
        setCookie(elementId, "true", 365);
        $('#' + elementId).attr('checked', true);
        gaDisable = false;
        ccAddAnalytics();
    } else {
        setCookie(elementId, "false", 365);
        $('#' + elementId).attr('checked', false);
        gaDisable = true;
        ccAddAnalytics();
    }
}


function getCookie(cookieName) {
    var i, x, y, ARRcookies = document.cookie.split(";");

    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == cookieName) {
            return unescape(y);
        }
    }
}


function setCookie(cookieName, cookieAllow, exDays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exDays);
    var cookieValue = cookieAllow + ((exDays == null) ? "" : "; path=/; expires=" + exdate.toUTCString());
    document.cookie = cookieName + " =" + cookieValue;
}


function checkCookie(cookieName) {
    var cookieValue = getCookie(cookieName);
    if (cookieValue != null && cookieValue != "") {
        cookiePanel.addClass("closed");
        cookiePanel.removeClass("open");
    }
    else {
        cookiePanel.addClass("open");
        cookiePanel.removeClass("closed");
    }
}


function eraseGroup(group) {
    groupLen = group.length;
    for (i = 0; i < groupLen; i++) {
        var cookieName = group[i];
        eraseCookie(cookieName);
    }
}


function eraseCookie(name) {
    setCookie(name, "", -1);
    //document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}


$(document).ready(function () {

    ccLoad();

    $(".cc-accept-all").click(function (e) {
        e.preventDefault();
        ccAcceptAll();
    });

    $(".cc-save").click(function (e) {
        e.preventDefault();
        ccSave();
    });

    $(".cCheckbox").click(function (e) {
        ccStatusText($(this).attr('id'));
    });

    $("#_cnecessary").click(function (e) {
        e.preventDefault();
    });

    $(".save-settings").click(function (e) {
        e.preventDefault();
        ccSaveMessage();
    });

});