export function embeddedURL(url) {
    return url.replace("watch?v=", "embed/")+"?modestbranding=1;&showinfo=0;&rel=0;";
}

export function embeddedURLThumbnail(url) {
    url = url.replace("www", "img");
    url = url.replace("watch?v=", "vi/");
    return url+"/mqdefault.jpg";
}
