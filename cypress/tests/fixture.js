// cypress/e2e/spec.cy.js
import user from '../fixtures/user.json'
it('loads the same object', () => {
  cy.fixture('user').then((userFixture) => {
    expect(user, 'the same data').to.deep.equal(userFixture)
  })
})

// decrible('fixture',()=>{
//   it('load file json',()=>{

//   })
// })
it('testanh', () => {
  cy.fixture('images/manhinh1.png').then((logo) => {
    // logo will be encoded as base64
    // and should look something like this:
    // aIJKnwxydrB10NVWqhlmmC+ZiWs7otHotSAAAOw==...
  })
})

it('test anh 1', () => {
  cy.fixture('images/manhinh1.png', null).then((logo) => {
    // logo will be read as a buffer
    // and should look something like this:
    // Buffer([0, 0, ...])
    expect(Cypress.Buffer.isBuffer(logo)).to.be.false
  })
})

it('test data', () => {
  cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com')
  //todo

  // check form login: userName, password, login button 
})


describe('Login page with account ', () => {
  it('should render login form correctly', () => {
    cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com');

    //cy.get("#unified-runner").should('be.visible');
    
    //Check display
    cy.get("label[for='username-login']").should('be.visible').and('contain.text', 'Username');
    cy.get("label[for='password-login']").should('be.visible').and('contain.text', 'Password');
   
    cy.contains('span','TOKYO SEIMITSU CO., LTD.').should('be.visible')
    cy.contains('em','Select username').click()
    cy.get("li[data-value='engineer']").click()
  
    //Check keyboard
    cy.contains('button','e').click()
    cy.contains('button','n').click()
    cy.contains('button','g').click()
    cy.get('[data-testid="keyboardTestId"]').find('button').contains('i').click()
    cy.contains('button','n').click()
    cy.contains('button','e').click()
    cy.contains('button','e').click()
    cy.contains('button','r').click()

    

    //Check button OK
    cy.get('form').should('exist').and('contain.text', 'LOGIN');
    cy.contains('button','OK').click()

    //Check message
    //cy.contains('div','Incorrect username or password.').should('be.visible')


  }); 
}); 
