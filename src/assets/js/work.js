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
            
            // console.log(type.join('|'))
            // return this.list.filter((work) => type.join('|').includes(work.type))
            return this.list.filter((work) => {
                const types = work.type.toLowerCase().split('|'); // Split the types if it's a combined type
                return type.some(item => types.includes(item.toLowerCase()));
            })
        }
        return this.list
    }

    static filterWorkByCollaborator(cl) {
        if (cl) {
            return this.list.filter((work) => work.note.includes(cl))
        }
        return this.list
    }

    constructor({ id, name, type, note, url }) {
        this.id = id || null;
        this.name = name || null;
        this.type = type || null;
        this.note = note || null;
        this.url = url || null;
    }
    
    render() {

        var yt_logo = `
        <svg width="68" height="68" viewBox="0 0 68 68" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect width="68" height="68" rx="10" fill="#D13F3F" />
            <path
                d="M48.1367 32.1891C49.6716 32.9085 49.6716 35.0915 48.1367 35.8109L22.8489 47.6646C21.5226 48.2863 20 47.3184 20 45.8537L20 22.1463C20 20.6816 21.5226 19.7137 22.8489 20.3354L48.1367 32.1891Z"
                fill="white" />
        </svg>
        `

        var tw_logo = `
        <svg class="ml-1" width="68" height="68" viewBox="0 0 52 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.802246" y="0.668701" width="50.3121" height="50.3121" rx="7.39883" fill="#6C63FF"/>
            <path d="M25.7844 16.8426H27.9449V23.176H25.7844M31.722 16.8426H33.8826V23.176H31.722M18.7741 11.0271L13.3804 16.3099V35.3397H19.8468V40.6224L25.2556 35.3397H29.5615L39.2763 25.8248V11.0271M37.1158 24.7741L32.8099 28.9915H28.4888L24.7117 32.6909V28.9915H19.8468V13.1432H37.1158V24.7741Z" fill="white"/>
        </svg>
        `

        let template = `
        <button class="work-container relative w-[250px] h-[250px]" data-id="${this.id}" onclick="detailModalWork('${this.id}')" data-te-ripple-init data-te-toggle="modal" data-te-target="#workModal">
            <div class="big-sparkle">
                <svg width="85" height="85" viewBox="0 0 85 85" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M42.5 0L44.7109 10.9817C47.6864 25.7615 59.2385 37.3136 74.0183 40.2891L85 42.5L74.0183 44.7109C59.2385 47.6864 47.6864 59.2385 44.7109 74.0183L42.5 85L40.2891 74.0183C37.3136 59.2385 25.7615 47.6864 10.9817 44.7109L0 42.5L10.9817 40.2891C25.7615 37.3136 37.3136 25.7615 40.2891 10.9817L42.5 0Z"
                        fill="white" />
                </svg>
            </div>
            <div class="small-sparkle">
                <svg width="85" height="85" viewBox="0 0 85 85" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M42.5 0L44.7109 10.9817C47.6864 25.7615 59.2385 37.3136 74.0183 40.2891L85 42.5L74.0183 44.7109C59.2385 47.6864 47.6864 59.2385 44.7109 74.0183L42.5 85L40.2891 74.0183C37.3136 59.2385 25.7615 47.6864 10.9817 44.7109L0 42.5L10.9817 40.2891C25.7615 37.3136 37.3136 25.7615 40.2891 10.9817L42.5 0Z"
                        fill="white" />
                </svg>
            </div>
            <div class="bg-content"></div>
            <div class="media">
                <img src="${generateYouTubeThumbnailUrl(this.url) || "https://i.ibb.co/Gs3k2vT/Frame-1.png"}" alt="thumbnail" class="h-full w-full object-cover rounded-[10px]" alt="">
            </div>
            <div class="content flex flex-col">
                <div class="header w-auto flex flex-row justify-between items-center">
                    <div class="title text-white flex flex-col justify-start items-start">
                        <div class="name">${this.name}'s</div>
                        <div class="suffix">Chat Widget</div>
                    </div>
                    <div class="logo flex flex-row justify-end items-center">
                        ${this.type.includes("Youtube")? yt_logo : ""}
                        ${this.type.includes("Twitch")? tw_logo : ""}
                    </div>
                </div>
                <div class="credit text-gray-500 text-[9px] mt-1 text-start">${this.note}</div>
            </div>
        </button>
        `

        return template;
    }

}