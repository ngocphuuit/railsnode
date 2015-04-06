Rails.application.routes.draw do
	get 'home' => 'realtimes#index'
	post 'chatroom' => 'realtimes#chatroom'
end
