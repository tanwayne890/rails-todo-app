# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
3.times do |i|
    Tag.create(
      title: "Rails project #{i + 1}",
      completed: false
    )
    Task.create(
      description: "Test task #{i + 1}", 
      tag_id: "#{i + 1}"
    )
  end