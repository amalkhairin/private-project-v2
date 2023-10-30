class App {

    constructor() {
        this.feedContainer = document.getElementById('feed-list')
        this.commsContainer = document.getElementById('commission-list')
        this.tosContainer = document.getElementById('tos-list')
        this.workContainer = document.getElementById('work-list')
    }

    async init() {
        await this.load()
    }

    async get_feeds() {
        const response = await fetch('./src/json/feed.json');
        const feeds = await response.json()

        return feeds
    }

    async get_comms() {
        const response = await fetch('./src/json/plan.json');
        const comms = await response.json()

        return comms
    }

    async get_tos() {
        const response = await fetch('./src/json/tos.json');
        const services = await response.json()

        return services
    }

    async get_works() {
        const response = await fetch('./src/json/works.json');
        const works = await response.json()

        return works
    }

    async get_trakteer(){
        const headers = {
            Accept: 'application/json',
            key: 'trapi-9TF1jWkoUrVeETgKqAbie0o0',
            'X-Requested-With': 'XMLHttpRequest',
        };
        const response = await fetch('https://api.trakteer.id/v1/public/supports?limit=5', {headers})
        const data = await response.json()

        return data.result.data
    }

    async load(){
        const feeds = await this.get_feeds();
        const comms = await this.get_comms();
        const services = await this.get_tos();
        const works = await this.get_works();
        Feed.init(feeds);
        Commission.init(comms);
        TOS.init(services);
        Work.init(works);
    }

    render_feeds() {
        this.feedContainer.innerHTML = ""
        const listHtml = []
        Feed.list.forEach((feed) => {
            listHtml.push(feed.render())
        })
        this.feedContainer.innerHTML = listHtml.join('')
    }

    render_comms() {
        this.commsContainer.innerHTML = ""
        const listHtml = []
        Commission.list.forEach((comms) => {
            listHtml.push(comms.render())
        })
        this.commsContainer.innerHTML = listHtml.join('')
    }

    render_tos() {
        this.tosContainer.innerHTML = ""
        const listHtml = []
        TOS.list.forEach((services) => {
            listHtml.push(services.render())
        })
        this.tosContainer.innerHTML = listHtml.join('')
        TOS.list.forEach((services) => {
            let detailContainer = document.getElementById(services.id)
            let listChild = []
            services.text.split('|').forEach((i) => {
                listChild.push(`
                <li>${i}</li>
                `)
            })
            detailContainer.innerHTML = listChild.join('')
        })
    }

    render_works(newVal) {
        if (newVal) {
            this.workContainer.innerHTML = ""
            const listHtml = []
            newVal.forEach((work) => {
                listHtml.push(work.render())
            })
            this.workContainer.innerHTML = listHtml.join('')
        } else {
            this.workContainer.innerHTML = ""
            const listHtml = []
            Work.list.forEach((work) => {
                listHtml.push(work.render())
            })
            this.workContainer.innerHTML = listHtml.join('')
        }
    }

     render_trakteer() {
        get_trakteer().then((tr) => {
            console.log(tr)
        })
    }


}