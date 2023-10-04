var observer = new IntersectionObserver(function(entries, observer){
    entries.forEach(function(entry){
        if(entry.isIntersecting){
            $("#works .owl-carousel").addClass("animated")
        }
    })
}, {
    threshold: 0.5
})

observer.observe($("#works")[0])