const express = require("express");
const cors = require("cors");
const swaggerDocs = require("./config/swagger");

const cartRoutes = require("./routes/cartRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// 👉 Register Swagger BEFORE auth middleware
swaggerDocs(app);

// auth middleware (after swagger)
app.use((req, res, next) => {
  if (req.path.startsWith("/docs")) {
    return next(); // bypass for swagger docs
  }

  const userId = req.headers["x-user-id"];
  if (!userId) {
    return res.status(400).json({ error: "Missing X-User-Id header" });
  }
  req.userId = userId;
  next();
});

app.use("/api", cartRoutes);
app.use("/api/admin", adminRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
