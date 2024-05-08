var active = '1'; //active slide, set to home to start
var menuState = 'closed';
var videoState = 'closed';

function showSlide(pageID, TargetPageID) {

	active = TargetPageID;//set the active slide 

	[].forEach.call(document.querySelectorAll('.overlay'), function (el) {
		el.style.display = 'none';
		menuState = 'closed';
		videoState = 'closed';
	});

	if (TargetPageID == '4') {

		var slide4 = document.getElementById('Slide' + TargetPageID + '-Page1');
		slide4.style.display = 'block';

		var out = document.getElementById('Slide' + TargetPageID).getElementsByClassName('content-slide-out');
		[].forEach.call(out, function (el) {
			el.style.display = "block";
		})

		var Contentin = document.getElementById('Slide' + TargetPageID).getElementsByClassName('content-slide-in');
		[].forEach.call(Contentin, function (el) {
			el.style.display = "none"
		})

	}

	var current = document.getElementById('Slide' + pageID);
	var target = document.getElementById('Slide' + TargetPageID);

	if (pageID != TargetPageID) {
		exitSlide(pageID)
		setTimeout(() => {
			enterSlide(TargetPageID)
		}, 700)
	}

	if (pageID == TargetPageID)
		enterSlide(TargetPageID)


}

function exitSlide(pageID) {

	var current = document.getElementById('Slide' + pageID);
	var animations = current.getElementsByClassName('animated');

	if (pageID == '6') {
		var logos = current.getElementsByClassName('inside-logo');
		var content = current.getElementsByClassName('description');

		[].forEach.call(logos, function (el) {

			el.classList.remove('inactive');

		});

		[].forEach.call(content, function (el) {

			el.style.display = "none"; //hide all business line descriptions

		});

	}

	[].forEach.call(animations, function (el) {

		var exit = el.getAttribute('exit');
		el.classList.add(exit)

	})

	//remove exits 
	setTimeout(() => {
		current.style.display = "none";
		[].forEach.call(animations, function (el) {

			var exit = el.getAttribute('exit');
			el.classList.remove(exit)
		})
	}, 700);

}

function enterSlide(pageID) {

	var current = document.getElementById('Slide' + pageID);
	var animations = current.getElementsByClassName('animated');

	current.style.display = "block";

	[].forEach.call(animations, function (el) {

		var enter = el.getAttribute('enter');
		el.classList.add(enter)

	})

	//remove enters 
	setTimeout(() => {
		[].forEach.call(animations, function (el) {

			var enter = el.getAttribute('enter');
			el.classList.remove(enter)
		})
	}, 2000);

}

function showSlidefromNav(pageID) {
	showSlide(active, pageID)
}

function showSlidefromTOC(startID,pageID,mainID) {

	[].forEach.call(document.querySelectorAll('.overlay'), function (el) {
		el.style.display = 'none';
		menuState = 'closed';
		videoState = 'closed';
	});

	showSlide(active, mainID)

	setTimeout(() => {
		slideInner(startID,pageID, mainID)
	},2000)

}

function showSlidefromMenu(pageID) {

	var menu = document.getElementById('TOC');
	var close = document.getElementById('TOCClose');

	menu.classList.remove('square-in')
	menu.style.display = 'none';

	setTimeout(() => {
		menu.classList.remove('square-out')
	}, 500)

	showSlide(active, pageID)
}

function slideInner(pageID, TargetPageID, mainID) {

	var current = document.getElementById('Slide' + mainID);

	//slide out content
	var out = current.getElementsByClassName('content-slide-out');
	[].forEach.call(out, function (el) {
		el.classList.add('wipe-out-down');
		setTimeout(() => {
			el.style.display = "none"
		}, 1000);
		setTimeout(() => {
			el.classList.remove('wipe-out-down');
		}, 1200);
	})

	//slide in new content
	var Contentin = current.getElementsByClassName('content-slide-in');
	[].forEach.call(Contentin, function (el) {

		setTimeout(() => {
			el.style.display = "block"
			el.classList.add('wipe-in-up');
		}, 1000);

		setTimeout(() => {
			el.classList.remove('wipe-in-up');
		}, 1200);

	})

	var items = document.getElementById("InnerNav-List").getElementsByTagName('li');
	[].forEach.call(items, function (el) {
		var target = el.getAttribute('target');
		if (target == TargetPageID)
			el.classList.add('active');
	})


	showSlide(pageID, TargetPageID)

}

