// Brunch configuration
// See http://brunch.io for documentation.
'use strict';

module.exports = {
  paths: {
    // The directory the front end site is built to
    public: 'www'
  },
  files: {
    // Concatenate and conpress JavaScript
    javascripts: {
      joinTo: {
        'scripts/main.js': ['app/scripts/*.js', /^node_modules/]
      }
    },
    // Conpile Sass to CSS
    stylesheets: {
      joinTo: {
        'css/main.css': ['app/styles/main.scss']
      }
    }
  },
  plugins: {
    postcss: {
      processors: [
        require('autoprefixer')({
          browsers: ['> 0.1%']
        })
      ]
    }
  }
};
