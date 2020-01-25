/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
'use strict';

{
	(function () {
		setTimeout(function () {
			return document.body.classList.add('render');
		}, 60);
		var navdemos = Array.from(document.querySelectorAll('nav.demos > .demo'));
		var total = navdemos.length;
		var current = navdemos.findIndex(function (el) {
			return el.classList.contains('demo--current');
		});
		var navigate = function navigate(linkEl) {
			document.body.classList.remove('render');
			document.body.addEventListener('transitionend', function () {
				return window.location = linkEl.href;
			});
		};
		navdemos.forEach(function (link) {
			return link.addEventListener('click', function (ev) {
				ev.preventDefault();
				navigate(ev.target);
			});
		});
	})();
}

