describe('Login', () => {
  it('Удачный вход как менеджер', () => {
    cy.visit('https://remont.org.kg/auth')
    cy.get("[name=email]").type("pm@example.com")
    cy.get("[name=password]").type("admin")
    cy.get("button[type=submit]").click()
    cy.contains("Менеджер").should("be.visible")
  })
  it('Удачный вход как дизайнер', () => {
    cy.visit('https://remont.org.kg/auth')
    cy.get("[name=email]").type("designer@example.com")
    cy.get("[name=password]").type("string")
    cy.get("button[type=submit]").click()
    cy.contains("Дизайнер").should("be.visible")
  })
  it('Удачный вход как замерщик', () => {
    cy.visit('https://remont.org.kg/auth')
    cy.get("[name=email]").type("zamer@example.com")
    cy.get("[name=password]").type("string")
    cy.get("button[type=submit]").click()
    cy.contains("Замерщик").should("be.visible")
  })
  it('Удачный вход как клиент', () => {
    cy.visit('https://remont.org.kg/auth')
    cy.get("[name=email]").type("user@example.com")
    cy.get("[name=password]").type("admin")
    cy.get("button[type=submit]").click()
    cy.contains("Клиент").should("be.visible")
  })
  it('Удачный вход как строитель', () => {
    cy.visit('https://remont.org.kg/auth')
    cy.get("[name=email]").type("builder1@example.com")
    cy.get("[name=password]").type("string")
    cy.get("button[type=submit]").click()
    cy.contains("Строитель").should("be.visible")
  })
  it('Неверные данные', () => {
    cy.visit('https://remont.org.kg/auth')
    cy.get("[name=email]").type("builder@example.com")
    cy.get("[name=password]").type("string")
    cy.get("button[type=submit]").click()
  })
  it('Форму не заполнили', () => {
    cy.visit('https://remont.org.kg/auth')

    cy.get("button[type=submit]").click()
    cy.contains("Обязательное поле").should("be.visible")
  })
})