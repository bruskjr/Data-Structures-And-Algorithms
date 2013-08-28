/* 
 binary-search-tree.js

 Basic Binary Search Tree representation in javascript

 @author Bryan Rusk

 */

 var BinarySearchTree = (function(){



 	function BinarySearchTree(){

 	};


 	function Node(key, value){
	 	this.parent = null;
	 	this.left = null;
	 	this.right = null;
	 	this.key = key;
	 	this.value = value;
	}

	Node.prototype.minKey = function(){
		if ( !this.left ) {
			return this.key;
		} else {
			return this.left.minKey();
		}
	}

	var root = null;

	/* Insert a node into the tree
	* @params {Node} node: node to insert
	* @params {Node} parent: current node in traversal
	*/
	function insertNode(node, parent){
		var key = node.key;
		var parent_key = parent.key;

		if ( key > parent_key ) {
			if ( !parent.right ) {
				parent.right = node;
			} else {
				insertNode(node, parent.right);
			}
		} else {
			if ( !parent.left ) {
				parent.left = node;
			} else {
				insertNode(node, parent.left);
			}
		}
	}

	function removeKey(key, node, parent) { 
		if ( key < node.key ) {
			if ( node.left ) {
				return removeKey(key, node.left, parent);
			} else {
				return false;
			}
		} else if ( key > node.key ) {
			if ( node.right != null ) {
				return removeKey(key, node.right, node);
			} else {
				return false;
			}
		} else {
			if ( node.left && node.right ) {
				node.key = node.right.minKey();
				removeKey(node.key, node.right, node);
			} else if ( parent.left == node ) {
				if ( node.left )
					parent.left = node.left;
				else 
					parent.left = node.right; 
			} else if ( parent.right == node ) {
				if ( node.left )
					parent.right = node.left;
				else 
					parent.right = node.right; 
			} 
			return true;
		}
	}

	// In order traversal to print tree
	function printTree(node){
		if ( node.left )
			printTree(node.left);
		
		console.log(node.key);

		if ( node.right )
			printTree(node.right);
	}

	// In order traversal to print tree
	function preorderPrint(node){
		console.log(node.key);
		if ( node.left )
			printTree(node.left);
		
		

		if ( node.right )
			printTree(node.right);
		
	}

	// In order traversal to print tree
	function postorderPrint(node){
		if ( node.left )
			printTree(node.left);
		
		

		if ( node.right )
			printTree(node.right);
		console.log(node.key);
	}


 	BinarySearchTree.prototype = {
 		insert: function(key, value){
 			if ( !root ) {
 				root = new Node(key, value);
 			} else {
 				var node = new Node(key, value);
 				insertNode(node, root);
 			}
 		},

 		remove : function(key) {
 			return removeKey(key, root, null);
 		},

 		print : function(type) {
 			if ( !root ) {
 				console.log("");
 			}

 			if (  type == "postorder"){
 				postorderPrint(root);
 			} else if ( type == "preorder") {
 				preorderPrint(root);
 			} else {
 				printTree(root);
 			}

 		}
 	};

 	return BinarySearchTree;
 }());
