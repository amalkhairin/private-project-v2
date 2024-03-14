class TOS {
    static list = []

    static init(services) {
        this.list = services.map((i) => new this(i));
    }

    constructor({
        id,
        header,
        text
    }) {
        this.id = id;
        this.header = header;
        this.text = text;
    }

    render() {
        let template = `
        <div class="point-section mb-8">
            <div class="point-title text-2xl sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl 2xl:text-4xl text-white">${this.header}</div>
            <div class="sub-point mt-2 text-[14px] sm:text-[14px] md:text-[14px] lg:text-lg xl:text-lg 2xl:text-lg text-gray-400">
                <ul id="${this.id}">
                </ul>
            </div>
        </div>
        `
        return template;
    }
}