import * as d3 from 'd3';
import '../index.scss';

const width = 800;
const height = 400;
const margin = 40;

const parseDate = d3.timeParse('%Y%m%d'); //.time.format("%Y%m%d").parse;

const x = d3.scaleTime()
    .range([0, width - 2 * margin]);

const y = d3.scaleLinear()
    .range([height - 2 * margin, 0]);

const svg = d3.select('body svg')
    .append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

const area = d3.area()
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d['San Francisco'])})
    .y1(function(d) { return y(d['New York'])})
    .curve(d3.curveCatmullRom.alpha(0.5));

const line = area.lineY1();

d3.tsv('../../data/data.tsv', function(d) {
    d.date = parseDate(d.date);
    d['New York']= +d['New York'];
    d['San Francisco'] = +d['San Francisco'];
    return d;
}).then(function(data) {
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([
        d3.min(data, function(d) { return Math.min(d['New York'], d['San Francisco']); }),
        d3.max(data, function(d) { return Math.max(d['New York'], d['San Francisco']); })
    ]);

    svg.datum(data);

    svg.append('path')
        .attr('d', area)
        .attr('class', 'area above');

    svg.append('path')
        .attr('d', area)
        .attr('clip-path', 'url(#clip-below)')
        .attr('class', 'area below');

    svg.append('path')
        .attr('d', line)
        .attr('class', 'area line');

    svg.append('clipPath')
        .attr('id', 'clip-below')
        .append('path')
        .attr('d', area.y0(height - 2 * margin));

    svg.append('g')
        .attr('transform', `translate(0, ${height - 2 * margin})`)
        .call(d3.axisBottom(x));

    svg.append('g')
        .call(d3.axisLeft(y));
});

var locale = d3.timeFormatLocale({
    "dateTime": "%A, %e %B %Y г. %X",
    "date": "%d.%m.%Y",
    "time": "%H:%M:%S",
    "periods": ["AM", "PM"],
    "days": ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
    "shortDays": ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
    "months": ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
    "shortMonths": ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
});
  
var formatMillisecond = locale.format(".%L"),
    formatSecond = locale.format(":%S"),
    formatMinute = locale.format("%I:%M"),
    formatHour = locale.format("%I %p"),
    formatDay = locale.format("%a %d"),
    formatWeek = locale.format("%b %d"),
    formatMonth = locale.format("%B"),
    formatYear = locale.format("%Y");

function multiFormat(date) {
    return (d3.timeSecond(date) < date ? formatMillisecond
        : d3.timeMinute(date) < date ? formatSecond
        : d3.timeHour(date) < date ? formatMinute
        : d3.timeDay(date) < date ? formatHour
        : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
        : d3.timeYear(date) < date ? formatMonth
        : formatYear)(date);
}

var date = new Date(2000, 2, 4);

console.log(date)

console.log(d3.timeWeek(date));

console.log(multiFormat(date));
