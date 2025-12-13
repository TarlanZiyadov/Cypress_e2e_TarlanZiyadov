const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

module.exports = defineConfig({
  chromeWebSecurity: false,
  viewportHeight: 1080,
  viewportWidth: 1920,
  defaultCommandTimeout: 20000,
  requestTimeout: 15000,
  responseTimeout: 15000,
  pageLoadTimeout: 30000,
  watchForFileChanges: false,
  downloadsFolder: 'cypress/downloads',
  fixturesFolder: 'cypress/fixtures',
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  video: false,
  trashAssetsBeforeRuns: false,
  screenshotOnRunFailure: true,
  retries: {
    experimentalStrategy: 'detect-flake-and-pass-on-threshold',
    experimentalOptions: {
      maxRetries: 4,
      passesRequired: 1
    },
    openMode: true,
    runMode: true
  },
  env: {
    testRetry: 4
  },
  e2e: {
    baseUrl: 'https://tarlanziyadov.github.io',
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 0,
    experimentalRunAllSpecs: true,
    testIsolation: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    experimentalInteractiveRunEvents: true,

    setupNodeEvents(on, config) {
      
      config.reporter = 'mochawesome';
      const reporterOptions = {
        reportDir: 'cypress/reports/mocha',
        charts: true,
        overwrite: false,
        reportPageTitle: 'TarlanZiyadov_CypressE2E',
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: false,
        showPassed: true,
        showFailed: true,
        showPending: true,
        showSkipped: true,
        html: false,
        json: true
      };

      config.reporterOptions = {
        ...config.reporterOptions,
        ...reporterOptions
      };
      
      config.env = {
        ...process.env,
        ...config.env
      };

      on('after:screenshot', (details) => {

        const filePathParts = details.path.split('--');
        const screenshotName = filePathParts[filePathParts.length - 1].replace(/\(failed\)(.*)\.png$/, '.png').replace(/\s?\.png$/, '.png').trim();
        const specName = path.basename(details.specName, '.spec.js');
        const screenshotDir = path.join('cypress', 'reports', 'mochareports', 'assets', specName);

        if (!fs.existsSync(screenshotDir)) {
          fs.mkdirSync(screenshotDir, { recursive: true });
        }

        const newScreenshotPath = path.join(screenshotDir, `${screenshotName.trimStart()}`);

        if (fs.existsSync(newScreenshotPath)) {

          return Promise.resolve({ path: newScreenshotPath });
        }

        return new Promise((resolve, reject) => {
  
          fs.rename(details.path, newScreenshotPath, (err) => {
            if (err) {
              console.error('Error renaming file:', err);

              return reject(err);
            }

            return resolve({ path: newScreenshotPath });
          });
        });
      });

      on('task', {

        log(message) {

          // eslint-disable-next-line no-console
          console.log(`${message}\n\n`);

          return null;
        },
         
        /*
        remove direction including files
        */
        removeDirection({ dir }) {
 
          return new Promise((resolve) => {
 
            fs.rm(dir, { recursive: true }, () => {

              if (!fs.existsSync(dir)) {
                resolve(true);
              }

              if (fs.existsSync(dir)) {
                throw Error(`Could not delete: ${dir}`);
              }
            });
          });
        },

        /*
        read json file data. wanted for parallel run to avoid memory leak
        */
        readJsonFile: (file) => new Promise((resolve, reject) => {
          
          fs.readFile(file, 'utf8', (error, data) => {
            
            if (error) {

              reject(error);
            } else {

              resolve(JSON.parse(data));
            }
          });
        })
      });

      return config;
    },
    specPattern: ['**/*.spec.js'] // matches all .spec.js-files in the project
  }
});
