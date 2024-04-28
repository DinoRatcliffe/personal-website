class DinoAIRadarChart extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                text {
                    font-family: 'Roboto';
                    font-size: 1em;
                    font-weight: 400;
                }
                #radarChart {
                    width: 100%;
                }
                .key {
                    opacity: 1;
                    color: var(--text-colour);
                    font-family: 'Gothic A1';
                    font-size: 1em;
                    font-weight: 800;
                    text-transform: capitalize;
                }
            </style>
            <div id="radarChart">
            </div>
        `;
    }

    connectedCallback() {
        let features = ["Programming", "Visualisations", "Problem Solving", "Dev Ops", "Fast Learner", "Results Analysis", "Mathmatics", "Published Work", "Writing", "Research Method"];
        var height = 250;
        var width = 480;

        var data = [{"Programming": 9, 
                     "Visualisations": 9,
                     "Problem Solving": 9,
                     "Dev Ops": 8,
                     "Fast Learner": 9,
                     "Results Analysis": 9,
                     "Mathmatics": 8,
                     "Published Work": 9,
                     "Writing": 9,
                     "Research Method": 9},
                    {"Programming": 9, 
                     "Visualisations": 9,
                     "Problem Solving": 9,
                     "Dev Ops": 8,
                     "Fast Learner": 9,
                     "Results Analysis": 8.5,
                     "Mathmatics": 6,
                     "Published Work": 3,
                     "Writing": 7,
                     "Research Method": 8}];
        let colors = ["var(--text-colour)", "#be79ff"];
        let strokeWidth = 2;

        let key = d3.select(this.shadowRoot.getElementById('radarChart')).append("svg").attr("viewBox", [0, 0, width, 100]);
        key.append('rect').attr('width', '20').attr('height', '20').attr('fill', colors[1]).attr('x', strokeWidth).attr('y', '20').attr('fill-opacity', '0.46').attr('stroke', colors[1]).attr('stroke-width', strokeWidth);
        key.append('rect').attr('width', '20').attr('height', '20').attr('fill', 'url(#hash4_4)').attr('x', strokeWidth).attr('y', '50').attr('fill-opacity', '0.46').attr('stroke', colors[0]).attr('stroke-width', strokeWidth);
        key.append('rect').attr('width', '20').attr('height', '20').attr('fill', colors[0]).attr('x', strokeWidth).attr('y', '50').attr('fill-opacity', '0.46').attr('stroke', colors[0]).attr('stroke-width', strokeWidth);


        key.append('text').attr('x', '35').attr('class', 'key').attr('y', 30 + strokeWidth).text('Current Skill Level').attr('fill', 'var(--text-colour)').attr('alignment-baseline', 'middle');
        key.append('text').attr('x', '35').attr('class', 'key').attr('y', 60 + strokeWidth).text('Future Development').attr('fill', 'var(--text-colour)').attr('alignment-baseline', 'middle');
            
        let svg = d3.select(this.shadowRoot.getElementById('radarChart')).append("svg").attr("viewBox", [0, 0, width, height]);

        //Pattern injection
        var defs = svg.append("defs");
        var pattern = defs.append("pattern").attr('id', "hash4_4").attr('width', "8").attr('height', "8").attr('patternUnits', "userSpaceOnUse").attr('patternTransform', "rotate(45)");
        var rect = pattern.append("rect").attr('width', "4").attr('height', "8").attr('transform', "translate(0,0)").attr('fill', "var(--text-colour)");

        // Plot gridlines
        let radialScale = d3.scaleLinear().domain([0, 10]).range([0, (height/2) * 0.8]);
        let ticks = [2.5, 5, 7.5, 10];

        function angleToCoordinate(angle, value){
            let x = Math.cos(angle) * radialScale(value);
            let y = Math.sin(angle) * radialScale(value);
            return {"x": width/2 + x, "y": height/2 - y};
        }

        ticks.forEach(t => svg.append("circle").attr("cx", width/2).attr("cy", height/2).attr("fill", "none").attr("stroke", "var(--text-colour)").attr('stroke-width', '1').attr('opacity', '0.1').attr("r", radialScale(t)));

        for (var i = 0; i < features.length; i++) {
            let ft_name = features[i];
            let angle = (Math.PI / 2 + (Math.PI / 10)) + (2 * Math.PI * i / features.length);
            let line_coordinate = angleToCoordinate(angle, 11);
            let dot_coordinate = angleToCoordinate(angle, 10);
            let start_line_coordinate = angleToCoordinate(angle, 0);
            let label_coordinate = angleToCoordinate(angle, 12);

            svg.append("line").attr('x1', start_line_coordinate.x).attr('y1', start_line_coordinate.y).attr('x2', line_coordinate.x).attr('y2', line_coordinate.y).attr('stroke', 'var(--text-colour)').attr('opacity', '0.4');
            svg.append('text').attr('x', label_coordinate.x).attr('y', label_coordinate.y).text(ft_name).attr('fill', 'var(--text-colour)').attr('text-anchor', angle < 4.5 ? 'end' : 'start').attr('alignment-baseline', 'middle');
//            svg.append("circle").attr("cx", dot_coordinate.x).attr("cy", dot_coordinate.y).attr('fill', colors[1]).attr("r", 4);
        }

        let line = d3.line().x(d => d.x).y(d => d.y);
        function getPathCoordinates(data_point){
            let coordinates = [];
            var firstAngle;
            for (var i = 0; i < features.length; i++){
                let ft_name = features[i];
                let angle = (Math.PI / 2) + (Math.PI / 10) + (2 * Math.PI * i / features.length);
                coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
                if (i == 0) {
                    firstAngle = angleToCoordinate(angle, data_point[ft_name]);
                }
            }
            coordinates.push(firstAngle);
            return coordinates;
        }

        // create mask
        let d = data[1];
        let coordinates = getPathCoordinates(d);
        var mask = svg.append("mask").attr('id', "clip-0");
        mask.append('rect').attr('x', 0).attr('y', 0).attr('width', '100%').attr('height', '100%').attr('fill', 'var(--text-colour)');
        mask.append('path')
            .datum(coordinates)
            .attr("d",line)
            .attr('fill', 'black');

        // draw diff
        d = data[0];
        coordinates = getPathCoordinates(d);
        var path = svg.append("path")
        .datum(coordinates)
        .attr("d",line)
        .attr("stroke-width", 0)
        .attr("fill", "url(#hash4_4)")
        .attr("fill-opacity", 0.46)
        .attr('mask', 'url(#clip-0)');

        if (i == 1) {
            path.attr('mask', 'url(#clip-0)');
        }

        for (var i = 0; i < data.length; i ++){
            let d = data[i];
            let color = colors[i];
            let coordinates = getPathCoordinates(d);

            //draw the path element
            var path = svg.append("path")
            .datum(coordinates)
            .attr("d",line)
            .attr("stroke-width", strokeWidth)
            .attr("stroke", color)
            .attr("fill", color)
            .attr("fill-opacity", 0.46);
        }
    }

    lineGenerator(coordinates) {
        const line = d3.line()
            .x((d) => d.x)
            .y((d) => d.y);

        return line(coordinates);
    }
}

window.customElements.define('dinoai-radar-chart', DinoAIRadarChart);

