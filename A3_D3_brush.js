const svgHeight_brush = 500;
const svgWidth_brush = 500;
var svg = d3.select("#my_d3_brush")
.append("svg")
.attr("width", svgWidth_brush)
.attr("height", svgHeight_brush)
//.append("g");

d3.csv(
    "https://gis-cityofchampaign.opendata.arcgis.com/datasets/979bbeefffea408e8f1cb7a397196c64_22.csv?outSR=%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D",
    d3.autoType)
    .then(function(trees){
        console.log(trees);
        var xScale = d3
            .scaleLinear()
            .domain(d3.extent(trees, (d) => d.X))
            .range([0, svgWidth_brush]);
        var yScale = d3
            .scaleLinear()
            .domain(d3.extent(trees, (d) => d.Y))
            .range([svgHeight_brush, 0]);
        var treeDataPoints = svg
            .append("g")
            .attr("id", "treecircles")
            .selectAll("circle")
            .data(trees)
            .enter()
            .append("circle")
            .attr("cx", (d) => xScale(d.X))
            .attr("cy", (d) => yScale(d.Y))
            .attr("r", 1)
            .style("fill", "black")
        
        const brush = d3.brush();
        svg
        .append("g")
        .attr("class", "brush")
        .call(
            brush.on("brush", (event) => {
                var selection = [
                    [
                        xScale.invert(event.selection[0][0]),
                        yScale.invert(event.selection[0][1])],
                    [
                        xScale.invert(event.selection[1][0]),
                        yScale.invert(event.selection[1][1])
                    ]
                ];
                let selectedTrees = [];
                treeDataPoints.classed("selected", (d) => {
                    let isSelect =
                      selection[0][0] <= d.X &&
                      selection[1][0] >= d.X &&
                      selection[0][1] >= d.Y &&
                      selection[1][1] <= d.Y;
                    if (isSelect) {
                      count += 1;
                      selectedTrees.push(d);
                    }
                    return isSelect;
                  });
            })
        )
    })
