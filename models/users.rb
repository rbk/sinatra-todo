class User
  include MongoMapper::Document

  key :name, String
  # key :age,  String

  # many :hobbies
end
# class Hobby
#   include MongoMapper::EmbeddedDocument

#   key :name,    String
#   key :started, Time
# end