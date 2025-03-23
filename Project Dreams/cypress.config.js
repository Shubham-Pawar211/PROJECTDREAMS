const { defineConfig } = require("cypress");
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')

module.exports = defineConfig({
  e2e: {

    baseUrl: "https://www.hrmagix.com/in/app/login#",
    env: {
      name: "Aniket Pate",
      email: "pawarshubham211@gmail.com",
      password: "@AniketPate#01",
    },

    video: true,
    watchForFileChanges: true,

    setupNodeEvents(on, config) {
      on('task', {downloadFile})
    },
   

  },

  video: true,
  watchForFileChanges: true,
  // videoCompression: false,

  // defaultCommandTimeout: 6000,
  // pageLoadTimeout: 10000,

});



