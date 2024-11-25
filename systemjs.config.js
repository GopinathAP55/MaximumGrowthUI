System.config({
    map: {
      // Define the path to the remote app
      'admin': 'http://localhost:4200/remoteEntry.js', // URL to the compiled remote app
    },
    packages: {
      // Define how SystemJS loads the remote module
      'admin': {
        defaultExtension: 'js'
      }
    }
  });
  