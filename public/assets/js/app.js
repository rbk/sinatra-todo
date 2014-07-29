$(function(){
	
	var Todo = Backbone.Model.extend ({
		initialize: function(){
			urlRoot: '/todos'
			console.log( 'TodoModel says init everytime a new instance is created.' );
		},
		defaults: function(){
			return {
				title: 'nothing',
				done: false						
			}
		},
		toggle: function() {
  			this.save({done: !this.get("done")});
		}
	});
	var todolist = Backbone.Collection.extend({
		model: Todo
	});

	var testing = new Todo();


});