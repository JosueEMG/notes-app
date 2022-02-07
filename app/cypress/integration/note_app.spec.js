describe('Note App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')

        cy.request('POST', 'http://localhost:3001/api/testing/reset')

        const user = {
            name: 'josue',
            username: "josueemg",
            password: 'qwer5256'
        }

        cy.request('POST', 'http://localhost:3001/api/users', user)
    })

    it('frontpage can be opened', () => {
        cy.contains('Notes')
    })

    it('login form can be opened', () => {
        cy.contains('Show login').click()
    })

    it('user can login', () => {
        cy.contains('Show login').click()
        cy.get('[placeholder="Username"]').first().type('josueemg')
        cy.get('[placeholder="Password"]').last().type('qwer5256')
        cy.get('#form-login-button').click()
        cy.contains('Create a new note')
    })

    it('login fails with wrong password', () => {
        cy.contains('Show login').click()
        cy.get('[placeholder="Username"]').first().type('josueemg')
        cy.get('[placeholder="Password"]').last().type('qwer5256-caca')
        cy.get('#form-login-button').click()

        cy.get('.error').contains('Wrong credentials')

        cy.get('.error')
            .should('contain', 'Wrong credentials')
            .should('have.css', 'background-color', 'rgb(255, 0, 0)')
    })

    describe('when user logged in', () => {
        beforeEach(() => {
            cy.login({ username: 'josueemg', password: 'qwer5256' })
        })

        it('a new note can be created', () => {
            const noteContent = 'a note created by cypress'
            cy.contains('Show Create Note').click()
            cy.get('input').type(noteContent)
            cy.contains('Save').click()
            cy.contains(noteContent)
        })

        describe('and a note exists', () => {
            beforeEach(() => {
               cy.createNote({ content: 'this is the first note', important: false })
               cy.createNote({ content: 'this is the second note', important: false })
               cy.createNote({ content: 'this is the third note', important: false })
            })

            it('it can be made important', () => {
                cy.contains('this is the second note').as('theNote')

                cy.get('@theNote')
                    .contains('make important')
                    .click()
                // debugger
                cy.debug()

                cy.get('@theNote')
                    .contains('make not important')
            })
        })

    })
})