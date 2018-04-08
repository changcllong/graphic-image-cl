import * as d3 from 'd3';
import '../index.scss';

const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(100);

const data = [1, 1, 2, 3, 5, 8, 13, 21];
const arcs = d3.pie()(data);

const colors = [
    '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
    '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
];

d3.select('body svg').append('g')
    .attr('transform', 'translate(400, 200)')
    .selectAll('path')
    .data(arcs).enter().append('path')
    .attr('fill', function(d, i) { return colors[i]; })
    .attr('d', function(d) { return arc(d); });

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

arc.context(context);

context.translate(width / 2, height / 2);

arcs.forEach(function(d, i) {
    context.beginPath();
    arc(d);
    context.fillStyle = colors[i];
    context.fill();
});
