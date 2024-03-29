window.TrailerEditView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "change"        : "change",
        "click .save"   : "beforeSave",
        "click .delete" : "deleteTrailer",
        "drop #picture" : "dropHandler"
    },

    change: function (event) {
        // Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);

        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id);
        }
    },

    beforeSave: function () {

    	var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }
        this.saveTrailer();
        return false;
    },

    saveTrailer: function () {
        var self = this;
        console.log('before save');
        
        this.model.save(null, {
            url : '/trailers/edit/' + this.model.id,
        	success: function (model) {
        		alert('fff');
                self.render();
                app.navigate('trailers/edit/' + model.id, false);
                utils.showAlert('OK!', 'Trailer enregistr� avec succ�s', 'alert-success');
            },
            error: function () {
                utils.showAlert('Erreur', 'Une erreur s\'est produite en enregistrant le trailer', 'alert-error');
            }
        });
    },

    deleteTrailer: function () {
        this.model.destroy({
        	url : '/trailers/edit/' + this.model.id,
            success: function () {
                alert('Trailer deleted successfully');
                window.location.href="#trailers";
            }
        });
        return false;
    },

    dropHandler: function (event) {
        event.stopPropagation();
        event.preventDefault();
        var e = event.originalEvent;
        e.dataTransfer.dropEffect = 'copy';
        this.pictureFile = e.dataTransfer.files[0];

        // Read the image file from the local file system and display it in the img tag
        var reader = new FileReader();
        reader.onloadend = function () {
            $('#picture').attr('src', reader.result);
        };
        reader.readAsDataURL(this.pictureFile);
    }

});