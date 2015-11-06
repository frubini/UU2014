/*
scaffolding Scripts File
Author: Eddie Machado

This file should contain any js scripts you want to add to the site.
Instead of calling it in the header or throwing it inside wp_head()
this file will be called automatically in the footer so as not to
slow the page load.

*/

// IE8 ployfill for GetComputed Style (for Responsive Script below)
if (!window.getComputedStyle) {
	window.getComputedStyle = function(el, pseudo) {
		this.el = el;
		this.getPropertyValue = function(prop) {
			var re = /(\-([a-z]){1})/g;
			if (prop == 'float') prop = 'styleFloat';
			if (re.test(prop)) {
				prop = prop.replace(re, function () {
					return arguments[2].toUpperCase();
				});
			}
			return el.currentStyle[prop] ? el.currentStyle[prop] : null;
		}
		return this;
	}
}

jQuery(document).ready(function($) {
  $('[data-toggle=offcanvas]').click(function() {
    $('.row-offcanvas').toggleClass('active');
  });
});

//Calculate the width of the scroll bar so css media queries and js widow.width match
function getScrollBarWidth () {
	var inner = document.createElement('p');
	inner.style.width = "100%";
	inner.style.height = "200px";

	var outer = document.createElement('div');
	outer.style.position = "absolute";
	outer.style.top = "0px";
	outer.style.left = "0px";
	outer.style.visibility = "hidden";
	outer.style.width = "200px";
	outer.style.height = "150px";
	outer.style.overflow = "hidden";
	outer.appendChild (inner);

	document.body.appendChild (outer);
	var w1 = inner.offsetWidth;
	outer.style.overflow = 'scroll';
	var w2 = inner.offsetWidth;
	if (w1 == w2) w2 = outer.clientWidth;

	document.body.removeChild (outer);

	return (w1 - w2);
};

// as the page loads, call these scripts
jQuery(document).ready(function($) {

	//ChosenJs Select Input - https://github.com/harvesthq/chosen for more info
	$("select").chosen({no_results_text: "Oops, nothing found!", width: "99.5%"});

	//Lightbox - http://dimsemenov.com/plugins/magnific-popup/
	// if($.fn.magnificPopup) {
	// 	$('a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], a[href*=".gif"]').magnificPopup({
	// 		type: 'image'
	// 	});
	// }

	//iCheck - http://fronteed.com/iCheck/
	if($.fn.iCheck) {
		$('input').iCheck({
			checkboxClass: 'icheckbox_square',
			radioClass: 'iradio_square',
			increaseArea: '20%' // optional
		});
	}

	//Responsive iFrames, Embeds and Objects - http://css-tricks.com/NetMag/FluidWidthVideo/Article-FluidWidthVideo.php
	var $allVideos = $("iframe[src*='youtube'], iframe[src*='hulu'], iframe[src*='revision3'], iframe[src*='vimeo'], iframe[src*='blip'], iframe[src*='dailymotion'], iframe[src*='funnyordie'], object, embed").wrap( "<figure></figure>" ),
	$fluidEl = $("figure");

	$allVideos.each(function() {
		$(this)
		// jQuery .data does not work on object/embed elements
		.attr('data-aspectRatio', this.height / this.width)
		.css({ 'max-width': this.width + 'px', 'max-height': this.height + 'px' })
		.removeAttr('height')
		.removeAttr('width');
	});
	$(window).resize(function() {
		var newWidth = $fluidEl.width();
		$allVideos.each(function() {
			var $el = $(this);
			$el
			.width(newWidth)
			.height(newWidth * $el.attr('data-aspectRatio'));
		});
	}).resize();

	/*
	Responsive jQuery is a tricky thing.
	There's a bunch of different ways to handle
	it, so be sure to research and find the one
	that works for you best.
	*/

	/* getting viewport width */
	var responsive_viewport = $(window).width() + getScrollBarWidth();
	var menu = $('#main-navigation > ul');

	/* responsive nav */
	$('.navbar-toggle').on('click', function(e) {
		$('body').toggleClass('menu-open');
	});

	$('.menu-item > .menu-button').on('click', function(e) {
		//$("ul.sub-menu").removeClass("sub-menu-open");
		$(this).next('.sub-menu').addClass('sub-menu-open');
	});

	$('.sub-menu .menu-back-button').on('click', function(e) {
		$(this).parent("li").parent('ul').removeClass("sub-menu-open");
	});

	$(window).resize(function(e) {
		if(Modernizr && Modernizr.touch) {
			e.preventDefault();
		}
		else {
			responsive_viewport = $(window).width() + getScrollBarWidth();
			if(responsive_viewport >= 768) {
				$('body').removeClass('menu-open');
			}
			else if(responsive_viewport < 768 && !menu.is(':hidden')) {
				$('body').removeClass('menu-open');
			}
		}
	});
	/*end responsive nav */

	/* if is below 481px */
	if (responsive_viewport < 481) {
		// if mobile device and not on the home page scroll to the content on page load
		if (!$('body').hasClass("home")){
			var new_position = jQuery('#main').offset();
			if (typeof new_position != 'undefined') {
				jQuery('html, body').animate({scrollTop:new_position.top}, 2000);
			}
		}
	} /* end smallest screen */

	/* if is smaller than 481px */
	if (responsive_viewport < 481) {}
	/* if is larger than 481px */
	if (responsive_viewport >= 481){}

	/* if is larger to 768px */
	if (responsive_viewport >= 767) {
		/* load gravatars */
		$('.comment img[data-gravatar]').each(function() {
			$(this).attr('src',$(this).attr('data-gravatar'));
		});
	}

	/* off the bat smaller screen actions */
	if (responsive_viewport < 1024) {}

	/* off the bat large screen actions */
	if (responsive_viewport >= 1024) {}

	// hide #back-top first
	$("#back-top").hide();

	// fade in #back-top
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 300) {
				$('#back-top').fadeIn();
			}
			else {
				$('#back-top').fadeOut();
			}
		});

		// scroll body to 0px on click
		$('#back-top a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});


/*  // Released under MIT license: http://www.opensource.org/licenses/mit-license.php
	$('[placeholder]').focus(function() {
		var input = $(this);
		if (input.val() == input.attr('placeholder')) {
			input.val('');
			input.removeClass('placeholder');
		}
	}).blur(function() {
		var input = $(this);
		if (input.val() == '' || input.val() == input.attr('placeholder')) {
			input.addClass('placeholder');
			input.val(input.attr('placeholder'));
		}
	}).blur().parents('form').submit(function() {
		$(this).find('[placeholder]').each(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
			}
		})
	});
*/
}); /* end of as page load scripts */


