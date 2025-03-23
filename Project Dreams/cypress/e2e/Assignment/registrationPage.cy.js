

beforeEach(() => {
    cy.visit('https://www.hrmagix.com/in/app/login#');
    cy.get('#c-p-bn').click()
    // cy.get('body').debug();
    cy.get('.custom-login-form').contains('Register').click()
    cy.fixture('userData').as('data');

});

describe('Registration page testing', () => {

    it('Validate that user visits the registration page on click of "Register Now" button', () => {

        cy.url().should('include', '/register')
    });

    it('validate that Full Name textbox does not accept numeric input', () => {
        cy.get('#name').type('230')
        cy.get('#name').should('not.contain.value', '230')


    });

    it('validate that Full Name textbox does not accept special characters', () => {
        cy.get('#name').type('@#$%')
        cy.get('#name').should('not.contain.value', '@#$%')


    });

    it('validate that Password textbox display validation error msg on entering lowercase characters only', () => {
        cy.get('#password').type('barry')
        const passwordValidationErrorMsg = 'Password must contain atleast 1 uppercase character, atleast 1 lowercase character, atleast 1 special character and passworrd length should atleast 8 characters'
        cy.get('#loginForm').contains(passwordValidationErrorMsg).should('exist')
    });

    it('validate that confirm Password textbox display validation error msg on entering mismatched password', () => {

        cy.get('#password').type('barry')
        cy.get('#confirm-password').type('Barry123')
        const confirmPasswordValidation = 'Password does not match'
        cy.get('#loginForm').contains(confirmPasswordValidation).should('exist')
    });

    it.only('validate that on click of Register button on entering valid details display Success message ', function () {
        cy.get('#name').type(this.data.newUserName)
        cy.get('#email').type(this.data.newUserEmail)
        cy.get('#password').type(this.data.password)
        cy.get('#confirm-password').type(this.data.password)

        cy.get('#termsCheckbox').click()

        // In delay wait time complete the captcha process manually
        cy.wait(60000)
        cy.get('button').contains('Register').click({ force: true })

        const successRegistration = `Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.`
        cy.get('.card-body').should('contain',successRegistration)

        cy.get('[action="https://www.hrmagix.com/in/app/logout"] > .btn').click()
        cy.url().should('include', '/login')

    });

// After successful registration mail is received in users email account through which verify user's email manually
// after email verifivation proceed to Login


})