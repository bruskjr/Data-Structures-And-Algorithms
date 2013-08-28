/* Trie.js
*
* Simple implementation of a singely linked list.
*
* @author Bryan Rusk
*/

/* Represents a node in the linked list
*/

var LinkedListNode = function(data){
	this.data = data;
	this.next = null;
};

var LinkedList = function(){
	this.init();
};

LinkedList.prototype = {
	init : function(){
		this.head = null;
	},

	/* Insert an element into the linked list 
	* @params {LinkedListNode} node to add to the list
	*
	* @return {Boolean} true if successfully inserted, else false
	*/
	insert: function(node){
		if ( !this.head ) {
			this.head = node;
			return true;
		}

		// Traverse to the end of the list 
		var current_node = this.head;
		while ( current_node.next ) {
			current_node = current_node.next
		}

		current_node.next = node;

		return true;
	},

	/* Deletes and data that matches (===) the data passed in
	* @params {Object} data to delete
	* @returns {Boolean} true if any nodes were removed
	*/
	remove: function(data){
		if ( !this.head ){
			return false;
		}

		var previous_node = null;
		var current_node = this.head;
		var removed = false;
		while( current_node ) {
			if( current_node.data === data ) {
				if ( previous_node ) {
					if ( current_node.next ) {
						previous_node.next = current_node.next; // Remove current_node
						current_node = previous_node.next;
					} else { // if last node in list
						previous_node.next = null;
						current_node = previous_node;
					}
				} else {
					this.head = current_node.next; // Remove head by setting head to next node
					current_node = this.head;
				}
				removed = true;
				continue;
			}

			previous_node = current_node;
			current_node = current_node.next;
		}

		return removed;
	},

	/* Reverse the linked list in place 
	* @returns {Boolean} true if reversed, else false
	*/
	reverse: function(){
		if ( !this.head ){
			return false;
		}

		var tmp = null;
		var previous_node = null;
		var current_node = this.head;
		

		while( current_node ) {
			tmp = current_node.next;
			current_node.next = previous_node;
			previous_node = current_node;
			current_node = tmp;
		}

		this.head = previous_node;
	},

	/* Create a string representation of the linked list
	*  @returns {String} 
	*/
	stringify : function(){
		if ( !this.head ) {
			return null;
		}

		
		var current_node = this.head;
		var str = current_node.data.toString() + " ---->";
		while ( current_node.next ) {
			current_node = current_node.next;
			str += " " + current_node.data.toString() + " ---->";
			
		}

		return str + "null";
	}
};