function generateYouTubeThumbnailUrl(videoUrl, quality = 'hqdefault') {
    // Periksa apakah URL video YouTube berisi /watch?v= atau youtu.be/
    if (videoUrl) {
        let videoId = '';
  
        // Cari ID video dalam URL
        if (videoUrl.includes('/watch?v=')) {
            videoId = videoUrl.split('/watch?v=')[1].split('&')[0];
        } else if (videoUrl.includes('youtu.be/')) {
            videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
        }
        
        // Buat URL thumbnail berdasarkan ID
        if (videoId) {
            return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
        }
        
        return ""; // URL tidak valid
    }
    return ""
}

function generateYouTubeEmbedUrl(fullUrl) {
    return fullUrl.replace("youtu.be", "youtube.com/embed");
}

function createObserver(classes) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation class to all children of the intersecting element
                entry.target.querySelectorAll(classes.join(', '))
                    .forEach(child => child.classList.add('animated'));
            }
        });
    });
    return observer;
}

function bindObserver(observer, wrapper) {
    document.querySelectorAll(wrapper).forEach(container => {
        observer.observe(container);
    });
}

function detailModalWork(id) {
    console.log(id)
    const work = Work.findById(id);

    if (work.url) {
        $("#custom-modal").removeClass('hidden');

        $("#video-container").empty()
        $(".modal-title").empty()

        $(".modal-title").text(work.name+"'s Chat Widget")

        $("#video-container").append(`
        <iframe class="w-full h-full p-5" src="${generateYouTubeEmbedUrl(work.url)}" frameborder="0" allowfullscreen></iframe>
        `)
    }
}

function detailModal(id) {
    const comms = Commission.findById(id);

    $("#modal-details").empty()
    $("#image-carousel").empty()
    $("#detail-list").empty()

    $("#image-carousel").append(`
    <div id="carousel-items" class="swiper-wrapper">
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    `)

    $("#detail-list").append(`
    <h5 class="font-bold text-sm text-white">${comms.title}</h5>
    <p class="text-gray-400 mt-2 text-md">Price: Rp ${comms.startPrice}</p>
    <p class="font-bold text-xs mt-2 mb-3 text-gray-400">${comms.description}</p>
    <div id="modal-details" class="text-xs mt-2 mb-3 text-gray-500">
    </div>
    `)

    comms.details.forEach((detail) => {
        $("#modal-details").append(`
        <div class="my-3">
            <h5 class="font-bold text-gray-400">${detail.header}</h5>
            <ol id="${detail.id}" class="text-gray-400 list-disc list-inside">
            </ol>
        </div>
        `)
    })

    comms.details.forEach((detail) => {
        detail.text.split('|').forEach((i) => {
            $("#" + detail.id).append(`
            <li>${i}</li>
            `)
        })
    })
    $("#carousel-items").empty()
    comms.media.forEach((md) => {
        $("#carousel-items").append(`
        <div class="swiper-slide flex justify-center items-center text-center">
            <img src="${md.url}" class="block w-full  object-cover" alt="image-${md.id}" />
        </div>
        `)
    })


    var swiper = new Swiper(".mySwiper", {
        loop: true,
        speed: 100,
        autoplay: false,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        mousewheel: false,
        keyboard: true,
    });
}

let platform = []

$("#filter-youtube").on("click", function(){
    $('.btn-filters').removeClass('is-active')
    var attr = $(this).attr("data-btn-active")
    if (typeof attr !== 'undefined' && attr !== false) {
        $(this).removeAttr("data-btn-active")
        platform = platform.filter(platform => platform !== "Youtube")
    } else {
        $(this).attr("data-btn-active","")
        platform.push("Youtube")
    }
    let worksFilter = Work.filterWork(platform)
    const app = new App()
    app.render_works(worksFilter)
})

$("#filter-twitch").on("click", function(){
    $('.btn-filters').removeClass('is-active')
    var attr = $(this).attr("data-btn-active")
    if (typeof attr !== 'undefined' && attr !== false) {
        $(this).removeAttr("data-btn-active")
        platform = platform.filter(platform => platform !== "Twitch")
    } else {
        $(this).attr("data-btn-active","")
        platform.push("Twitch")
    }
    let worksFilter = Work.filterWork(platform)
    const app = new App()
    app.render_works(worksFilter)
})

function filterCl(id,name) {
    // event.preventDefault()
    $('.btn-filters').removeClass('is-active')
    $('#'+id).toggleClass('is-active')
    $("#filter-twitch").removeAttr("data-btn-active")
    $("#filter-youtube").removeAttr("data-btn-active")
    if ($('#'+id).hasClass('is-active')) {
        let worksFilter = Work.filterWorkByCollaborator(name)
        const app = new App()
        app.render_works(worksFilter)
    } else {
        const app = new App()
        app.render_works()
    }
}

