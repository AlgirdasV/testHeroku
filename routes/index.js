
/*
 * GET home page
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

/*
 * GET Hellow World page
 */
exports.helloworld = function(req, res){
  res.render('helloworld', { title: 'Hello, World!' });
};

