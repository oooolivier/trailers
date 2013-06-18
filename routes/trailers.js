var mongo = require('mongodb');

var Server = mongo.Server, Db = mongo.Db, BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {
	auto_reconnect : true
});
db = new Db('trailerdb', server, {
	safe : true
});

db
		.open(function(err, db) {
			if (!err) {
				console.log("Connected to 'trailerdb' database");
				db.collection(
								'trailers',
								{
									safe : true
								},
								function(err, collection) {
									if (err) {
										console
												.log("The 'trailers' collection doesn't exist. Creating it with sample data...");
										populateDB();
									}
								});
			}
		});

exports.findById = function(req, res) {
	var id = req.params.id;
	console.log('Retrieving trailer: ' + id);
	db.collection('trailers', function(err, collection) {
		collection.findOne({
			'_id' : new BSON.ObjectID(id)
		}, function(err, item) {
			res.send(item);
		});
	});
};

exports.findByCat = function(req, res) {
	var cat = req.params.cat;
	db.collection('trailers', function(err, collection) {
		
		cat = cat !== 'all' ? {cat:cat} : {};
		
		collection.find(cat).toArray(function(err, items) {
			res.send(items);
		});
	});
};

exports.findAll = function(req, res) {
	var param = req.query["cat"];
var cat = !req.params.cat ? 'all': req.params.cat;
	db.collection('trailers', function(err, collection) {
console.log('cat : ' + cat);
		collection.find({cat:'comedie'}).toArray(function(err, items) {
			res.send(items);
		});
	});
};

