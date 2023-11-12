class Feed {
    static list = []

    static init(feeds) {
        this.list = feeds.map((i) => new this(i));
        this.list.sort((a, b) => {
            const idA = parseInt(a.id.split('-')[1]);
            const idB = parseInt(b.id.split('-')[1]);
            return idB - idA;
        });
    }

    static findById(id) {
        return this.list.find((feed) => feed.id == id);
    }

    constructor({
        id,
        createdAt,
        editedAt,
        title,
        description,
        image,
        url
    }) {
        this.id = id;
        this.createdAt = createdAt;
        this.editedAt = editedAt;
        this.title = title;
        this.descrtiption = description;
        this.image = image;
        this.url = url;
    }

    render() {
        let template = `
        <div class="block rounded-lg bg-[#2F3239] overflow-hidden shadow-lg mb-3">
            <div class="">
                <img class="h-[200px] w-full object-cover" src="${this.image}" alt="welcome" />
            </div>
            <div class="px-6 py-3">
                <h5 class="font-bold text-sm text-white">${this.title}</h5>
                <div class="text-xs text-gray-600"><small>${this.editedAt === ""? "Posted" : "Edited"} on ${this.editedAt === ""? this.createdAt : this.editedAt}</small></div>
                <p class="text-xs mt-2 mb-3 text-gray-400">${this.descrtiption}</p>
                <a href="${this.url}" target="_blank" class="${this.url === ""? "hidden":""} bg-[#2473AC] text-sm mt-3 text-white hover:bg-white hover:text-[#2473AC] text-center px-4 py-[4px] rounded-2xl">
                    Detail
                </a>
            </div>
        </div>
        `
        return template;
    }
}