var width  = window.innerWidth-5;
var height = window.innerHeight-5;
var radius = 10;

var svg = d3.select("#viz")
    .append("svg")
    .attr("width", width)
    .attr("height", height);    

const circles = d3.range(20).map(i => ({
    x: Math.random() * (width - radius * 2) + radius,
    y: Math.random() * (height - radius * 2) + radius,
}));

let voronoi = d3.Delaunay
    .from(circles, d => d.x, d => d.y)
    .voronoi([0, 0, width, height]);

const circle = svg.append("g")
    .selectAll("circle")
    .data(circles)
    .join("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", radius)
    .attr("fill", (d, i) => d3.schemeCategory10[i % 10]);

const mesh = svg.append("path")
    .attr("fill", "none")
    .attr("stroke", "#ccc")
    .attr("stroke-width", 1)
    .attr("d", voronoi.render());

const cell = svg.append("g")
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .selectAll("path")
    .data(circles)
    .join("path")
    .attr("d", (d, i) => voronoi.renderCell(i))
    .call(d3.drag()
        .on("start", d => circle.filter(p => p === d).raise().attr("stroke", "black"))
        .on("drag", d => (d.x = d3.event.x, d.y = d3.event.y))
        .on("end", d => circle.filter(p => p === d).attr("stroke", null))
        .on("start.update drag.update end.update", update));

function update() {
    voronoi = d3.Delaunay.from(circles, d => d.x, d => d.y).voronoi([0, 0, width, height]);
    circle.attr("cx", d => d.x).attr("cy", d => d.y);
    cell.attr("d", (d, i) => voronoi.renderCell(i));
    mesh.attr("d", voronoi.render());
}
