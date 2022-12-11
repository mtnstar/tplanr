class Section < ApplicationRecord

  belongs_to :tour

  attr_readonly :type

end
