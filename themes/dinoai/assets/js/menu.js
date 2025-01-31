class DinoAIMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.closed = false;
        this.logo_closed = false;
        this.shadowRoot.innerHTML = `
            <style>
                :host {
//                    --primary-colour: #E42826;
                    --primary-colour: transparent;
                    --background-colour: whit;
                    --text-colour: black;
                    --menu-speed: 0.8s;

                    --menu-initial-left: 0em;
                    --menu-tab-width: 100%;
                    --menu-tab-height: 5em;
                    --menu-expanded-width: 100%;
                    --menu-expanded-height: 10em;

                    --nav-speed: 0.8s;
                }
.initial-drawer {
    position: fixed;
    color: white;
    top: 0;
    left: var(--menu-initial-left);
    width: var(--menu-expanded-width);
    left: 0em;
    height: var(--menu-expanded-height);
    background-color: var(--dark-colour);
}

.initial-content {
    opacity: 1;
    display: flex;
}

#logoContainer {
    display: flex;
    -webkit-tap-highlight-color: transparent;
    z-index: 1010;
    cursor: pointer;
    min-width: 768px;
    margin: auto;
}


.expand-draw {
    animation-name: drawer_animation_in;
    animation-duration: var(--menu-speed);
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
}

.shrink-draw {
    animation-name: drawer_animation_out;
    animation-duration: var(--menu-speed);
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
}

@keyframes drawer_animation_in {
    0% {
        width: var(--menu-tab-width);
        height: var(--menu-tab-height);
        left: var(--menu-initial-left);
        background-color: var(--primary-colour);
    }
    33% {
        width: var(--menu-tab-width);
        height: var(--menu-tab-height);
        left: 0em;
    }
    66% {
        width: var(--menu-expanded-width);
        height: var(--menu-tab-height);
        left: 0em;
    }
    100% {
        width: var(--menu-expanded-width);
        left: 0em;
        height: var(--menu-expanded-height);
        background-color: var(--dark-colour);
    }
}

@keyframes drawer_animation_out {
    100% {
        width: var(--menu-tab-width);
        height: var(--menu-tab-height);
        left: var(--menu-initial-left);
        background-color: var(--primary-colour);
    }
    66% {
        width: var(--menu-tab-width);
        height: var(--menu-tab-height);
        left: 0em;
    }
    33% {
        height: var(--menu-tab-height);
        width: var(--menu-expanded-width);
        left: 0em;
    }
    0% {
        width: var(--menu-expanded-width);
        left: 0em;
        height: var(--menu-expanded-height);
        background-color: var(--dark-colour);
    }
}

.margin_initial {
    height: var(--menu-expanded-height);
    width: var(--menu-expanded-width);
    background-color: var(--dark-colour);
}

.margin_in {
    animation-name: move_logo_into_margin;
    animation-duration: var(--menu-speed);
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
}
.margin_out {
    animation-name: move_logo_outof_margin;
    animation-duration: var(--menu-speed);
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
}

@keyframes move_logo_into_margin {
    0% {
        transform: translate(-7em, 0);
    }
    100% {
        transform: translate(0, 0);
    }
}
@keyframes move_logo_outof_margin {
    0% {
        transform: translate(0em, 0);
    }
    100% {
        transform: translate(-7em, 0);
    }
}
.fade-in {
    animation-name: fade_animation_in;
    animation-duration: var(--menu-speed);
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
}
.fade-out {
    animation-name: fade_animation_out;
    animation-duration: var(--menu-speed);
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
}
@keyframes fade_animation_in {
    0% {
        opacity: 0;
    }
    33% {
        opacity: 0;
    }
    66% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes fade_animation_out {
    0% {
        opacity: 1;
    }
    10% {
        opacity: 0;
    }
    33% {
        opacity: 0;
    }
    66% {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
}
               #content {
                   flex: 1;
                   flex-direction:column;
                   padding-top: 1em;
                   min-width: 768px;
                   margin: auto;
               }
               .navigation {
                    flex: 1;
                    -webkit-tap-highlight-color: transparent;
               }
               .social {
                    -webkit-tap-highlight-color: transparent;
               }
               #menu-top {
                    background-color: var(--dark-colour);
                    display: flex;
                    flex-direction: column;
                    z-index: 100;
                    overflow: hidden;
                    padding-top: 1.1em;
               }
                @media screen and (max-width: 900px) {
                    #logoContainer {
                        min-width: unset;
			margin-left: 1em;
			margin-right: 1em;
                    }
                    #menu-top {
			padding: 0;
			flex-direction: row;
			height: unset;
                    }
                    #content {
                        min-width: unset;
			padding: 0;
			margin: 0;
                    }
@keyframes move_logo_into_margin {
    0% {
        transform: translate(-3em, 0);
    }
    100% {
        transform: translate(0, 0);
    }
}
@keyframes move_logo_outof_margin {
    0% {
        transform: translate(0em, 0);
    }
    100% {
        transform: translate(-3em, 0);
    }
}
@keyframes drawer_animation_in {
    0% {
        width: var(--menu-tab-width);
        left: var(--menu-initial-left);
	height: 4em;
    }
    33% {
        width: var(--menu-tab-width);
        left: 0em;
    }
    66% {
        width: var(--menu-expanded-width);
        left: 0em;
    }
    100% {
        width: var(--menu-expanded-width);
        left: 0em;
    }
}

@keyframes drawer_animation_out {
    100% {
        width: var(--menu-tab-width);
        left: var(--menu-initial-left);
	height: 4em;
    }
    66% {
        width: var(--menu-tab-width);
        left: 0em;
    }
    33% {
        width: var(--menu-expanded-width);
        left: 0em;
    }
    0% {
        width: var(--menu-expanded-width);
        left: 0em;
    }
}
                }
            </style>
            <div id="menu-top", class="initial-drawer">
                <div id="logoContainer" class="contrast clickable-cursor">
                <dinoai-logo></dinoai-logo>
                </div>
                <div id="content" class="initial-content">
                    <div class="navigation">
                        <slot name="navigation"></slot>
                    </div>
                    <div class="social">
                        <slot name="social"></slot>
                    </div>
                </div>
            </div>
        `;
        this.currentBoundry = 1000;
        this.boundryStep = 1000;
        var menu = this;
        window.addEventListener("scroll", function(e) {
           if (window.scrollY > menu.currentBoundry) {
                menu.close()
                if ((window.scrollY - menu.currentBoundry) > menu.boundryStep) {
                    menu.currentBoundry += menu.boundryStep;
                }
           } else if (window.scrollY < menu.currentBoundry) {
                //menu.open()
                if ((menu.currentBoundry - window.scrollY) > menu.boundryStep) {
                    menu.currentBoundry -= menu.boundryStep;
                }
           }
        });
    }

    close() {
        if (! this.closed ) {
            this.shadowRoot.getElementById('menu-top').classList.add('shrink-draw');
            this.shadowRoot.getElementById('menu-top').classList.remove('expand-draw');

            this.shadowRoot.getElementById('logoContainer').classList.add('contrast');

            this.shadowRoot.querySelector('dinoai-logo').shrink();
            this.shadowRoot.getElementById('content').classList.add('fade-out');
            this.shadowRoot.getElementById('content').classList.remove('fade-in');
            this.dispatchEvent(new CustomEvent('menu-toggle', {detail: {closed: true}}));
            document.getElementsByTagName('main')[0].classList.remove('menu-open')
            document.getElementsByTagName('main')[0].classList.add('menu-close')
            this.shadowRoot.getElementById('logoContainer').classList.remove('margin_in');
            this.shadowRoot.getElementById('logoContainer').classList.add('margin_out');

            this.closed = true;
        }
    }
    open(animation) {
        if ( this.closed ) {
            this.shadowRoot.getElementById('content').style.display = 'flex';
            this.shadowRoot.getElementById('menu-top').classList.remove('shrink-draw');
            this.shadowRoot.getElementById('menu-top').classList.add('expand-draw');

            this.shadowRoot.getElementById('logoContainer').classList.remove('contrast');
            this.shadowRoot.getElementById('logoContainer').classList.remove('margin_out');
            this.shadowRoot.getElementById('logoContainer').classList.add('margin_in');

            this.shadowRoot.getElementById('content').classList.add('fade-in');
            this.shadowRoot.getElementById('content').classList.remove('fade-out');
            this.shadowRoot.querySelector('dinoai-logo').expand();
            this.dispatchEvent(new CustomEvent('menu-toggle', {detail: {closed: false}}));
            document.getElementsByTagName('main')[0].classList.remove('menu-close')
            document.getElementsByTagName('main')[0].classList.add('menu-open')
            this.closed = false;
        }
    }

    connectedCallback() {
        this.logo = this.shadowRoot.querySelector('dinoai-logo');
        this.logoContainer = this.shadowRoot.getElementById('logoContainer');

        this.content = this.shadowRoot.getElementById('content')

        const menu = this;

        this.logo.onclick = function() {
            if (menu.closed) {
                menu.open();
            } else {
                menu.close();
            }
        }

        this.drawer = this.shadowRoot.getElementById('menu-top');

        // Close on ESC
        document.addEventListener('keydown', event => {
            const key = event.key
            if (event.keyCode == 27 && !menu.closed) {
                menu.close();
                menu.closed = true;
            }
        });
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {}
}

window.customElements.define('dinoai-menu', DinoAIMenu);
