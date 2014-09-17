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
require './models/users.rb'

class System
	def date
		"System date: #{%x[ date ].chomp}"
	end
	def disk_usage
		%x[ du -h ]
	end
end
class MyApp < Sinatra::Base
	
	get '/' do
		@users = User.all
		erb :index

	end
	# create, read, update, destroy
	post '/user' do
		user = User.new(:name => params[:name] )
		user.save!
		user.to_json
		# redirect '/'
		# User.where(:name => 'Richard').first
	end
	delete '/user' do
		id = params[:id]
		user = User.destroy( id )
		if user
			"1"
		else
			0
		end

	end
	put '/user' do
		id = params[:id]
		name = params[:name]
		user = User.find_by_id(id)
		user.name = name
		user.save!
	end


	get '/system' do
		# exec('touch /etc/nginx/sites-available/testing')
		# exec('who')

		@system_date = System.new.date
		@du = System.new.disk_usage
		erb :system

	end
	# very easy search function
	get '/users/:s' do
		content_type :json
		s = params[:s]
		users = User.where( {:name =>  Regexp.new(s,Regexp::IGNORECASE) } )
		users.to_json
	end
	get '/users' do
		content_type :json
		users = User.all.to_json
	end

	not_found do
		status 418
		erb :oops, :layout => :not_logged_in
	end
	
end