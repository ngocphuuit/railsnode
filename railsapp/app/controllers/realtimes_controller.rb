class RealtimesController < ApplicationController
	skip_before_filter :verify_authenticity_token

	def index
	end

	def chatroom
		if params[:yourname] == ""
			flash[:message] = "You must fill your name to join the room"
			redirect_to home_path
		end
		@name = params[:yourname]
	end
end