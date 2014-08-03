$(function(){
	
	// var Todo = Backbone.Model.extend ({
	// 	initialize: function(){
	// 		urlRoot: '/todos'
	// 		console.log( 'TodoModel says init everytime a new instance is created.' );
	// 	},
	// 	defaults: function(){
	// 		return {
	// 			title: 'nothing',
	// 			done: false						
	// 		}
	// 	},
	// 	toggle: function() {
 //  			this.save({done: !this.get("done")});
	// 	}
	// });
	// var todolist = Backbone.Collection.extend({
	// 	model: Todo
	// });

	// var testing = new Todo();

	var richard = {
		'name' : 'richard',
		'age'  : '27',
		'nickname' : 'dick'
	};
	$('.richard').click(function(){
		$.ajax({
			url: '/whatever',
			type: 'post',
			data: richard,
			success: function(result) {
				console.log( result )
			}
		});
	});
	// CREATE
	$('input#addTodo').click(function(e){
		e.preventDefault();
		var todo = $('input#todo').val();
		if( todo ){
			$.post('api', { name: todo }, function(id){
				var todo_template = $('#todo-template').html();
				todo_template = todo_template.replace('{{id}}', id );
				todo_template = todo_template.replace('{{name}}', todo );
				$('.todos').prepend(todo_template);
				
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
		$('.todos').find('li.todo').remove();
		$.ajax({
			url: '/api',
			type: 'DELETE',
			success: function(result) {
				$('.todos').append('<li class="no-todos">No Todos Found</li>');
			}
		});
	});

	// SHOW ALL TODOS
	$(window).load(function(){
		$.get('api',function(data){
			if( data.length ){
				$.each( data, function(index,value) {
					var todo_template = $('#todo-template').html();
					todo_template = todo_template.replace('{{id}}', value['_id'].$oid );
					todo_template = todo_template.replace('{{name}}', value['name'] );
					$('.todos').prepend(todo_template);

					// $('.todos').prepend('<li class="todo" id="'+  +'">' + value['name'] + '<i class="done fa fa-square-o"></i></li>');
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
		$(this).attr('contenteditable', true);
	// 	var input = $(this).find('input');
	// 	if( input.length == 0 ){
	// 		var this_text = $(this).text();
	// 		$(this).html('<input type="text" class="todo_update_text" value="'+this_text+'"><i class="done fa fa-square-o"></i>');
	// 	}
	});
	$('.todos').on('change', '.todo_update_text',function(){
		alert("do some shit now")
	});



});