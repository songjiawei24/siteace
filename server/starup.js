// start up function that creates entries in the Websites databases.
Meteor.startup(function () {
    // code to run on server at startup
    if (!Websites.findOne()) {
        console.log("init");
        Websites.insert({
            title: "Stevens Institute of Technology",
            url: "https://www.stevens.edu/sit/",
            description: "Stevens Institute of Technology (SIT) is a private, coeducational research university located in Hoboken, New Jersey, United States.",
            createdOn: "December-15-2015",
            logo: "https://www.stevens.edu/sit/sites/sit/files/favicon.ico"
        });
    }
});