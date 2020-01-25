// detecting mobile from https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
'use strict';

function detectmob() {
	if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
		return true;
	} else {
		return false;
	}
}

// Odometer
var a = 0;
if ($("#counter").length !== 0) {
	$(window).scroll(function () {
		var oTop = $('#counter').offset().top - window.innerHeight;
		if (a === 0 && $(window).scrollTop() > oTop) {
			setTimeout(function () {
				odometer1.innerHTML = 12;
				odometer2.innerHTML = 94;
				odometer3.innerHTML = 42;
			}, 100);
			$('.counter-value').each(function () {
				var $this = $(this),
				    countTo = $this.attr('data-count');
				$({
					countNum: $this.text()
				}).animate({
					countNum: countTo
				}, {

					duration: 8000,
					easing: 'swing',
					step: function step() {
						$this.text(Math.floor(this.countNum));
					},
					complete: function complete() {
						$this.text(this.countNum);
						//alert('finished');
					}

				});
			});
			$('.counter-decimals').each(function () {
				var $this = $(this),
				    countTo = $this.attr('data-count');
				$({
					countNum: $this.text()
				}).animate({
					countNum: countTo
				}, {
					duration: 8000,
					easing: 'swing',
					step: function step() {
						$this.text(Math.ceil(this.countNum * 100) / 100) * 2;
					},
					complete: function complete() {
						$this.text(Math.ceil(this.countNum * 100) / 100);
					}

				});
			});
			a = 1;
		}
	});
}

// Fancy Menu Hover Effect With CSS & JavaScript
// https://codepen.io/tutsplus/pen/XMPQGV
$(function () {

	var target = document.querySelector(".target");
	var links = document.querySelectorAll(".hover-nav a");
	var colors = ["#F39608"];

	function mouseenterFunc() {
		target.style.opacity = "1";
		if (!this.parentNode.classList.contains("hover-active")) {
			for (var _i = 0; _i < links.length; _i++) {
				if (links[_i].parentNode.classList.contains("hover-active")) {
					links[_i].parentNode.classList.remove("hover-active");
				}
				links[_i].style.opacity = "1";
			}

			this.parentNode.classList.add("hover-active");
			this.style.opacity = "1";

			var width = this.getBoundingClientRect().width;
			var height = this.getBoundingClientRect().height;
			var left = this.getBoundingClientRect().left + window.pageXOffset;
			var color = colors[Math.floor(Math.random() * colors.length)];

			target.style.width = width + 'px';
			target.style.height = height + 'px';
			target.style.left = left + 'px';
			target.style.borderColor = color;
			target.style.transform = "none";
		}
	}

	function mouseexitFunc() {
		if (this.parentNode.classList.contains("hover-active")) {
			target.style.opacity = "0";
		} else {
			target.style.opacity = "1";
		}
	}

	for (var _i2 = 0; _i2 < links.length; _i2++) {
		// links[i].addEventListener("click", (e) => e.preventDefault());
		links[_i2].addEventListener("mouseenter", mouseenterFunc);
		links[_i2].addEventListener("mouseleave", mouseexitFunc);
	}

	function resizeFunc() {
		var active = document.querySelector(".hover-nav li.hover-active");

		if (active) {
			var left = active.getBoundingClientRect().left + window.pageXOffset;
			var _top = active.getBoundingClientRect().top + window.pageYOffset;

			target.style.left = left + '\n            px';
			// target.style.top = `${top}px`;
		}
	}

	window.addEventListener("resize", resizeFunc);
});

// Colorful Rainbow Text Animation
// From // From https://codepen.io/joashp/pen/dYXNwj
$('.rainbow-text').html(function (i, html) {
	var chars = $.trim(html).split("");

	return '<span>' + chars.join('</span><span>') + '</span>';
});

// Backgrund Color Changin'
// from https://codepen.io/alexzaworski/pen/mEkvAG

