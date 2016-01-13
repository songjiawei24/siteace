Router.configure({
    layoutTemplate: 'ApplicationLayout'
});

Router.route('/sites', function () {
    this.render('navBar', {
        to: "navbar"
    });
    this.render('website_form', {
        to: "form"
    });
    this.render('website_list', {
        to: "main"
    });
});

Router.route('/sites/:_id', function () {
    this.render('navBar', {
        to: "navbar"
    });
    this.render('site_item', {
        to: "main",
        data: function () {
            return Websites.findOne({
                _id: this.params._id
            });
        }
    });
});

Router.route('/about', function () {
    this.render('navBar', {
        to: "navbar"
    });
    this.render('about', {
        to: "main",
        data: about_data
    });
});