class DinoAINav extends HTMLElement {
    static get observedAttributes() {
        return ['page'];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
            .nav_list {
                color: var(text-colour)!important;
            }
            .nav-list ::slotted(.iron-selected) {
                color: rgba(255, 255, 255, 0.2)!important;
                background-color: var(--menu-selected);
                border: solid 0.2em var(--menu-selected);
            }

            .nav-list ::slotted(a.iron-selected)::before {
                content: "-"!important;
                color: rgba(255, 255, 255, 0.2)!important;
            }
            .nav-list ::slotted(a.iron-selected)::after {
                content: "-"!important;
                color: rgba(255, 255, 255, 0.2)!important;
            }
            .nav-list ::slotted(a.iron-selected:hover)::before {
                content: "-"!important;
                color: rgba(255, 255, 255, 0.2)!important;
            }
            .nav-list ::slotted(a.iron-selected:hover)::after {
                content: "-"!important;
                color: rgba(255, 255, 255, 0.2)!important;
            }


            .nav-list ::slotted(a:hover) {
                color: rgba(255, 255, 255, 0.8);
            }
            .nav-list ::slotted(a.iron-selected:hover) {
                color: rgba(255, 255, 255, 0.2)!important;
                background-color: var(--menu-selected);
            }

            .nav-list ::slotted(a) {
                font-size: 1.2em;
                opacity: 0;
                transition: border-bottom 0.5s, background-color 0.5s, color 0.5s, opacity: 0.5s;
                font-family: 'Gothic A1', sans-serif;
                text-decoration: none;
                flex: 1;
                height: 1.5em;
                line-height: 1.5em;
                color: var(text-colour)!important;
                opacity: 1;
                text-transform: uppercase;
                cursor: pointer;
            }
            @media screen and (max-width: 900px) {
                .nav-list ::slotted(a) {
                    display: block;
                    text-align: center;
		    padding: 0.3em;
		    font-size: 1.2em;
                }
                .nav-list {
                    padding-bottom: 0em;
                }
            }
            </style>
            <div id="nav-top">
                <div class="nav-list" role="navigation">
                    <slot></slot>
                </div>
            </div>
        `;
    }

    hide() {
    }
    show() {
    }

    connectedCallback() {
        this.shadowRoot.querySelector('div.nav-list').addEventListener('click', (e) => {
            if (e.target.tagName === 'DIV') {
            }
        });
    }
}

window.customElements.define('dinoai-nav', DinoAINav);

