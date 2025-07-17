var expandLabel = "Expand section";
var collapseLabel = "Collapse section";
var opensInANewWindowLabel = "opens in a new window";


/* Apply a target to a link */
function applyLinkTarget(id, target) {
	var oLink = getElementById(id);
	if (oLink) oLink.target = target;
}

/* Link target functionality */
addLoadEvent('MasterNavigationBottom', function () {
	var links = getElementsByTagName(document, 'a');
	if (links) {
		for (var i = 0; i < links.length; i++) {
			var link = links[i];
			switch (true) {
				case elementHasClass(link, 'blank'):
				case elementHasClass(link, 'external'):
					link.target = "_blank";
					if (link.title == '') link.title = opensInANewWindowLabel;
					else link.title += ' (' + opensInANewWindowLabel + ')';
					break;
				case elementHasClass(link, 'parent'):
					link.target = "_parent";
					break;
				case elementHasClass(link, 'top'):
					link.target = "_top";
					break;
			}
		}
	}

	var forms = getElementsByTagName(document, 'form');
	if (forms) {
		for (var i = 0; i < forms.length; i++) {
			var form = forms[i];

			if (elementHasClass(form, 'external')) {
				form.target = "_blank";
				if (form.title == '') form.title = opensInANewWindowLabel;
				else form.title += ' (' + opensInANewWindowLabel + ')';

				// Adding this to get around IE6&7 showing the alt attribute
				var inputs = getElementsByTagName(form, 'input');
				for (var j = 0; j < inputs.length; j++) {
					var input = inputs[j];

					if (input.type == "image") {
						if (input.title == '') input.title = opensInANewWindowLabel;
						else input.title += ' (' + opensInANewWindowLabel + ')';
					}
				}
			}
		}
	}
});


/* Dynamically control the text shown in an input or textarea */
function defaultInputText(el, action, defaultValue) {
	var text = trim(el.value);
	if (action == 'focus') {
		if (text == defaultValue && text != '') el.value = '';
	} else if (action == 'blur') {
		if (text == '') el.value = defaultValue;
	}
}

/* Generic Show/Hide function
e = object
id = id of object
action = show/hide
*/
function showHide(e, id, action) {
	if (typeof (e) == "undefined")
		e = getElementById(id);

	if (e) {
		if (action == "hide") applyClass(e, "hidden");
		else if (action == "show") removeClass(e, "hidden");
	}
}


/* Show/Hide help layers */
function showHideHelpLayers(id, imageId, containerId, action) {
	e = getElementById(id);
	if (e) {
		var image = getElementById(imageId);
		var container = getElementById(containerId);
		if (image && container) {
			var i = getAbsolutePosition(image);
			var eRight = i.x + parseInt(getStyle(e, 'width'));

			var c = getAbsolutePosition(container);
			var cRight = c.x + parseInt(getStyle(getElementById('MasterMainContent'), 'width'));

			e.style.top = (i.y + 5) + "px";
			if (eRight > cRight) {
				e.style.left = (i.x - 15 - parseInt(getStyle(e, 'width'))) + "px";
				//e.style.right = (i.x + 5) + "px";
			} else {
				e.style.left = (i.x + 30) + "px";
				//e.style.right = 'auto';
			}
		}

		if (action == "hide") setTimeout(function () { applyClass(e, "hidden") }, 1000);
		else if (action == "show") removeClass(e, "hidden");
	}
}

/*function delayShowHideHelpLayers(id, imageId, containerId, action) {
var milliseconds = 1000; //1 sec
setTimeout(function() { showHideHelpLayers(id, imageId, containerId, action) }, milliseconds);
}*/


/* Show/Hide items by class */
function showHideByClassInContainer(container, tagName, className, action) {
	var elements = getElementsByClassName(getElementById(container), tagName, className);

	if (elements) {
		for (var i = 0; i < elements.length; i++) {
			showHide(elements[i], "", action);
		}
	}
}

