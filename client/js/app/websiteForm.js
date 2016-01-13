    Template.website_form.events({
        "click .js-toggle-website-form": function (event) {
            $("#website_form").toggle('slow');
        },
        "submit .js-save-website-form": function (event, template) {
            addWebsite(event, template);
            //event.preventDefault();
            return false; // stop the form submit from reloading the page

        }
    });

    function addWebsite(event, template) {
        if (Meteor.user()) {
            var url = event.target.url.value;
            var title = event.target.title.value;
            var description = event.target.description.value;;
            var date = new Date();
            var formattedDate = formatDate(date);
            console.log(formattedDate);

            if (title == "" || description == "") {
                console.log("from http");
                Meteor.call("remoteGet", url, {

                    },
                    function (error, response) {
                        if (error) {
                            console.log(error);
                        } else {
                            var dataTitle = $(response.content).filter("title").text();
                            var dataDescription = $(response.content).filter("meta[name=description]").attr("content");
                            var logo = $(response.content).filter("link[rel~=icon]").attr("href");
                            if (title == "")
                                title = dataTitle;
                            if (description == "")
                                description = dataDescription;
                            insertWebsite(title, url, description, formattedDate, Meteor.user()._id, logo);
                        }

                    });
            } else {
                console.log("direct insert");
                insertWebsite(title, url, description, formattedDate, Meteor.user()._id);
            }
            console.log("inserted in db");
            alert(title + " site added");
            $("#website_form").toggle('slow');
            template.find("form").reset();
            return false
        } else {
            alert("only logged in user can add new site");
        }
    }

    function insertWebsite(title, url, description, date, owner, logo) {
        Websites.insert({
            title: title,
            url: url,
            description: description,
            createdOn: date,
            createdBy: owner,
            upvote: [],
            upvoteCount: 0,
            downvote: [],
            logo: logo
        });
    }

    var testCallback = function () {
        console.log("from call back");
    }