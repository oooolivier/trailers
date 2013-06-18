var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
       "trailers"	: "list",
        "trailers/:cat"	: "list",
        "trailers/page/:page"	: "list",
 "trailers/:cat/page/:page"	: "list",
        "trailers/add"         : "addTrailer",
        "trailers/view/:id"         : "trailerDetails",
        "trailers/edit/:id"         : "trailerEditDetails",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

	list: function(cat,page) {
		if(!cat && !page){
			cat='all';
			page = 1;
		}else if(!isNaN(cat) && !page){
			
			page = cat;
			cat='all';
		}else if(cat && !page){
			page = 1;

		}
       var trailerList = new TrailerCollection();
        trailerList.fetch({url:'/trailers/'+cat,success: function(){
            $("#content").html(new TrailerListView({model: trailerList, page: page, cat: cat}).el);
            $('#catnav').removeClass('active');
            $('#catnav .' + cat).addClass('active');
        }});
          
    },
    trailerEditDetails: function (id) {
        var trailer = new Trailer({_id: id});
        trailer.fetch({url:'/trailers/edit/'+id,success: function(){
            $("#content").html(new TrailerEditView({model: trailer}).el);
        }});
        this.headerView.selectMenuItem();
    },
    
    trailerDetails: function (id) {
       var trailer = new Trailer({_id: id});
        trailer.fetch({url:'/trailers/view/'+id,success: function(){
            $("#content").html(new TrailerView({model: trailer}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addTrailer: function() {
        var trailer = new Trailer();
        $('#content').html(new TrailerView({model: trailer}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'TrailerEditView','TrailerView','TrailerListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});