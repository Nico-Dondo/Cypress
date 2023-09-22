export class ShoppingCart {
    constructor() {
        this.totalPrice = '#root > div > div.css-ha1fhc > div.css-n1d5pa > button'
        this.finalPrice = ' div.css-n1d5pa > div'
    }
    showTotalPrice() {
        cy.get(this.totalPrice).click()

    }

   
    verificarProducto(producto) {
      return  cy.contains(producto)
    }
    totalPriceString() {
        return cy.get(this.finalPrice).invoke('text');
    }
}

 