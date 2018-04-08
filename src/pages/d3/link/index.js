import * as d3 from 'd3';
import '../index.scss';

const height = 2000;
const width = 960;

const svg = d3.select('body svg')
    .attr('height', height)
    .attr('width', width);

const g = svg.append('g')
    .attr('class', 'links')
    .attr('transform', 'translate(40, 0)');

const tree = d3.tree().size([height, width - 160])
    .separation(function(a, b) {
        return a.parent === b.parent ? 2 : 4;
    });

const stratify = d3.stratify()
    .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf('.')); });

d3.csv('../../data/flare.csv').then(function(data) {
    const root = stratify(data)
        .sort(function(a, b) { return (a.height - b.height) || a.id.localeCompare(b.id); });

    g.selectAll('.link').data(tree(root).links())
        .enter().append('path')
        .attr('class', 'link')
        .attr('d', d3.linkHorizontal()
            .x(function(d) { return d.y; })
            .y(function(d) { return d.x; }));

    const node = g.selectAll('.node').data(root.descendants())
        .enter().append('g')
        .attr('class', function(d) { return `node${d.children ? '' : ' node-leaf'}`; })
        .attr('transform', function(d) { return `translate(${d.y}, ${d.x})`; });

    node.append('circle').attr('r', 2.5);

    node.append('text')
        .attr('dy', 3)
        .attr('x', function(d) { return d.children ? -8 : 8; })
        .style('text-anchor', function(d) { return d.children ? 'end' : 'start'; })
        .text(function(d) { return d.id.substring(d.id.lastIndexOf('.') + 1); });
});
