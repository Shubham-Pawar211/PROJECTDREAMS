export function loginByUser(uname, pasword) {

    cy.get('.custom-login-form').find('#email').type(uname)
    cy.get('.custom-login-form').find('#password').type(pasword)

    // In delay wait time complete captcha process manually
    cy.wait(50000)

    cy.get('button').contains('Login').click()

    cy.url().should('contain', '/dashboard')
    cy.wait(1000)
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Prevent Cypress from failing the test on an exception
        return false;
    });
    cy.get('#liveToast', { timeout: 10000 }).should('exist')
        .and('contain', 'User logged in successfully!')

}

export function loginByInvalidUser(uname, pasword) {

    cy.get('.custom-login-form').find('#email').type(uname)
    cy.get('.custom-login-form').find('#password').type(pasword)

    // In delay wait time complete captcha process manually
    cy.wait(50000)

    cy.get('button').contains('Login').click()

   
}

export function goToProfile() {
    cy.get('[role="button"]').find('.theme-avtar').click()
    cy.get('.dropdown-item').contains('My Profile').click()

}

export function clickOnMessageBtn() {
    cy.get('#liveToast').find('button').click()
    cy.get('#msg-btn', { timeout: 1000 }).should('exist')
        .should('be.visible')
        .click()

}