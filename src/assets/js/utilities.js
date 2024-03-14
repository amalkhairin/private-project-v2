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
    document.querySelectorAll('.work-container').forEach(container => {
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
    var attr = $(this).attr("data-btn-active")
    if (typeof attr !== 'undefined' && attr !== false) {
        $(this).removeAttr("data-btn-active")
        platform = platform.filter(platform => platform !== "Youtube")
    } else {
        $(this).attr("data-btn-active","")
        platform.push("Youtube")
    }
    let worksFilter = Work.filterWork(platform)
    console.log(platform)
    const app = new App()
    app.render_works(worksFilter)
})

$("#filter-twitch").on("click", function(){
    var attr = $(this).attr("data-btn-active")
    if (typeof attr !== 'undefined' && attr !== false) {
        $(this).removeAttr("data-btn-active")
        platform = platform.filter(platform => platform !== "Twitch")
    } else {
        $(this).attr("data-btn-active","")
        platform.push("Twitch")
    }
    let worksFilter = Work.filterWork(platform)
    console.log(platform)
    const app = new App()
    app.render_works(worksFilter)
})