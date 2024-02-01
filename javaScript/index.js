import { getCookie } from "../utils/cookie.js";
import { getData } from "../utils/httpReq.js";
import { shortText } from "../utils/shortenString.js";

let allProducts = null;
let  filterCategory  = "all";
let searchValue = "";

const loginButton = document.getElementById("login");
const dasboardButton =document.getElementById("dashboard");
const productsContainer = document.getElementById("products");
const loader = document.getElementById("loader");
const searchInput =document.querySelector("input");
const searchButton = document.getElementById("search-button");
const filterList =document.querySelectorAll("li");

const showProducts = (products)=>{

    loader.style.display="none"
    productsContainer.innerHTML="";
    products.forEach(product => {
        const {title , price , description , image, rating} = product

        const JSX=`
        <div class="product">
        <div class="star-user">
        <button><i class="fa-solid fa-star"></i><span>${rating.rate}</span></button> 
          <button><i class="fa-solid fa-user"></i><span>${rating.count}</span></button>
        </div>
        <img src="${image}" alt="${description}">
        <div id="info">
          <p>${shortText(title)}</p>
          <div>
            <span class="price">$ ${price}</span>
            <button>Buy <i class="fa-solid fa-cart-shopping"></i> </button>
          </div>
        </div>
      </div>`
      productsContainer.innerHTML +=JSX;
        
    });
};
const init =async()=>{
    const cookie = getCookie();
    if(cookie){
        loginButton.style.display="none";
    }else{
        dasboardButton.style.display="none";
    }
    allProducts = await getData("products");
    showProducts(allProducts);
};

const selectFilter=(filter)=>{
     
    filterList.forEach(li=>{
       if(li.innerText.toLowerCase() === filter){
        li.className = "selected";

       }else{
        li.className ="";
       }
})
};

const filterProducts = ()=>{

    const filtredProduct = allProducts.filter(product =>{
        if(filterCategory ==="all"){
            return product.title.toLowerCase().includes(searchValue);
        }else{
            return product.title.toLowerCase().includes(searchValue)&&
                   product.category.toLowerCase() === filterCategory;
        }


    });
    showProducts(filtredProduct);

};


const searchHandler =()=>{
 searchValue = searchInput.value.toLowerCase().trim();
filterProducts();
};

const filterHandler=(event)=>{
 filterCategory = event.target.innerText.toLowerCase();
 selectFilter(filterCategory);
 filterProducts();

};


document.addEventListener("DOMContentLoaded",init);
searchButton.addEventListener("click", searchHandler);
filterList.forEach(filter=>{
    filter.addEventListener("click",filterHandler)
})