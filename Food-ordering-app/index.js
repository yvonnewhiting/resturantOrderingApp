import {menuArray} from './data.js'
let orderItems = [];
const modal = document.getElementById('card-modal')
const paymentForm = document.getElementById('payment-form')
const payBtn = document.getElementById('pay-btn')
const reviewSection = document.getElementById('review-section')
const reviewForm = document.getElementById("review-form");
const reviewsList = document.getElementById("reviews-list");
const reviewFormContainer = document.getElementById('review-form-container')
const submitReviewBtn = document.getElementById('submit-review-btn')
// event listeners//
document.addEventListener("click", function(e){
    if(e.target.dataset.addItemBtn) {
        handleAddClick(e.target.dataset.addItemBtn)
    }
})

document.addEventListener("click", function (e) {
    if (e.target.dataset.removeItemBtn) {
        handleRemoveClick(e.target.dataset.removeItemBtn);
    }
});

document.addEventListener('click', function(e) {
    if (e.target.dataset.completeOrderBtn){
        modal.style.display= 'inline'
}
})

payBtn.addEventListener("click", function(event) { 
        event.preventDefault()//prevent fefault form submission
         // Check form validity
            // Check if paymentForm is null before using checkValidity()
    if (paymentForm) {
        if (paymentForm.checkValidity()) {
            // Proceed with payment logic
             modal.style.display='none'
        const orderSection = document.querySelector(".order")
        orderSection.style.display = 'none'
        //hides both the modal and the order by lciking the pay-btn
        // Get the user's name from the payment form
    const nameInput = document.getElementById("name-input"); 
    const userName = nameInput.value; // Retrieve the user's input
    
    // Display the thanks message with the user's name
    const thanksMessage = document.getElementById("thanks-message");
    thanksMessage.textContent = `Thanks ${userName}! Your order is on it's way!`;
    
    // Change the background color
    thanksMessage.style.backgroundColor = "#ECFDF5"
    
    // Display the review section after 30 seconds
    setTimeout(function() {
        reviewSection.style.display = 'block'; 
        reviewFormContainer.style.display = 'block'// Assuming the review section is initially hidden
    }, 10000); // 30 seconds in milliseconds

        } 
    } 
});
       

//add item to order//
function handleAddClick(menuId) {
    const targetMenuObj = menuArray.find(function(menu) {
        return menu.id == menuId;
    });

    if (targetMenuObj) {
        orderItems.push(targetMenuObj);
    }
    displayOrderItems()
    calculateTotal()
     
}
//remove item from order//
function handleRemoveClick(menuId) {
    const targetIndex = orderItems.findIndex((item) => item.id == menuId);

    if (targetIndex !== -1) {
        orderItems.splice(targetIndex, 1); // Remove the item from the order
    }
    displayOrderItems()
    calculateTotal();
    
}
 //render order//
function generateOrderItemsHtml(menuArray) {
    if (menuArray.length === 0) {
        return ""; // Return empty string if the array is empty
    }
    let orderHtml = 
// generates the HTML markup for the order items and stores it in the orderHtml variable//
            `<div class="order">
                <span><b> Your order</b></span>
            </div>
                `
                    
                menuArray.forEach(function(item) {
                 orderHtml += `
                   <div class = "order-item">
                    <div class = "order-details">
                    <div class="name-and-remove">
                        <div class="name">
                            <span class="name"><b>${item.name}</b></span>
                            <a class="remove-button" data-remove-item-btn="${
                                item.id
                            }">remove</a>

                        </div>

                        <div class="price">
                            <b><p>£${item.price.toFixed(2)}</b></p>
                        </div>
                    </div>

             </div>
             </div>
        `;
             
    })
// the orderItems array and create the markup for each order item inside the forEach loop.
//update the innerHTML of the element with the class "order" to display the order items using the orderHtml//
// Calculate the total amount
    const totalAmount = orderItems.reduce((total, item) => total + item.price, 0);

        orderHtml += `
            <div class="order-details total-line">
                <p class="total"><b>Total: <span id="totalAmount"> £${totalAmount.toFixed(2)}</span></b></p>
            </div>
            <div>
             <button class="complete-order-btn" data-complete-order-btn="0">Complete order</button>
        </div>
        </div>`;
    

    // Add the total amount to the template literal
   
    return orderHtml;

}

// Function to calculate the total price of the order items
function calculateTotal() {
    const totalAmountElement = document.getElementsByClassName("total");
    const totalAmount = orderItems.reduce((total, item) => total + item.price, 0);
    totalAmountElement.textContent = totalAmount.toFixed(2);;
}
// Function to display the order items on the web page
function displayOrderItems() {
    const orderSection = document.querySelector(".order");
    const orderHtml = generateOrderItemsHtml(orderItems);
    orderSection.innerHTML = orderHtml;
}

// Call the function to display the order items
displayOrderItems();

// Call the function to calculate and display the total initially
calculateTotal();

reviewForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const rating = document.getElementById("rating").value;
    const reviewText = document.getElementById("review").value;
    const timestamp = new Date().toLocaleString();

    const review = {
        name,
        rating,
        reviewText,
        timestamp
    };

  // Simulate adding the review to an array or database
    // reviews.push(review);

    displayReview(review);
    
    reviewSection.style.display ='none'
    reviewFormContainer.style.display ='none'
    
    // Show the "Thank you" message
    const thankYouMessage = document.getElementById("thank-you-message");
    thankYouMessage.style.display = 'block'
    thankYouMessage.style.backgroundColor = "#ECFDF5"
    
    
});

function displayReview(review) {
    const reviewElement = document.createElement("div");
    reviewElement.classList.add("review");

    reviewElement.innerHTML = `
        <h3>${review.name}</h3>
        <p>Rating: ${review.rating}</p>
        <p>${review.reviewText}</p>
        <p>${review.timestamp}</p>
    `;

    reviewsList.appendChild(reviewElement);
}





