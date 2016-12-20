// "name": "Somersby æble",
// "isfavorite": false,
// "price": 17.5,
// "availability": true,
// "id": 5000115,
// "unitPrice": "53,03 kr./Ltr.",
// "image": "http://dev.remoteiv.dk/scommerce/images/somersby-aeble.jpg?i=DKcF1j7o/5000115"

export interface IProduct {
    name: string;
    isfavorite: boolean;
    price: number;
    availability: boolean;
    id: string;
    unitPrice: string;
    image: string;
}