function showHideByClass(className, id) {
	var action = "";

	var groupRowCells = getElementsByTagName(getElementById(id), 'th');
	var rows = getElementsByClassName(document, 'tr', className);

	if (groupRowCells && rows) {
		// find action
		var groupRowHeaderCell = groupRowCells[0];
		action = (elementHasClass(groupRowHeaderCell, 'expand')) ? 'hide' : 'show';

		// update indicator
		if (action == 'hide') {
			removeClass(groupRowHeaderCell, 'expand');
			applyClass(groupRowHeaderCell, 'collapse');
		} else {
			removeClass(groupRowHeaderCell, 'collapse');
			applyClass(groupRowHeaderCell, 'expand');
		}

		//update row visibility
		var showGroup = true;
		var rowId, rowClass;
		for (i = 0; i < rows.length; i++) {
			var row = rows[i];
			if (action == 'hide') {
				applyClass(row, 'hidden');
			} else {
				if (row.id) {
					rowId = row.id;
					removeClass(row, 'hidden');
					var subGroupRowCells = getElementsByTagName(row, 'th');
					if (subGroupRowCells) {
						var subGroupRowHeaderCell = subGroupRowCells[0];
						showGroup = (elementHasClass(subGroupRowHeaderCell, 'expand')) ? true : false;
					}
				} else {
					if (showGroup) removeClass(row, 'hidden');
					if (!showGroup) {
						rowClass = row.className;
						if (rowClass.toLowerCase().indexOf(rowId.toLowerCase()) == -1) removeClass(row, 'hidden');
					}
				}
			}
		}
	}
}


/* print */
function printPage() {
	window.print();
	return false;
}

addLoadEvent('MasterNavigationBottom', function () {
	//print button
	var printALinks = getElementsByClassName(document, 'a', 'print');
	if (printALinks) {
		for (var i = 0; i < printALinks.length; i++) {
			var printLink = printALinks[i];
			removeClass(printLink, 'hidden');
			//printLink.href = 'javascript:printPage();';
		}
	}

	var printLILinks = getElementsByClassName(document, 'li', 'print');
	if (printLILinks) {
		for (var i = 0; i < printLILinks.length; i++) {
			var printLink = printLILinks[i];
			removeClass(printLink, 'hidden');
			//printLink.href = 'javascript:printPage();';
		}
	}
});

/* Open Window functions */
function openWindow(url, windowName, options) {
	var default_args = {
		'height': 500,
		'left': 20,
		'top': 20,
		'width': 500,
		'directories': "no",
		'location': "no",
		'menubar': "yes",
		'resizable': "yes",
		'scrollbars': "yes",
		'status': "no",
		'titlebar': "yes",
		'toolbar': "no"
	}

	var sOptions = "";
	for (var index in default_args) {
		if (typeof options[index] == 'undefined') options[index] = default_args[index];
		sOptions = sOptions + index + "=" + options[index] + ",";
	}
	sOptions = sOptions.substr(0, sOptions.length - 1);

	newWindow = window.open(url, windowName, sOptions);
	if (newWindow) {
		if (window.focus) newWindow.focus();
		return false;
	} else {
		alert('Your browser does not allow pop up windows! Please change your browser settings.');
		return true;
	}
}

/* Need to confirm use of some of the following... some aren't in code but could be in the database? */
// Not seen in code
function openPrint(theURL, theWindow) {
	var options = {
		'height': 500,
		'width': 690,
		'resizable': "no"
	};
	openWindow(theURL, theWindow, options);
}

// Not seen in code
function openPDF(theURL, theWindow) {
	var options = {
		'height': 500,
		'width': 690
	};
	openWindow(theURL, theWindow, options);
}

function openHelp(theURL, theWindow) {
	var options = {
		'height': 250,
		'width': 260,
		'menubar': "no",
		'scrollbars': "no"
	};
	openWindow(theURL, theWindow, options);
}

// Not seen in code
function openCustomerScreen(theURL, theWindow) {
	var options = {
		'height': 250,
		'width': 260,
		'menubar': "no",
		'scrollbars': "no"
	};
	openWindow(theURL, theWindow, options);
}

