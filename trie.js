/* Trie.js
*
* Simple implementation of a trie
*
* @author Bryan Rusk
*/

var Trie = (function(){
	function Trie(){
		this.root = {};
	}

	Trie.prototype =  {
		/* Insert a word in the trie, unless it is already inserted
		* @param {String} word to add to the trie
		* @returns 
		*/
		insert : function(word){
			var letter;
			var i = 0;
			var current = this.root;
			for(i=0;i<word.length;i++){
				letter = word[i];
				if ( !current[letter] ) {
					current[letter] = {}
				}
				current = current[letter]
			}
			current["end"] = true
		},

		/* Delete a word from the trie, if present.
		* @param {String} word to delete
		* @returns 
		*/
		delete: function(word){

			return remove(word.split(""), 0, this.root);
		},

		/* Find a word in the trie
		* @params {String} word to find
		* @returns {Boolean} true if found, else false
		*/
		find : function(word){
			return search(word.split(""), 0, this.root);
		},

		/* Turn trie representation in a string
		* @returns String
		*/
		stringify: function(){
			return JSON.stringify(this.root, null, " ")
		}
	};

	/* Find helper
	* @param {String} word to add to the trie
	* @returns {Boolean} true if word is found, else false
	*/
	function search(word, letter_index, node){
		if ( !node ) {
			node = this.root;
		}

		if ( letter_index == word.length){ // If no more letters, check for end
			if ( node['end'] ){
				return true;
			} else {
				return false;
			}
		} else {
			var letter = node[word[letter_index]];
			if ( letter ) {
				return true && this.search(word, letter_index + 1, letter);
			} else {
				return false;
			}
		}
	}

	/* Delete helper
	* @param {String} word to add to the trie
	* @returns 
	*/
	function remove(word, letter_index, node){
		if( !node ) {
			node = this.root;
		}
		if ( letter_index == word.length) {
			if ( node["end"] ) {
				delete node["end"];	
			}
			return Object.keys(node).length == 0;
		} else {
			var letter = node[word[letter_index]];
			if ( remove(word, letter_index + 1, letter) ) {

				delete node[word[letter_index]]; // Delete this node

				return Object.keys(node).length == 0;
			} else {
				return false;
			}
		}
	}

	return Trie;
}());