//  Animated Headlines
//  From https://codyhouse.co/demo/animated-headlines/index.html
jQuery(document).ready(function ($) {
	//set animation timing
	var animationDelay = 2500,
	   
	//loading bar effect
	barAnimationDelay = 3800,
	    barWaiting = barAnimationDelay - 3000,
	    //3000 is the duration of the transition on the loading bar - set in the scss/css file
	//letters effect
	lettersDelay = 50,
	   
	//type effect
	typeLettersDelay = 150,
	    selectionDuration = 500,
	    typeAnimationDelay = selectionDuration + 800,
	   
	//clip effect
	revealDuration = 600,
	    revealAnimationDelay = 1500;

	initHeadline();

	function initHeadline() {
		//insert <i> element for each letter of a changing word
		singleLetters($('.cd-headline.letters').find('b'));
		//initialise headline animation
		animateHeadline($('.cd-headline'));
	}

	function singleLetters($words) {
		$words.each(function () {
			var word = $(this),
			    letters = word.text().split(''),
			    selected = word.hasClass('is-visible');
			for (i in letters) {
				if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
				letters[i] = selected ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
			}
			var newLetters = letters.join('');
			word.html(newLetters).css('opacity', 1);
		});
	}

	function animateHeadline($headlines) {
		var duration = animationDelay;
		$headlines.each(function () {
			var headline = $(this);

			if (headline.hasClass('loading-bar')) {
				duration = barAnimationDelay;
				setTimeout(function () {
					headline.find('.cd-words-wrapper').addClass('is-loading');
				}, barWaiting);
			} else if (headline.hasClass('clip')) {
				var spanWrapper = headline.find('.cd-words-wrapper'),
				    newWidth = spanWrapper.width() + 10;
				spanWrapper.css('width', newWidth);
			} else if (!headline.hasClass('type')) {
				//assign to .cd-words-wrapper the width of its longest word
				var words = headline.find('.cd-words-wrapper b'),
				    width = 0;
				words.each(function () {
					var wordWidth = $(this).width();
					if (wordWidth > width) width = wordWidth;
				});
				headline.find('.cd-words-wrapper').css('width', width);
			}

			//trigger animation
			setTimeout(function () {
				hideWord(headline.find('.is-visible').eq(0));
			}, duration);
		});
	}

	function hideWord($word) {
		var nextWord = takeNext($word);

		if ($word.parents('.cd-headline').hasClass('type')) {
			var parentSpan = $word.parent('.cd-words-wrapper');
			parentSpan.addClass('selected').removeClass('waiting');
			setTimeout(function () {
				parentSpan.removeClass('selected');
				$word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
			}, selectionDuration);
			setTimeout(function () {
				showWord(nextWord, typeLettersDelay);
			}, typeAnimationDelay);
		} else if ($word.parents('.cd-headline').hasClass('letters')) {
			var bool = $word.children('i').length >= nextWord.children('i').length ? true : false;
			hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
			showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);
		} else if ($word.parents('.cd-headline').hasClass('clip')) {
			$word.parents('.cd-words-wrapper').animate({ width: '2px' }, revealDuration, function () {
				switchWord($word, nextWord);
				showWord(nextWord);
			});
		} else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
			$word.parents('.cd-words-wrapper').removeClass('is-loading');
			switchWord($word, nextWord);
			setTimeout(function () {
				hideWord(nextWord);
			}, barAnimationDelay);
			setTimeout(function () {
				$word.parents('.cd-words-wrapper').addClass('is-loading');
			}, barWaiting);
		} else {
			switchWord($word, nextWord);
			setTimeout(function () {
				hideWord(nextWord);
			}, animationDelay);
		}
	}

	function showWord($word, $duration) {
		if ($word.parents('.cd-headline').hasClass('type')) {
			showLetter($word.find('i').eq(0), $word, false, $duration);
			$word.addClass('is-visible').removeClass('is-hidden');
		} else if ($word.parents('.cd-headline').hasClass('clip')) {
			$word.parents('.cd-words-wrapper').animate({ 'width': $word.width() + 10 }, revealDuration, function () {
				setTimeout(function () {
					hideWord($word);
				}, revealAnimationDelay);
			});
		}
	}

	function hideLetter($letter, $word, $bool, $duration) {
		$letter.removeClass('in').addClass('out');

		if (!$letter.is(':last-child')) {
			setTimeout(function () {
				hideLetter($letter.next(), $word, $bool, $duration);
			}, $duration);
		} else if ($bool) {
			setTimeout(function () {
				hideWord(takeNext($word));
			}, animationDelay);
		}

		if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
			var nextWord = takeNext($word);
			switchWord($word, nextWord);
		}
	}

	function showLetter($letter, $word, $bool, $duration) {
		$letter.addClass('in').removeClass('out');

		if (!$letter.is(':last-child')) {
			setTimeout(function () {
				showLetter($letter.next(), $word, $bool, $duration);
			}, $duration);
		} else {
			if ($word.parents('.cd-headline').hasClass('type')) {
				setTimeout(function () {
					$word.parents('.cd-words-wrapper').addClass('waiting');
				}, 200);
			}
			if (!$bool) {
				setTimeout(function () {
					hideWord($word);
				}, animationDelay);
			}
		}
	}

	function takeNext($word) {
		return !$word.is(':last-child') ? $word.next() : $word.parent().children().eq(0);
	}

	function takePrev($word) {
		return !$word.is(':first-child') ? $word.prev() : $word.parent().children().last();
	}

	function switchWord($oldWord, $newWord) {
		$oldWord.removeClass('is-visible').addClass('is-hidden');
		$newWord.removeClass('is-hidden').addClass('is-visible');
	}
});

