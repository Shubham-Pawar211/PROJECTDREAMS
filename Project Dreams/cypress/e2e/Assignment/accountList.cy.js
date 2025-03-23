import { clickAccountList, Logout } from "../../support/utility";


beforeEach(() => {
    cy.visit('/');
    cy.get('#c-p-bn').click()
    cy.logIn(Cypress.env('email'), Cypress.env('password'));
    cy.viewport(1316, 660);
    clickAccountList()
    cy.fixture('accountDetails').as('input');

});

describe('Account list test cases', () => {

    it('Validate on click of "Account list" under Finance dropdown list displays "Manage Account" page', () => {

        cy.get('.page-header').should('contain', 'Manage Account')
    });


    it('Validate on click Create (+) button displays "Create New Account" form', () => {
        cy.get('[data-title="Create New Account"]').should('exist')
            .should('be.visible')
            .click()
        cy.get('.modal-header').find('#exampleModalLabel').should('contain', 'Create New Account')
    });


    it('Validate user can add new account details in "Create New Account" form', function () {
        cy.get('[data-title="Create New Account"]').should('exist')
            .should('be.visible')
            .click()
        cy.get('#account_name').type(this.input.name)
        cy.get('#initial_balance').type(this.input.initialBalance)
        cy.get('#account_number').type(this.input.accountNumber)
        cy.get('#branch_code').type(this.input.branchCode)
        cy.get('#bank_branch').type(this.input.bankBranch)
        cy.get('[value="Create"]').click()

        cy.get('#liveToast', { timeout: 1000 }).should('exist')
            .and('be.visible')
            .and('contain', 'Account successfully created.');

        cy.get('tbody tr').eq(0).should('contain', '123456789012')

    });

    it('Validate user can delete added account', () => {
        cy.get('.page-header').should('contain', 'Manage Account')
        cy.get('[aria-label="Delete"]').eq(0).click()
        cy.get('[role="dialog"]').find('button').contains('Yes').click()
        cy.get('#liveToast', { timeout: 1000 }).should('contain', 'Account successfully deleted.');

    });

    it('Validate user can update account details', function () {

        cy.get('[data-title="Create New Account"]').should('exist')
            .should('be.visible')
            .click()
        cy.get('#account_name').type(this.input.accountName)
        cy.get('#initial_balance').type(this.input.initialAmount)
        cy.get('#account_number').type(this.input.accountNo)
        cy.get('#branch_code').type(this.input.branchCodeNo)
        cy.get('#bank_branch').type(this.input.branchName)
        cy.get('[value="Create"]').click()
        cy.get('[data-title="Edit Account List"]').eq(0).click()
        cy.get('#bank_branch').clear()
            .type('Pen')
        cy.wait(500)
        cy.get('[value="Update"]').click()
        cy.get('#liveToast', { timeout: 1000 }).should('contain', 'Account successfully updated.');
        cy.get('tbody tr').eq(0).should('contain', 'Pen')

    });

})




