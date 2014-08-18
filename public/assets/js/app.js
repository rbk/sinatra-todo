$(function(){
	
	// CREATE
	$('input#addTodo').click(function(e){
		e.preventDefault();
		var todo = $('input#todo').val();
		if( todo ){
			$.post('/todo/new', { name: todo, done: false }, function(response){

				console.log(  )
				response = jQuery.parseJSON(response)
				response.id = response._id.$oid
				delete response['_id']

				var todo_template = $('#todo-template').html();
				todo_template = todo_template.replace('{{id}}', response.id );
				todo_template = todo_template.replace('{{name}}', response.name );
				$('.todos').prepend(todo_template);

				console.log( response )
				
				$('input#todo').val('');
				if( $('.no-todos').length ){
					$('.no-todos').remove();
				}
			});
		} else {

		}
	});
	// ARCHIVED
	// DONE
	// DELETE
	// UPDATE

	// DELETE ALL
	$('.remove_all_todos').click(function(){
		$.ajax({
			url: '/api/todos/',
			type: 'DELETE',
			success: function(response) {
				$('.todos').find('li.todo').remove();
				$('.todos').append('<li class="no-todos">No Todos Found</li>');
				alert(response)
			}
		});
	});

	// SHOW ALL TODOS
	$(window).load(function(){
		// return;
		$.get('/api/todos',function(data){
			if( data.length ){

				$.each( data, function(index,value) {
					var todo_template = $('#todo-template').html();
					todo_template = todo_template.replace('{{id}}', value['_id'].$oid );
					todo_template = todo_template.replace('{{name}}', value['name'] );
					$('.todos').prepend(todo_template);
				});				

			} else {
				$('.todos').append('<li class="no-todos">No Todos Found</li>');
			}

		});
	});

	$('.todos').on('click','.done', function(){
		$(this).toggleClass('fa-check-square-o');
		$(this).toggleClass('fa-square-o');
	});


	$('.todos').on( 'click', '.todo', function(){
		
		var input = $(this).find('input');
		var current_todo_text = $(this).find('span.name').text();

		if( input.length == 0 ){
			// var this_text = $(this).text().trim();
			$(this).find('.todo-name').html('<input type="text" class="todo_update_text" value="'+current_todo_text+'">');
			$(this).find('input').focus().select();
		}
	});
	$('.todos').on('change', '.todo_update_text',function(){
		$.ajax({
			url: '/todos',
			type: 'POST',
			data: { name: $(this).val(), id: $(this).parent().parent().attr('id') },
			success: function(response) {
				var response = jQuery.parseJSON(response);
				// console.log( jQuery.parseJSON(response) )
				// console.log( $('#' + response.id) )
				console.log( $('#' + response.id).find('input').val() )
				$('#' + response.id).animate('background-color','red')
				$('#' + response.id).find('input').addClass('pulse animated');
				t = setTimeout(function(){
					$('#' + response.id).find('input').removeClass('pulse')
				},1000)

				// var text_value = $(this).val()
				// $(this).parent().html('<span class="name">'+text_value+'</span>')
			}
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