var isEdge = window.navigator.userAgent.indexOf("Edge") > -1;
var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

if (isEdge) {
	$(".quote-form").css("background", "white");
}

if ($(".paroller").length !== 0) {
	$(window).on('resize', function () {
		if (window.matchMedia("(min-width: 1200px)").matches && !isEdge && !isFirefox) {
			// initialize paroller.js
			$("[data-paroller-factor]").paroller();

			// Vertical Parallax 0.01
			$(".vpara01, [data-paroller-factor]").paroller({
				factor: 0.01, // multiplier for scrolling speed and offset
				direction: 'vertical', // vertical, horizontal
				transition: 'transform 1.1s cubic-bezier(.27,.93,.92,.87)' // CSS transition
			});

			// Vertical Parallax 0.03
			$(".vpara03, [data-paroller-factor]").paroller({
				factor: 0.03, // multiplier for scrolling speed and offset
				type: 'foreground', // background, foreground
				direction: 'vertical', // vertical, horizontal
				transition: 'transform 1.1s cubic-bezier(.27,.93,.92,.87)' // CSS transition
			});

			// Vertical Parallax 0.04
			$(".vpara04, [data-paroller-factor]").paroller({
				factor: 0.04, // multiplier for scrolling speed and offset
				type: 'foreground', // background, foreground
				direction: 'vertical', // vertical, horizontal
				transition: 'transform 1.1s cubic-bezier(.27,.93,.92,.87)' // CSS transition
			});

			// Vertical Parallax 0.045
			$(".vpara045, [data-paroller-factor]").paroller({
				factor: 0.045, // multiplier for scrolling speed and offset
				type: 'foreground', // background, foreground
				direction: 'vertical', // vertical, horizontal
				transition: 'transform 1.1s cubic-bezier(.27,.93,.92,.87)' // CSS transition
			});

			// Vertical Parallax 0.05
			$(".vpara05, [data-paroller-factor]").paroller({
				factor: 0.05, // multiplier for scrolling speed and offset
				type: 'foreground', // background, foreground
				direction: 'vertical', // vertical, horizontal
				transition: 'transform 1.1s cubic-bezier(.27,.93,.92,.87)' // CSS transition
			});

			// Vertical Parallax 0.05
			$(".vpara055, [data-paroller-factor]").paroller({
				factor: 0.055, // multiplier for scrolling speed and offset
				type: 'foreground', // background, foreground
				direction: 'vertical', // vertical, horizontal
				transition: 'transform 1.1s cubic-bezier(.27,.93,.92,.87)' // CSS transition
			});

			// Vertical Parallax 0.06
			$(".vpara06, [data-paroller-factor]").paroller({
				factor: 0.06, // multiplier for scrolling speed and offset
				type: 'foreground', // background, foreground
				direction: 'vertical', // vertical, horizontal
				transition: 'transform 1.1s cubic-bezier(.27,.93,.92,.87)' // CSS transition
			});

			// Vertical Parallax 0.065
			$(".vpara065, [data-paroller-factor]").paroller({
				factor: 0.065, // multiplier for scrolling speed and offset
				type: 'foreground', // background, foreground
				direction: 'vertical', // vertical, horizontal
				transition: 'transform 1.1s cubic-bezier(.27,.93,.92,.87)' // CSS transition
			});

			// Vertical Parallax 0.07
			$(".vpara07, [data-paroller-factor]").paroller({
				factor: 0.07, // multiplier for scrolling speed and offset
				type: 'foreground', // background, foreground
				direction: 'vertical', // vertical, horizontal
				transition: 'transform 1.1s cubic-bezier(.27,.93,.92,.87)' // CSS transition
			});

			// Vertical Parallax 0.09
			$(".vpara09, [data-paroller-factor]").paroller({
				factor: 0.09, // multiplier for scrolling speed and offset
				type: 'foreground', // background, foreground
				direction: 'vertical', // vertical, horizontal
				transition: 'transform 1.1s cubic-bezier(.27,.93,.92,.87)' // CSS transition
			});

			// Vertical Parallax 0.1
			$(".vpara1, [data-paroller-factor]").paroller({
				factor: 0.1, // multiplier for scrolling speed and offset
				type: 'foreground', // background, foreground
				direction: 'vertical', // vertical, horizontal
				transition: 'transform 1.1s cubic-bezier(.27,.93,.92,.87)' // CSS transition
			});

			// Vertical Parallax 0.12
			$(".vpara12, [data-paroller-factor]").paroller({
				factor: 0.12, // multiplier for scrolling speed and offset
				type: 'foreground', // background, foreground
				direction: 'vertical', // vertical, horizontal
				transition: 'transform 1.1s cubic-bezier(.27,.93,.92,.87)' // CSS transition
			});

			// Horizontal parallax 0.03
			$(".hpara1, [data-paroller-factor]").paroller({
				factor: 0.03, // multiplier for scrolling speed and offset
				type: 'foreground', // background, foreground
				direction: 'horizontal', // vertical, horizontal
				transition: 'transform 2.5s cubic-bezier(.27,.93,.92,.87)' // CSS transition
			});

			// Horizontal parallax -0.03
			$(".hpara2, [data-paroller-factor]").paroller({
				factor: -0.03, // multiplier for scrolling speed and offset
				type: 'foreground', // background, foreground
				direction: 'horizontal', // vertical, horizontal
				transition: 'transform 2.5s cubic-bezier(.27,.93,.92,.87)' // CSS transition
			});
		} else {
				$(".paroller, [data-paroller-factor]").paroller({
					factor: 0,
					type: 'foreground', // background, foreground
					direction: 'horizontal', // vertical, horizontal
					transition: 'transform 2.5s cubic-bezier(.27,.93,.92,.87)' // CSS transition
				});
				$(".paroller").each(function () {
					$(this).css("transform", "unset");
				});
			}
	}).trigger('resize');
}

