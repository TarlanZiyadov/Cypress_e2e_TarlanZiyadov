const elements = {
  h1: (h1) => cy.get('h1[class="post-title"]').contains(new RegExp(h1, 'i')),
  h2: (h2) => cy.get('h2[id="-expertise"]').contains(new RegExp(h2, 'i')),
  content: () => cy.get('div[class="post-content"]'),
  ul: () => cy.get('ul')
};

const verifyAbout = ({ header, aboutText }) => {
  elements.h1(header).jsScrollIntoView().should('be.visible');
  elements.content().jsScrollIntoView().should('be.visible')
    .invoke('text').then(($text) => {

      expect($text.replace(/\s+/g, ' ').trim().toLowerCase()).to.contain(
        aboutText.replace(/\s+/g, ' ').trim().toLowerCase()
      );
    });
};

const verifyExpertise = ({ header, expertise }) => {
  elements.h2(header).jsScrollIntoView().should('be.visible');
  elements.ul().then(($listItem) => {
  
    expect($listItem.text()).contain(expertise);
  });
};

export default {
  verifyAbout,
  verifyExpertise
};