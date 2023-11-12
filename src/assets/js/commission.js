class Commission {
    static list = []

    static init(comms) {
        this.list = comms.map((i) => new this(i));
    }

    static findById(id) {
        return this.list.find((cms) => cms.id == id);
    }

    constructor({ id, status, type, start_price, title, description, detail, media }) {
        this.id = id || null;
        this.status = status || null;
        this.type = type || null;
        this.startPrice = start_price || null;
        this.title = title || null;
        this.description = description || null;
        
        this.details = detail || [];
        this.media = media || [];
        
        // Normalisasi data detail
        this.details = this.details.map((detailData) => ({
            id: detailData.id || null,
            header: detailData.header || null,
            text: detailData.text || null,
        }));

        this.media = this.media.map((mediaData) => ({
            id: mediaData.id || null,
            url: mediaData.url
        }));
    }

    render() {
        let template = `
        <button id="${this.id}" onclick="detailModal('${this.id}')" type="button" data-te-ripple-init data-te-ripple-color="light"
            data-te-toggle="modal"
            data-te-target="#exampleModalXl">
            <div class="block rounded-lg bg-[#2F3239] grid grid-cols-3 lg:grid-cols-3 w-full text-start overflow-hidden shadow-lg mb-3">
                <div class="col-span-3 lg:col-span-2">
                    <img class="h-[200px] w-full object-cover" src="${this.media[0].url}" alt="thumbnail" />
                </div>
                <div class="col-span-3 lg:col-span-1 px-6 py-3 flex flex-col justify-between">
                    <div class="flex flex-col justify-start">
                        <h5 class="font-bold text-sm text-white">${this.title}</h5>
                        <p class="text-gray-400 mt-2 text-md">Start: Rp ${this.startPrice}</p>
                        <p class="text-xs mt-2 mb-3 text-gray-500">${this.description}</p>
                    </div>
                    <p class="text-start text-sm text-gray-500">status: <span class="text-white text-xs py-[4px] px-2 rounded-lg ${this.status == "Open"? "bg-[#88CC88]" : "bg-[#D64A45]" }">${this.status}</span></p>
                </div>
            </div>
        </button>
        `
        return template;
    }
}