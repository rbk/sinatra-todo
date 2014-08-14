require 'rubygems'
require 'sinatra'
require 'mongo'
require 'json/ext' # required for .to_json

# Don't need to set this as it is Sinatra's default asset directory.
# set :public_folder, File.dirname(__FILE__) + '/assets'

class MyApp < Sinatra::Base
	
	DB = Mongo::Connection.new.db("sinatra")
	todos = DB.collection('todos')

 	# root
	get '/' do
		@todo_collection = todos
		erb :index
	end

	get '/backbone' do
		@todo_collection = todos
		erb :backbone
	end

	# todo index
	get '/todos' do
		@todo_collection = todos
		erb :index
	end

	# Create
	post '/todos' do
		id = todos.insert( { :name => params[:name] } )
		"#{id}"
		#"{\"id\":\"#{the_id.to_s}\"}"
	end

	# read as json
	get '/api/todos' do
		content_type :json
		todos.find.to_a.to_json
  		# {"_id":{"$oid": "53d9bb1fae35d721b9000001"} - Note get rid of this format somehow
	end
	
	get '/todo/:id' do
		todo = todos.find( { :_id => params[:id] } )
		if todo
			@todo = todo
		else
			@todo = '404 nothing found'
		end
		erb :single_todo
	end

	# update
	put '/todos' do

	end



	delete '/api' do
		todos.remove()
		"You deleted everything in the todo collection!"
	end


	post '/whatever' do
		id = todos.insert( params )
		"#{id}"
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

