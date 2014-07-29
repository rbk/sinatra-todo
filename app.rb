require 'sinatra'

#set :public_folder, File.dirname(__FILE__) + '/assets'

class MyApp < Sinatra::Base

	get '/' do
		erb :index
	end

	post '/post' do
		
	end

end
