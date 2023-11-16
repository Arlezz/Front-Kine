export function embeddedURL(url) {
    var cleanedUrl = url.match(/[^&]+/)[0];
    return cleanedUrl.replace("watch?v=", "embed/")+"?modestbranding=1;&showinfo=0;&rel=0;";
}

export function embeddedURLThumbnail(url) {
    var cleanedUrl = url.match(/[^&]+/)[0];

    cleanedUrl = cleanedUrl.replace("www", "img");
    cleanedUrl = cleanedUrl.replace("watch?v=", "vi/");
    return cleanedUrl+"/mqdefault.jpg";
}
