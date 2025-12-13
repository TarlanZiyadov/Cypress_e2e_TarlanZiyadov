Cypress.Commands.add('jsScrollIntoView', { prevSubject: 'element' }, (element, options = { index: 0 }) => {
  cy.wrap(element).then($selector => {
    $selector[options.index].scrollIntoView({ scrollIntoViewOptions: { block: 'end', inline: 'nearest' } });
  });
});