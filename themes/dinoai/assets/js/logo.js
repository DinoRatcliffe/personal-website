class DinoAILogo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
        <style>
:host {
    --menu-speed: 0.8s;

    --menu-initial-left: 6em;
    --menu-tab-width: 2.7em;
    --menu-tab-height: 5em;
    --menu-expanded-width: 20em;

    --nav-speed: 0.4s;
}
.large {
    width: 23em;
    height: 7em;
}

#dio {
    opacity: 1.0;
    fill: white;
}

h1 {
    pointer-events: none;
    color: var(--logo-colour);
}

#I{
    transform: translate(0.74em, 0em);
    opacity: 1;
}

.open-I {
    animation-name: I_animation_open;
    animation-iteration-count: 1;
    animation-duration: var(--menu-speed);
    animation-fill-mode: both;
}

.close-I {
    animation-name: I_animation_close;
    animation-iteration-count: 1;
    animation-duration: var(--menu-speed);
    animation-fill-mode: both;
}

#O{
    transform: translate(-2.1em, 0em);
    opacity: 1;
}

.open-O {
    animation-name: O_animation_open;
    animation-iteration-count: 1;
    animation-duration: var(--menu-speed);
    animation-fill-mode: both;
}

.close-O {
    animation-name: O_animation_close;
    animation-iteration-count: 1;
    animation-duration: var(--menu-speed);
    animation-fill-mode: both;
}

@keyframes O_animation_close {
    0% {
        transform: translate(-2.1em, 0em);
        opacity: 0;
    }
    33% {
        transform: translate(-2.1em, 0em);
    }
    100% {
        transform: translate(0em, 0em);
        opacity: 1;
    }
}
@keyframes O_animation_open {
    0% {
        transform: translate(0em, 0em);
        opacity: 1;
    }
    66% {
        transform: translate(-2.1em, 0em);
    }
    100% {
        transform: translate(-2.1em, 0em);
        opacity: 0;
    }
}


#D{
    transform: translate(2.3em, 0em);
    opacity: 1;
}

.open-D {
    animation-name: D_animation_open;
    animation-iteration-count: 1;
    animation-duration: var(--menu-speed);
    animation-fill-mode: both;
}

.close-D {
    animation-name: D_animation_close;
    animation-iteration-count: 1;
    animation-duration: var(--menu-speed);
    animation-fill-mode: both;
}

@keyframes D_animation_close {
    0% {
        transform: translate(2.3em, 0em);
        opacity: 0;
    }
    33% {
        transform: translate(2.3em, 0em);
    }
    100% {
        transform: translate(0em, 0em);
        opacity: 1;
    }
}
@keyframes D_animation_open {
    0% {
        transform: translate(0em, 0em);
        opacity: 1;
    }
    66% {
        transform: translate(2.3em, 0em);
    }
    100% {
        transform: translate(2.3em, 0em);
        opacity: 0;
    }
}

@keyframes I_animation_close {
    0% {
        transform: translate(0.74em, 0em);
    }
    33% {
        transform: translate(0.74em, 0em);
    }
    100% {
        transform: translate(0em, 0em);
    }
}
@keyframes I_animation_open {
    0% {
        transform: translate(0em, 0em);
    }
    66% {
        transform: translate(0.74em, 0em);
    }
    100% {
        transform: translate(0.74em, 0em);
    }
}

.open-dio {
    animation-name: I_animation_open;
    animation-iteration-count: 1;
    animation-duration: var(--menu-speed);
    animation-fill-mode: both;
}

.close-dio {
    animation-name: dio_animation_close;
    animation-iteration-count: 1;
    animation-duration: var(--menu-speed);
    animation-fill-mode: both;
}

@keyframes dio_animation_close {
    0% {
        opacity: 0.01;
    }
    33% {
        opacity: 0.01;
    }
    66% {
        opacity: 1.0;
    }
    100% {
        opacity: 1.0;
    }
}
@keyframes dio_animation_open {
    0% {
        opacity: 1.0;
    }
    33% {
        opacity: 1.0;
    }
    66% {
        opacity: 0.01;
    }
    100% {
        opacity: 0.01;
    }
}
#logo-a-bar {
    opacity: 1.0;
}

#right-bar {
    transform: translate(-0.35em, 0em)
}

.close-abar {
    animation-name: abar_animation_close;
    animation-iteration-count: 1;
    animation-duration: var(--menu-speed);
    animation-fill-mode: both;
}

