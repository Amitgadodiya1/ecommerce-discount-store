🛒 Ecommerce Discount Store – Cart, Checkout & Discount Engine

A lightweight ecommerce backend built with Node.js + Express and an in-memory data engine.
Supports complete cart, checkout, automatic discount generation every Nth order, coupon expiry, and admin analytics.
Includes Swagger documentation, Jest tests, and cURL examples.

🚀 Features
🧑‍💻 User Features

Add items to cart

View cart summary

Checkout with total + discount calculation

Automatic 10% discount on eligible orders

Only one active coupon at a time — older unused coupons auto-expire

🛠 Admin Features

Generate discount coupon on every Nth order

View analytics and order statistics

Auto-expire old unused coupons when new one is created

📁 Project Structure
ecommerce-discount-store/
├── server.js
├── swagger.js
├── swagger.yaml
├── logger.js
├── store.js
├── routes/
│   ├── cartRoutes.js
│   └── adminRoutes.js
├── services/
│   ├── cartService.js
│   └── discountService.js
├── tests/
│   ├── cartService.test.js
│   └── discountService.test.js
├── package.json
├── .gitignore
└── README.md

🧠 Architecture
┌──────────────────────────────┐
│ Routes  ← API Layer          │
│ cartRoutes / adminRoutes     │
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│ Services ← Business Logic     │
│ cartService / discountService │
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│ Store  ← In-Memory Data       │
│ carts / orders / stats        │
└──────────────────────────────┘

🧰 Tech Stack

Node.js

Express.js

Jest (Unit Testing)

Swagger (OpenAPI Documentation)

In-memory store (replaceable with DB later)

🛠 Setup & Installation

Install dependencies:

npm install


Start server:

npm run dev


Open Swagger UI:

http://localhost:3000/docs

Required Authentication Header
X-User-Id: <user-id>


Example:

-H "X-User-Id: user1"

🌐 cURL Examples
➕ Add item to cart
curl -X POST http://localhost:3000/api/cart/items \
-H "Content-Type: application/json" \
-H "X-User-Id: user1" \
-d '{"productId":"p1","name":"Shirt","price":1000,"quantity":2}'

🛍 Get cart
curl -X GET http://localhost:3000/api/cart \
-H "X-User-Id: user1"

💳 Checkout
curl -X POST http://localhost:3000/api/checkout \
-H "Content-Type: application/json" \
-H "X-User-Id: user1" \
-d '{}'

🎟 Checkout with discount
curl -X POST http://localhost:3000/api/checkout \
-H "Content-Type: application/json" \
-H "X-User-Id: user1" \
-d '{"discountCode":"DISC-XYZ123"}'

🏁 Admin – Generate Discount
curl -X POST http://localhost:3000/api/admin/discounts/generate \
-H "X-User-Id: admin"

📊 Admin – Stats
curl -X GET http://localhost:3000/api/admin/stats \
-H "X-User-Id: admin"

🎟 Discount Logic
Scenario	Result
N-th order qualifies	New coupon generated
Old unused coupon exists	Auto-expired
Only one active allowed	Latest overrides
Invalid / expired coupon	Returns error
📦 Example Checkout Response
{
  "subtotal": 2000,
  "discount": 200,
  "total": 1800,
  "couponApplied": "DISC-XYZ123",
  "orderId": "ORD-6789"
}

🧪 Testing

Run tests:

npm test

Covers:

discount eligibility logic

expired coupon logic

invalid coupon errors

final price calculation

checkout workflow

📜 Swagger

File location:

swagger.yaml


Interactive UI:

http://localhost:3000/docs

🧠 Future Enhancements
Feature	Benefit
PostgreSQL / Redis	Persistence
JWT Authentication	Security
Docker + GitHub Actions	CI/CD & deployment
React Web UI	Frontend example
Observability (Prometheus / OpenTelemetry)	Metrics
👤 Author

Amit Gadodiya
Senior Full Stack Engineer
GitHub: https://github.com/amitgadodiya1

📄 License
MIT License