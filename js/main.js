
// **** Your JavaScript code goes here ****

d3.csv('./data/coffee_data.csv', function(error, dataset) {
	console.log('data import complete');
	console.log(dataset);

	var w = d3.select('svg').attr('width');
	var h = d3.select('svg').attr('height');

	var barPadding = 55;
	var wPadding = 90;
	var hPadding = 70;

	// get max value for each region and category
	var r = d3.nest()
				.key(function(d) {return d.region})
				.rollup(function(v) {return d3.sum(v, function(d) {
					return +d.sales; })})
				.object(dataset);
	var c = d3.nest()
				.key(function(d) {return d.category})
				.rollup(function(v) {return d3.sum(v, function(d) {
					return +d.sales; })})
				.object(dataset);

	var rList = [r['Central'], r['East'], r['South'], r['West']];
	var cList = [c['Coffee'], c['Tea'], c['Espresso'], c['Herbal Tea']];
	
	var yScaleRegion = d3.scaleLinear()
				.domain([0, 300000]).range([0, 500]);

	var svg = d3.select("svg");

	svg.selectAll('rect.region')
				.data(rList)
				.enter()
				.append('rect')
				.attr('class', function(d, i) {
					return 'rect' + i ;
				})
				.attr('x', function(d, i) {
					return   80 + i * ((w/2) - wPadding) / rList.length;
				})
				.attr('y', function(d) {
					return (h - hPadding) - yScaleRegion(d);
				})
				.attr('width', (w/2)/rList.length - barPadding)
				.attr('height', function(d) {
					return yScaleRegion(d);
				});
	
	svg.selectAll('rect.category')
				.data(cList)
				.enter()
				.append('rect')
				.attr('class', function(d, i) {
					return 'rect'+ (4 + i) ;
				})
				.attr('x', function(d, i) {
					return   480 + i * ((w/2) - wPadding) / cList.length;
				})
				.attr('y', function(d) {
					return (h - hPadding) - yScaleRegion(d);
				})
				.attr('width', (w/2)/cList.length - barPadding)
				.attr('height', function(d) {
					return yScaleRegion(d);
				});

})

var svg = d3.select('svg');

var salesScale = d3.scaleLinear()
		.domain([0, 300000])
		.range([480, 0]);

var rScale = d3.scaleLinear()
		.domain([1, 4])
		.range([95, 315]);

var ticks = [1,2,3,4];
var tickLabels = ['Central','East','South','West'];
var pLabels = ['Coffee', 'Tea', 'Espresso', 'Herbal Tea']

var rAxis = d3.axisBottom(rScale)
		.tickValues(ticks)
		.tickFormat(function(d,i){ return tickLabels[i] });
var pAxis = d3.axisBottom(rScale)
		.tickValues(ticks)
		.tickFormat(function(d,i){ return pLabels[i] });

var salesAxis = d3.axisLeft(salesScale)
		.tickFormat(function (d) {
		    if ((d / 1000) >= 1) {
		    	d = d / 1000 + "K";
		     }
		     return d;
		 });

svg.append("g")
    	.attr("class", "raxis")
    	.call(rAxis)
    	.attr("transform","translate(0, 535)");

svg.append("g")
		.attr("class", "raxis")
		.call(pAxis)
		.attr("transform","translate(400, 535)");

svg.append('g').attr('class', 'salesAxis')
		.attr('transform', 'translate(70, 50)')
		.call(salesAxis);

svg.append('g').attr('class', 'salesAxis')
		.attr('transform', 'translate(470, 50)')
		.call(salesAxis);

svg.append('text')
		.attr('class', 'axisLabel')
		.attr('transform', 'translate(165, 580)')
		.style('font-weight', 'bold')
		.text('Region');

svg.append('text')
		.attr('class', 'axisLabel')
		.attr('transform', 'translate(580, 580)')
		.style('font-weight', 'bold')
		.text('Product');

svg.append('text')
		.attr('class', 'axisLabel')
		.attr('transform', 'translate(25, 360)rotate(-90)')
		.style('font-weight', 'bold')
		.text('Coffee Sales (USD)');

svg.append('text')
		.attr('class', 'axisLabel')
		.attr('transform', 'translate(425, 360)rotate(-90)')
		.style('font-weight', 'bold')
		.text('Coffee Sales (USD)');

svg.append('text')
		.attr('class', 'chartLabel')
		.attr('transform', 'translate(115, 30)')
		.style('font-weight', 'bold')
		.text('Coffee Sales by Region');

svg.append('text')
		.attr('class', 'chartLabel')
		.attr('transform', 'translate(490, 30)')
		.style('font-weight', 'bold')
		.text('Coffee Sales by Product (USD)');

var test = d3.select('path')
		.attr('class', 'ras');
