$(document).ready(function(){
    const owl = $('.owl-carousel')
            owl.owlCarousel({
                loop:true,
                margin:50,
                responsiveClass:true,
                dots: false,
                nav: false,
                responsive:{
                    0:{
                        items:1,
                    },
                    600:{
                        items:1,
                    },
                    1000:{
                        items:2,
                    }
                }
            });
            
            // Custom Nav
            
            $('.owl-carousel__next').click(() => owl.trigger('next.owl.carousel'))
            
            $('.owl-carousel__prev').click(() => owl.trigger('prev.owl.carousel'))
})