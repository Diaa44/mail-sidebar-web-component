const template = document.createElement('template');
template.innerHTML = `
<style>

.unread-count{
    padding:500px;
    position: absolute;
    top: 590px;
    font-size:53px;
    font-family: sans-serif;

}
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

body {
    padding: 80px;
}

.border {
    border-top: 10px solid gray;
    width: 80px;
    padding: 8px;
}

.menu-item::before {
    content: "";
    position: absolute;
    top: 30px;
    left: 35px;
    width: 170px;
    height: 170px;
    border-radius: 100px;
    background-color: transparent;
    z-index: -1;
    transition: 0.3s ease;
}

.menu-item:hover::before {
    background-color: #e0e0e0;
}

.image {
    position: absolute;
    left: 240px;
    top: 20px;
    width: 150px;
}

.header {
    position: absolute;
    left: 420px;
    top: 60px;
    font-size: 77px;
    color: rgb(62, 62, 62);
    font-family: Helvetica, sans-serif;
}

.icon {
    position: relative;
    top: 155px;
    left: 55px;
    z-index: 1;
    /* Adjust as needed */
}

.item {
    position: absolute;
    top: 260px;
    padding-top: 68px;
    padding-left: 80px;
    font-family: sans-serif;
    font-size: 40px;
    border-radius: 50px;
    background-color: #c3E6FF;
    width: 440px;
    height: 180px;
    color: #05243c;
    text-align: center;
    cursor: pointer;
}

.item:hover {
    box-shadow: -2px 6px 15px 9px rgba(181, 182, 189, 0.75);
}

.icon-inbox {
    position: relative;
    top: 367px;
    right: 50px;
    z-index: 1;
}

.item-inbox {
    position: absolute;
    top: 400px;
    left: -140px;
    font-size: 50px;
    font-family: sans-serif;
    padding-left: 380px;
    padding-top: 60px;
    margin: 80px;
    color: #05243c;
    width: 1300px;
    height: 170px;
    border-top-right-radius: 80px;
    border-bottom-right-radius: 80px;
    background: rgba(186, 216, 252, 0.5);
    cursor: pointer;
}

.icon-Starred {
    position: relative;
    top: 500px;
    right: 133px;
}

.item-Starred {
    position: absolute;
    top: 695px;
    left: 315px;
    font-size: 50px;
    font-family: sans-serif;
    color: #05243c;
    cursor: pointer;
}

.item-Starred:hover::before {
    content: "";
    position: absolute;
    top: -30px;
    left: -380px;
    margin: 0;
    width: 1300px;
    height: 130px;
    border-top-right-radius: 80px;
    border-bottom-right-radius: 80px;
    background: rgb(232, 232, 232);
    z-index: -1;
    transition: 0.3s ease;
    cursor: pointer;

}

.icon-Snoozed {
    position: relative;
    top: 630px;
    right: 200px;
}

.item-Snoozed {
    position: absolute;
    top: 827px;
    left: 315px;
    font-size: 50px;
    font-family: sans-serif;
    color: #05243c;
    cursor: pointer;
}

.item-Snoozed:hover::before {
    content: "";
    position: absolute;
    top: -30px;
    left: -380px;
    margin: 0;
    width: 1300px;
    height: 130px;
    border-top-right-radius: 80px;
    border-bottom-right-radius: 80px;
    background: rgb(232, 232, 232);
    z-index: -1;
    transition: 0.3s ease;
}

.icon-Sent {
    position: relative;
    top: 750px;
    right: 249px;
}

.item-Sent {
    position: absolute;
    top: 948px;
    left: 315px;
    font-size: 50px;
    font-family: sans-serif;
    color: #05243c;
    cursor: pointer;
}

.item-Sent:hover::before {
    content: "";
    position: absolute;
    top: -30px;
    left: -380px;
    margin: 0;
    width: 1300px;
    height: 130px;
    border-top-right-radius: 80px;
    border-bottom-right-radius: 80px;
    background: rgb(232, 232, 232);
    z-index: -1;
    transition: 0.3s ease;
}

.icon-drafts {
    position: relative;
    top: 880px;
    right: 310px;
}

.item__Drafts {
    position: absolute;
    top: 998px;
    padding-top: 20px;
    margin: 66px;
    left: 250px;
    font-size: 50px;
    font-family: sans-serif;
    color: #05243c;
    cursor: pointer;
}

.item__Drafts:hover::before {
    content: "";
    position: absolute;
    top: -20px;
    left: -380px;
    margin: 0;
    width: 1300px;
    height: 130px;
    border-top-right-radius: 80px;
    border-bottom-right-radius: 80px;
    background: rgb(232, 232, 232);
    z-index: -1;
    transition: 0.3s ease;
}


</style>
<body>
<h4 class="item-inbox "></h4>
<p class="item-Starred "></p>
<p class="item-Snoozed snoozed"></p>
<p class="item-Sent sent"></p>
<h2 class="item__Drafts" unreadCount="1"></h2>
<slot name="icon"></slot>
<span class="unread-count"></span>

</body>
`;
class AppSideBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {


        const unreadCount = parseInt(this.getAttribute('unreadCount')); // Convert to number
        const unreadCountElement = this.shadowRoot.querySelector('.unread-count');
        const title = this.getAttribute('title');
        const itemTitleElement = this.shadowRoot.querySelector('.item__Drafts');
        itemTitleElement.textContent = title; // Set the title
        if (unreadCount > 0) {
            unreadCountElement.style.fontWeight = 'bold';
        }
        unreadCountElement.textContent = unreadCount > 0 ? unreadCount : '';


        const inbox = this.getAttribute('inbox');
        const itemInbox = this.shadowRoot.querySelector('.item-inbox');
        itemInbox.textContent = inbox;

        const subtitle = this.getAttribute('subtitle');
        const itemStarred = this.shadowRoot.querySelector('.item-Starred');
        itemStarred.textContent = subtitle;



        const text = this.getAttribute('text');
        const itemSnoozed = this.shadowRoot.querySelector('.item-Snoozed');
        itemSnoozed.textContent = text;

        const sent = this.getAttribute('sent');
        const itemSent = this.shadowRoot.querySelector('.item-Sent')
        itemSent.textContent = sent;




    }
}

window.customElements.define('app-sidebar-button', AppSideBar);