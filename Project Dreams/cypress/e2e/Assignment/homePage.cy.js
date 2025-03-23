import { clickOnMessageBtn } from "../../support/utility";


beforeEach(() => {
    cy.visit('https://www.hrmagix.com/in/app/login#');
    cy.get('#c-p-bn').click()
    cy.fixture('userData').as('data');
    cy.logIn(Cypress.env('email'), Cypress.env('password'));
    cy.viewport(1316, 660);

});

describe('test description', () => {


    it('Validates the presence of main navigation items', () => {

        const menuItems = ['Dashboard', 'Staff', 'Employee', 'Payroll', 'Timesheet', 'Performance', 'Finance', 'Training'];

        menuItems.forEach((item) => {
            cy.get('.dash-navbar .dash-link').contains(item).should('exist');
        });
    });


    it('Validate message botton is visible in dashboard', () => {
        cy.get('#msg-btn').should('exist')
    });


    it('Validate on click of message button displays message inbox', () => {
        cy.get('#liveToast').find('button').click()
        cy.get('#msg-btn', { timeout: 1000 }).should('exist')
            .should('be.visible')
            .click()
        cy.get('.dropdown-list-message-msg').should('exist')
            .parent()
            .should('contain', 'Messages')
    });

    it('Validate on click of "View all" button of message inbox opens "Manage Messenger" page', () => {
        clickOnMessageBtn()
        cy.get('.d-grid > .btn').click()
        cy.get('.page-header .page-header-title').should('contain','Manage Messenger')
        
    });

    it('validate on click of "Home" link text redirects user to dashboard', () => {
        clickOnMessageBtn()
        cy.get('.d-grid > .btn').click()
        cy.get('.breadcrumb-item').contains('Home').click()
        cy.url().should('contain', '/dashboard')

        
    });





})