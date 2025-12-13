const elements = {
  h2: (h2) => cy.get('h2[class="section-heading"]').contains(new RegExp(h2, 'i')),
  content: (h2) => elements.h2(h2).next('p'),
  ul: () => cy.get('ul'),
  back_button: (text) => cy.get('a[class="button-back"]').contains(text),
  pagination_button: (text) => cy.get('a[class="button-pagination"]').contains(text)
};

const verifyHome = ({ header, homeText }) => {
  elements.content(header).jsScrollIntoView().should('be.visible')
    .invoke('text').then(($text) => {

      expect($text.replace(/\s+/g, ' ').trim().toLowerCase()).to.contain(
        homeText.replace(/\s+/g, ' ').trim().toLowerCase()
      );
    });
};

const verifyPosts = ({ header, article, changePage }) => {
  cy.get('h2').contains(header).jsScrollIntoView().should('be.visible')
    .next('ul').children().then(($listItem) => {
  
      cy.wrap($listItem).children('h3').contains(article).click();
    });

  elements.back_button('Back').jsScrollIntoView().click();

  if (changePage) {

    elements.pagination_button(changePage).jsScrollIntoView().click();
  }
};

export default {
  verifyHome,
  verifyPosts
};