.open-abar {
    animation-name: abar_animation_open;
    animation-iteration-count: 1;
    animation-duration: var(--menu-speed);
    animation-fill-mode: both;
}

.close-right-bar {
    animation-name: right_bar_animation_close;
    animation-iteration-count: 1;
    animation-duration: var(--menu-speed);
    animation-fill-mode: both;
}

.open-right-bar {
    animation-name: right_bar_animation_open;
    animation-iteration-count: 1;
    animation-duration: var(--menu-speed);
    animation-fill-mode: both;
}

@keyframes right_bar_animation_close {
    0% {
        transform: translate(-0.35em, 0em);
    }
    33% {
        transform: translate(-0.35em, 0em);
    }
    100% {
        transform: translate(0em, 0em);
    }
}
@keyframes right_bar_animation_open {
    0% {
        transform: translate(0em, 0em);
    }
    66% {
        transform: translate(-0.35em, 0em);
    }
    100% {
        transform: translate(-0.35em, 0em);
    }
}

@keyframes abar_animation_close {
    0% {
        opacity: 1.0;
    }
    100% {
        opacity: 0.0;
    }
}
@keyframes abar_animation_open {
    0% {
        opacity: 0.0;
    }
    100% {
        opacity: 1.0;
    }
}
#drawer-logo {
    position: relative;
    left: -0.2em;
    margin: auto;
    display: block;
    padding-top: 1.8em;
    user-select: none;
    cursor: pointer;
}

#surname.largetext {
    font-size: 2.43em;
}
#surname.smalltext {
    font-size: 1em;
}

#surname {
    font-family: 'Gothic A1';
    font-weight: 400;
    width: 8.5em;
    position: relative;
    padding-top: 0.2em;
    margin: auto;
    display: block;
    opacity: 0;
    letter-spacing: 0.43em;
    user-select: none;
    left: -0.15em;
}

.open-surname {
    animation-name: surname_animation_open;
    animation-iteration-count: 1;
    animation-duration: var(--menu-speed);
    animation-fill-mode: both;
}

.close-surname {
    animation-name: surname_animation_close;
    animation-iteration-count: 1;
    animation-duration: var(--menu-speed);
    animation-fill-mode: both;
}

