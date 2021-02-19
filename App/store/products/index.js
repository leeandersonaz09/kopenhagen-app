export class ProductItem {
    constructor(id, title, description, image, price) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.image = image;
      this.price = price;
    }
  }
  
  const INITIAL_STATE = {
    items: [

    ],
  };
  
  export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      default:
        return state;
    }
  }
  
  export const productsSelector = (state) => state.products.items;