var downloadButton = document.getElementById("download-button");


// https://stackoverflow.com/a/38241481/7658797
function getOSExtension() {
	var userAgent = window.navigator.userAgent;
	var platform = window.navigator.platform;
	var macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K", "Darwin"];
	var windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
	var iosPlatforms = ["iPhone", "iPad", "iPod"];

	if(macosPlatforms.indexOf(platform) !== -1) {
		return ".dmg";
	}
	else if(windowsPlatforms.indexOf(platform) !== -1) {
		return ".exe";
	}
	else if(iosPlatforms.indexOf(platform) !== -1) {
		return null;
	}
	else if(/Android/.test(userAgent)) {
		return null;
	}
	else if(/Linux/.test(platform)) {
		return ".deb";
	}
}

var os = getOSExtension();

if(os) {
	var request = new XMLHttpRequest();
	request.addEventListener("load", (event) => {
		var response = JSON.parse(request.responseText);
		for(var asset of response.assets) {
			if(asset.name.endsWith(os)) {
				downloadButton.href = asset.browser_download_url;
				downloadButton.innerText = "Download";
				return;
			}
		}
	});
	request.open("GET", "https://api.github.com/repos/TheKodeToad/Sol-Client/releases/latest");
	request.send();
}
else {
	downloadButton.innerText = "Unsupported";
}
