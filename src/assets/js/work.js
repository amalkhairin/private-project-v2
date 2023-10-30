class Work {
    static list = []

    static init(work) {
        this.list = work.map((i) => new this(i));
        this.list.sort((a,b) => {
            const idA = Number(a.id.substr(a.id.lastIndexOf("-") + 1));
            const idB = Number(b.id.substr(b.id.lastIndexOf("-") + 1));
            return idB - idA;
        })
    }

    static findById(id) {
        return this.list.find((work) => work.id == id);
    }

    static length() {
        return this.list.length
    }

    static filterWork(type) {
        if (type.length != 0) {
            return this.list.filter((work) => type.includes(work.type))
        }
        return this.list
    }

    constructor({ id, name, type, url }) {
        this.id = id || null;
        this.name = name || null;
        this.type = type || null;
        this.url = url || null;
    }

    render() {
        let template = `
        <button id="${this.id}" class="col-span-3 lg:col-span-1" onclick="detailModalWork('${this.id}')" type="button" data-te-ripple-init data-te-ripple-color="light"
            data-te-toggle="modal"
            data-te-target="#workModal">
            <div class="block rounded-lg bg-[#2F3239] w-full text-start overflow-hidden shadow-lg mb-3">
                <div class="">
                    <img class="h-[150px] w-full object-cover" src="${generateYouTubeThumbnailUrl(this.url) || "https://i.ibb.co/jM1tMwM/yt-full-1.png"}" alt="thumbnail" />
                </div>
                <div class="p-3 text-start">
                    <div class="flex">
                        <p class="${this.type === "Youtube"? "bg-[#D64A45]" : "bg-[#857EF8]"} flex text-xs text-white mb-1 px-3 rounded-2xl">${this.type}</p>
                    </div>
                    <h5 class="font-bold text-xs text-white">${this.name} Chat Widget</h5>
                </div>
            </div>
        </button>
        `
        return template;
    }
}