if (!detectmob()) {
	// Text fading in on mousemove from https://codepen.io/chris_tudor/pen/bZWoyG
	if ($(".fade-in-mouse-move").length !== 0) {
		var timeout;
		var opacity = 0.2;
		document.onmousemove = function () {
			opacity = opacity + 0.003;
			opacity = opacity > 1 ? 1 : opacity + 0.003;
			$('.fade-in-mouse-move').css('opacity', opacity);
		};
	}
} else {
	if ($(".fade-in-mouse-move").length !== 0) {
		$('.fade-in-mouse-move').css('opacity', 1);
	}
}

//Fullscreen Overlay Styles & Effects
// [Article on Codrops](http://tympanus.net/codrops/?p=18459)
// [Demo](http://tympanus.net/Development/FullscreenOverlayStyles/)

(function () {
	var triggerBttn = document.getElementById('trigger-overlay'),
	    overlay = document.querySelector('div.overlay'),
	    closeBttn = overlay.querySelector('button.overlay-close');
	var transEndEventNames = {
		'WebkitTransition': 'webkitTransitionEnd',
		'MozTransition': 'transitionend',
		'OTransition': 'oTransitionEnd',
		'msTransition': 'MSTransitionEnd',
		'transition': 'transitionend'
	},
	    transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
	    support = { transitions: Modernizr.csstransitions };

	function toggleOverlay() {
		if (classie.has(overlay, 'open')) {
			classie.remove(overlay, 'open');
			classie.add(overlay, 'close');
			var onEndTransitionFn = function onEndTransitionFn(ev) {
				if (support.transitions) {
					if (ev.propertyName !== 'visibility') return;
					this.removeEventListener(transEndEventName, onEndTransitionFn);
				}
				classie.remove(overlay, 'close');
			};
			if (support.transitions) {
				overlay.addEventListener(transEndEventName, onEndTransitionFn);
			} else {
				onEndTransitionFn();
			}
		} else if (!classie.has(overlay, 'close')) {
			classie.add(overlay, 'open');
		}
	}

	triggerBttn.addEventListener('click', toggleOverlay);
	closeBttn.addEventListener('click', toggleOverlay);
})();

