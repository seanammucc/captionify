const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config({ path: "./env/.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("./model");
const app = express();

app.use(
  cors()
  //   {
  //   origin: "http://localhost:5173",
  //   credentials: true,
  // }
);

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const sig = req.headers["stripe-signature"];
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const password = session.custom_fields[0].text.value;
        const session_id = session.id;
        const email = session.customer_details.email;
        bcrypt.hash(password, 10, async (err, hash) => {
          if (err) {
            console.log("An error occurred!");
            return;
          }
          new User({
            email,
            password: hash,
            session_id,
          }).save();
          console.log("User created");
        });
      }
    } catch (err) {
      console.log(err);
      return;
    }
  }
);

app.use(express.json());
app.use(cookieParser());

app.post("/create-portal-session", async (req, res) => {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  console.log(req.body);
  const { session_id } = req.body;
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: "http://localhost:5173/dashboard",
  });
  res.json({ url: portalSession.url });
});

mongoose.connect(
  "mongodb+srv://seanamm8:Happybirthday10@cluster0.6rpzcjj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("/create-checkout-session", async (req, res) => {
  const prices = await stripe.prices.list({
    lookup_keys: [req.body.lookup_key],
    expand: ["data.product"],
  });
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    line_items: [
      {
        price: prices.data[0].id,
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],
    custom_fields: [
      {
        key: "Password",
        label: {
          type: "custom",
          custom: "Password",
        },
        type: "text",
      },
    ],
    mode: "subscription",
    success_url: `http://localhost:5173/login`,
    cancel_url: `http://localhost:5173`,
  });
  res.json({ id: session.id });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "User does not exist!" });
    return;
  } else {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(500).json({ message: "An error occurred!" });
        return;
      }
      if (result) {
        const token = jwt.sign(
          {
            email: user.email,
            password: user.password,
            session_id: user.session_id,
          },
          "secret"
        );
        res.cookie("token", token);
        res.status(200).json({ message: "Request received!" });
      } else {
        res.status(400).json({ message: "Incorrect Password" });
        return;
      }
    });
  }
});

app.get("/api/checktoken", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(400).json({ message: "Token not found" });
    return;
  }
  jwt.verify(token, "secret", (err, user) => {
    if (err) {
      res.status(400).json({ message: "Invalid token" });
      return;
    }
    const userRes = User.findOne({ email: user.email });
    if (!userRes) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "Token is valid", user });
  });
});

app.get("/logout", (req, res) => {
  console.log("Logging out");
  res.clearCookie("token");
  res.sendStatus(200);
});

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(400).json({ message: "User already exists!" });
    return;
  } else {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res.status(500).json({ message: "An error occurred!" });
        return;
      }
      const newUser = new User({
        username,
        email,
        password: hash,
      });
      await newUser.save();
      res.status(200).json({ newUser });
    });
  }
});

app.listen(5000);
