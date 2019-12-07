/* eslint-disable no-console */
const Campground = require('./models/campground.js');
const Comment = require('./models/comment');

const data = [
  {
    name: 'Awesome Camp',
    image: 'https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    description: 'A awesome camp that you should go to',
  },
  {
    name: 'Night Light Camp',
    image: 'https://images.unsplash.com/photo-1496947850313-7743325fa58c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    description: 'A awesome night camp that you should go to',
  },
  {
    name: 'Green Light Camp',
    image: 'https://images.unsplash.com/photo-1493810329807-db131c118da5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80',
    description: 'A awesome camp with green lights that you should go to',
  },
  {
    name: 'Winter Camp',
    image: 'https://images.unsplash.com/photo-1517217451453-818405428795?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    description: 'A awesome winter camp with green lights that you should go to',
  },
];


const seedDB = () => {
  // Remove all campgrounds
  Campground.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('Removed Campgrounds');
    // Add a few campgrounds
    data.forEach((seed) => {
      Campground.create(seed, (createError, campground) => {
        if (createError) {
          console.log(createError);
        } else {
          console.log(`Added ${seed.name}`);
          // Create a few comments
          Comment.create({ text: 'This place is nice', author: 'Subarna' }, (error, comment) => {
            if (error) {
              console.log(error);
            } else {
              console.log('Added Comment');
              campground.comments.push(comment);
              campground.save();
            }
          });
        }
      });
    });
  });
};

module.exports = seedDB;
