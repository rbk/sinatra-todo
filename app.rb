require 'rubygems'
require 'sinatra'
require 'mongo'
require 'json/ext' # required for .to_json

# Don't need to set this as it is Sinatra's default asset directory.
# set :public_folder, File.dirname(__FILE__) + '/assets'

class MyApp < Sinatra::Base
	
	##
	# Database Connection
	##
	DB = Mongo::Connection.new.db("sinatra")

	##
	# todo collection - model defined one the client
	##
	todos = DB.collection('todos')

	##
	# Routes
	##
	get '/' do
		@todo_collection = todos
		erb :index
	end

	delete '/api/todos/' do
		todos.remove()
		"You deleted everything in the todo collection!"			
	end

	post '/todo/new' do
		id = todos.insert( params )
		params.to_json
	end


	# read as json
	get '/api/todos' do
		content_type :json
		todos.find.to_a.to_json
  		# {"_id":{"$oid": "53d9bb1fae35d721b9000001"} - Note get rid of this format somehow
	end
	
	get '/todo/:id' do
		content_type :json

		id = BSON::ObjectId(params[:id])
		todo = todos.find( {:_id => id } ).to_a
		if todo
			todo.inspect
		else
			"nothing found"
		end

	end

	# update
	post '/todos' do
		todo = todos.update( { :_id => BSON::ObjectId(params[:id]) }, { :name => params[:name] })
		params.to_json
		# { "_id" : ObjectId("53f167c1ae35d73e10000001"), "name" : "s" }

	end


	post '/whatever' do
		id = todos.insert( params )
		"#{id}"
	end








##################Backbone only###########################
	# Create
	post '/backbone/todos' do
		content_type :json
		@json = JSON.parse(request.body.read)
		id = todos.insert( @json )
		File.open("development.log", 'a') {|f| f.write("ID: #{id.to_s} - #{@json}\n") }
		"#{@json}".to_json # Backbone expects a json object to be returned in order to fire the success callback
	end



# get '/api/:thing' do
#   # query a collection :thing, convert the output to an array, map the id 
#   # to a string representation of the object's _id and finally output to JSON
#   DB.collection(params[:thing]).find.toa.map{|t| frombsonid(t)}.to_json
# end
 
# get '/api/:thing/:id' do
#   # get the first document with the id :id in the collection :thing as a single document (rather 
#   # than a Cursor, the standard output) using findone(). Our bson utilities assist with
#   # ID conversion and the final output returned is also JSON
#   frombsonid(DB.collection(params[:thing]).findone(tobsonid(params[:id]))).to_json
# end
 
# post '/api/:thing' do
#   # parse the post body of the content being posted, convert to a string, insert into
#   # the collection #thing and return the ObjectId as a string for reference
#   oid = DB.collection(params[:thing]).insert(JSON.parse(request.body.read.tos))
#   "{\"id\": \"#{oid.to_s}\"}"
# end
 
# delete '/api/:thing/:id' do
#   # remove the item with id :id from the collection :thing, based on the bson
#   # representation of the object id
#   DB.collection(params[:thing]).remove('id' => tobson_id(params[:id]))
# end
 
# put '/api/:thing/:id' do
#   # collection.update() when used with $set (as covered earlier) allows us to set single values
#   # in this case, the put request body is converted to a string, rejecting keys with the name 'id' for security purposes
#   DB.collection(params[:thing]).update({'id' => tobsonid(params[:id])}, {'$set' => JSON.parse(request.body.read.tos).reject{|k,v| k == 'id'}})
# end
 
 
# # utilities for generating/converting MongoDB ObjectIds
 
# def tobsonid(id) BSON::ObjectId.fromstring(id) end
# def frombsonid(obj) obj.merge({'id' => obj['id'].tos}) end

end

