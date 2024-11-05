const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern:"./cypress/tests/**.*",// xac dinh duong dan den cac thu muc test, cac dau * cac thu bieu thi cho chay test cho tat ca cac dile trong thu muc mk dn den ma k phan cap, va tat cac cac loai file
    baseUrl:"https://the-internet.herokuapp.com/"//Xac dinh url ma minh muon mo
  },
});
