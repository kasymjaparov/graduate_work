describe('Registration', () => {
    it('Регистрация с данными уже существуюего аккаунта', () => {
      cy.visit('https://remont.org.kg/auth/registration')
      cy.get("[name=email]").type("pm@example.com")
      cy.get("[name=password]").type("admin")
      cy.get("button[type=submit]").click()
      cy.contains("Account already exist").should("be.visible")
    })
    it('Удачная регистрация', () => {
        const rndm= Math.random() * (100 - 4) + 4
      cy.visit('https://remont.org.kg/auth/registration')
      cy.get("[name=email]").type(`client${rndm}@example.com`)
      cy.get("[name=password]").type("string")
      cy.get("button[type=submit]").click()
      cy.url().should("be.equal", "https://remont.org.kg/auth/")
    })
    it('Пустые данные', () => {
      cy.visit('https://remont.org.kg/auth/registration/auth')
      cy.get("button[type=submit]").click()
      cy.contains("Обязательное поле").should("be.visible")
    })
  })