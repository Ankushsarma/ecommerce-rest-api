const express = require("express");
const app =express();
app.use(express.json());


app.use('/auth',require("./routes/authRoutes"));
app.use("/users" ,require("./routes/userRoutes"));
app.use("/products",require("./routes/productRoutes"));
app.use("/cart",require("./routes/cartRoutes"));
app.use("/orders",require("./routes/orderRoutes"));
app.use("/reviews",require("./routes/reviewRoutes"));
app.use("/wishlist",require("./routes/wishlistRoutes"));
app.use("/payment",require("./routes/paymentRoutes"));

console.log("anything");





module.exports=app;