function showOverlay(TargetID) {
	[].forEach.call(document.querySelectorAll('.overlay'), function (el) {
		el.style.display = 'none';
		menuState = 'closed';
	});

	var overlay = document.getElementById(TargetID);

	overlay.style.display = 'block';
	overlay.classList.add('fade-in');


	[].forEach.call(overlay.getElementsByClassName('overlay-content'), function (el) {

		el.classList.add('bounce-in-right')

	});

	var close = document.getElementById(TargetID + "Close");

	close.onclick = function () {
		overlay.classList.add('fade-out-bck')
		overlay.classList.remove('fade-in-slow')
		overlay.style.display = 'none';

		setTimeout(() => {
			overlay.classList.remove('fade-out-bck')
		}, 500)
	}

	window.onclick = function (event) {
		if (event.target == overlay) {
			overlay.classList.add('fade-out-bck')
			overlay.classList.remove('fade-in-slow')
			overlay.style.display = 'none';

			setTimeout(() => {
				overlay.classList.remove('fade-out-bck')
			}, 500)

		}
	}

	document.onkeydown = function (event) {
		if (event.key === "Escape" || event.key === "Esc") {
			overlay.classList.add('fade-out-bck')
			overlay.classList.remove('fade-in-slow')
			overlay.style.display = 'none';

			setTimeout(() => {
				overlay.classList.remove('fade-out-bck')
			}, 500)

		}
	}

}

function showMenu() {

	var menu = document.getElementById('TOC');
	var close = document.getElementById('TOCClose')

	if (menuState == 'closed') {
		menuState = 'open';
		[].forEach.call(document.querySelectorAll('.overlay'), function (el) {
			el.style.display = 'none';
		});;

		menu.style.display = 'block';
		menu.classList.add('square-in');

	} else {

		menuState = 'closed';
		menu.classList.add('square-out')
		menu.classList.remove('square-in')
		menu.style.display = 'none';

		setTimeout(() => {
			menu.classList.remove('square-out')
		}, 500)

	}

	close.onclick = function () {
		menu.classList.add('square-out')
		menu.classList.remove('square-in')
		menu.style.display = 'none';

		setTimeout(() => {
			menu.classList.remove('square-out')
		}, 500)
	}

	document.onkeydown = function (event) {
		if (event.key === "Escape" || event.key === "Esc") {
			menu.classList.add('square-out')
			menu.classList.remove('square-in')
			menu.style.display = 'none';

			setTimeout(() => {
				menu.classList.remove('square-out')
			}, 500)

		}
	}


}

function showBL(bl, pageID, element) {

	var current = document.getElementById('Slide' + pageID);
	var bl = document.getElementById(bl);

	var content = current.getElementsByClassName('description');
	var logos = current.getElementsByClassName('inside-logo');

	[].forEach.call(content, function (el) {

		el.style.display = "none"; //hide all business line descriptions

	});

	[].forEach.call(logos, function (el) {

		el.classList.add('inactive');

	});

	element.classList.remove('inactive')

	var content = current.getElementsByClassName('animated');

	[].forEach.call(content, function (el) {

		bl.style.display = "block";
		bl.classList.add('wipe-in-down-lazy')

	});



}


function showVideo(videoID) {

	var video = document.getElementById(videoID);

	if (videoState == 'closed') {
		videoState = 'open';
		video.style.display = "block";
		video.classList.add('wipe-in-up')

		setTimeout(() => {
			video.classList.remove('wipe-in-up')
		}, 500)

	} else {

		videoState = 'closed';
		video.classList.add('wipe-out-down')

		setTimeout(() => {
			video.classList.remove('wipe-out-down')
			video.style.display = "none";
		}, 500)

	}


}