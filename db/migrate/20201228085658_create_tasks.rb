class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.text :description, null: false
      t.boolean :completed,  default: false
      t.references :tag, null: false

      t.timestamps
    end
  end
end
