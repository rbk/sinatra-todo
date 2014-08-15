$(function(){
	
	var Todo = Backbone.Model.extend ({
		initialize: function(){
			console.log( 'init' );
		},
		urlRoot: '/todos',
        defaults: {
            name: 'default',
            done:false
        }	
	});
	var todo1 = new Todo({
		name: 'new one',
		done: true
	});
    // todo1.save(todo_details, {error: function(model, response, options){ console.log(response) }});
    todo1.save({},{ 
    	success: function(model, response, options){ 
    		console.log(model) 
    		console.log(response) 
    		console.log(options) 
    	}
    	// ,
    	// error: function(model, response, options){ 
    	// 	console.log(model) 
    	// 	console.log(response) 
    	// 	console.log(options) 
    	// }
	});
    // todo1.save(todo_details, {success: function(res){ console.log(res) }});

	// todo1.save( todo_details, {
 //        success: function (todo) {
 //            // alert(todo.toJSON());
 //            // $('#message').text('success');
 //            // console.log('success')
 //        },
 //         success: function (todo) {
 //            // alert(todo.toJSON());
 //            // $('#message').text('success');
 //            // console.log('success')
 //        }

 //    });
































	// CREATE
	$('input#addTodo').click(function(e){
		e.preventDefault();
		var todo = $('input#todo').val();
		if( todo ){
			$.post('todos', { name: todo }, function(id){
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
			url: '/todos',
			type: 'DELETE',
			success: function(result) {
				$('.todos').append('<li class="no-todos">No Todos Found</li>');
			}
		});
	});

	// SHOW ALL TODOS
	$(window).load(function(){
		return;
		$.get('todos',function(data){
			if( data.length ){

				////////////////////////////////////////////////////////////////////////////////////
				// TODO: There is an issue with this loop. Mostlikely a data type problem.
				////////////////////////////////////////////////////////////////////////////////////
				// Uncaught TypeError: Cannot use 'in' operator to search for '7154' in #<error> 
				////////////////////////////////////////////////////////////////////////////////////


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
		// $(this).attr('contenteditable', true);
		var input = $(this).find('input');
		if( input.length == 0 ){
			var this_text = $(this).text().trim();
			$(this).html('<input type="text" class="todo_update_text" value="'+this_text+'"><i class="done fa fa-square-o"></i>');
			$(this).find('input').focus().select();
		}
	});
	// $('.todos').on('change', '.todo_update_text',function(){
	// 	$.ajax({
	// 		url: '/todos',
	// 		type: 'DELETE',
	// 		success: function(result) {
	// 			$('.todos').append('<li class="no-todos">No Todos Found</li>');
	// 		}
	// 	});

	// });



});