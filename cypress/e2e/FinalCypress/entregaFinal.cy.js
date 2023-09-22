import { HomePage } from "../../support/Pages/homePageage";
import { ProductsPage } from "../../support/Pages/productsPageage";
import { ShoppingCart } from "../../support/Pages/shoppingCartart";
import { Checkout } from "../../support/Pages/checkOutOut";
import { FinalDescription } from "../../support/Pages/reciptipt";

describe('Ingresar a la URL con datos válidos y redireccionar', () => {
    let usuario;
    const gender = "Male";
    const day = '4';
    const month = 'April';
    const year = "1980";
    let productos;
    const homePage = new HomePage();
    const productsPage = new ProductsPage();
    const shoppingCart = new ShoppingCart();
    const checkOut = new Checkout();

    before(() => {
        cy.fixture('productos.json').then(varProductos => {
            productos = varProductos;
        });

        cy.request({
            url: 'https://pushing-it.onrender.com/api/register',
            method: 'POST',
            body: {
                username: 'usuario' + Math.floor(Math.random() * 1000),
                password: '123456!',
                gender: gender,
                day: day,
                month: month,
                year: year
            }
        }).then(respuesta => {
            usuario = respuesta.body.newUser;
            window.localStorage.setItem('usuario', usuario);
        });
    });

    before('Entrar al sistema y poder loguearse', () => {
        cy.visit('');
        cy.xpath('//p/span').dblclick();
        homePage.escribirUsuario(usuario.username);
        homePage.escribirContraseña('123456!');
        homePage.clickLoginButton();
    });

    it('Ingreso a la sección productos y seleccion', () => {
        cy.fixture('checkOut.json').then(checkoutData => {
            const { nombre, apellido, tarjeta } = checkoutData;
            const nombreProducto1 = productos.blackTShirt.name;
            const nombreProducto2 = productos.redCap.name;

            homePage.clickOnLineShopButton();
            productsPage.agregarProductoCarrito(nombreProducto1);
            productsPage.agregarProductoCarrito(nombreProducto2);
            homePage.closeShopping();
            shoppingCart.verificarProducto(nombreProducto1).should('exist').siblings('#productPrice').should('contain', productos.blackTShirt.price);
            shoppingCart.verificarProducto(nombreProducto2).should('exist').siblings('#productPrice').should('contain', productos.redCap.price);
            shoppingCart.showTotalPrice();
           
            const totalPrice = productos.blackTShirt.price + productos.redCap.price;
            shoppingCart.totalPriceString().should('contain', `$${totalPrice}`);
            homePage.closeCheckOut();
            checkOut.completarNombre(nombre);
            checkOut.completarApellido(apellido);
            checkOut.completarTarjeta(tarjeta);
            homePage.purchaseButton();
            const finalDescription = new FinalDescription(productos);
            finalDescription.verificarMensajeFinal();
        });
    });

    after('Eliminar usuario creado', () => {
        cy.request({
            url: `https://pushing-it.onrender.com/api/deleteuser/${encodeURIComponent(usuario.username)}`,
            method: 'DELETE',
            failOnStatusCode: false,
        }).then(borrarRespuesta => {
            expect(borrarRespuesta.status).to.equal(200);
        });
    });
});