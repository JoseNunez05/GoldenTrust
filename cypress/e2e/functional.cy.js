describe('mainpage functions', () => {

  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  var numbers = "1234567890"

  function createRandomName(length)
  {
    var random_string = '';
    for(let i=0; i<length; i++)
    {
      random_string += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return random_string;
  }

  var userinfo = 
  {
    firstname: createRandomName(4),
    lastname: createRandomName(6),
    email: Math.random().toString(15).substring(2,17)+'@gmail.com',
    phonenumber: Math.random().toString(10).substring(2,12)
  };

  beforeEach('visit page', () => {
    cy.visit('https://doral.goldentrust.com/en/home/');
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  })

  it.skip('language change', () => {
    // click on spanish translation option.
    cy.get('#menu-1-f64b9cb > .lang-item > .elementor-item > span').click();
    // should be redirected to spanish translated mainpage.
    cy.url().should('eq', 'https://doral.goldentrust.com/es/inicio/');
  })

  it('applying for quote', () => {
  
    cy.fixture('userinfo.json').then( (feilds) => {
      cy.get(feilds.firstname_feild).type(userinfo.firstname);
      cy.get(feilds.lastname_feild).type(userinfo.lastname);
      cy.get(feilds.email_feild).type(userinfo.email);
      cy.get(feilds.phonenumber_feild).type(userinfo.phonenumber);

      cy.get(feilds.submit_btn).click();

      // test case fails. Input feilds receive numbers when not permitted. website asks for captcha, this indicates 
      // a security measure used to prevent cross-site scripts.
    })
  })

  it.only('solution center', () => {
    cy.get('.elementor-element-4715d81 > .elementor-widget-wrap > .elementor-element > .elementor-widget-container > .elementor-icon-list-items > :nth-child(2) > a > .elementor-icon-list-text').click();

    // you should be in the customer support page
    cy.url().should('eq', 'https://doral.goldentrust.com/en/customer-support/');

    // first name
    cy.get('#form-field-name').type(userinfo.firstname)
    let name = userinfo.firstname
    // last name
    cy.get('#form-field-field_1ff619e').type(userinfo.lastname)
    // this is the phone number feild
    cy.get('#form-field-email').type(userinfo.phonenumber)
    // this is email
    cy.get('#form-field-field_0060ada').type(userinfo.email)
    // message
    cy.get('#form-field-message').type('test message from ' + name);

    // submit message
    cy.get('.elementor-field-type-submit > .elementor-button > :nth-child(1)').click();

    // test case fails. Input feilds receive numbers when not permitted. website asks for captcha, this indicates 
    // a security measure used to prevent cross-site scripts.
  })

})