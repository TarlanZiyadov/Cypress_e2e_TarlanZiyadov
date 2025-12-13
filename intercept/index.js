import { baseUrlToServiceMap, skipInterceptStatusCodes } from '../constants';

const intercept = {
  wait: ({ alias, times = 1 }) => {
    for (let i = 0; i < times; i++) {
      cy.get(`@${alias}Request`).should('have.been.called');
      cy.wait(`@${alias}`).then((result) => {

        const url = new URL(result.response.url);

        if (skipInterceptStatusCodes.includes(result.response.statusCode)) {
          cy.log(`${url.pathname.replace(/\/$/, '')} request returned ${result.response.statusCode} status code`);
        }

        if (!(skipInterceptStatusCodes.includes(result.response.statusCode)
        || (result.response.statusCode).toString().startsWith(2)
        || (result.response.statusCode).toString().startsWith(3))) {

          cy.task('readJsonFile', 'cypress/fixtures/commonState.json').then((commonState) => {

            const service = baseUrlToServiceMap(alias);

            if (service) {
              commonState.unavailableServices[service] = result.response.statusCode;
              commonState.unavailableServices.time = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' });

              cy.writeFile('cypress/fixtures/commonState.json', JSON.stringify(commonState)).then(() => {
                throw Error(`${alias} request returned ${result.response.statusCode} status code. Remaining tests will be skipped!`);
              });
            }

            if (!service) {
              commonState.unavailableServices[url.pathname.replace(/\/$/, '')] = result.response.statusCode;
              commonState.unavailableServices.time = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' });

              cy.writeFile('cypress/fixtures/commonState.json', JSON.stringify(commonState)).then(() => {
                throw Error(`${url.pathname.replace(/\/$/, '')} request returned ${result.response.statusCode} status code. Remaining tests will be skipped!`);
              });
            }
          });
        }
      });
    }
  }
};

export default intercept;