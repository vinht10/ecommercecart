let productdata = []

/**product list container**/
let ProductListHTML = ""
let productlistel = document.getElementById("product-list")

/**fetch product data**/
async function fetchdata(){
    const res = await fetch("/database/productdata.json")
    const data = await res.json()
    productdata = data
    await data.forEach(element => {
        ProductListHTML += ` 
        <div class="product-card" id=${element.id}>
                <div class="product-image">
                    <img src="${element.image}" />
                </div>
                <div class="product-desc">
                    <div class="product-catogory">
                       ${element.category}
                    </div>
                    <div class="product-price-addCart">
                        <p class="product-price">$${element.price}</p>
                        <div class="icon" >
                            <i class="fa-solid fa-heart" data-cart=${element.id}></i>
                        </div>
                    </div>
                </div>
            </div>
        `
    });

    productlistel.innerHTML = ProductListHTML
    return data
}
fetchdata()



/***************************
        cart section
****************************/
const cartclosebtnel = document.getElementById("cart-close-btn")
const cartidel = document.getElementById("cartid")
const cartiddisplaybtn = document.getElementById("cartiddisplaybtn")

cartclosebtnel.addEventListener("click",()=>{
    cartidel.classList.add("card-hidden")
    cartiddisplaybtn.classList.remove("active")
})

cartiddisplaybtn.addEventListener("click",()=>{
    cartidel.classList.toggle("card-hidden")
    cartiddisplaybtn.classList.toggle("active")
})

const cartarray = []



document.addEventListener("click",(e)=>{
    const cartid = e.target.dataset.cart
    //get cartquantity and totalprice
    if(cartid){
        console.log(cartid)
        const addcartproduct = productdata.filter(el => el.id == cartid)[0]
        const ProductNumber = {
                ...addcartproduct,
                cartQuantity : 1,
                totalPrice : addcartproduct.price
        }
        if(!cartarray.some(el => el.id == cartid)){
            cartarray.push(ProductNumber)
        }   
    }

    const incrementQty = e.target.dataset.qtyinc
    const decrementQty = e.target.dataset.qtydec
    if(incrementQty){
        const index = cartarray.findIndex(el => el.id == incrementQty)

        let newQty = cartarray[index].cartQuantity
        newQty++
        cartarray[index].cartQuantity = newQty

        //total price
        let newtotalPrice = cartarray[index].price * newQty
        cartarray[index].totalPrice = newtotalPrice.toFixed(2)
    }
    if(decrementQty){
        const index = cartarray.findIndex(el => el.id == decrementQty)
        // console.log(index)
        let newQty = cartarray[index].cartQuantity
        
        if(newQty > 1){
            newQty--
            cartarray[index].cartQuantity = newQty

            //total price
            let newtotalPrice = cartarray[index].price * newQty
            cartarray[index].totalPrice = newtotalPrice.toFixed(2)
        }
    }

    //render cart 
    addcartproductfunction()
    //render number of product inset in the add
    document.getElementById("numberofcartid").textContent = cartarray.length
    //total price
    const totalPrice = cartarray.reduce((acc,curr) => acc + parseFloat(curr.totalPrice),0)
    document.getElementById("cart-total-paymentid").textContent = totalPrice.toFixed(2)
    //total qty
    const totalQty =cartarray.reduce((acc,curr) => acc + parseFloat(curr.cartQuantity),0)
    document.getElementById("cart-qty-qtyid").textContent = totalQty
    

    //display if some product available in cart
    if(cartarray[0]){
        document.getElementById("productTotalQty-TotalPrice").style.display = "block"
    }else{
        document.getElementById("productTotalQty-TotalPrice").style.display = "none"
    }
})

let CartProductBodyID = document.getElementById("cart-product-bodyID")

//add product to cart
function  addcartproductfunction(){
    let CartProductListHTML ="" ;
    cartarray.forEach(el => {
        CartProductListHTML += `
                <div class="cart-product">
                        <div class="cart-product-left">
                            <img src="${el.image}"/>
                        </div>
                        <div class="cart-product-right">
                            <h3>${el.category}</h3>
                            <p>${el.price}</p>
                            <div class="cart-product-quantiy-totalprice-container">
                                <div class="cart-product-quantiy">
                                    <div class="cart-product-minus" data-qtydec=${el.id}>-</div>
                                    <div class="cart-product-num">${el.cartQuantity}</div>
                                    <div class="cart-product-plus" data-qtyinc=${el.id}>+</div>
                                </div>
                                    
                                <div >
                                    Total : <span id="totalqtyprice">${el.totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
        
        `
    })
    CartProductBodyID.innerHTML = CartProductListHTML
}
addcartproductfunction()


