export class Checkout {
    constructor(){
        this.nombre =`#FirstName`
        this.apellido = `#lastName`
        this.tarjeta = `#cardNumber `
        this.texto = `id="chakra-modal-:r7:"`
    }

    completarNombre(nombre){
        cy.get(this.nombre).type(nombre);
    }

    completarApellido(apellido){
        cy.get(this.apellido).type(apellido);
    }

    completarTarjeta(tarjeta){
        cy.get(this.tarjeta).type(tarjeta);
    }
}
