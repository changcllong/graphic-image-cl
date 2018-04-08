import * as d3 from 'd3';
import '../index.scss';

const width = 1000;
const height = 400;
const margin = 40;

const svg = d3.select('body svg').attr('width', width);
const g = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

const x = d3.scaleBand()
    .rangeRound([0, width - 2 * margin])
    .paddingInner(0.05)
    .align(0.1);

const y = d3.scaleLinear()
    .range([height - 2 * margin, 0]);

const z = d3.scaleOrdinal()
    .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

d3.csv('../../data/data.csv', function(d, i, columns) {
    let t = 0;
    for (let i = 1; i < columns.length; ++i) {
        t += d[columns[i]] = +d[columns[i]];
    }
    d.total = t;
    return d;
}).then(function(data) {
    const keys = data.columns.slice(1);
    data.sort(function(a, b) { return b.total - a.total; });
    x.domain(data.map(function(d) { return d.State; }));
    y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
    z.domain(keys);
    g.append('g').selectAll('g').data(d3.stack().keys(keys)(data))
        .enter().append('g').attr('fill', function(d) { return z(d.key); })
        .selectAll('rect').data(function(d) { return d; })
        .enter().append('rect')
        .attr('x', function(d) { return x(d.data.State); })
        .attr('y', function(d) { return y(d[1]); })
        .attr('height', function(d) { return y(d[0]) - y(d[1]); })
        .attr('width', x.bandwidth);

    g.append('g').attr('transform', `translate(0, ${height - 2 * margin})`)
        .call(d3.axisBottom(x));

    g.append('g').call(d3.axisLeft(y).tickFormat(d3.formatPrefix('.0s', 1e6)));

    const legend = g.append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .attr('text-anchor', 'end')
        .selectAll('g').data(keys.slice().reverse())
        .enter().append('g')
        .attr('transform', function(d, i) { return `translate(0, ${20 * i})`});
    legend.append('rect')
        .attr('x', width - 2 * margin - 19)
        .attr('width', 19)
        .attr('height', 19)
        .attr('fill', z);
    legend.append('text')
        .attr('x', width - 2 * margin - 24)
        .attr('dy', '1.32em')
        .text(function(d) { return d; });
});
