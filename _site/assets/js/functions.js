$(document).ready(function(){
  smoothScroll(300);
  // setInterval(function(){articleTada()}, 4000);
  webModalPop();
  mobileNav();
});

function mobileNav() {
  $('.mobile-nav-toggle').on('click', function(){
    var status = $(this).hasClass('is-open');
    if(status){ $('.mobile-nav-toggle, .mobile-nav').removeClass('is-open'); }
    else { $('.mobile-nav-toggle, .mobile-nav').addClass('is-open'); }
  });
}

function webModalPop() {
  // clicking modals
  $('.modalTrigger').click(function() {

      $('.modal#webproj').css('display','block');
      return false

  });

  $('.close#01').click(function(){

    $('.modal#webproj').hide();

  });

  $('.modAboutTrigger').click(function() {

      $('.modal#myabout').css('display','block');
      return false

  });

  $('.close#02').click(function(){

    $('.modal#myabout').hide();

  });
}

function smoothScroll () {
	$('a[href^="#"]').on('click', function(event) {

	    var target = $( $(this).attr('href') );

	    if( target.length ) {
	        event.preventDefault();
	        $('html, body').animate({
	            scrollTop: target.offset().top
	        }, 500);
	    }
	});
}
