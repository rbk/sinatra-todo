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




	$('input#addTodo').click(function(e){
		e.preventDefault();
		$.post('api', { name: $('input#todo').val() }, function(id){
			// console.log(data)
			$('.todos').prepend('<li class="todo" id="'+ id +'">' + $('input#todo').val() + '<i class="done fa fa-square-o"></i></li>');
			$('input#todo').val('');
			if( $('.no-todos').length ){
				$('.no-todos').remove();
			}
		});
	});
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

	$(window).load(function(){
		$.get('api',function(data){
			console.log(data);
			if( data.length ){
				$.each( data, function(index,value) {
					$('.todos').prepend('<li class="todo" id="'+ value['_id'].$oid +'">' + value['name'] + '<i class="done fa fa-square-o"></i></li>');
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
		if( input.length == 0 ){
			var this_text = $(this).text();
			$(this).html('<input type="text" class="todo_update_text" value="'+this_text+'"><i class="done fa fa-square-o"></i>');
		}
	});
	$('.todos').on('change', '.todo_update_text',function(){
		alert("do some shit now")
	});



});