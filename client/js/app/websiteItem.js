    // show websites
    Template.website_list.helpers({
        websites: function () {
            return Websites.find({}, {
                sort: {
                    upvoteCount: -1,
                    createdOn: -1
                }
            });
        },
        search_results: function () {
            var searchQuery = Session.get("searchQuery");
            if (searchQuery == undefined)
                searchQuery = "";
            var queryArr = searchQuery.split(/[\s,.]+/);
            console.log(queryArr);
            //return search;
        }
    });

    Template.website_list.events({
        "input .searchBox": function (event, template) {
            var value = template.find(".searchBox").value;
            if (value != undefined) {
                Session.set("searchQuery", value);

            }
            //console.log("From method " + Session.get("searchQuery"));
        }
    });

    // sigle website
    Template.website_item.helpers({
        getUser: function (user_id) {
            var user = Meteor.users.findOne({
                _id: user_id
            });
            if (user) {
                return user.username;
            } else {
                return "init";
            }
        }
    });

    // website item event
    Template.website_item.events({
        "click .js-upvote": function (event) {
            // example of how you can access the id for the website in the database
            // (this is the data context for the template)
            var website_id = this._id;
            //console.log("Up voting website with id " + website_id);

            if (Meteor.user()) {
                var data = Websites.findOne({
                    _id: website_id
                })
                var user_id = Meteor.userId();
                var updata = data.upvote;
                if (updata == undefined) {
                    updata = [];
                }
                var downdata = data.downvote;
                if (downdata == undefined) {
                    downdata = [];
                }

                if (updata.indexOf(user_id) == -1 && downdata.indexOf(user_id) == -1) {
                    updata.push(user_id);
                    Websites.update({
                        _id: website_id
                    }, {
                        $set: {
                            upvote: updata
                        },
                        $inc: {
                            upvoteCount: 1
                        }
                    });
                } else if (updata.indexOf(user_id) > -1 && downdata.indexOf(user_id) == -1) {
                    alert("You have already upvoted.");
                } else if (updata.indexOf(user_id) == -1 && downdata.indexOf(user_id) > -1) {
                    updata.push(user_id);
                    var index = downdata.indexOf(user_id);
                    downdata.splice(index, 1);
                    Websites.update({
                        _id: website_id
                    }, {
                        $set: {
                            upvote: updata,
                            downvote: downdata
                        },
                        $inc: {
                            upvoteCount: 1
                        }
                    });

                }
            } else {
                alert("Log in to vote sites!");
            }

            // put the code in here to add a vote to a website!
            event.preventDefault();
            return false; // prevent the button from reloading the page
        },
        "click .js-downvote": function (event) {

            // example of how you can access the id for the website in the database
            // (this is the data context for the template)
            var website_id = this._id;
            console.log("Down voting website with id " + website_id);

            if (Meteor.user()) {
                var data = Websites.findOne({
                    _id: website_id
                })
                var updata = data.upvote;
                if (updata == undefined) {
                    updata = [];
                }
                var downdata = data.downvote;
                if (downdata == undefined) {
                    downdata = [];
                }
                var user_id = Meteor.userId();

                if (updata.indexOf(user_id) == -1 && downdata.indexOf(user_id) == -1) {
                    downdata.push(user_id);
                    Websites.update({
                        _id: website_id
                    }, {
                        $set: {
                            downvote: downdata
                        }
                    });
                } else if (updata.indexOf(user_id) == -1 && downdata.indexOf(user_id) > -1) {
                    alert("You have already downvoted.");
                } else if (updata.indexOf(user_id) > -1 && downdata.indexOf(user_id) == -1) {
                    downdata.push(user_id);
                    var index = updata.indexOf(user_id);
                    updata.splice(index, 1);
                    Websites.update({
                        _id: website_id
                    }, {
                        $set: {
                            upvote: updata,
                            downvote: downdata
                        },
                        $inc: {
                            upvoteCount: -1
                        }
                    });

                }
            } else {
                alert("Log in to vote sites!");
            }

            return false; // prevent the button from reloading the page
        }
    });