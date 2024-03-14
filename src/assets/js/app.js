class App {

    constructor() {
        this.feedContainer = document.getElementById('feed-list')
        this.commsContainer = document.getElementById('commission-list')
        this.tosContainer = document.getElementById('list-tos')
        // this.workContainer = document.getElementsByClassName('work-list')
        this.workContainer = document.getElementById('list-work')
        this.sampleWorkContainer = document.getElementById('sample-work')
        this.collaboratorContainer = document.getElementById('list-collaborator')
        this.collaboratorFilters = document.getElementById('cl-filter')
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

    async get_collaborators() {

        const response = await fetch('./src/json/collaborator.json');
        const collaborator = await response.json()

        return collaborator
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
        // const feeds = await this.get_feeds();
        // const comms = await this.get_comms();
        const services = await this.get_tos();
        const works = await this.get_works();
        const collaborator = await this.get_collaborators();
        // Feed.init(feeds);
        // Commission.init(comms);
        TOS.init(services);
        Work.init(works);
        Collaborator.init(collaborator)
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

        const tosClasses = ['.point-title','.sub-point']
        const wrapper = ['.point-section']
        var tosObserver = createObserver(tosClasses);
        bindObserver(tosObserver, wrapper)
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
            this.sampleWorkContainer.innerHTML = ""
            const listHtml = []
            const listHtmlSample = []
            const sampleWork = Work.list.slice(0,3)
            sampleWork.forEach((sample) =>{
                listHtmlSample.push(sample.render())
            })
            this.sampleWorkContainer.innerHTML = listHtmlSample.join('')
            Work.list.forEach((work) => {
                listHtml.push(work.render())
            })
            this.workContainer.innerHTML = listHtml.join('')
        }

        const workClasses = ['.bg-content', '.media', '.logo', '.title', '.credit', '.big-sparkle', '.small-sparkle', '.showcase-button'];
        const wrapper = ['.work-container'];
        var workObserver = createObserver(workClasses);
        bindObserver(workObserver, wrapper)
    }

    render_filters() {
        let listCl = []
        Collaborator.list.forEach((partner) => {
            listCl.push(`
            <button id="p-${partner.id}" onclick="filterCl(this.id,'${partner.name}')" class="bg-transparent btn-filters border-[1px] border-gray-600 text-xs text-white data-[btn-active]:bg-[#B3AFFF] data-[btn-active]:text-white text-center px-2 py-[4px] rounded-2xl">
                ${partner.name}
            </button>
            `)
        })

        this.collaboratorFilters.innerHTML = ""
        this.collaboratorFilters.innerHTML = listCl.join('')
    }

    render_collaborators() {
        this.collaboratorContainer.innerHTML = ""
        const listHtml = []
        Collaborator.list.forEach((partner) => {
            listHtml.push(partner.render())
        })
        this.collaboratorContainer.innerHTML = listHtml.join('')

        const collaboratorClasses = ['.profile-card']
        const wrapper = ['.collaborator-list']
        var collaboratorObserver = createObserver(collaboratorClasses);
        bindObserver(collaboratorObserver, wrapper)
    }

     render_trakteer() {
        get_trakteer().then((tr) => {
            console.log(tr)
        })
    }


}