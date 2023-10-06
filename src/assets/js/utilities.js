function observeElementIntersection(selector, threshold=0) {
    // $(selector).css("visibility", "hidden")
    $(selector).css("transform", "translateY(50px)")
    $(selector).css("opacity", "0")
    $(selector).css("transition", "opacity 0.5s, transform 0.5s")
    new IntersectionObserver(function(entries, observer){
        entries.forEach(function(entry){
            if(entry.isIntersecting){
                $(selector).addClass("animated");
            } else {
                $(selector).removeClass("animated");
            }
        });
    }, {
        threshold: threshold
    }).observe($(selector)[0]);
}



function get_works(filter, limit){
    fetch('./src/json/works.json')
    .then(response => {
        if (!response.ok) {
            console.log('Terjadi kesalahan: ' + response.status);
            return null
        } else {
            return response.json();
        }
    })
    .then(data => {
        let worksData = data.data;

        worksData = worksData.sort((a,b) => b.id - a.id);

        if(filter.toLowerCase() !== 'all') {
            worksData = worksData.filter(function(item){
                return item.platform.toLowerCase() === filter.toLowerCase();
            })
        }

        if(limit > 0) {
            worksData = worksData.slice(0,limit);
        }

        $.each(worksData, function(index, work){
            $(".carousel-inner").append(`
                <div class="carousel-item">
                    <div class="row g-3 row-cols-1 justify-content-center mx-0">
                        <div class="col-md-10 col-sm-12 col-lg-8 col-xl-6 col-xxl-6">
                            <div class="window my-3">
                                <div class="header px-3 py-1">
                                    <div class="row justify-content-between mx-0">
                                        <div class="col-auto">
                                            ${work.platform}
                                        </div>
                                        <div class="col-auto">
                                            <div class="window-decoration">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="98" height="29" viewBox="0 0 98 29" fill="none">
                                                    <rect x="71.8667" y="2.86674" width="23.9556" height="23.9556" rx="6.53333" fill="#E1ECF7" stroke="#83B0E1" stroke-width="4.35556"/>
                                                    <path d="M90.0039 10.2256L88.464 8.68568L83.8442 13.3054L79.2245 8.68568L77.6846 10.2256L82.3043 14.8454L77.6846 19.4651L79.2245 21.0051L83.8442 16.3853L88.464 21.0051L90.0039 19.4651L85.3842 14.8454L90.0039 10.2256Z" fill="#83B0E1"/>
                                                    <rect x="37.022" y="2.86674" width="23.9556" height="23.9556" rx="6.53333" fill="#E1ECF7" stroke="#83B0E1" stroke-width="4.35556"/>
                                                    <rect x="42.4668" y="12.6665" width="8.71111" height="8.71111" stroke="#83B0E1" stroke-width="2.17778"/>
                                                    <path d="M43.5557 9.3999H54.4446V20.2888" stroke="#83B0E1" stroke-width="2.17778"/>
                                                    <rect x="2.17778" y="2.86674" width="23.9556" height="23.9556" rx="6.53333" fill="#E1ECF7" stroke="#83B0E1" stroke-width="4.35556"/>
                                                    <rect x="21.7778" y="20.2891" width="2.17778" height="15.2444" transform="rotate(90 21.7778 20.2891)" fill="#83B0E1"/>
                                                    </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content p-3 bg-white align-items-center">
                                    <div class="row mx-0 my-auto row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-1 justify-content-center align-items-center">
                                        <div class="col-md-6">
                                            <div class="image-container mx-auto" style="width: 200px; height: 200px; background: rgb(134, 134, 168); position: relative;">
                                                <img class="img-fluid" src="${work.image}" onerror="this.style.display='none';" alt="" style="width: 100%; height: 100%; object-fit: cover;">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="heading heading-window-1 work-name text-center my-3">${work.name}</div>
                                            <div id="work-link-${work.id}" class="row justify-content-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `)

            $.each(work.link, function(index, link){
                if (link.name.toLowerCase() !== 'showcase'){
                    $("#work-link-"+work.id).append(`
                        <div class="col-auto">
                            <a href="${link.url}" target="_blank" class="btn button-small b-red">${link.name}</a>
                        </div>
                    `)
                } else {
                    $("#work-link-"+work.id).append(`
                        <div class="col-auto">
                            <a href="${link.url}" target="_blank" class="btn button-small b-green">${link.name}</a>
                        </div>
                    `)
                }
            })

            if(index == 0) {
                $(".carousel-item").addClass("active")
            }

            // if(index == worksData.length - 1) {
            //     $(".carousel-inner").append(`
            //         <div class="carousel-item">
            //             <div class="row g-3 row-cols-1 justify-content-center">
            //                 <div class="col-md-10 col-sm-12 col-lg-8 col-xl-6 col-xxl-6">
            //                     <div class="window my-3">
            //                         <div class="header px-3 py-1">
            //                             <div class="row justify-content-end">
            //                                 <div class="col-auto">
                                                
            //                                 </div>
            //                                 <div class="col-auto">
            //                                     <div class="window-decoration">
            //                                         <svg xmlns="http://www.w3.org/2000/svg" width="98" height="29" viewBox="0 0 98 29" fill="none">
            //                                             <rect x="71.8667" y="2.86674" width="23.9556" height="23.9556" rx="6.53333" fill="#E1ECF7" stroke="#83B0E1" stroke-width="4.35556"/>
            //                                             <path d="M90.0039 10.2256L88.464 8.68568L83.8442 13.3054L79.2245 8.68568L77.6846 10.2256L82.3043 14.8454L77.6846 19.4651L79.2245 21.0051L83.8442 16.3853L88.464 21.0051L90.0039 19.4651L85.3842 14.8454L90.0039 10.2256Z" fill="#83B0E1"/>
            //                                             <rect x="37.022" y="2.86674" width="23.9556" height="23.9556" rx="6.53333" fill="#E1ECF7" stroke="#83B0E1" stroke-width="4.35556"/>
            //                                             <rect x="42.4668" y="12.6665" width="8.71111" height="8.71111" stroke="#83B0E1" stroke-width="2.17778"/>
            //                                             <path d="M43.5557 9.3999H54.4446V20.2888" stroke="#83B0E1" stroke-width="2.17778"/>
            //                                             <rect x="2.17778" y="2.86674" width="23.9556" height="23.9556" rx="6.53333" fill="#E1ECF7" stroke="#83B0E1" stroke-width="4.35556"/>
            //                                             <rect x="21.7778" y="20.2891" width="2.17778" height="15.2444" transform="rotate(90 21.7778 20.2891)" fill="#83B0E1"/>
            //                                             </svg>
            //                                     </div>
            //                                 </div>
            //                             </div>
            //                         </div>
            //                         <div class="content bg-white d-flex justify-content-center align-items-center p-3" style="height: 250px">
            //                             <div class="text-center mx-auto my-auto">
            //                                 <a href="/showcase.html" class="btn button-small b-green">Show More</a>
            //                             </div>
            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     `)
            // }
        });

    })
    .catch(error => {
        // Menangani kesalahan jika terjadi
        console.error('Terjadi kesalahan:', error);
        return null
    });
}

function get_works_page(filter, limit){
    fetch('./src/json/works.json')
    .then(response => {
        if (!response.ok) {
            console.log('Terjadi kesalahan: ' + response.status);
            return null
        } else {
            return response.json();
        }
    })
    .then(data => {
        let worksData = data.data;

        worksData = worksData.sort((a,b) => b.id - a.id);

        if(filter.toLowerCase() !== 'all') {
            worksData = worksData.filter(function(item){
                return item.platform.toLowerCase() === filter.toLowerCase();
            })
        }

        if(limit > 0) {
            worksData = worksData.slice(0,limit);
        }

        $.each(worksData, function(index, work){
            $("#showcase-items").append(`
                <div class="col-md-10 col-sm-12 col-lg-8 col-xl-6 col-xxl-6">
                    <div class="window my-3">
                        <div class="header px-3 py-1">
                            <div class="row mx-0 justify-content-between">
                                <div class="col-auto">
                                    ${work.platform}
                                </div>
                                <div class="col-auto">
                                    <div class="window-decoration">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="98" height="29" viewBox="0 0 98 29" fill="none">
                                            <rect x="71.8667" y="2.86674" width="23.9556" height="23.9556" rx="6.53333" fill="#E1ECF7" stroke="#83B0E1" stroke-width="4.35556"/>
                                            <path d="M90.0039 10.2256L88.464 8.68568L83.8442 13.3054L79.2245 8.68568L77.6846 10.2256L82.3043 14.8454L77.6846 19.4651L79.2245 21.0051L83.8442 16.3853L88.464 21.0051L90.0039 19.4651L85.3842 14.8454L90.0039 10.2256Z" fill="#83B0E1"/>
                                            <rect x="37.022" y="2.86674" width="23.9556" height="23.9556" rx="6.53333" fill="#E1ECF7" stroke="#83B0E1" stroke-width="4.35556"/>
                                            <rect x="42.4668" y="12.6665" width="8.71111" height="8.71111" stroke="#83B0E1" stroke-width="2.17778"/>
                                            <path d="M43.5557 9.3999H54.4446V20.2888" stroke="#83B0E1" stroke-width="2.17778"/>
                                            <rect x="2.17778" y="2.86674" width="23.9556" height="23.9556" rx="6.53333" fill="#E1ECF7" stroke="#83B0E1" stroke-width="4.35556"/>
                                            <rect x="21.7778" y="20.2891" width="2.17778" height="15.2444" transform="rotate(90 21.7778 20.2891)" fill="#83B0E1"/>
                                            </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content p-3 bg-white" style="">
                            <div class="row mx-0 row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-1 justify-content-center align-items-center">
                                <div class="col-md-6">
                                    <div class="image-container mx-auto" style="width: 200px; height: 200px; background: rgb(134, 134, 168); position: relative;">
                                        <img class="img-fluid" src="${work.image}" onerror="this.style.display='none';" alt="" style="width: 100%; height: 100%; object-fit: cover;">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="heading heading-window-1 text-center my-3">${work.name}</div>
                                    <div id="work-link-${work.id}" class="row justify-content-center">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `)

            $.each(work.link, function(index, link){
                if (link.name.toLowerCase() !== 'showcase'){
                    $("#work-link-"+work.id).append(`
                        <div class="col-auto">
                            <a href="${link.url}" target="_blank" class="btn button-small b-red">${link.name}</a>
                        </div>
                    `)
                } else {
                    $("#work-link-"+work.id).append(`
                        <div class="col-auto">
                            <a href="${link.url}" target="_blank" class="btn button-small b-green">${link.name}</a>
                        </div>
                    `)
                }
            })

            if(index == 0) {
                $(".carousel-item").addClass("active")
            }

            // if(index == worksData.length - 1) {
            //     $(".carousel-inner").append(`
            //         <div class="carousel-item">
            //             <div class="row g-3 row-cols-1 justify-content-center">
            //                 <div class="col-md-10 col-sm-12 col-lg-8 col-xl-6 col-xxl-6">
            //                     <div class="window my-3">
            //                         <div class="header px-3 py-1">
            //                             <div class="row justify-content-end">
            //                                 <div class="col-auto">
                                                
            //                                 </div>
            //                                 <div class="col-auto">
            //                                     <div class="window-decoration">
            //                                         <svg xmlns="http://www.w3.org/2000/svg" width="98" height="29" viewBox="0 0 98 29" fill="none">
            //                                             <rect x="71.8667" y="2.86674" width="23.9556" height="23.9556" rx="6.53333" fill="#E1ECF7" stroke="#83B0E1" stroke-width="4.35556"/>
            //                                             <path d="M90.0039 10.2256L88.464 8.68568L83.8442 13.3054L79.2245 8.68568L77.6846 10.2256L82.3043 14.8454L77.6846 19.4651L79.2245 21.0051L83.8442 16.3853L88.464 21.0051L90.0039 19.4651L85.3842 14.8454L90.0039 10.2256Z" fill="#83B0E1"/>
            //                                             <rect x="37.022" y="2.86674" width="23.9556" height="23.9556" rx="6.53333" fill="#E1ECF7" stroke="#83B0E1" stroke-width="4.35556"/>
            //                                             <rect x="42.4668" y="12.6665" width="8.71111" height="8.71111" stroke="#83B0E1" stroke-width="2.17778"/>
            //                                             <path d="M43.5557 9.3999H54.4446V20.2888" stroke="#83B0E1" stroke-width="2.17778"/>
            //                                             <rect x="2.17778" y="2.86674" width="23.9556" height="23.9556" rx="6.53333" fill="#E1ECF7" stroke="#83B0E1" stroke-width="4.35556"/>
            //                                             <rect x="21.7778" y="20.2891" width="2.17778" height="15.2444" transform="rotate(90 21.7778 20.2891)" fill="#83B0E1"/>
            //                                             </svg>
            //                                     </div>
            //                                 </div>
            //                             </div>
            //                         </div>
            //                         <div class="content d-flex justify-content-center align-items-center p-3" style="height: 250px">
            //                             <div class="text-center mx-auto my-auto">
            //                                 <a href="/showcase.html" class="btn button-small b-green">Show More</a>
            //                             </div>
            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     `)
            // }
        });

    })
    .catch(error => {
        // Menangani kesalahan jika terjadi
        console.error('Terjadi kesalahan:', error);
        return null
    });
}


function get_plan(type){
    fetch('./src/json/plan.json')
    .then(response => {
        if (!response.ok) {
            return null
            console.log('Terjadi kesalahan: ' + response.status);
        } else {
            return response.json();
        }
    })
    .then(data => {
        // Data JSON berhasil diambil
        let jsonData = data.data;
        // console.log(jsonData)

        jsonData = jsonData.filter(function(item){
            return item.type.toLowerCase() === type.toLowerCase();
        })

        let isTwitch = type === 'twitch' ? 'bg-cream' : ''

        $.each(jsonData, function(index, plan) {
            $("#plan-wrapper").append(`
                <div id="${plan.id}" type="${plan.type}" class="col-md-3 plan-card window-2">
                    <div class="">
                        <div class="header ${isTwitch} px-3 py-1">
                            <div class="row justify-content-between">
                                <div class="col-auto">
                                    ${plan.plan_type}
                                </div>
                                <div class="col-auto">
                                    <div class="window-decoration">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="98" height="29" viewBox="0 0 98 29" fill="none">
                                            <rect x="71.8667" y="2.86674" width="23.9556" height="23.9556" rx="6.53333" fill="none" stroke="#83B0E1" stroke-width="4.35556"/>
                                            <path d="M90.0039 10.2256L88.464 8.68568L83.8442 13.3054L79.2245 8.68568L77.6846 10.2256L82.3043 14.8454L77.6846 19.4651L79.2245 21.0051L83.8442 16.3853L88.464 21.0051L90.0039 19.4651L85.3842 14.8454L90.0039 10.2256Z" fill="#83B0E1"/>
                                            <rect x="37.022" y="2.86674" width="23.9556" height="23.9556" rx="6.53333" fill="none" stroke="#83B0E1" stroke-width="4.35556"/>
                                            <rect x="42.4668" y="12.6665" width="8.71111" height="8.71111" stroke="#83B0E1" stroke-width="2.17778"/>
                                            <path d="M43.5557 9.3999H54.4446V20.2888" stroke="#83B0E1" stroke-width="2.17778"/>
                                            <rect x="2.17778" y="2.86674" width="23.9556" height="23.9556" rx="6.53333" fill="none" stroke="#83B0E1" stroke-width="4.35556"/>
                                            <rect x="21.7778" y="20.2891" width="2.17778" height="15.2444" transform="rotate(90 21.7778 20.2891)" fill="#83B0E1"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content p-3">
                            <div class="row row-cols-1 justify-content-center">
                                <div class="col text-center" style="height: 320px;">
                                    <h3 class="heading heading-window-1">${plan.price}</h3>
                                    <span class="text-small">You'll get:</span>
                                    <ul id="items-${plan.id}" class="list-item text-start">
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `)
            
            $.each(plan.items, function(index, item){
                $("#items-"+plan.id).append(`
                    <li class="item">${item.desc}</li>
                `)
            })
        })

    })
    .catch(error => {
        // Menangani kesalahan jika terjadi
        console.error('Terjadi kesalahan:', error);
        return null
    });
}