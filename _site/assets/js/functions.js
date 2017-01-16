$(function() {
  smoothScroll(300);
  setInterval(function(){articleTada()}, 4000);
  designImagePop();
  mobileNav();
});

function mobileNav() {
  $('.mobile-nav-toggle').on('click', function(){
    var status = $(this).hasClass('is-open');
    if(status){ $('.mobile-nav-toggle, .mobile-nav').removeClass('is-open'); }
    else { $('.mobile-nav-toggle, .mobile-nav').addClass('is-open'); }
  });
}


function smoothScroll (duration) {
	$('a[href^="#"]').on('click', function(event) {

	    var target = $( $(this).attr('href') );

	    if( target.length ) {
	        event.preventDefault();
	        $('html, body').animate({
	            scrollTop: target.offset().top
	        }, duration);
	    }
	});
}

function designImagePop() {
  // clicking modals
  $('.premodal#01').click(function() {

      $('.modal#img01').css('display','block');
      return false

  });

  $('.premodal#02').click(function() {

      $('.modal#img02').css('display','block');
      return false

  });

  $('.premodal#03').click(function() {

      $('.modal#img03').css('display','block');
      return false

  });

  $('.premodal#04').click(function() {

      $('.modal#img04').css('display','block');
      return false

  });

  $('.premodal#05').click(function() {

      $('.modal#img05').css('display','block');
      return false

  });
  // closing modals
  $('.close').click(function(){

    $('.modal#img01').hide();

  });

  $('.close').click(function(){

    $('.modal#img02').hide();
  });

  $('.close').click(function(){

    $('.modal#img03').hide();
  });

  $('.close').click(function(){

    $('.modal#img04').hide();
  });
  $('.close').click(function(){

    $('.modal#img05').hide();
  });

}

function articleTada(){
  var randNum = Math.floor(Math.random() * $('.article-thumb').length) +1
  $('.article-thumb').eq(randNum).addClass('is-emph')
    .siblings().removeClass('is-emph');
}

$(window).scroll(function() {
  youtubeVidScroll();
  startDesigning();
  startArticles();
});

function youtubeVidScroll() {

  var wScroll = $(window).scrollTop();

  $('.video-strip').css('background-position','center -'+ wScroll +'px');
}

function startArticles(){
  var wScroll = $(window).scrollTop();

  if($('section.articles').offset().top - $(window).height()/2 < wScroll) {
    $('.article-thumb').each(function(i){
      setTimeout(function(){
        $('.article-thumb').eq(i).addClass('is-visible');
      }, 200 * i);
    });
  }
}

function startDesigning() {

  var wScroll = $(window).scrollTop();

  if($('section.design').offset().top - $(window).height()/2 < wScroll) {
    $('.works').addClass('launched');
    //etTimeout(function(){
      //$('.face:nth-child(3)').addClass('has-bubble-open')
    //}, 400);
  }

}
