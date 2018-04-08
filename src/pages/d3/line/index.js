import * as d3 from 'd3';
import '../index.scss';

const data = d3.range(40).map(function(i) {
    return i % 5 ? {x: i / 39, y: (Math.sin(i / 3) + 2) / 4} : null;
});

const width = 800;
const height = 400;

const x = d3.scaleLinear()
    .range([0, width - 80]);

const y = d3.scaleLinear()
    .range([height - 80, 0]);

const line = d3.line()
    .defined(function(d) { return d; })
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

const svg = d3.select('body svg').datum(data)
    .append('g')
    .attr('transform', 'translate(40, 40)');

svg.append('path')
    .attr('class', 'line')
    .attr('d', line);

svg.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', `translate(0, ${height - 80})`)
    .call(d3.axisBottom(x));

svg.append('g')
    .attr('class', 'axis axis--y')
    .call(d3.axisLeft(y));

svg.selectAll('.dot').data(data.filter(function(d) { return d; }))
    .enter().append('circle')
    .attr('class', 'line dot')
    .attr('cx', line.x())
    .attr('cy', line.y())
    .attr('r', 3.5);

console.log(data);
