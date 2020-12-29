class AddCompletedToTags < ActiveRecord::Migration[6.0]
  def change
    add_column :tags, :completed, :boolean
  end
end
