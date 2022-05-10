const svgHeight = 500;
const svgWidth = 500;
const svg = d3.select("#my_d3_viz")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight)
.append("g");

d3.csv(
    "https://gis-cityofchampaign.opendata.arcgis.com/datasets/979bbeefffea408e8f1cb7a397196c64_22.csv?outSR=%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D",
    d3.autoType)
    .then(function(trees){
        console.log(trees);
        const xScale = d3
            .scaleLinear()
            .domain(d3.extent(trees, (d) => d.X))
            .range([0, svgWidth]);
        const yScale = d3
            .scaleLinear()
            .domain(d3.extent(trees, (d) => d.Y))
            .range([svgHeight, 0]);
        svg
            .append("g")
            .selectAll("circle")
            .data(trees)
            .enter()
            .append("circle")
            .attr("cx", (d) => xScale(d.X))
            .attr("cy", (d) => yScale(d.Y))
            .attr("r", 1)
            .style("fill", "green");
    })
