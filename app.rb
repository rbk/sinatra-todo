require 'rubygems'
require 'sinatra'
require 'mongo_mapper'
require 'json/ext' # required for .to_json
require 'shotgun' # development server auto restarting

configure do
  MongoMapper.setup({'production' => {'uri' => ENV['MONGODB_URI']}}, 'production')
end
MongoMapper.database = 'mongo_mapper'

# inlude models
require './models/todos.rb'
require './classes/system.rb'

class MyApp < Sinatra::Base
	
	get '/' do
		erb :dash
	end
	# create, read, update, destroy
	get '/todos' do
		@todos = Todo.all
		erb :todos

	end
	post '/todo' do
		todo = Todo.new(:name => params[:name] )
		todo.save!
		todo.to_json
		# redirect '/'
		# User.where(:name => 'Richard').first
	end
	delete '/todo' do
		id = params[:id]
		todo = Todo.destroy( id )
		if todo
			"1"
		else
			0
		end

	end
	put '/todo' do
		id = params[:id]
		name = params[:name]
		todo = Todo.find_by_id(id)
		todo.name = name
		todo.save!
	end


	get '/system' do
		# exec('touch /etc/nginx/sites-available/testing')
		# exec('who')

		@system_date = System.new.date
		@du = System.new.disk_usage
		erb :system

	end


	# very easy search function
	get '/api/todos/:s' do
		content_type :json
		s = params[:s]
		todos = Todo.where( {:name =>  Regexp.new(s,Regexp::IGNORECASE) } )
		todos.to_json
	end
	get '/api/todos' do
		content_type :json
		todos = Todo.all.to_json
	end


	get '/nginx/:name' do
		# name = params[:name]
		# %x[ touch /etc/nginx/sites-available/#{name} ]
	end

	not_found do
		status 418
		erb :oops, :layout => :not_logged_in
	end
	
end