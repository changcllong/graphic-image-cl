import * as d3 from 'd3';
import '../index.scss';

const height = 400 - 80;
const width = 800 - 80;
const margin = 40;
const svg = d3.select('body svg');
const g = svg.append('g')
    .attr('class', 'histogram')
    .attr('transform', `translate(${margin}, ${margin})`);

const data = d3.range(1000).map(d3.randomBates(10));

const formatCount = d3.format(",.0f");

const x = d3.scaleLinear()
    .rangeRound([0, width]);

const bins = d3.histogram().domain(x.domain())
    .thresholds(x.ticks(20))(data);

const y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(bins, function(d) { return d.length; })]);

const bar = g.selectAll('.bar').data(bins)
    .enter().append('g')
    .attr('class', 'bar')
    .attr('transform', function(d) { return `translate(${x(d.x0)}, ${y(d.length)})`; });

bar.append('rect')
    .attr('x', 1)
    .attr('width', (x(bins[0].x1) - x(bins[0].x0)) - 1)
    .attr('height', function(d) { return height - y(d.length); });

bar.append('text')
    .attr('class', 'text')
    .attr('y', 12)
    .attr('x', (x(bins[0].x1) - x(bins[0].x0)) / 2)
    .attr('text-anchor', 'middle')
    .text(function(d) { return formatCount(d.length); });

g.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x));
