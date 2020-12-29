class Task < ApplicationRecord
    belongs_to :tag
    validates :description, presence: true
end
