export class ProductsPage {
  constructor() {};
  botonShoppingCart() {
    cy.get(this.irAShopping).click()
  };
  agregarProductoCarrito(carrito) {
    cy.contains(carrito).siblings('button[type="button"]').click();
    cy.xpath("//button[@id='closeModal']").click();
  }
}

  