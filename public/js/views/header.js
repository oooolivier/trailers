window.HeaderView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },

    selectMenuItem: function (menuItem) {
        $('.nav li').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
    },
    selectCat: function (menuItem) {

        $('#catnav').removeClass('active');
        	

        if (menuItem && menuItem !== 'all') {
            $('.' + menuItem).addClass('active');
        }
    }
});