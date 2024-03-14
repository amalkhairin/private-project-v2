class Collaborator {
    static list = []

    static init(partner) {
        this.list = partner.map((i) => new this(i));
    }

    static findById(id) {
        return this.list.find((partner) => partner.id == id);
    }

    constructor({ id, name, role, status, img, social_media_name, social_media_url }) {
        this.id = id || null;
        this.name = name || null;
        this.role = role || null;
        this.status = status || null;
        this.img = img || null;
        this.social_media_name = social_media_name || null;
        this.social_media_url = social_media_url || null;
    }
    
    render() {

        var icon_available = `
        <svg width="10" height="10" viewBox="0 0 20 20" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8.6 14.6L15.65 7.55L14.25 6.15L8.6 11.8L5.75 8.95L4.35 10.35L8.6 14.6ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6867 3.825 17.9743 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.263333 12.6833 0.000666667 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31333 4.88333 2.02567 3.825 2.925 2.925C3.825 2.025 4.88333 1.31267 6.1 0.788C7.31667 0.263333 8.61667 0.000666667 10 0C11.3833 0 12.6833 0.262667 13.9 0.788C15.1167 1.31333 16.175 2.02567 17.075 2.925C17.975 3.825 18.6877 4.88333 19.213 6.1C19.7383 7.31667 20.0007 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6867 15.1167 17.9743 16.175 17.075 17.075C16.175 17.975 15.1167 18.6877 13.9 19.213C12.6833 19.7383 11.3833 20.0007 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
                fill="#96B68D" />
        </svg>
        `

        var icon_na = `
        <svg width="10" height="10" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.05288 17.1929C2.09778 16.2704 1.33596 15.167 0.811868 13.9469C0.287778 12.7269 0.0119157 11.4147 0.000377568 10.0869C-0.0111606 8.7591 0.241856 7.44231 0.744665 6.21334C1.24747 4.98438 1.99001 3.86786 2.92893 2.92893C3.86786 1.99001 4.98438 1.24747 6.21334 0.744665C7.44231 0.241856 8.7591 -0.0111606 10.0869 0.000377568C11.4147 0.0119157 12.7269 0.287778 13.9469 0.811868C15.167 1.33596 16.2704 2.09778 17.1929 3.05288C19.0145 4.9389 20.0224 7.46493 19.9996 10.0869C19.9768 12.7089 18.9251 15.217 17.0711 17.0711C15.217 18.9251 12.7089 19.9768 10.0869 19.9996C7.46493 20.0224 4.9389 19.0145 3.05288 17.1929ZM4.46288 15.7829C5.96401 17.284 7.99997 18.1273 10.1229 18.1273C12.2458 18.1273 14.2818 17.284 15.7829 15.7829C17.284 14.2818 18.1273 12.2458 18.1273 10.1229C18.1273 7.99997 17.284 5.96401 15.7829 4.46288C14.2818 2.96176 12.2458 2.11843 10.1229 2.11843C7.99997 2.11843 5.96401 2.96176 4.46288 4.46288C2.96176 5.96401 2.11843 7.99997 2.11843 10.1229C2.11843 12.2458 2.96176 14.2818 4.46288 15.7829ZM14.3629 7.29288L11.5329 10.1229L14.3629 12.9529L12.9529 14.3629L10.1229 11.5329L7.29288 14.3629L5.88288 12.9529L8.71288 10.1229L5.88288 7.29288L7.29288 5.88288L10.1229 8.71288L12.9529 5.88288L14.3629 7.29288Z" fill="#FF6767"/>
        </svg>
        `

        let template = `
        <div class="profile-card relative flex flex-col justify-center items-center">
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
            <img src="${this.img}" alt="profile picture">
            <a href="#our-works?c=${this.name}" class="profile-name text-white text-3xl mt-1">${this.name}</a>
            <div
                class="profile-role flex flex-row justify-center items-center text-[14px] text-[#B3AFFF]">
                <div class="name-sparkle">
                    <svg width="10" height="10" viewBox="0 0 18 18" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9 0L9.46818 2.32554C10.0983 5.45538 12.5446 7.90171 15.6745 8.53182L18 9L15.6745 9.46818C12.5446 10.0983 10.0983 12.5446 9.46818 15.6745L9 18L8.53182 15.6745C7.90171 12.5446 5.45539 10.0983 2.32554 9.46818L0 9L2.32554 8.53182C5.45538 7.90171 7.90171 5.45539 8.53182 2.32554L9 0Z"
                            fill="#B3AFFF" />
                    </svg>
                </div>
                <div class="mx-1">${this.role}</div>
                <div class="name-sparkle">
                    <svg width="10" height="10" viewBox="0 0 18 18" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9 0L9.46818 2.32554C10.0983 5.45538 12.5446 7.90171 15.6745 8.53182L18 9L15.6745 9.46818C12.5446 10.0983 10.0983 12.5446 9.46818 15.6745L9 18L8.53182 15.6745C7.90171 12.5446 5.45539 10.0983 2.32554 9.46818L0 9L2.32554 8.53182C5.45538 7.90171 7.90171 5.45539 8.53182 2.32554L9 0Z"
                            fill="#B3AFFF" />
                    </svg>
                </div>
            </div>
            <a href="${this.social_media_url}" target="_blank" class="text-[12px] text-gray-500 mb-3 hover:text-white">${this.social_media_name}</a>
            <div class="status">
                <div class="available flex flex-row justify-center items-center">
                    ${this.status.includes("Not Available")? icon_na : icon_available}
                    <div class="${this.status.includes("Not Available")? "text-[#FF6767]" : "text-[#96B68D]"} ml-1 text-[12px]">${this.status}</div>
                </div>
            </div>
        </div>
        `

        return template;
    }

}