exports.addTrailer = function(req, res) {
	var trailer = req.body;
	console.log('Adding trailer: ' + JSON.stringify(trailer));
	db.collection('trailers', function(err, collection) {
		collection.insert(trailer, {
			safe : true
		}, function(err, result) {
			if (err) {
				res.send({
					'error' : 'An error has occurred'
				});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
}

exports.updateTrailer = function(req, res) {
	var id = req.params.id;
	var trailer = req.body;
	delete trailer._id;
	console.log('Updating trailer: ' + id);
	console.log(JSON.stringify(trailer));
	db.collection('trailers', function(err, collection) {
		collection.update({
			'_id' : new BSON.ObjectID(id)
		}, trailer, {
			safe : true
		}, function(err, result) {
			if (err) {
				console.log('Error updating trailer: ' + err);
				res.send({
					'error' : 'An error has occurred'
				});
			} else {
				console.log('' + result + ' document(s) updated');
				res.send(trailer);
			}
		});
	});
}

exports.deleteTrailer = function(req, res) {
	var id = req.params.id;
	console.log('Deleting trailer: ' + id);
	db.collection('trailers', function(err, collection) {
		collection.remove({
			'_id' : new BSON.ObjectID(id)
		}, {
			safe : true
		}, function(err, result) {
			if (err) {
				res.send({
					'error' : 'An error has occurred - ' + err
				});
			} else {
				console.log('' + result + ' document(s) deleted');
				res.send(req.body);
			}
		});
	});
}

var populateDB = function() {

	var trailers = [

	{
		name : "Monsters University",
		year : "2013",
		description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu nulla at risus egestas hendrerit. Quisque viverra mollis justo, ac fringilla mi venenatis viverra. Aliquam quis sapien vehicula, congue leo interdum, fringilla nunc. Mauris aliquam lectus id dui ornare blandit.",
		picture : "t_monsters.jpg",
		cat : "enfants"
	}, {
		name : "Girl Most Likely",
		year : "2013",
		description : "Mauris bibendum posuere imperdiet. Fusce nunc leo, malesuada vel lacinia rhoncus, tincidunt eu sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
		picture : "t_girlmostlikely.jpg",
		cat : "enfants"
	},
	{
		name : "Iceberg Slim: Portrait of a Pimp",
		year : "2013",
		description : "Nulla sodales id justo a interdum. Vivamus facilisis leo sit amet purus porttitor tristique. Vestibulum ornare tortor et dictum pulvinar. Praesent in eros quis mauris suscipit feugiat. In lacinia dignissim fermentum.",
		picture : "t_icebergslim.jpg",
		cat : "enfants"
	},
	{
		name : "The Wolf Of Wall Street",
		year : "2013",
		description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu nulla at risus egestas hendrerit. Quisque viverra mollis justo, ac fringilla mi venenatis viverra. Aliquam quis sapien vehicula, congue leo interdum, fringilla nunc. Mauris aliquam lectus id dui ornare blandit.",
		picture : "t_thewolfofwallstreet.jpg",
		cat : "comedie"
	},
	{
		name : "The Butler",
		year : "2013",
		description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu nulla at risus egestas hendrerit. Quisque viverra mollis justo, ac fringilla mi venenatis viverra. Aliquam quis sapien vehicula, congue leo interdum, fringilla nunc. Mauris aliquam lectus id dui ornare blandit.",
		picture : "t_thebutler.jpg",
		cat : "comedie"
	},

	{
		name : "Touchy Feely",
		year : "2013",
		description : "Nulla sodales id justo a interdum. Vivamus facilisis leo sit amet purus porttitor tristique. Vestibulum ornare tortor et dictum pulvinar. Praesent in eros quis mauris suscipit feugiat. In lacinia dignissim fermentum.",
		picture : "t_touchyfeely.jpg",
		cat : "comedie"
	},
	{
		name : "Compulsion",
		year : "2013",
		description : "",
		picture : "t_compulsion.jpg",
		cat : "horreur"
	},
	{
		name : "Killing Season",
		year : "2013",
		description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu nulla at risus egestas hendrerit. Quisque viverra mollis justo, ac fringilla mi venenatis viverra. Aliquam quis sapien vehicula, congue leo interdum, fringilla nunc. Mauris aliquam lectus id dui ornare blandit.",
		picture : "t_killingseason.jpg",
		cat : "enfants"
	},
	{
		name : "Finding Joy",
		year : "2013",
		description : "Nulla sodales id justo a interdum. Vivamus facilisis leo sit amet purus porttitor tristique. Vestibulum ornare tortor et dictum pulvinar. Praesent in eros quis mauris suscipit feugiat. In lacinia dignissim fermentum.",
		picture : "t_findingjoy.jpg",
		cat : "comedie"
	},
	{
		name : "Now You See Me",
		year : "2013",
		description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu nulla at risus egestas hendrerit. Quisque viverra mollis justo, ac fringilla mi venenatis viverra. Aliquam quis sapien vehicula, congue leo interdum, fringilla nunc. Mauris aliquam lectus id dui ornare blandit.",
		picture : "t_nowyouseeme.jpg",
		cat : "comedie"
	},
	{
		name : "Pacific Rim",
		year : "2013",
		description : "Mauris bibendum posuere imperdiet. Fusce nunc leo, malesuada vel lacinia rhoncus, tincidunt eu sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
		picture : "t_pacificrim.jpg",
		cat : "horreur"
	},
	{
		name : "Storm Surfers 3D",
		year : "2013",
		description : "Mauris bibendum posuere imperdiet. Fusce nunc leo, malesuada vel lacinia rhoncus, tincidunt eu sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
		picture : "t_stormsurfers.jpg",
		cat : "comedie"
	},
	{
		name : "Don Jon",
		year : "2013",
		description : "Nulla sodales id justo a interdum. Vivamus facilisis leo sit amet purus porttitor tristique. Vestibulum ornare tortor et dictum pulvinar. Praesent in eros quis mauris suscipit feugiat. In lacinia dignissim fermentum.",
		picture : "t_donjon.jpg",
		cat : "horreur"
	},
	{
		name : "Liars All",
		year : "2013",
		description : "Nulla sodales id justo a interdum. Vivamus facilisis leo sit amet purus porttitor tristique. Vestibulum ornare tortor et dictum pulvinar. Praesent in eros quis mauris suscipit feugiat. In lacinia dignissim fermentum.",
		picture : "t_liarsall.jpg",
		cat : "comedie"
	},
	{
		name : "More Than Honey",
		year : "2013",
		description : "Mauris bibendum posuere imperdiet. Fusce nunc leo, malesuada vel lacinia rhoncus, tincidunt eu sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
		picture : "t_morethanhoney.jpg",
		cat : "horreur"
	}
	];
	db.collection('trailers', function(err, collection) {
		collection.insert(trailers, {
			safe : true
		}, function(err, result) {
		});
	});

};