function openQTR(theURL, theWindow) {
	var options = {
		'height': 550,
		'width': 750,
		'menubar': "no"
	};
	openWindow(theURL, theWindow, options);
}

function openHelpFullScreen(theURL, theWindow) {
	var options = {
		'height': 600,
		'width': 800,
		'menubar': "no"
	};
	openWindow(theURL, theWindow, options);
}

// Only found in HTML Sections of a couple of IT solutions...
function OpenPopup(sURL, sWindow, sParam) {
	TestString = 'failed';
	TestPopup = window.open(sURL, sWindow, sParam);
	TestString = TestPopup;
	if (TestString == 'failed' || TestString == null) {
		alert('Your browser does not allow pop up windows! Please change your browser settings.');
		return false;
	}
	else
		return true;
}

// Legacy: necessary until *all* labels that use it have been updated
function disclaimerOpen(pageName) {
	openDisclaimer(pageName);
}

function openDisclaimer(pageName, urlKey) {
	pageName = pageName.toLowerCase();
	var url, height, width;
	var options = {
		'menubar': "no"
	};

	if (!urlKey)
		urlKey = UrlKey;

	if (urlKey) {
		url = AppPath + "/" + urlKey + "/util/disclaimer.aspx";
	}
	else {
		url = "../util/disclaimer.aspx";
	}

	switch (pageName) {
		case "privacypolicy":
			url = url + "?type=privacy";
			options['height'] = 400;
			options['width'] = 530;
			break;
		case "termsofuse":
			url = url + "?type=terms";
			options['height'] = 400;
			options['width'] = 500;
			break;
		default:
			url = url + "?type=copyright";
			options['height'] = 300;
			options['width'] = 400;
			break;
	}
	if (typeof (LanguageId) != 'undefined')
		url = url + "&LanguageId=" + LanguageId;

	return openWindow(url, 'msDisclaimerWindow', options);
}


/* Toggle functions */

//addToggleToHeaderOnly(section) and function toggleHeader(section) are used by Fund Screener since
//section toggling is handled by jQuery function on that tool
//Could make this a bit neater but I guess we'll probably migrate toggling to jQuery anyway
//and eventually get rid of these functions
function addToggleToHeaderOnly(section) {
	var header = getElementById("ms_" + section + "_header");
	if (header) {
		addEvent(header, "click", function () { toggleHeader(section) });
		header.title = collapseLabel;
		applyClass(header, "pointer");

		var toggleImage = createElement("span");
		toggleImage.id = "ms_" + section + "_image";
		toggleImage.innerHTML = " ";
		toggleImage.className = "expandImage";

		var aSpans = getElementsByTagName(header, "span");

		if (aSpans.length == 0) {
			insertElement(header, toggleImage);
		} else {
			// assume that the first span holds the title
			insertElement(aSpans[0], toggleImage);
		}
	}
}

function toggleHeader(section) {
	var sectionHeader = getElementById("ms_" + section + "_header");
	var toggleImage = getElementById("ms_" + section + "_image");

	if (sectionHeader && toggleImage) {
		if (!elementHasClass(toggleImage, "collapseImage")) {
			sectionHeader.title = expandLabel;
			removeClass(toggleImage, "expandImage");
			applyClass(toggleImage, "collapseImage");
		} else {
			sectionHeader.title = collapseLabel;
			applyClass(toggleImage, "expandImage");
			removeClass(toggleImage, "collapseImage");
		}
	}
}


function addToggleToHeader(section, sectionContainer) {

	var header = getElementById("ms_" + section + "_header");
	if (header) {
		addEvent(header, "click", function () { toggleSection(section, sectionContainer) });
		header.title = collapseLabel;
		applyClass(header, "pointer");

		var toggleImage = createElement("span");
		toggleImage.id = "ms_" + section + "_image";
		toggleImage.innerHTML = " ";
		toggleImage.className = "expandImage";

		var aSpans = getElementsByTagName(header, "span");

		if (aSpans.length == 0) {
			insertElement(header, toggleImage);
		} else {
			// assume that the first span holds the title
			insertElement(aSpans[0], toggleImage);
		}
	}
}

