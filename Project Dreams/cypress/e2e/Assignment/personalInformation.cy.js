import { goToProfile, Logout } from "../../support/utility";

beforeEach(() => {
    cy.visit('/');
    cy.get('#c-p-bn').click()

    cy.fixture('userData').as('data');
    cy.logIn(Cypress.env('email'), Cypress.env('password'));
    goToProfile();

});

afterEach(() => {
    Logout();
});


describe('Add & Edit personal information', () => {

    it('Validate that click on "My Profile" option display Profile details', function () {
        cy.get('.page-header-title').should('contain', 'Profile')

    });

    it('Validate user able to edit Name in Personal information', function () {
        cy.get('#useradd-sidenav').contains('Personal Information').click()
        cy.get('#useradd-1 .card-body').find('[placeholder="Enter Your Name"]').should('be.enabled')
            .clear()
            .type(this.data.newName)
        cy.get('#useradd-1 .card-body').find('[placeholder="Enter Your Name"]').should('contain.value', this.data.newName)


    });

    it('Validate user able to edit Email in Personal information', function () {
       
        cy.get('#useradd-sidenav').contains('Personal Information').click()
        cy.get('#useradd-1 .card-body').find('#email').should('be.enabled')
            .clear()
            .type(this.data.newEmail)
        cy.get('#useradd-1 .card-body').find('#email').should('contain.value', this.data.newEmail)
    });

    it('Validate that selected profile image is successfully uploaded on click of "Save Changes" button', function () {
        
        cy.get('#useradd-sidenav').contains('Personal Information').click()

        const filePath = 'Avtar.png'
        cy.get('#profile').attachFile(filePath)
        cy.get('#useradd-1').find('[value="Save Changes"]').click()
        cy.get('#liveToast').should('include.text', 'Profile successfully updated.')
    });

    
    it('Validate on click of "Save Changes" button update successful message is dislayed', function () {

        cy.get('#useradd-sidenav').contains('Personal Information').click()
        cy.get('#useradd-1 .card-body').find('[placeholder="Enter Your Name"]').should('be.enabled')
            .clear()
            .type(this.data.newName)
        cy.get('#useradd-1').find('[value="Save Changes"]').click()
        cy.get('#liveToast').should('include.text', 'Profile successfully updated.')

    });



})
