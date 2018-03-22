import 'babel-polyfill';
import './index.scss';

const xlinkns = "http://www.w3.org/1999/xlink";
const xmlns="http://www.w3.org/2000/svg"

const root = document.getElementsByTagName('svg')[0];

const rect = document.getElementById('svg-rect');

rect.style.stroke = 'red';

const text = document.createElementNS(xmlns, 'text');
text.setAttributeNS(null, 'x', '200');
text.setAttributeNS(null, 'y', '50');
text.setAttributeNS(null, 'style', 'font-size: 40px; fill: darkseagreen; font-weight: bold; font-style: oblique; stroke: pink;')
const textNode = document.createTextNode('HELLO SVG');
text.appendChild(textNode);

const path = document.createElementNS(xmlns, 'path');
path.setAttributeNS(null, 'd', 'M 10 200 C 100 130 300 350 350 150');
path.setAttributeNS(null, 'class', 'cl-svg-path');

root.appendChild(text);
root.appendChild(path);

const point = path.getPointAtLength(path.getTotalLength()/2);
const circle = document.createElementNS(xmlns, 'circle');
circle.setAttributeNS(null, 'cx', point.x);
circle.setAttributeNS(null, 'cy', point.y);
circle.setAttributeNS(null, 'r', '10');
circle.setAttributeNS(null, 'stroke', 'pink');
circle.setAttributeNS(null, 'fill', 'grey');

root.appendChild(circle);

const group3 = document.getElementById('g3');
const svgRect = root.createSVGRect();
svgRect.width = 500;
svgRect.height = 500;

console.log(root.getIntersectionList(svgRect, null));

console.log(group3.nearestViewportElement);

console.log(path.getBBox());
console.log(path.getCTM());
console.log(path.getTotalLength());
console.log(path.getPointAtLength(path.getTotalLength()/2));

