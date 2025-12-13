import aboutPage from '../../pageObjects/about';
import aboutCopy from '../../../fixtures/testData/about.json';

export function aboutPageContent() {

  describe('Verify', () => {

    it('When I go to about page', () => {
 
      cy.visit('/about');
    });

    it('Then I verify about content', () => {

      aboutPage.verifyAbout({
        header: aboutCopy.about.header,
        aboutText: aboutCopy.about.text
      });
    });
    
    it('Then I verify first expertise', () => {

      aboutPage.verifyExpertise({
        header: aboutCopy.expertise.header,
        expertise: aboutCopy.expertise.expertise_1
      });
    });

    it('Then I verify second expertise', () => {

      aboutPage.verifyExpertise({
        header: aboutCopy.expertise.header,
        expertise: aboutCopy.expertise.expertise_2
      });
    });

    it('Then I verify third expertise', () => {

      aboutPage.verifyExpertise({
        header: aboutCopy.expertise.header,
        expertise: aboutCopy.expertise.expertise_3
      });
    });

    it('Then I verify fourth expertise', () => {

      aboutPage.verifyExpertise({
        header: aboutCopy.expertise.header,
        expertise: aboutCopy.expertise.expertise_4
      });
    });

    it('Then I verify fifth expertise', () => {

      aboutPage.verifyExpertise({
        header: aboutCopy.expertise.header,
        expertise: aboutCopy.expertise.expertise_5
      });
    });

    it('Then I verify sixth expertise', () => {

      aboutPage.verifyExpertise({
        header: aboutCopy.expertise.header,
        expertise: aboutCopy.expertise.expertise_6
      });
    });
  });
}