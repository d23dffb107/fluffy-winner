var svg = d3.select("svg");

var scale = d3.scale.linear()
    .domain([0, 2])
    .range(["red", "blue"]);

d3.json("http://s3-us-west-2.amazonaws.com/vida-public/geo/us.json", function(data){
    svg.selectAll(".state")
    //.feature() creates the path
    //.features returns the individual elements of the collection
	.data(topojson.feature(data,data.objects.states).features)
	.enter().append("path")
    //sets the map projection to albersUsa - how the map is displayed
	.attr("d",d3.geo.path().projection(d3.geo.albersUsa()))
	.attr("class",function(){return "state";})
    //id that corresponds to ids from tsv file
	.attr("id",function(state){
	    return state.id;})
	.attr("stroke", "black")
	.attr("fill", function(){
	    var v = voteData2008[idToState[this.id]];
	    if(v === undefined){
		return "black";
	    }else{
		return scale(Math.cbrt(v[0]/(v[0]+v[1])*2-1)+1);
	    }
	})
});

changeData = function changeData(){
    svg.selectAll(".state")
	.attr("fill", function(){
	    var year = document.getElementById("slider").value;
	    var v = yearToData[year][idToState[this.id]];
	    if(v === undefined){
		return "black";
	    }else{
		return scale(Math.cbrt(v[0]/(v[0]+v[1])*2-1)+1);
	    }
	})
};

document.getElementById("slider").addEventListener("input", changeData);
