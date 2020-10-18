const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
//Дз
let getRequest = (url, cb) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
};
//


class ProductList{
    #goods;
    constructor(container = '.products'){
        this.container = container;
        this.#goods = [];
        this._allProducts = [];
        this.#getProducts().then((data) => {
            this.#goods = [...data];
            this.#render();
    });
        console.log(this.sum());
    }    

    #getProducts() {
    return fetch(`${API}/catalogData.json`)
        .then(response => response.json())
        .catch((error) => {
          console.log(error);
        });
  }

    sum(){
        return this.#goods.reduce((sum, { price }) => sum + price, 0);
    }

    #render(){
        const block = document.querySelector(this.container);
        
        for(let product of this.#goods){
            const productObject = new ProductItem(product);
            this._allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.getGoodHTML());
        }
    }
}

class Basket extends ProductList{
    constructor(){
        super(constructor);
        this.basket = [];
    }
    
    addItem(item){
        this.basket.push(item);
    }
    deleteItem(item){
        this.basket.splice(basket.indexOf(item), 1);
    }
    getAllProducts(){
        return this.basket;
    }
    
}


class ProductItem{
    constructor(product, img = 'blouse-2.png'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    
    getGoodHTML(){
        return `<div class="product-item" data-id="${this.id}">
            <img src="${this.img}" alt="img">
            <h3>${this.title}</h3>
            <div class="cart">
            <p>${this.price} \u20bd</p>
            <button class="by-btn">Buy</button>
            </div>
          </div>`;
    }
}

const list = new ProductList();



//Для товара: цена с учётом скидки
/* class Goods{
  constructor(title, price, id, img, discount = 0){                       
        this.title = title;
        this.price = price; 1000
        this.id = id;
        this.img = img;
        this.discount = discount; 30%
      }

        priceDiscount(){
            this.price = this.price * (1 - this.discount); 
        }
   }
 //Для корзины: сортировка по дате 
 class GoodsList{
    let arr = [];
    
    add(element){
        let currentDate = Date.today();
        arr.push({good: element, date: currentDate});
    } 
    deleteGood(index){
        arr.pop(index);
    }
    
    sort(){
        max = this.arr[0];
        for (let i = 0; i < this.arr.length; i++){
            if (this.arr[i].date >= max.date){
                let buf = max;
                max = this.arr[i];
                this.arr[i] = buf;
            }
        }
    }
 }
*/

