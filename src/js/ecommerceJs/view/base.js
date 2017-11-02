
eCommerceApp.Viewsbase = Backbone.View.extend({
    templateId: "",

    appendTo: function(a) {
        return this.$el.appendTo(a), this.attached && this.attached(), this
    },

    extractElements: function() {
        var a = {},
            b = this.elementsSelectors;
        for (var c in b) a[c] = this.$(b[c]);
        this.elements = a
    },

    template: function(a) {
        var b = _.clone(a),
            c = "";
            c = document.getElementById(this.templateId || this.options.templateId).innerHTML;

        var temp =  _.template(c);
        return temp(b);
    }
});