//Assumes toggled section is contained by header
function toggleSection(section, sectionContainer) {

	var sectionHeader = getElementById("ms_" + section + "_header");

	if (sectionContainer === undefined) {
		sectionContent = getElementsByTagName(sectionHeader.parentNode, "div");
	}
	else {
		sectionContent = getElementsByTagName(getElementById(sectionContainer), "div");
	}

	var toggleImage = getElementById("ms_" + section + "_image");

	if (sectionContent && sectionHeader && toggleImage) {
		if (!elementHasClass(sectionContent[0], "hidden")) {
			showHide(sectionContent[0], "", "hide");
			sectionHeader.title = expandLabel;
			removeClass(toggleImage, "expandImage");
			applyClass(toggleImage, "collapseImage");
		} else {
			showHide(sectionContent[0], "", "show");
			sectionHeader.title = collapseLabel;
			applyClass(toggleImage, "expandImage");
			removeClass(toggleImage, "collapseImage");
		}
	}
}


function getAbsolutePos(el) {
	var r = { x: el.offsetLeft, y: el.offsetTop };
	if (el.offsetParent) {
		var tmp = getAbsolutePos(el.offsetParent);
		r.x += tmp.x;
		r.y += tmp.y;
	}
	return r;
}

function getURLParameter(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");

	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.href);

	if (results == null) return "";
	else return results[1];
}


/* Currency and Language switching */

/*function toolBarChangeCurrency(o){
var oldUrl = location.href,
params = getQueryParams(oldUrl),
idx = (oldUrl.indexOf('?') > -1) ? oldUrl.indexOf('?') : oldUrl.length,
newUrl = oldUrl.substring(0, idx) + '?curencyId=' + o.value;

for (var k in params){
if (!k.length) continue;
if (k.toLowerCase() == 'curencyid') continue;
newUrl += '&' + k + '=' + params[k];
}

window.location.href = newUrl;
}*/

function toolBarChangeLanguage(o) {
	var oldUrl = location.href,
		params = getQueryParams(oldUrl),
		idx = (oldUrl.indexOf('?') > -1) ? oldUrl.indexOf('?') : oldUrl.length,
		newUrl = oldUrl.substring(0, idx) + '?languageId=' + o.value;

	for (var k in params) {
		if (!k.length) continue;
		if (k.toLowerCase() == 'languageid') continue;
		newUrl += '&' + k + '=' + params[k];
	}

	window.location.href = newUrl;
}


/* Utility Functions */

function trim(text) {
	//trim whitespace from a string
	if (text != null) {
		text = text.replace(/^\s+/g, ''); //leading space
		return text.replace(/\s+$/g, ''); //trailing space
	}
	return text;
}

function elementHasClass(element, className) {
	//return true if the element has the given class name
	className = className.replace(/\-/g, '\\-');
	var re = new RegExp('(^|\\s)' + className + '(\\s|$)');
	return re.test(element.className);
}

function applyClass(element, className) {
	//add a class to an element
	if (!elementHasClass(element, className)) element.className += ' ' + className;
}

function removeClass(element, className) {
	//remove a class from an element
	className = className.replace(/\-/g, '\\-');
	var re = new RegExp('(^|\\s)' + className + '(\\s|$)');
	element.className = element.className.replace(re, '');
}

function getElementById(id) {
	//get element with a given id
	return (document.all) ? document.all[id] : document.getElementById(id);
}

function getElementsByTagName(container, tagName) {
	//get all html nodes of a given type within a given container
	if (container) return container.getElementsByTagName(tagName);
	else return new Array();
}

function getElementsByClassName(container, tagName, className) {
	//get all html nodes of a given type and class within a given container
	var elements = getElementsByTagName(container, tagName);
	var result = new Array();
	for (var i = 0; i < elements.length; i++) {
		var e = elements[i];
		if (elementHasClass(e, className)) result.push(e);
	}
	return result;
}

