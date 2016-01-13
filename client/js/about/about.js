  Template.about.helpers({
      about_list: function () {
          return about_data;
      }
  });

  about_data = [
      {
          content: "User can register and login."
}, {
          content: "Users can post new websites if they are logged in. Websites posted by users should have an URL and a description."
}, {
          content: "Users can up and down vote webpages by clicking a thumbs up or a thumbs down button...If they are logged in! And a logged in user can only upvote or downvote once on the same site."
}, {
          content: "Websites should be listed with the most up voted site first. Same upvote counts, order by created date."
}, {
          content: "The listing page shows when the website was added and how many up and down votes it has."
}, {
          content: "Users can move to a detail page for a website (using routing). "
}, {
          content: "On the detail page, users can post comments about a webpage, and they are displayed below the description of the webpage."
}, {
          content: "If the user only give a url and submit the form, app will use the HTTP package for Meteor to pull in information(title,description) about the posted web links automatically "
}
]