/* 
 sorting.js

 Implementation of various sorts for practice

 @author Bryan Rusk

 */

/* Insertion sort in O(n^2)
* @params {Array}
*/
function insertionSort(a){
	if ( a.length <= 1 )
		return a;

	var i, j, tmp;
	for( i = 0; i < a.length; i++){
		for (j = 0; j < a.length; j++){
			if ( a[i] < a[j] ){
				tmp = a[i];
				a[i] = a[j];
				a[j] = tmp;
			}		
		}
	}

	return a;
}


/* Merge sort in O(nlogn)
* @params {Array}
*/
function mergeSort(a){
	if ( a.length <= 1 )
		return a;

	var left = new Array();
	var right = new Array();
	var i; // Left and Right lists after split
	var middle = ~~(a.length/2);

	// Split array in half
	for(i=0; i < middle; i++) {
		left.push(a[i]);
	}
	
	for(i=middle; i < a.length; i++) {
		right.push(a[i]);
	}

	left = mergeSort(left);
	right = mergeSort(right);
	
	return merge(left, right);
}

function merge(left, right){
	var list = [];

	// Merge list back together on item at a time
	while ( left.length > 0 || right.length > 0 ) {
		if ( left.length > 0 && right.length > 0 ) {
			if ( left[0] <= right[0] ) {
				list.push(left[0]);
				left.splice(0, 1);
			} else {
				list.push(right[0]);
				right.splice(0, 1);
			}
		} else if ( left.length > 0 ) {
			list.push(left[0]);
			left.splice(0, 1);
		} else if ( right.length > 0 ) {
			list.push(right[0]);
			right.splice(0, 1);
		}
	}

	return list;
}

function countingSort(a, min, max){
	var count = new Array(max-min+1);

	for (var i=0; i < count.length;i++){
		count[i] = 0;
	}
	for(var i=0; i< a.length; i++){
		count[a[i]-min] = count[a[i]-min] + 1
	}

	var z = 0;
	for(var i=min; i < max + 1; i++ ){
		while( count[i-min] > 0 ) {
			a[z] = i;
			z++;
			count[i-min] = count[i-min] - 1;
		}
	}
}
