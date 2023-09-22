export const TIMEOUT = 15000
export class FinalDescription {
    constructor(productos) {
        this.productos = productos;
        this.nombre = '#name';
        this.prenda1 = `//p[@id="${productos.blackTShirt.name}"]`;
        this.prenda2 = `//div//p[@id="${productos.redCap.name}"]`;
        this.numero = '#creditCard';
        this.spent = '#totalPrice';
    }

    verificarMensajeFinal() {
        cy.get(this.nombre).should('contain', 'Nicolas Dondo');
        cy.xpath(this.prenda1).should('contain', this.productos.blackTShirt.name);
        cy.xpath(this.prenda2).should('contain', this.productos.redCap.name);
        cy.get(this.numero).should('contain', '1234567891234567');
        const totalPrice = this.productos.blackTShirt.price + this.productos.redCap.price;
        cy.get(this.spent).should('contain', `$${totalPrice}`);
    }
}

