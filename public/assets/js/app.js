$(function(){

	$('#list').submit(function(e){
		e.preventDefault();
		var item = $('#item').val();
		$.post('/todo', { name: item }, function(res){
			$('#output').load('/todos #list-of-things');
			$('#item').val('');
		});
		return false;
	});

	$(document).on('click', '.delete', function(){
		var id = $(this).attr('id');
		$.ajax({
			url: '/todo',
			type: 'delete',
			data: {
				id: id
			}
		}).done(function(res){
			if( res == 1 ){
				$( '#' + id ).remove();
			}
		});
	});
	// alternative is to have a timeout that gets reset
	// instead of a post request on keyup, save after three seconds of typing
	// with will be much better for the server and in turn the user
	var t;
	$(document).on('keyup', '#list-of-things input[type=text]', function(){
		window.clearTimeout(t);
		var li = $(this).parent();
		var id = li.attr('id');
		var new_value = li.find('input').val();
		var button = $(this);

		t = setTimeout(function(){
			$.ajax({
				url: '/todo',
				type: 'put',
				data: {
					id: id,
					name: new_value
				}
				}).done(function(){
					console.log( Math.random() )
				});
		}, 2000);
	});


//////////////////////Backbone only //////////////////////////////

	// var Todo = Backbone.Model.extend ({
	// 	initialize: function(){
	// 		console.log( 'init' );
	// 	},
	// 	urlRoot: '/todos',
 //        defaults: {
 //            name: 'default',
 //            done:false
 //        }	
	// });
	// var todo = new Todo({
	// 	name: 'new one',
	// 	done: true
	// });
 //    todo.save({},{ 
 //    	success: function(model, response, options){ 
 //    		console.log(model) 
 //    		console.log(response) 
 //    		console.log(options) 
 //    	},
 //    	error: function(model, response, options){
 //    		alert('Error on save of todo');
 //    	}
	// });



});