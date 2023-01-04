class User < ApplicationRecord
  has_secure_password
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

  def full_name
    [first_name, last_name].join(' ')
  end
end
