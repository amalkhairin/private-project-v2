$(document).ready(function(){
    const app = new App()

    app.init().then(()=>{
        // app.render_feeds()
        // app.render_comms()
        app.render_tos()
        app.render_works()
        app.render_collaborators()

        // $("#work-count").text(Work.length())
    })
})