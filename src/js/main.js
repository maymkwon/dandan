var page = '.navbar-nav li a'
// $(document).ready(function(){
//     $('#carouselHacked').carousel({
//          interval: 1000
//          ///1000이 1초
//     });
// });
$(document).on('click', page , function(event){
    history.pushState(null, null, event.target.href);
    $('.main_wrap').load(event.target.href + ' .main_wrap > .main');
    event.preventDefault();

    // $('#carouselHacked').carousel({
    //      interval: 1000
    //      ///1000이 1초
    // });

});
$(window).on('popstate', function(event){
    $('.main_wrap').load(location.href + ' .main_wrap > .main');
});
