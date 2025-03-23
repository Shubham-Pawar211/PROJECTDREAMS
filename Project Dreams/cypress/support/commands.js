
import 'cypress-file-upload';

require('@4tw/cypress-drag-drop')
require('cypress-downloadfile/lib/downloadFileCommand')


Cypress.Commands.add('Login', (Uname, PW) => {
    cy.get('#user-name').type(Uname)
    cy.get('#password').type(PW)
    cy.get('#login-button').click()
})

Cypress.Commands.add('logIn', (UserName, PassWord) =>{
    cy.get('.custom-login-form').find('#email').type(UserName)
    cy.get('.custom-login-form').find('#password').type(PassWord)

    // In delay wait time complete captcha process manually
    cy.wait(50000)

    cy.get('button').contains('Login').click()

    cy.url().should('contain', '/dashboard')
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Prevent Cypress from failing the test on an exception
        return false;
    });
    cy.get('#liveToast', { timeout: 10000 }).should('exist')
        .and('contain', 'User logged in successfully!')
})