/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
*/
(function(w){
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ) {
		return;
	}
	var doc = w.document;
	if( !doc.querySelector ) {
		return;
	}
	var meta = doc.querySelector( "meta[name=viewport]" ),
		initialContent = meta && meta.getAttribute( "content" ),
		disabledZoom = initialContent + ",maximum-scale=1",
		enabledZoom = initialContent + ",maximum-scale=10",
		enabled = true,
		x, y, z, aig;
	if( !meta ) {
		return;
	}
	function restoreZoom() {
		meta.setAttribute( "content", enabledZoom );
		enabled = true;
	}
	function disableZoom() {
		meta.setAttribute( "content", disabledZoom );
		enabled = false;
	}
	function checkTilt( e ) {
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
		// If portrait orientation and in one of the danger zones
		if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ) {
			if( enabled ){
				disableZoom();
			}
		}
		else if( !enabled ) {
			restoreZoom();
		}
	}
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );
})( this );

/*
	Add a class with the height of .page-title h1 when it exceeds 70px
	*/

jQuery(window).resize(function(){

	var max = 71;
	var height = jQuery('.page-title h1').outerHeight();

	if (height >= max) {
        jQuery('.page-title h1').removeClass();
        jQuery('.page-title h1').addClass(function() {
        	return "height-" + height;
        });
        jQuery('.page-header-placeholder').attr('class', 'page-header-placeholder');
        jQuery('.page-header-placeholder').addClass(function() {
        	return "height-" + height;
        });
    }
	
});



jQuery(window).load(function() {
    if(document.querySelector('#masonry')) { 
      // MASSONRY Without jquery
      var container = document.querySelector('#masonry');
      var msnry = new Masonry( container, {
        itemSelector: '.masonry-item',
        columnWidth: '.masonry-item',                
      });  
    } 
});

jQuery('.carousel-pause-btn').click(function() {
  jQuery('#uu2014carousel').carousel('pause');
});

jQuery('.carousel-play-btn').click(function() {
  //jQuery('#uu2014carousel').data('bs.carousel').options.interval=1000;
  jQuery('#uu2014carousel').carousel('cycle');
});

jQuery(document).ready(function() {
  var anchor = window.location.hash;
  jQuery(anchor).collapse('toggle');
});

      

