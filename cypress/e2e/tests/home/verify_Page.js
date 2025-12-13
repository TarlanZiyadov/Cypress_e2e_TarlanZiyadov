import homePage from '../../pageObjects/home';
import homeCopy from '../../../fixtures/testData/home.json';

export function homePageContent() {

  describe('Verify', () => {

    it('When I go to home page', () => {
 
      cy.visit('/');
    });

    it('Then I verify home welcome content', () => {

      homePage.verifyHome({
        header: homeCopy.home.header,
        homeText: homeCopy.home.text
      });
    });

    it('Then I verify first post', () => {
        
      homePage.verifyPosts({
        header: homeCopy.posts.header,
        article: homeCopy.posts.article_1
      });
    });

    it('Then I verify second post', () => {
        
      homePage.verifyPosts({
        header: homeCopy.posts.header,
        article: homeCopy.posts.article_2
      });
    });

    it('Then I verify third post', () => {
        
      homePage.verifyPosts({
        header: homeCopy.posts.header,
        article: homeCopy.posts.article_3
      });
    });

    it('Then I verify fourth post', () => {
        
      homePage.verifyPosts({
        header: homeCopy.posts.header,
        article: homeCopy.posts.article_4
      });
    });

    it('Then I verify fifth post and navigate to next page', () => {
        
      homePage.verifyPosts({
        header: homeCopy.posts.header,
        article: homeCopy.posts.article_5,
        changePage: 'Next'
      });
    });

    it('Then I verify sixth post', () => {
        
      homePage.verifyPosts({
        header: homeCopy.posts.header,
        article: homeCopy.posts.article_6
      });
    });

    it('Then I verify seventh post', () => {
        
      homePage.verifyPosts({
        header: homeCopy.posts.header,
        article: homeCopy.posts.article_7
      });
    });

    it('Then I verify eighth post', () => {
        
      homePage.verifyPosts({
        header: homeCopy.posts.header,
        article: homeCopy.posts.article_8
      });
    });

    it('Then I verify ninth post and navigate to previous page', () => {
        
      homePage.verifyPosts({
        header: homeCopy.posts.header,
        article: homeCopy.posts.article_9,
        changePage: 'Previous'
      });
    });
  });
}