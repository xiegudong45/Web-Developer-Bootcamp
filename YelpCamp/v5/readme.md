RESTFUL ROUTES


| name |  url    |     verb   | desc. |
|------|---------|------------|-------|
|INDEX |  /dogs  |     GET    | Display a list of all dog|
|NEW   |/dogs/new   |GET     |Displays form to make a new dog|
|CREATE |/dogs       |POST    |Add new dog to DB|
|SHOW  | /dogs/:id   |GET     |Shows info about one dog|
|Edit |/dogs/:id/edit | GET | Show edit form for one dog|
|Update|/dogs/:id|PUT|Update a particular dog, then redirect somewhere|
|Destroy| /dogs/:id| DELETE| Delete a particular dog, then redirect somewhere|