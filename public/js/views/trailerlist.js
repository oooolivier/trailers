window.TrailerListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var trailers = this.model.models;
        var len = trailers.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);

        $(this.el).html('<ul class="thumbnails"></ul>');

        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new TrailerListItemView({model: trailers[i]}).render().el);
        }

       
        
        $(this.el).prepend(new Paginator({model: this.model, page: this.options.page, cat: this.options.cat}).render().el);
        
        $(this.el).prepend('<ul class="nav nav-pills" id="catnav"><li class="all"><a href="#trailers/all">Toutes les catégories</a></li><li> &nbsp; &nbsp; &nbsp; &nbsp; </li><li class="horreur"><a href="#trailers/horreur">Horreur</a></li><li class="comedie"><a href="#trailers/comedie">Comédies</a></li><li class="enfants"><a href="#trailers/enfants">Enfants</a></li></ul>');

        
        return this;
    }
   
});






window.TrailerListItemView = Backbone.View.extend({

    tagName: "li",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});