const app = new App()

app.init().then(()=>{
    app.render_feeds()
    app.render_comms()
    app.render_tos()
    app.render_works()

    $("#work-count").text(Work.length())
})