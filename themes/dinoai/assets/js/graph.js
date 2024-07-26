class DinoAIForceGraph extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                .textContainer {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    font-family: 'berkeley-mono';
                    font-weight: 500;
                    font-size: 0.7em;
                    text-transform: uppercase;
                    text-align: center;
                }
                .textContainer.g1 {
                    font-size: 1.5em;
                }
            </style>
        `;

        this.height = 690;
        this.width = 600;

        this.simulation = d3.forceSimulation([])
            .force("link", d3.forceLink().id(d => d.id).distance(200).strength(0.2))
            .force("charge", d3.forceManyBody())
            .force('collision', d3.forceCollide().radius(d => d.r))
            .force("center", d3.forceCenter(this.width / 2, this.height / 2));

        this.link = null;
        this.node = null;

        this.data = {
            nodes: [{id: "Artificial Intelligence", group: 1, r: 100, x: 524, y: 233},
                    {id: "Reinforcement Learning", group: 2, r: 70, x: 477, y: 428},
                    {id: "MARL", group: 3, r: 50, x: 401, y: 615},
                    {id: "Inverse RL", group: 3, r: 50, x: 401, y: 615},
                    {id: "Model</br>Based RL", group: 3, r: 50, x: 306, y: 534},
                    {id: "Computer</br>Vision", group: 2, r: 70, x: 354, y: 124},
                    {id: "Self Driving Cars", group: 3, r: 50, x: 173, y: 212},
                    {id: "Medical</br>Imaging", group: 3, r: 50, x: 173, y: 212},
                    {id: "Planning", group: 2, r: 70, x: 353, y: 339},
                    {id: "MCTS", group: 3, r: 50, x: 161, y: 400},
                    {id: "Learnt Forward Models", group: 3, r: 50, x: 161, y: 400},
                    {id: "RHEA", group: 3, r: 50, x: 216, y: 487},
                    {id: "Time Series Prediction", group: 3, r: 50, x: 161, y: 400}
            ],
            links: [{source: "Artificial Intelligence", target: "Reinforcement Learning", value: 1},
                    {source: "Artificial Intelligence", target: "Computer</br>Vision", value: 1},
                    {source: "Reinforcement Learning", target: "MARL", value: 1},
                    {source: "Reinforcement Learning", target: "Inverse RL", value: 1},
                    {source: "Reinforcement Learning", target: "Model</br>Based RL", value: 1},
                    {source: "Computer</br>Vision", target: "Medical</br>Imaging", value: 1},
                    {source: "Computer</br>Vision", target: "Self Driving Cars", value: 1},
                    {source: "Artificial Intelligence", target: "Planning", value: 1},
                    {source: "Planning", target: "MCTS", value: 1},
                    {source: "Planning", target: "Self Driving Cars", value: 1},
                    {source: "Planning", target: "Learnt Forward Models", value: 1},
                    {source: "Planning", target: "Time Series Prediction", value: 1},
                    {source: "Planning", target: "Model</br>Based RL", value: 1},
                    {source: "Planning", target: "RHEA", value: 1}
            ]
        };

        this.links = this.data.links.map(d => Object.create(d));
        this.nodes = this.data.nodes.map(d => Object.create(d));

        this.simulation.nodes(this.nodes);
        this.simulation.force("link").links(this.links);

        this.svg = d3.select(this.shadowRoot).append("svg").attr("viewBox", [0, 0, this.width, this.height]);

        this.link = this.svg.append("g")
            .attr("stroke", "var(--text-colour)")
            .attr("stroke-width", 1)
          .selectAll("line")
          .data(this.links)
          .enter().append("line")

        this.node = this.svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1)
            .attr("fill", "#121212")
          .selectAll("g")
          .data(this.nodes)
          .enter().append("g")
            .attr("transform", d => "translate(" + d.x + ", " + d.y + ")")
            .call(d3.drag()
                .on("start", this.dragstarted(this.simulation))
                .on("drag", this.dragged)
                .on("end", this.dragended(this.simulation)));

        this.node.append('circle')
            .attr("r", d => d.r)
            .attr("stroke-width", d => this.strokeWidth(d))
            .attr("fill", "var(--bg)")
            .attr("stroke", d => this.color(d));

        this.node.append("h1")
            .text(d => d.id);

        this.node.append("foreignObject")
            .attr('width', d => d.r*2)
            .attr('height', d => d.r*2)
            .attr('transform', d => 'translate(' + -d.r + ', ' + -d.r + ')')
            .html(d => "<div class='textContainer g" + d.group + "'><span>" + d.id + "</span></div>");

        this.simulation.on("tick", () => this.ticked());
    }

    color(data) {
        return "#be79ff";
    }

    strokeWidth(d) {
        return 2;
    }

    ticked() {
        this.link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

       this.node
           .attr("transform", d => "translate(" + d.x + ", " + d.y + ")");
    }

    dragstarted(simulation) {
        return function(d) {
            if (!d.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
    }

    dragged(d) {
        d.subject.x = d.x;
        d.subject.y = d.y;
    }

    dragended(simulation) {
        return function(d) {
            if (!d.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    }

    static get observedAttributes() {
        return ["height", "width"];
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if (attr === "height") this.height = newVal;
        if (attr === "width") this.width = newVal;
        this.simulation.force("center", d3.forceCenter(this.width / 2, this.height / 2));
    }
}

window.customElements.define("dinoai-force-graph", DinoAIForceGraph);

