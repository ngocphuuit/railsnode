class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def render_optional_error_file(status_code)
		if status_code == :not_found
			render_404
		else
			super
		end
	end
end
