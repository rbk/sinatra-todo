$(function(){

	$('#list').submit(function(e){
		e.preventDefault();
		var item = $('#item').val();
		$.post('/user', { name: item }, function(res){
			$('#list-of-things').load('/ #list-of-things');
			$('#item').val('');
		});
		return false;
	});

	$(document).on('click', '.delete', function(){
		var id = $(this).attr('id');
		$.ajax({
			url: '/user',
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
	$(document).on( 'click', '.edit', function(){
		var li = $(this).parent();
		var id = li.attr('id');
		var text = li.find('span').text();
		li.prepend( $('<input>', {value: text, id: id}) );
		li.find('span').text('');
		$(this).removeClass('edit').addClass('update').text('Update');
	});
	/*
	*
	*
	*/
	$(document).on('click', '.update', function(){
		var li = $(this).parent();
		var id = li.attr('id');
		var new_value = li.find('input').val();
		var button = $(this);
		$.ajax({
			url: 'user',
			type: 'put',
			data: {
				id: id,
				name: new_value
			}
		}).done(function(res){
			console.log('updated');
			li.find('span').text(li.find('input').val());
			li.find('input').remove();
			button.removeClass('update').addClass('edit').text('Edit');
		});
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