function addEvent(element, event, func) {
	//add an event to the specified element, preserving any existing events that are attached
	if (!element) return;
	if (element.addEventListener) {
		element.addEventListener(event, func, false);
		return true;
	} else {
		var oldFn = element['on' + event];
		var fn;
		if (oldFn) {
			fn = function () {
				return oldFn();
				return func();
			}
		} else {
			fn = func;
		}
		if (element.attachEvent) return element.attachEvent('on' + event, fn);
		else element['on' + event] = fn;
	}
}

function addLoadEvent(id, func) {
	//add an onload event which will fire once the given id is located within the document
	//this is more reliable than window.onload and will happen exactly when needed

	function loadEvent() {
		var element = getElementById(id);
		if (element) func(); else window.setTimeout(loadEvent, 2000);
	}

	loadEvent();

}

function createElement(tagName) {
	//create an html node of the specified type
	return document.createElement(tagName);
}

function createTextNode(text) {
	//create an html text node
	return document.createTextNode(text);
}

function replaceElement(element, replacement) {
	//replace an html node with the specified alternative
	if (element) element.parentNode.replaceChild(replacement, element);
}

function insertElement(parent, child) {
	//insert an html node within the specified parent, after the last child
	if (parent) parent.appendChild(child);
}

function removeElement(element) {
	//remove the specified node from the dom tree
	if (element && element.parentNode) element.parentNode.removeChild(element);
}

function insertElementBefore(element, before) {
	//insert an html node before the specified element
	if (before && before.parentNode) before.parentNode.insertBefore(element, before);
}

function insertElementAfter(element, after) {
	//insert an html node after the specified element
	if (after && after.parentNode) {
		if (after.nextSibling) insertElementBefore(element, after.nextSibling);
		else insertElement(after.parentNode, element);
	}
}

function setElementPosition(element, x, y) {
	//set the absolute (document relative) position of an element in pixels
	if (element.offsetParent) { // using ie's relative positioning model
		x -= getOffsetLeft(element.parentNode);
		y -= getOffsetTop(element.parentNode);
	}
	element.style.left = x + 'px';
	element.style.top = y + 'px';
}

function getOffsetTop(element) {
	//get the absolute (document relative) position of an element in pixels
	var o = element.offsetTop;
	while (element.offsetParent) {
		element = element.offsetParent
		o += element.offsetTop;
	}
	return o;
}

function getOffsetLeft(element) {
	//get the absolute (document relative) position of an element in pixels
	var o = element.offsetLeft;
	while (element.offsetParent) {
		element = element.offsetParent
		o += element.offsetLeft;
	}
	return o;
}

// NB: In the following function cssprop must be the javascript syntax rather than css, e.g. backgroundColor not background-color
function getStyle(el, cssprop) {
	if (el.currentStyle) //IE
		return el.currentStyle[cssprop];
	else if (document.defaultView && document.defaultView.getComputedStyle) //Firefox etc
		return document.defaultView.getComputedStyle(el, "")[cssprop];
	else //try and get inline style
		return el.style[cssprop];
}

function getQueryParams(query) {
	//decode query parameters into an associative array
	var params = new Object();
	if (!query) return params;
	var start = query.indexOf('?');
	if (start > -1) query = query.substr(start + 1);
	var paramArray = query.split("&");
	for (var i=0; i < paramArray.length; i++) {
	var param = paramArray[i];
		var splitPos = param.indexOf("=");
		var name = unescape(param.substring(0, splitPos));
		var value = unescape(param.substring(splitPos + 1));
		params[name] = value;
	}
	return params;
}

// Find and return the parent table row for the specified element.
function getParentRow(ele) {
	var e = ele.parentNode;
	while (e.nodeName.toUpperCase() != "TR")
		e = e.parentNode;
	return e;
}

function adjustChartIframeHeight(hd) {
	// Module 6 is for xray HTML reports
	// Module 64 is for xray in Portfolio Planner
	var iframeId = (ModuleId == "6" || ModuleId == "64") ? "interactiveChartIframe" : "SharePriceChartFrameITGrowthChart";
	var h = parseInt($('#' + iframeId).attr('height'));
	$('#' + iframeId).attr('height', h + hd);
}
