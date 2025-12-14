import './commands';
import addContext from 'mochawesome/addContext';
import { monitorApiCalls, apiCalls, baseUrlToServiceMap } from '../../constants';

/*
in this step we monitor front-end calls to backend
and if expected status codes not met then store it 
in apiCalls array. As well we implement intercept calls here
so we can wait for them in our tests instead of explicity waits.
 */
beforeEach(() => {

  cy.intercept('/**', monitorApiCalls);
  cy.intercept(`${Cypress.env('BASE_URL')}/api/**`, cy.spy().as('requestName')).as('endpoint');

  if (!Cypress.spec.relative.includes('index.spec.js')) {

    cy.task('readJsonFile', 'cypress/fixtures/commonState.json').then((commonState) => {

      if (Object.keys(commonState.failedApiCalls).length > 0) {

        Cypress.runner.stop();
      }
    });
  }
});

before(() => {
  
  /*
  failing tests faster in order to reduce run time. If any service is not available then no 
  need to continue run remaining tests. Better to investigate and rerun tests again.
  */
  if (!Cypress.spec.relative.includes('index.spec.js')) {

    cy.task('readJsonFile', 'cypress/fixtures/commonState.json').then((commonState) => {

      if (Object.keys(commonState.unavailableServices).length > 0) {

        Cypress.runner.stop();
      }
    });
  }
});

/*
here we store service name if we match failed api call endpoint. 
As well we can store failed api url if no service matched. 
Stored data can be used in the slack notifications later in the
end of the tests(runAfterAll).
*/
afterEach(function() {

  if (this.currentTest.state === 'failed'
    && this.currentTest.currentRetry() === Cypress.env('testRetry')
  ) {
    
    cy.task('readJsonFile', 'cypress/fixtures/commonState.json').then((commonState) => {

      commonState.testsFailed = true;

      if (apiCalls.length > 0) {

        apiCalls.forEach(api => {

          if ((api.url).split('/')[4]) {

            const service = baseUrlToServiceMap((api.url).split('/')[4]);

            if (service) {
      
              commonState.failedServices[service] = true;

              cy.writeFile('cypress/fixtures/commonState.json', JSON.stringify(commonState)).then(() => {
                Cypress.runner.stop();
              });

              return;
            }
          }

          commonState.failedApiCalls[api.url] = `Returned status code: ${api.status}`;
      
          cy.writeFile('cypress/fixtures/commonState.json', JSON.stringify(commonState)).then(() => {
            Cypress.runner.stop();
          });
        });

        return;
      }

      cy.writeFile('cypress/fixtures/commonState.json', JSON.stringify(commonState)).then(() => {
        Cypress.runner.stop();
      });
    });
  }
});

/*
attach screenshots to the mochawesome report page
*/
Cypress.on('test:after:run', (test) => {

  if (test.state === 'failed') {

    const screenshot = `assets/${Cypress.spec.name.replace('.spec.js', '')}/${test.title}.png`;
    
    addContext({ test }, screenshot);
    addContext({ test }, `Timestamp: ${new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })} Stockholm time zone`);
    addContext({ test }, `Timestamp: ${new Date().toLocaleString('sv-SE', { timeZone: 'UTC' })} UTC zone`);
  }
});
    
Cypress.on('uncaught:exception', () => false);