$(document).ready(function () {
    $('.menu-icon').click(function () {
        $(this).toggleClass('open')

        $('.main-container').toggleClass('hidden')
        $('.menu-container').toggleClass('hidden')
    });

    $('#close-modal').click(function(){
        $('#custom-modal').addClass('hidden')
    })

    $(window).on('popstate', function (event) {
        location.reload(true);
    });

    if (window.location.hash === "#our-works") {
        $(".main-wrapper").addClass('hidden')
        $(".tos-wrapper").addClass('hidden')
        $(".work-wrapper").removeClass('hidden')

        $('#works-nav-btn').addClass('link-active')
        $('#home-nav-btn').removeClass('link-active')
        $('#commission-nav-btn').removeClass('link-active')
        $('#tos-nav-btn').removeClass('link-active')
        // window.location.reload(true)
    }

    if (window.location.hash === "#tos") {
        $(".main-wrapper").addClass('hidden')
        $(".work-wrapper").addClass('hidden')
        $(".tos-wrapper").removeClass('hidden')

        $('#works-nav-btn').removeClass('link-active')
        $('#home-nav-btn').removeClass('link-active')
        $('#commission-nav-btn').removeClass('link-active')
        $('#tos-nav-btn').addClass('link-active')
        // window.location.reload(true)
    }
    if (window.location.hash === "#home") {
        $(".main-wrapper").removeClass('hidden')
        $(".work-wrapper").addClass('hidden')
        $(".tos-wrapper").addClass('hidden')

        $('#works-nav-btn').removeClass('link-active')
        $('#home-nav-btn').addClass('link-active')
        $('#commission-nav-btn').removeClass('link-active')
        $('#tos-nav-btn').removeClass('link-active')
        // window.location.reload(true)
    }
    if (window.location.hash === "#commission") {
        $(".main-wrapper").addClass('hidden')
        $(".commission-wrapper").removeClass('hidden')
        $(".work-wrapper").addClass('hidden')
        $(".tos-wrapper").addClass('hidden')

        $('#works-nav-btn').removeClass('link-active')
        $('#home-nav-btn').removeClass('link-active')
        $('#commission-nav-btn').addClass('link-active')
        $('#tos-nav-btn').removeClass('link-active')
        // window.location.reload(true)
    }

    $('.magic-button').click(function(){
        $(this).toggleClass('active-effect')
        $('.bg').toggleClass('effect')
        $('.bg-anim').toggleClass('hidden')
    })

    $('.submit-button').click(function(){
        // event.preventDefault()
        var name = encodeURIComponent($('#name-input').val())
        var email = encodeURIComponent($('#email-input').val())
        var message = encodeURIComponent($('#message-input').val())

        var mailUrl = "mailto:maruhodooo@gmail.com?subject="+ name +"%20Inquiries&body=" + message

        if (name !== "" && email !== "" && message !== "") {
            window.open(mailUrl)
        }
    })

    $('.commission-button').click(function () {
        event.preventDefault();
        var targetUrl = $(this).attr('href')
        history.pushState(null, null, targetUrl);

        $(".main-wrapper").addClass('hidden')
        $(".commission-wrapper").removeClass('hidden')
        $(".tos-wrapper").addClass('hidden')
        $(".work-wrapper").addClass('hidden')

        $('#commission-nav-btn').addClass('link-active')
        $('#home-nav-btn').removeClass('link-active')
        $('#works-nav-btn').removeClass('link-active')
        $('#tos-nav-btn').removeClass('link-active')

        if (!$('.menu-container').hasClass("hidden") && $('.main-container').hasClass("hidden")) {
            $('.menu-container').addClass('hidden')
            $('.main-container').removeClass('hidden')
            $('.menu-icon').removeClass('open')
        }

        $('.body-wrapper').animate({
            scrollTop: 0
        }, 0);
    })

    $('.works-button').click(function () {
        event.preventDefault();
        var targetUrl = $(this).attr('href')
        history.pushState(null, null, targetUrl);

        $(".main-wrapper").addClass('hidden')
        $(".commission-wrapper").addClass('hidden')
        $(".tos-wrapper").addClass('hidden')
        $(".work-wrapper").removeClass('hidden')

        $('#works-nav-btn').addClass('link-active')
        $('#home-nav-btn').removeClass('link-active')
        $('#commission-nav-btn').removeClass('link-active')
        $('#tos-nav-btn').removeClass('link-active')

        if (!$('.menu-container').hasClass("hidden") && $('.main-container').hasClass("hidden")) {
            $('.menu-container').addClass('hidden')
            $('.main-container').removeClass('hidden')
            $('.menu-icon').removeClass('open')
        }

        $('.body-wrapper').animate({
            scrollTop: 0
        }, 0);
    })

    $('.tos-button').click(function () {
        event.preventDefault();
        var targetUrl = $(this).attr('href')
        history.pushState(null, null, targetUrl);

        $(".main-wrapper").addClass('hidden')
        $(".commission-wrapper").addClass('hidden')
        $(".tos-wrapper").removeClass('hidden')
        $(".work-wrapper").addClass('hidden')

        $('#works-nav-btn').removeClass('link-active')
        $('#home-nav-btn').removeClass('link-active')
        $('#commission-nav-btn').removeClass('link-active')
        $('#tos-nav-btn').addClass('link-active')

        if (!$('.menu-container').hasClass("hidden") && $('.main-container').hasClass("hidden")) {
            $('.menu-container').addClass('hidden')
            $('.main-container').removeClass('hidden')
            $('.menu-icon').removeClass('open')
        }

        $('.body-wrapper').animate({
            scrollTop: 0
        }, 0);
    })

    $('.home-button').click(function () {
        event.preventDefault();

        var targetUrl = $(this).attr('href')
        history.pushState(null, null, targetUrl);

        $(".commission-wrapper").addClass('hidden')
        $(".work-wrapper").addClass('hidden')
        $(".tos-wrapper").addClass('hidden')
        $(".main-wrapper").removeClass('hidden')

        $('#home-nav-btn').addClass('link-active')
        $('#commission-nav-btn').removeClass('link-active')
        $('#works-nav-btn').removeClass('link-active')
        $('#tos-nav-btn').removeClass('link-active')

        $('.body-wrapper').animate({
            scrollTop: 0
        }, 0);

        if (!$('.menu-container').hasClass("hidden") && $('.main-container').hasClass("hidden")) {
            $('.menu-container').addClass('hidden')
            $('.main-container').removeClass('hidden')
            $('.menu-icon').removeClass('open')
        }
    })
})