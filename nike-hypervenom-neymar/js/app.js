 $(document).foundation();
      
     $('.owl-carousel').owlCarousel({
    loop:true,
    dots:true,
    margin:30,
    navText:[
            "&lt;",
            "&gt;"
        ],
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:3,
            nav:true
        },
        1000:{
            items:5,
            nav:true,
            loop:false
        }
    }
})


var videos = [
    '9ws8y_1lj-I',
    'Jfw6CZYxY3U',
    '9qQAn-wmUDM'
];

var index=Math.floor(Math.random() * videos.length);
var html='<iframe src="http://www.youtube.com/embed/' + videos[index] + '" frameborder="0" allowfullscreen></iframe>';
videojs.innerHTML = html;