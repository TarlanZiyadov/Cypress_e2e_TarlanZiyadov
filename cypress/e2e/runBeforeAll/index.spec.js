import { commonState } from '../../../constants';

describe(`E2E tests ${commonState.startTime} Stockholm time zone`, () => {

  it('Initiate common state', () => {
    cy.writeFile('cypress/fixtures/commonState.json', JSON.stringify(commonState));
  });
});