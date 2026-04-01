
// Dishes Data with Delicious High-Quality Food Images
const dishes = [
    {
        id: 1,
        name: "Butter Chicken",
        desc: "Creamy tomato gravy, tandoori chicken, rich spices.",
        price: 1250,
        image: "images/butter-chicken.jpeg",
        tag: "Bestseller"
    },
    {
        id: 2,
        name: "Biryani Feast",
        desc: "Aromatic basmati rice, tender meat, saffron flavor.",
        price: 1450,
        image: "images/biryani.avif",
        tag: "Chef's Special"
    },
    {
        id: 3,
        name: "Paneer Tikka",
        desc: "Smoky grilled cottage cheese with mint chutney.",
        price: 850,
        image: "images/paneer-tikka.avif",
        tag: "Veg Delight"
    },
    {
        id: 4,
        name: "Garlic Naan",
        desc: "Soft butter naan with fresh garlic & coriander.",
        price: 150,
        image: "images/garlic-naan.avif",
        tag: "Must Try"
    },
    {
        id: 5,
        name: "Gulab Jamun",
        desc: "Golden fried dumplings soaked in rose syrup.",
        price: 250,
        image: "images/gulab-jamun.avif",
        tag: "Dessert"
    },
    {
        id: 6,
        name: "Chicken Tikka",
        desc: "Crispy rice crepe with spiced potato filling.",
        price: 550,
        image: "images/chicken-tikka.avif",
        tag: "South Special"
    }
];
// Human-like Testimonials with Realistic Photos
const testimonials = [
    { name: "Priya Sharma", review: "Absolutely the best restaurant in town! The butter chicken is heavenly and service is warm. Felt like home.", img: "images/client1.jpg", rating: 5 },
    { name: "Rahul Mehta", review: "I've travelled to many places, but this place blew my mind. Authentic spices and cozy ambiance. 10/10!", img: "images/client2.jpg", rating: 5 },
    { name: "Sophia Khan", review: "The biryani is legendary! And the staff treats you like family. Definitely coming back with friends.", img: "images/client3.jpg", rating: 5 },
    { name: "Amit Verma", review: "From the decor to the taste — pure magic. Gulab jamun melted in my mouth. Highly recommended!", img: "images/client4.jpg", rating: 4 }
];

let totalOrders = localStorage.getItem('dailyOrders') ? parseInt(localStorage.getItem('dailyOrders')) : 248;

function updateLiveOrderDisplay() {
    document.getElementById('liveOrderCount').innerText = totalOrders;
    localStorage.setItem('dailyOrders', totalOrders);
}

function incrementOrder() {
    totalOrders++;
    updateLiveOrderDisplay();
    showToastMessage("🎉 Order placed! Thank you for loving our food!");
}

function renderDishes() {
    const grid = document.getElementById('dishesGrid');
    if (!grid) return;
    grid.innerHTML = dishes.map(dish => `
            <div class="dish-card" data-id="${dish.id}">
                <div class="dish-img" style="background-image: url('${dish.image}');">
                    <span class="dish-tag">${dish.tag}</span>
                </div>
                <div class="dish-info">
                    <h3 class="dish-title">${dish.name}</h3>
                    <p class="dish-desc">${dish.desc}</p>
                    <div class="dish-footer">
                        <span class="price">PKR ${dish.price}</span>
                        <button class="order-btn" data-name="${dish.name}" data-price="${dish.price}"><i class="fas fa-shopping-bag"></i> Order Now</button>
                    </div>
                </div>
            </div>
        `).join('');

    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const name = btn.getAttribute('data-name');
            const price = btn.getAttribute('data-price');
            showToastMessage(`🛎️ ${name} added to cart • PKR ${price}`);
            incrementOrder();
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => btn.style.transform = '', 200);
        });
    });
}

function renderTestimonials() {
    const wrapper = document.getElementById('testimonialWrapper');
    if (!wrapper) return;
    wrapper.innerHTML = testimonials.map(t => `
            <div class="swiper-slide">
                <div class="testimonial-card">
                    <img src="${t.img}" alt="${t.name}">
                    <div class="stars">${'<i class="fas fa-star"></i>'.repeat(t.rating)}</div>
                    <p class="customer-review">"${t.review}"</p>
                    <h4 class="customer-name">— ${t.name}</h4>
                </div>
            </div>
        `).join('');

    new Swiper('.testimonialSwiper', {
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        slidesPerView: 1,
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });
}

function showToastMessage(msg) {
    const toast = document.getElementById('toastMessage');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

function initDarkMode() {
    const toggleBtn = document.getElementById('darkModeToggle');
    const modeSpan = document.getElementById('modeText');
    const isDark = localStorage.getItem('foodTheme') === 'dark';
    if (isDark) {
        document.body.classList.add('dark');
        modeSpan.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
        modeSpan.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const nowDark = document.body.classList.contains('dark');
        localStorage.setItem('foodTheme', nowDark ? 'dark' : 'light');
        if (nowDark) {
            modeSpan.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
            showToastMessage("🌙 Cozy dark mode activated — perfect for dinner vibes!");
        } else {
            modeSpan.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
            showToastMessage("☀️ Light mode — fresh and bright!");
        }
    });
}

function setupInteractions() {
    const exploreBtn = document.getElementById('exploreMenuBtn');
    const bookHero = document.getElementById('bookTableHero');
    const reserveNow = document.getElementById('reserveNowBtn');

    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.getElementById('dishes')?.scrollIntoView({ behavior: 'smooth' });
            showToastMessage("🍛 Explore our chef's signature dishes!");
        });
    }
    if (bookHero) {
        bookHero.addEventListener('click', () => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            showToastMessage("📞 Call us or book a table now!");
        });
    }
    if (reserveNow) {
        reserveNow.addEventListener('click', () => {
            showToastMessage("✅ Table request sent! We'll call you shortly.");
        });
    }

    document.querySelectorAll('.dish-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('order-btn')) {
                showToastMessage("❤️ Tap 'Order Now' to add to your cart!");
            }
        });
    });
}

updateLiveOrderDisplay();
renderDishes();
renderTestimonials();
initDarkMode();
setupInteractions();

setInterval(() => {
    if (Math.random() > 0.6) {
        totalOrders++;
        updateLiveOrderDisplay();
    }
}, 50000);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