//Text Input Effects
//==================
//
//Simple styles and effects for enhancing text input interactions.
//
//[Article on Codrops](http://tympanus.net/codrops/?p=21991)
//
//[Demo](http://tympanus.net/Development/TextInputEffects/)
(function () {
	// trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
	if (!String.prototype.trim) {
		(function () {
			// Make sure we trim BOM and NBSP
			var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
			String.prototype.trim = function () {
				return this.replace(rtrim, '');
			};
		})();
	}

	[].slice.call(document.querySelectorAll('input.input__field')).forEach(function (inputEl) {
		// in case the input is already filled..
		if (inputEl.value.trim() !== '') {
			classie.add(inputEl.parentNode, 'input--filled');
		}

		// events:
		inputEl.addEventListener('focus', onInputFocus);
		inputEl.addEventListener('blur', onInputBlur);
	});

	function onInputFocus(ev) {
		classie.add(ev.target.parentNode, 'input--filled');
	}

	function onInputBlur(ev) {
		if (ev.target.value.trim() === '') {
			classie.remove(ev.target.parentNode, 'input--filled');
		}
	}
})();

if ($("#scroll-arrow").length !== 0) {
	// demo:CSS scroll down button from https://codepen.io/nxworld/pen/OyRrGy
	$(function () {
		$('a[href*=\\#]').on('click', function (e) {
			e.preventDefault();
			$('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 500, 'linear');
		});
	});
}

$(window).on('resize', function () {
	$.fn.equalHeights = function () {
		var max_height = 133;
		$(this).each(function () {
			$(this).css('height', '100%');
			max_height = Math.max($(this).height(), max_height);
			$(this).height(max_height);
		});
	};
	(function () {
		$('.match-height').equalHeights();
	})();
}).trigger('resize');

var forEach = function forEach(t, o, r) {
	if ("[object Object]" === Object.prototype.toString.call(t)) for (var c in t) Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t);else for (var e = 0, l = t.length; l > e; e++) o.call(r, t[e], e, t);
};

var hamburgers = document.querySelectorAll(".hamburger");
if (hamburgers.length > 0) {
	forEach(hamburgers, function (hamburger) {
		hamburger.addEventListener("click", function () {
			this.classList.toggle("is-active");
		}, false);
	});
}

$(document).ready(function () {
	// Proximity for the propellor
	if ($('#propellor').length) {
		(function () {
			var mX,
			    mY,
			    distance,
			    $element = $('#propellor');
			// proximity threshold
			var proximity = 100;
			function calculateDistance(elem, mouseX, mouseY) {
				return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left + elem.width() / 2), 2) + Math.pow(mouseY - (elem.offset().top + elem.height() / 2), 2))) - Math.round(elem.width() / 2);
			}

			$(document).mousemove(function (e) {
				mX = e.pageX;
				mY = e.pageY;
				distance = calculateDistance($element, mX, mY);

				if (distance < proximity) {
					$element.addClass("triggered");
				} else {
					$element.removeClass("triggered");
				}
			});
		})();
	}
});

