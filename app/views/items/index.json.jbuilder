json.array! @parents do |parent|
  json.id parent.id
  json.name parent.name
end 

json.array! @children do |child|
  json.id child.id
  json.name child.name
end