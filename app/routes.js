// app/routes.js
module.exports = function (app, passport) {
	app.set('view engine', 'hbs');
	app.get('/', function (req, res) {
		res.render('login.hbs', { message: req.flash('loginMessage') }); // load the index.ejs file
	});

	app.get('/login', function (req, res) {
		// render the page and pass in any flash data if it exists
		res.render('login.hbs', { message: req.flash('loginMessage') });
	});


	/*connection.query('SELECT tipo FROM users2 WHERE id = ?',1, function(err, rows) {
			callback(rows[0].tipo);
		});*/

	/*let dato = 'Gerente';
	let destino = '';
	if (dato = 'Gerente') {
		destino = '/profile';
	}
	else {
		destino = '/login';
	}*/

	app.post('/login', passport.authenticate('local-login', {
		//successRedirect: '/profile', // redirect to the secure profile section
		failureRedirect: '/login', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}),
		function (req, res) {
			/*if (req.body.remember) {
				req.session.cookie.maxAge = 1000 * 60 * 3;
			} else {
				req.session.cookie.expires = false;
			}*/
			let dato = req.user.tipo;
			let destino = '/';
			if (dato === 'Gerente') {
				destino = '/profile';
			}
			else if (dato === 'Gerente_Global') {
				destino = '/profile';
			}
			else if (dato === 'Vendedor') {
				destino = '/profile';
			}
			else {
				destino = '/login';
			}
			res.redirect(destino);
		});


	app.get('/signup', function (req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.hbs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile', // redirect to the secure profile section
		failureRedirect: '/signup', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}));


	app.get('/profile', isLoggedIn, function (req, res) {
		if(req.user.tipo==='Gerente'){
			res.render('profile.hbs', {
				user: req.user // get the user out of session and pass to template
			});
		}
		else res.redirect('/');
	});


	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
