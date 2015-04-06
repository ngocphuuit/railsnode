Rails.application.routes.draw do
  get 'errors/file_not_found'

  get 'errors/unprocessable'

  get 'errors/internal_server_error'

	match '/404', to: 'errors#file_not_found', via: :all
	get 'home' => 'realtimes#index'
	post 'chatroom' => 'realtimes#chatroom'
end
