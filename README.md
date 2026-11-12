# Lanka Power Tools - Modern Front-End Webstore (Sri Lanka)

A high-performance, modern, and interactive front-end webstore designed specifically for power tools, hardware machinery, and contractor equipment sales in Sri Lanka.

## 🚀 How to Run & Show to Your Customer
No complex servers, Node.js or databases required! It is 100% self-contained:
1. Navigate to `D:\power-tools\` on your computer.
2. Double-click **`index.html`** to open it in Google Chrome, Microsoft Edge, or any modern web browser.
3. You can also right-click `index.html` and choose **Open with > Chrome**.

---

## 🌟 Key Features for Customer Demonstration

### 1. 🇱🇰 Tailored for the Sri Lankan Market
- **Sri Lankan Rupee (LKR / Rs.)** pricing format across all tools.
- **Islandwide Delivery Grid**: Colombo & Gampaha (Rs. 450 express), Outstation districts (Rs. 750), and Free Delivery on orders above Rs. 100,000.
- **Showroom Pickup** option for Colombo 10 (Panchikawatta).
- **Local Payment Options**:
  - Cash on Delivery (COD) islandwide
  - Direct Bank Transfer (Commercial Bank / Sampath Bank / HNB)
  - Koko / Mintpay (3 interest-free installments)

### 2. 📲 Instant WhatsApp Order & Quotation Integration
- **Direct WhatsApp Checkout**: Customers can assemble their cart and click *"Order on WhatsApp"*, which automatically formats an itemized message with product names, quantities, delivery fees, and total price ready to send to the store's phone number.
- **Contractor & Bulk Quotation**: Dedicated modal for construction firms to request discounted bulk pricing with VAT/SVAT invoice support.
- Floating WhatsApp chat button for instant consultation.

### 3. 🛠️ Interactive Product Catalog & Dynamic Filtering
- **Category Filter Tabs**: Rotary Hammers & Breakers, Angle Grinders, Cordless & Lithium, Saws & Woodworking, Welding Machines, Pressure Washers, Air Compressors, and Garden Tools.
- **Brand Filter**: Makita, Bosch, DeWalt, DongCheng, Ingco, Total, and Prescott.
- **Live Search**: Instant real-time search across tool names, brands, and descriptions with no page reload.
- **Sort By**: Price (Low to High), Price (High to Low), and Customer Rating.

### 4. 🔍 "Quick View" Product Modal
- High-resolution tool showcase.
- Full technical specification table (Watts, RPM, Chuck sizes, Weight, etc.).
- "What's In The Box" checklist.
- Company warranty certificate badge & spare parts assurance.

### 5. 🛒 Interactive Cart Drawer & Checkout Experience
- Slide-in responsive cart drawer.
- Increase/decrease quantity and remove items with real-time recalculations.
- **Promo Code Engine**: Try typing `LANKA10` for a 10% discount or `CONTRACTOR` for a Rs. 2,500 contractor voucher.
- Complete online checkout form with Sri Lankan district selector and instant order confirmation modal (generates a unique Order ID like `LPT-8491` and a one-click WhatsApp receipt sender).

---

## 📂 Project Structure
```
D:\power-tools\
├── index.html       # Main responsive webstore interface
├── style.css        # Custom styles, fonts, glassmorphism, animations
├── data.js          # Product catalog, categories, brands & testimonials
├── app.js           # Reactive shopping cart, filters, modal handlers
└── README.md        # Documentation and presentation guide
```

## ⚙️ How to Add More Products or Change Prices
Open `D:\power-tools\data.js` in any text editor (Notepad, VS Code, etc.).
You can add, edit, or remove any product in the `PRODUCTS` array:
```javascript
{
  id: "PT-013",
  name: "Your New Power Tool Name",
  brand: "Makita",
  category: "drills",
  price: 35000,
  originalPrice: 40000,
  rating: 4.9,
  reviewsCount: 12,
  badge: "New Arrival",
  warranty: "1 Year Official Warranty",
  inStock: true,
  image: "image_url_here",
  description: "Description of the tool...",
  specs: { ... },
  includes: [ ... ]
}
```
Refresh `index.html` in your browser and the new tool will appear automatically!
