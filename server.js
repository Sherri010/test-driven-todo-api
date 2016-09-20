// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');


function FindIndexById(id){
  var i=0;
  while( i< todos.length){
     if(todos[i]._id === id ){
     break;
     }
     i++;
  }
  return i;
}
// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 7, task: 'Laundry', description: 'Wash clothes' },
  { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 44, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */

   var query = req.query.q;
    console.log(req.query)
   var result={todos:[]};
   var i=0;

    result.todos = todos.filter(function(item){
       if(item._id == query || item.task ==query || item.description == query)
       return item;
    });
   res.json(result);

});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   var index={todos:todos}
    res.json(index);
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
var item = req.body;
var before = todos.pop();
item._id = before._id+1;
todos.push(item);
res.json(item);



});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
  var find = +req.params.id;
   var i = FindIndexById(find);
   res.json(todos[i]);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
    console.log(req.params)
    var find = +req.params.id;
    var i = FindIndexById(find);
    todos[i].task =  req.body.task ;
    todos[i].description =req.body.description;

    res.json(todos[i]);


});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */

   var find= +req.params.id;
   var i = FindIndexById(find);

   res.json(todos.splice(i,1));
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
