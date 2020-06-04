document.addEventListener("DOMContentLoaded", function() {
    function refSource() {
        if (document.referrer === "") {
            return "direct";
        } else if (
            document.referrer.search("https?://(.*)google.([^/?]*)") === 0
        ) {
            return "google";
        } else if (
            document.referrer.search("https?://(.*)bing.([^/?]*)") === 0
        ) {
            return "bing";
        } else if (
            document.referrer.search("https?://(.*)yahoo.([^/?]*)") === 0
        ) {
            return "yahoo";
        } else if (
            document.referrer.search("https?://(.*)facebook.([^/?]*)") === 0
        ) {
            return "facebook";
        } else if (
            document.referrer.search("https?://(.*)twitter.([^/?]*)") === 0
        ) {
            return "twitter";
        } else if (
            document.referrer.search("https?://(.*)pinterest.([^/?]*)") === 0
        ) {
            return "pinterest";
        } else if (
            document.referrer.search("https?://(.*)snapchat.([^/?]*)") === 0
        ) {
            return "snapchat";
        } else if (
            document.referrer.search("https?://(.*)instagram.([^/?]*)") === 0
        ) {
            return "instagram";
        } else if (
            document.referrer.search("https?://(.*)adroll.([^/?]*)") === 0
        ) {
            return "adroll";
        } else if (
            document.referrer.search("https?://(.*)criteo.([^/?]*)") === 0
        ) {
            return "criteo";
        } else if (
            document.referrer.search("https?://(.*)ar1d.([^/?]*)") === 0
        ) {
            return "adroll";
        } else {
            return "other";
        }
    }
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    var referr = refSource();
    var urlParams = new URLSearchParams(window.location.search);
    function checkCookie() {
        var user = getCookie("_u");
        if (user == "") {
            var sem = urlParams.get("gclid")
                ? urlParams.get("gclid")
                : "organic_or_direct";
            var source = urlParams.get("utm_source")
                ? urlParams.get("utm_source")
                : refSource();
            var medium = urlParams.get("utm_medium")
                ? urlParams.get("utm_medium")
                : sem;
            var campaign = urlParams.get("utm_campaign")
                ? urlParams.get("utm_campaign")
                : sem;
            setCookie("_u", true, 365);
            setCookie("_r", refSource(), 365);
            setCookie("_s", source, 365);
            setCookie("_m", medium, 365);
            setCookie("_c", campaign, 365);
        }
    }
    checkCookie();
    $("a").click(function(e) {
        if ($(this)[0].href.includes("formstack")) {
            e.preventDefault();
            var href = $(this)[0].href;
            var source = getCookie("_s");
            var medium = getCookie("_m");
            var campaign = getCookie("_c");
            var referrer = getCookie("_r");
            queryString = `?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}&utm_content=${referrer}`;
            window.location.href = `${href}${queryString}`;
            //
        }
    });
});
