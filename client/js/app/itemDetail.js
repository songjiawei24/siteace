Template.site_item.events({
    "submit .js-save-comment-form": function (event, template) {
        var comment = event.target.comment.value;
        var user;
        if (Meteor.user()) {
            user = Meteor.user().username;
        } else {
            user = "guest";
        }
        var date = formatDate(new Date());
        var comments = Websites.findOne({
            _id: this._id
        }).comments;
        if (this.comments == undefined) {
            comments = [];
        }

        comments.push({
            comment: comment,
            user: user,
            date: date
        });


        Websites.update({
            _id: this._id
        }, {
            $set: {
                comments: comments,
            }
        });
        template.find("form").reset();
        return false;
    }
});