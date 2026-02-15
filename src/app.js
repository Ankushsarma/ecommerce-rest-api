const express = require("express");
const auth = require("./middleware/authMiddleware");
const app =express();
app.use(express.json());
const cors = require("cors");

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());



app.use('/auth',require("./routes/authRoutes"));

app.use(auth);

app.use("/users" ,require("./routes/userRoutes"));
app.use("/products",require("./routes/productRoutes"));
app.use("/cart",require("./routes/cartRoutes"));
app.use("/orders",require("./routes/orderRoutes"));
app.use("/reviews",require("./routes/reviewRoutes"));
app.use("/wishlist",require("./routes/wishlistRoutes"));
app.use("/payment",require("./routes/paymentRoutes"));





module.exports=app;