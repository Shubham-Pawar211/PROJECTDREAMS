import { loginByUser, loginByInvalidUser } from "../../support/utility";


beforeEach(() => {
    cy.visit('https://www.hrmagix.com/in/app/login#');
    cy.get('#c-p-bn').click()
    cy.fixture('userData').as('data');
});

describe('Login test cases', () => {

    it('Validate Login with valid credentials display successful login message', function () {

        loginByUser(this.data.email, this.data.password);
        
        cy.get('#liveToast', { timeout: 10000 }).should('exist')
            .and('be.visible')
            .and('contain', 'User logged in successfully!');

    });



    it('Validate using unautorised email user unable to Login & validation error msg is displayed for unautorised email', function () {
        
        loginByInvalidUser(this.data.newEmail, this.data.password);

        cy.get('.invalid-email').should('contain', "This email doesn't match");

    });

    it('Validate using invalid password user unable to Login & validation error msg is displayed for invalid password', function () {
        
        loginByInvalidUser(this.data.email, this.data.invalidPassword);

        cy.get('.invalid-email').should('contain', "Please Enter Correct Password");
    });

    it('Validate using invalid email user unable to Login & validation error msg is displayed for invalid email', function () {

        loginByInvalidUser(this.data.invalidEmail, this.data.password);

        cy.get('.invalid-email').should('contain', "The email must be a valid email address.");
    });
    


})