@keyframes surname_animation_close {
    0%, 75% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes surname_animation_open {
    0% {
        opacity: 1;
    }
    25%, 100% {
        opacity: 0;
    }
}

.drawer-logo-initial {
    animation-name: logo_animation_open;
    animation-iteration-count: 1;
    animation-duration: 0;
    animation-fill-mode: both;
}

.drawer-logo-open {
    animation-name: logo_animation_open;
    animation-iteration-count: 1;
    animation-duration: var(--menu-speed);
    animation-fill-mode: both;
}

.drawer-logo-close {
    animation-name: logo_animation_close;
    animation-iteration-count: 1;
    animation-duration: var(--menu-speed);
    animation-fill-mode: both;
}

@keyframes logo_animation_open {
    0% {
        left: -0.2em;
    }
    100% {
        left: 0em;
    }
}

@keyframes logo_animation_close {
    0% {
        left: 0em;
    }
    100% {
        left: -0.2em;
    }
}
                    </style>
        <svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   sodipodi:docname="new-logo-drawer.svg"
   inkscape:version="1.0 (4035a4fb49, 2020-05-01)"
   id="drawer-logo"
   version="1.1"
   class="drawer-logo-intial"
   viewBox="0 0 96.023155 33.279572"
   height="12.10188mm"
   width="35.891106mm">
  <defs
     id="defs6981" />
  <sodipodi:namedview
     inkscape:window-maximized="1"
     inkscape:window-y="0"
     inkscape:window-x="1200"
     inkscape:window-height="1440"
     inkscape:window-width="2560"
     showgrid="false"
     inkscape:document-rotation="0"
     inkscape:current-layer="layer1"
     inkscape:document-units="mm"
     inkscape:cy="146.76806"
     inkscape:cx="197.49552"
     inkscape:zoom="0.35"
     inkscape:pageshadow="2"
     inkscape:pageopacity="0.0"
     borderopacity="1.0"
     bordercolor="#666666"
     pagecolor="#ffffff"
     id="base" />
  <metadata
     id="metadata6984">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     transform="translate(-53.579309,-109.33428)"
     id="layer1"
     style="pointer-events: none;"
     inkscape:groupmode="layer"
     inkscape:label="Layer 1">
    <g
       transform="translate(-7.3129534,-11.067846)"
       id="g7672">
      <g
         style="font-style:normal;font-weight:normal;font-size:60.4879px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;display:inline;fill:--var(--logo-colour);fill-opacity:1;stroke:none;stroke-width:1.5122"
         id="left_bar"
         transform="matrix(0.64753307,0,0,0.64753307,30.127634,110.06243)"
         aria-label="/">
        <path
           id="path6923"
           style="fill:var(--logo-colour);fill-opacity:1;stroke-width:1.5122"
           d="m 119.97707,16.037443 h 5.02097 l -15.35826,49.707585 h -5.02097 z" />
      </g>
      <g
         style="font-style:normal;font-weight:normal;font-size:60.4879px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;display:inline;fill:var(--logo-colour);fill-opacity:0.544601;stroke:none;stroke-width:1.5122"
         id="middle_bar"
         transform="matrix(0.64753307,0,0,0.64753307,30.127634,110.06243)"
         aria-label="\">
        <path
           id="path6926"
           style="fill:var(--logo-colour);fill-opacity:0.544601;stroke-width:1.5122"
           d="m 124.95203,16.0772 15.35825,49.707585 h -5.02096 L 119.93106,16.0772 Z" />
      </g>
      <g id="right-bar">
      <g>
           <defs>
            <clipPath id="oclip">
                <path d="m 131,120 -10,33 38,0 0,-33 z"></path>
            </clipPath>
          </defs>
      <g
         style="font-style:normal;font-weight:normal;font-size:60.4879px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;display:inline;fill:var(--logo-colour);fill-opacity:1;stroke:none;stroke-width:1.5122"
         transform="matrix(0.64753307,0,0,0.64753307,30.127634,110.06243)"
         aria-label="/">
        <path
           style="fill:var(--logo-colour);fill-opacity:1;stroke-width:1.5122"
           d="m 150.68048,16.083639 h 5.02096 l -15.35825,49.707585 h -5.02097 z" />
        </g>
        <g clip-path="url(#oclip)" style="-webkit-clip-path: url(#oclip)">
        <g id="O">
      <g
         style="font-style:normal;font-weight:normal;font-size:78.3077px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;display:inline;fill:var(--logo-colour);fill-opacity:1;stroke:none;stroke-width:1.95769"
         id="text4651-8-5-9-9-9-7-5"
         transform="matrix(0.54371729,0,-0.00591763,0.53425355,46.509754,29.969357)"
         aria-label="O">
        <path
           id="path6932"
           style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:78.3077px;font-family:'Gothic A1';-inkscape-font-specification:'Gothic A1, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start;writing-mode:lr-tb;text-anchor:start;fill:var(--logo-colour);fill-opacity:1;stroke-width:1.95769"
           d="m 159.50154,199.71217 q 0,-13.45913 6.50015,-21.71815 6.50015,-8.33549 17.35923,-8.33549 10.93555,0 17.28275,8.25902 6.42368,8.25901 6.42368,21.87109 0,13.76503 -6.50015,21.8711 -6.42368,8.0296 -17.20628,8.0296 -10.85908,0 -17.35923,-8.10607 -6.50015,-8.18255 -6.50015,-21.8711 z m 6.27074,0 q 0,11.31791 4.74128,18.04748 4.74129,6.6531 12.84736,6.6531 7.95313,0 12.69441,-6.57663 4.74129,-6.57662 4.74129,-18.04748 0,-11.31791 -4.58834,-18.12395 -4.58835,-6.80604 -12.84736,-6.80604 -8.10607,0 -12.84736,6.72957 -4.74128,6.72957 -4.74128,18.12395 z" />
      </g>
      </g>
      </g>
      </g>
      </g>
      <g
         style="display:inline;"
         id="abar"
         transform="matrix(0.64753307,0,0,0.64753307,60.165844,81.687577)">
        <path
           sodipodi:nodetypes="cccccc"
           inkscape:connector-curvature="0"
           id="path4592-33-3-9-6-0-5-6"
           d="m 83.124726,90.913545 1.272455,4.111663 -21.692072,-0.0089 0.630309,-2.076601 0.632614,-2.064542 z"
           style="fill:var(--logo-colour);fill-opacity:0.544601;stroke:none;stroke-width:0.305313px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
      </g>
      <g id="I">
         <g>
           <defs>
            <clipPath id="dclip">
                <path d="m 60,120 36.3,0 -10.3,33 -26,0 z"></path>
            </clipPath>
          </defs>
      <g
         style="font-style:normal;font-weight:normal;font-size:60.4879px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;display:inline;fill:var(--logo-colour);fill-opacity:1;stroke:none;stroke-width:1.5122"
         id="text4537-2-3-0-5-1-1-1-7"
         transform="matrix(0.64753307,0,0,0.64753307,32.127634,110.06243)"
         aria-label="/">
        <path
           style="fill:var(--logo-colour);fill-opacity:1;stroke-width:1.5122"
           d="m 98.695895,15.967832 h 5.020965 L 88.358607,65.675418 h -5.020968 z" />
           </g>
           <g clip-path="url(#dclip)" style="-webkit-clip-path: url(#dclip)">
           <g id="D">
      <g
         style="font-style:normal;font-weight:normal;font-size:80.2923px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;display:inline;fill:var(--logo-colour);fill-opacity:1;stroke:none;stroke-width:2.00731"
         id="text4651-8-5-9-9-6-5-4"
         transform="matrix(0.53027847,0,8.4070529e-5,0.5477931,45.509754,29.969357)"
         aria-label="D">
        <path
           id="path6938"
           style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:80.2923px;font-family:'Gothic A1';-inkscape-font-specification:'Gothic A1, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start;writing-mode:lr-tb;text-anchor:start;fill:var(--logo-colour);fill-opacity:1;stroke-width:2.00731"
           d="m 28.982186,223.8201 v -58.72943 h 15.83891 q 12.702492,0 19.994664,7.52741 7.292171,7.44899 7.292171,21.87651 0,13.72183 -7.05694,21.56287 -7.05694,7.76264 -20.386716,7.76264 z m 6.272836,-5.33191 h 8.468328 q 10.193358,0 16.074141,-5.72396 5.880784,-5.80238 5.880784,-18.26964 0,-12.62408 -5.880784,-18.34804 -5.880783,-5.72397 -15.91732,-5.72397 h -8.625149 z" />
      </g>
      </g>
      </g>
      </g>
      </g>
      <g id="dio">
      </g>
    </g>
  </g>
</svg>
        <h1 id="surname">RATCLIFFE</h1>
        `;
        this.logoSvg = this.shadowRoot.querySelector('svg');
        this.abar = this.shadowRoot.querySelector('#abar')
        this.rightBar = this.shadowRoot.querySelector('#right-bar')
        this.I = this.shadowRoot.querySelector('#I')
        this.D = this.shadowRoot.querySelector('#D')
        this.O = this.shadowRoot.querySelector('#O')
        this.surname = this.shadowRoot.querySelector('#surname')
        this.shrunk = true
        this.expand();
    }

    shrink() {
        this.classList.remove('drawer-logo-open')
        this.classList.add('drawer-logo-close')

        this.abar.classList.remove('close-abar');
        this.abar.classList.add('open-abar');

        this.rightBar.classList.remove('close-right-bar');
        this.rightBar.classList.add('open-right-bar');

        this.I.classList.remove('close-I');
        this.I.classList.add('open-I');

        this.D.classList.remove('close-D');
        this.D.classList.add('open-D');

        this.O.classList.remove('close-O');
        this.O.classList.add('open-O');

        this.surname.classList.remove('close-surname');
        this.surname.classList.add('open-surname');
        this.shrunk = true

    }

    expand() {
        this.classList.remove('drawer-logo-close')
        this.classList.add('drawer-logo-open')

        this.abar.classList.add('close-abar');
        this.abar.classList.remove('open-abar');

        this.rightBar.classList.add('close-right-bar');
        this.rightBar.classList.remove('open-right-bar');

        this.I.classList.add('close-I');
        this.I.classList.remove('open-I');

        this.D.classList.add('close-D');
        this.D.classList.remove('open-D');

        this.O.classList.add('close-O');
        this.O.classList.remove('open-O');

        this.surname.classList.add('close-surname');
        this.surname.classList.remove('open-surname');
        this.shrunk = false
    }

    toggle() {
        if (this.shrunk) {
            this.expand()
        } else {
            this.shrink()
        }
    }

    connectedCallback() {
        if (this.expanded) {
            this.expand();
        }

        if (this.large) {
            this.classList.add('large');
            this.surname.classList.add('largetext');
        } else {
            this.surname.classList.add('smalltext');
        }
    }

    static get observedAttributes() {
        return ['expanded', 'large'];
    }
}

window.customElements.define('dinoai-logo', DinoAILogo);

