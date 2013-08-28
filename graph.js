/* 
 graph.js

 Graph representation in javascript

 Also included graph traversals, searches and shortest path algorithims

 @author Bryan Rusk

 */

var Graph = (function(){

	var adjacency_list = {};
	var adjacency_matrix = new Array();

	function Graph(){
	}


	Graph.prototype = {

		get_vertices: function(){
			return Object.keys(adjacency_list);
		},
		add_edge: function(start, end, weight){
			// Return if start or end are undefined or false
			if ( !start || !end )
				return false;

			// Set weight to 1 by default
			if ( !weight )
				var weight = 1

			// Only allow for a single edge to vertex
			if ( !adjacency_list[start] ){
				adjacency_list[start] = {};
			}

			if ( !adjacency_list[end] ) { 
				adjacency_list[end] = {}
			}

			adjacency_list[start][end] = weight;
		},

		dfs:function(value){
		},

		/* Perform a bfs on the graph to find value
		* @params {Object} vertex to start on 
		* @params {Object} value to find
		* @returns {Boolean} true if found
		*/
		bfs : function(start, value){
			if ( !value || !start )
				return false;

			// If start equals value search is done
			if ( start == value )
				return true;

			var queue = [start];
			var visited = {};
			var vertex, adjacent;

			while ( queue.length > 0 ) {
				vertex = queue.splice(0, 1);
				adjacent = adjacency_list[vertex];

				//Mark as visited
				visited[vertex] = true;
				for ( key in adjacent ) {
					// If we find the value, then done
					if ( key == value ) {
						return true;
					}

					if ( !visited[key] ) {
						queue.push(key)
					}
				}

			}

			return false;
		},
		dijkstra: function(start){
			var dist = {};
			var previous = {};
			

			for ( key in adjacency_list ) {
				dist[key] = null;
				previous[key] = null;
			}

			dist[start] = 0;
			var vertices = this.get_vertices();
			var adjacent_list = adjacency_list;
			var min, minIndex, shortest, v, adjacent, alt;

			while ( vertices.length > 0 ){
				// Select vertex with smallest distance
				shortest = null;
				for ( var i=0; i < vertices.length; i++ ) {
					v = vertices[i];
					if ( dist[v] != null ) {

						if ( !shortest || dist[v] < shortest ) {
							shortest = dist[v];
							min = v;
							minIndex = i;
						}
					}
				}

				vertices.splice(minIndex, 1); // Remove v from vertices
				
				if  ( dist[min] == null ) break;

				adjacent = adjacent_list[min];

				for ( v in adjacent ) {
					alt = dist[min] + adjacent[v];
					if ( !dist[v] || alt < dist[v]) {
						dist[v] = alt;
						previous[v] = min;
					}
 				}
			}
			
			console.log(previous);
			return dist;
		}, 
		bellman_ford: function(value){},
		stringify: function(){
			return JSON.stringify(adjacency_list, null, " ")
		}
	}


	return Graph;
}());