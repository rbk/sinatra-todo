$(function(){
	
	// CREATE
	$('input#addTodo').click(function(e){
		e.preventDefault();
		var todo = $('input#todo').val();
		if( todo ){
			$.post('/todo/new', { name: todo, done: false }, function(response){

				response = jQuery.parseJSON(response)
				response.id = response._id.$oid
				delete response['_id']

				var todo_template = $('#todo-template').html();
				todo_template = todo_template.replace('{{id}}', response.id );
				todo_template = todo_template.replace('{{name}}', response.name );
				todo_template = todo_template.replace('{{done}}', false );
				todo_template = todo_template.replace('{{done-class}}', 'fa-square-o' );

				$('.todos').prepend(todo_template);
				
				$('input#todo').val('');
				if( $('.no-todos').length ){
					$('.no-todos').remove();
				}

				update_todo_count('increase');

			});
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
				$('.todos').append('<li class="no-todos todo">'+response+'</li>');
			}
		});
	});

	// SHOW ALL TODOS
	$(window).load(function(){
		$.get('/api/todos',function(data){
			if( data.length ){

				$.each( data, function(index,value) {
					var todo_template = $('#todo-template').html();
					todo_template = todo_template.replace('{{id}}', value['_id'].$oid );
					todo_template = todo_template.replace('{{name}}', value['name'] );
				
					var done;
					if( value['done'] == 'true' ){
						done = 'fa-check-square-o';
					} else {
						done = 'fa-square-o';
					}
					todo_template = todo_template.replace('{{done}}', value['done'] );
					todo_template = todo_template.replace('{{done-class}}', done );

					$('.todos').prepend(todo_template);
				});				
			} else {
				$('.todos').append('<li class="no-todos todo">No Todos Found</li>');
			}

		});
	});

	$('.todos').on('click','.done', function(){
		$(this).toggleClass('fa-check-square-o');
		$(this).toggleClass('fa-square-o');
	});

	// update todo on change
	$('.todos').on('change', '.name',function(){
		update_todo( $(this) );
	});

	// update todo on click of checkbox
	$('.todos').on('click', '.done-todo', function(){
		$(this).toggleClass('fa-square-o');
		$(this).toggleClass('fa-check-square-o');
		if( $(this).hasClass('fa-check-square-o') ){
			$(this).parent().parent().attr('done', 'true');
		} else {
			$(this).parent().parent().attr('done', 'false');
		}
		update_todo( $(this) )
	});
	// update todo on click of checkbox
	$('.todos').on('click', '.delete-todo', function(){
		var sure = confirm('Are you sure you want to delete this todo item?');
		if( sure ){
			var li = $(this).parents('li')
			$.ajax({
				url: '/todos/?id=' + li.attr('id'),
				type: 'DELETE',
				success: function(response) {
					console.log(response);
					li.remove();
				}
			});
			update_todo_count('decrease')
		}
	});

	$('.archive_todos').on('click',function(){
		archive_completed_todos()
	});


	function update_todo(el){
		var li = el.parents('li');
		$.ajax({
			url: '/todos',
			type: 'POST',
			data: { 
				id: li.attr('id'),
				name: li.find('.name').val(),
				done: li.attr('done')
			},
			success: function(response) {
				var response = jQuery.parseJSON(response);
				$('#' + response.id).find('input').addClass('pulse animated');
				t = setTimeout(function(){
					$('#' + response.id).find('input').removeClass('pulse')
				},1000)
			}
		});

	}
	function update_todo_count(plusMinus){;
		var current_count = $('.todo-count').text();
		current_count = parseInt( current_count );
		if( plusMinus == 'increase' ){
			current_count++;
		} else {	
			current_count--;
		}
		$('.todo-count').text(current_count)
	}

	function archive_completed_todos(){
		var update_array = [];
		$('.todos .todo').each(function(){
			update_array.push( $(this).attr('id') );
		});
		$.ajax({
			url: '/archive-todos',
			type: 'POST',
			data: { 
				todos: update_array
			},
			success: function(response) {
				console.log( response )
			}
		});
	}


















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