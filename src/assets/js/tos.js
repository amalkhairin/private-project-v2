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
        <div class="my-4">
            <h5 class="font-bold text-gray-300">${this.header}</h5>
            <ol id="${this.id}" class="text-gray-400 list-disc list-inside">
            </ol>
        </div>
        `
        return template;
    }
}