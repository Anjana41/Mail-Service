const AWS = require("aws-sdk"); // Load the SDK for JavaScript
const DynamoDB = require("aws-sdk");
const cors = require("cors");
const dateTime = require("node-datetime");
var MongoClient = require("mongodb").MongoClient;
ObjectId = require("mongodb").ObjectID;

// const uuid = require('uuid')

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("../mailer");
const cloudWatchAPI = require("../cloudwatch-helper");
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require("../model/userSchema");
const Contact = require("../model/contactSchema");
const Purchase = require("../model/purchaseSchema");
const Transaction = require("../model/transactionSchema");
const Campaign = require("../model/campaignSchema");

const Plan = require("../model/planSchema");
const eList = require("../model/elistSchema");
const List = require("../model/listSchema");
const Token = require("../model/token");
const verifyEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const tokenSchema = require("../model/token");
const stripe = require("stripe")(
  "sk_test_51LKbQ9KAjzxspP2ZE33RmdtsLrCEdJ44F9H393TLI1ttnrdI2Y2ctNS2JUwa9jXb5jmg1c3oPeCestl8Y2ChXjPa00aKWE4VHU"
);
const { Router } = require("express");
const bodyparser = require("body-parser");
const uuid = require("uuid").v4;

const app = express();

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());
router.use(cors());

router.post("/", (req, res) => {
  res.send("hello world from server router js");
});

const config = {
  apiVersion: "2010-12-01",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // hardcoding credentials is a bad practice
  accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY, // please use env vars instead
  region: "us-east-1",
};
AWS.config.update(config);
AWS.config.update({ region: "us-east-1" });

// register
router.post("/register", async (req, res) => {
  const { name, email, password, cpassword } = req.body;

  if (!name || !email || !password || !cpassword) {
    return res
      .status(422)
      .json({ error: "plz fill all the fields properly!! " });
  }

  try {
    let userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exist!!" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password doesn't match!!" });
    } else {
      console.log("hey ");
      const user = new User({ name, email, password, cpassword });
      await user.save();

      //send verification Email
      const token = await new Token({
        userId: user.id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
      // console.log(token);
      const url = `${process.env.BASE_URL}${user.id}/verify/${token.token}`;
      // console.log(url);
      await verifyEmail(user.email, "Verify Email", url);

      Plan.find({}).exec(function (err, test) {
        if (err) {
          console.log("plan data");
        } else {
          res.status(201).json([user, test]);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

//verification email
router.get("/:id/verify/:token", async (req, res) => {
  console.log("hii verify token false");
  console.log(req.body);
  try {
    console.log(req.params.id);
    const user = await User.findOne({ _id: req.params.id });
    console.log(user);
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    console.log(token);
    if (!token) return res.status(400).send({ message: "Invalid token" });

    User.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      console.log("update method"),
      (error, data) => {
        if (error) {
          console.log("error in updating");
        } else {
          "data updated", data;
        }
      }
    );
    await token.remove();
    res.status(200).send({ message: "Email verified successfully!! " });
  } catch (error) {
    console.log("errorrrrrrr");
  }
});
// verify email
// if (!userLogin.verified) {
//   let token = await Token.findOne({ userId: userLogin._id });
//   console.log("find the token", token);
//   if (!token) {
//     const token = await new Token({
//       userId: userLogin.id,
//       token: crypto.randomBytes(32).toString("hex"),
//     }).save();
//     const url = `${process.env.BASE_URL}${userLogin.id}/verify/${token.token}`;
//     await verifyEmail(userLogin.email, "Verify Email", url);
//   }
//   return res
//     .status(400)
//     .send({ message: "Verification Email sent to your account" });
// }
//login route

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Plz Fill the data" });
    }

    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      if (userLogin.role_id == 1) {
        const isMatch = await bcrypt.compare(password, userLogin.password);
        const token = await userLogin.generateAuthToken();
        //cookie storage
        res.cookie("jwtoken", token, {
          maxAge: 30 * 24 * 3600000,
          httpOnly: true,
        });
        if (!isMatch) {
          res.status(400).json({ error: "Invalid Credentials !!" });
        } else {
          res.status(406).json({ success: "Admin login successfully" });
        }
      } else {
        const isMatch = await bcrypt.compare(password, userLogin.password);
        const token = await userLogin.generateAuthToken();

        //cookie storage
        res.cookie("jwtoken", token, {
          maxAge: 30 * 24 * 3600000,
          httpOnly: true,
        });
        if (!isMatch) {
          res.status(400).json({ error: "Invalid Credentials !!" });
        } else {
          const isPlan = await Purchase.findOne({ user_id: userLogin._id });
          if (isPlan) {
            res.status(200).json({ message: "User Signin Successfully!!" });
          } else {
            res.status(402).json({ message: "User Need to purchase a plan!" });
          }
        }
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials for token!!" });
    }
  } catch (err) {
    console.log(err);
  }
});

//about user currently login data

router.get("/about", authenticate, (req, res) => {
  res.send(req.rootUser);
});

// add contact
router.post("/api/AddCon", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(422)
      .json({ error: "plz fill all the fields properly!! " });
  }

  try {
    // const userExist = await Contact.findOne({ email: email });

    // if (userExist) {
    //   const contact = new Contact({
    //     name,
    //     email,
    //     message,
    //   });
    const contact = new Contact({
      name,
      email,
      message,
    });
    await contact.save();
    res.status(201).json({ message: "Message Sent Successfully!!" });
    // } else {
    //   console.log("hii email");
    //   res.status(422).json({ message: "Email does not exist!!" });
    // }
  } catch (err) {
    console.log(err);
  }
});

// Set the region that you configured in AWS

// contact us
router.post("/api/contact", (req, res, next) => {
  // console.log("hii mailer");
  console.log(req.body.email);
  return mailer
    .sendMail("sainianjana41@gmail.com", [req.body.email], req.body)
    .then(() => res.send(req.body))
    .catch(next);
});

//planpurchase

router.get("/plandata", function (req, res) {
  Plan.find({}).exec(function (err, test) {
    if (err) {
      console.log("plan data");
    } else {
      res.json(test);
    }
  });
});

//Add Plan
router.post("/admin/AddPlan", async (req, res) => {
  const { plan_name, emails, price, lists, listemails, plan_type } = req.body;

  if (!plan_name || !emails || !price || !lists || !listemails || !plan_type) {
    return res
      .status(422)
      .json({ error: "plz fill all the fields properly!! " });
  }

  try {
    const planExist = await Plan.findOne({ plan_name: plan_name });

    if (planExist) {
      return res.status(422).json({ error: "Plan already exist!!" });
    } else {
      const plan = new Plan({
        plan_name,
        plan_type,
        emails,
        price,
        lists,
        listemails,
      });
      //hashing call
      await plan.save();

      res.status(201).json({ message: "Plan Saved Successfully!!!" });
    }
  } catch (err) {
    console.log(err);
  }
});

// Plan Update
router.post("/admin/UpdatePlan", async (req, res) => {
  const { plan_id, plan_name, emails, price, lists, listemails, plan_type } =
    req.body;
  console.log(req.body.plan_type);
  // console.log(req.body);
  if (!plan_name || !emails || !price || !lists || !listemails || !plan_type) {
    return res
      .status(422)
      .json({ error: "plz fill all the fields properly!! " });
  }

  try {
    Plan.findByIdAndUpdate(
      plan_id,
      { plan_name, emails, price, lists, listemails, plan_type },
      console.log("update method"),
      (error, data) => {
        if (error) {
          console.log("data:", data);
          console.log("error in updating");
        } else {
          ("data updated");
        }
      }
    );
    res.status(201).json({ message: "Plan updated Successfully!!!" });
  } catch (err) {
    console.log(err);
  }
});

// delete plan by admin

router.post("/admin/DeletePlan", async (req, res) => {
  const { Planid } = req.body;
  const plan_id = Planid;
  if (!plan_id) {
    return res.status(422).json({ error: "Error in Deleting Plan" });
  }
  try {
    const plan = await Plan.findByIdAndDelete(plan_id);
    if (!plan) return;
    res.status(201).json({ message: "Plan Deleted Successfully!!!" });
  } catch (err) {
    console.log(err);
  }
});

//Cancel user Plan by user
router.post("/user/DeletePlan", async (req, res) => {
  const { Planid, userid } = req.body;
  const plan_id = Planid;
  const user_id = userid;
  if (!plan_id) {
    return res.status(422).json({ error: "Error in Deleting Plan" });
  }

  try {
    const userplan = await Purchase.findOne({ user_id: user_id });
    console.log(userplan);
    if (userplan) {
      const sub_id = userplan.sub_id;
      console.log(sub_id);
      const deleted = await stripe.subscriptions.del(sub_id);
      const purchase = await Purchase.findByIdAndDelete(userplan._id);
      if (!purchase) return;
      res.status(201).json({ message: "Plan Cancel Successfully!!!" });
    }
  } catch (err) {
    console.log(err);
  }
});

// router.get('/userdata', function(req,res){
//   User.find({})
//   .exec(function(err,user){
//     if(err){
//       console.log("User Data")
//     }else{
//       res.json(user);
//       console.log(user);
//     }
//   })
// });

// userdata from users table
router.get("/userdata", (req, res) => {
  User.find({}, { _id: 1, name: 1, email: 1, verified: 1 })
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

// contacts table data
router.get("/contactdata", (req, res) => {
  Contact.find({})
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

// list data
router.get("/admin/list", (req, response) => {
  const url = process.env.DATABASE;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("merndata");
    dbo
      .collection("lists")
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userid",
            foreignField: "_id",
            as: "userdetails",
          },
        },
      ])
      .toArray(function (err, res) {
        if (err) throw err;
        response.json(res);
      });
  });
});
// admin emails
router.post("/admin/emails", async (req, res) => {
  const { listid } = req.body;
  if (!listid) {
    return res.status(422).json({ error: "Error in Deleting Plan" });
  }

  eList
    .find({ listname: listid })
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

// list and email list creation
router.post("/api/list", async (req, res) => {
  listname = req.body.listname;
  userid = req.body.userid;
  emails = req.body.emails;
  const dt = dateTime.create();
  const date = dt.format("Y-m-d H:M:S");
  if (!listname || !userid) {
    return res
      .status(422)
      .json({ error: "plz fill all the fields properly!! " });
  }
  try {
    const list = new List({
      listname,
      userid,
      date,
    });
    await list.save();
    console.log(list._id);
    try {
      const list_id = list._id;
      console.log(list_id);
      listname = list_id;
      emails = emails;
      userid = userid;
      var s = emails;
      var match = s.split(",");
      for (var a in match) {
        var variable = match[a];
        emails = variable;
        const elist = new eList({
          listname,
          emails,
          userid,
        });
        // console.log(list);
        await elist.save();
      }
      res.status(201).json({ message: "List Successfully!!" });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

//
router.get("/listuser", authenticate, (req, res) => {
  const userData = req.rootUser;
  List.find({ userid: userData._id }, function (err, allDetails) {
    if (err) {
      console.log(err);
    } else {
      res.status(201).json({ allDetails, userData });
    }
  });
});

//user plan data Current plan
router.get("/userplan", authenticate, (req, res) => {
  const userData = req.rootUser;

  Purchase.find({ user_id: userData._id }, function (err, purchaseDetails) {
    if (err) {
      console.log(err);
    } else if (purchaseDetails.length > 0) {
      Plan.find(
        { _id: purchaseDetails[0].plan_id },
        function (err, planDetails) {
          if (err) {
            console.log(err);
          } else {
            res.status(201).json({ purchaseDetails, userData, planDetails });
          }
        }
      );
    }
  });

  // aws email sending
  router.post("/sendEmail", async (req, res, next) => {
    // console.log("body",req.body);
    listid = req.body.listid;
    emailbody = req.body.emailbody;
    console.log("hello sendmail")
    console.log("user body", req.body.emailbody, req.body.userid);
    eList.find(
      { listname: listid },
      { emails: 1, _id: 0 },
      function (err, allEmails) {
        if (err) {
          console.log(err);
        } else {
          // console.log(allEmails);
          const Emails = allEmails.map((element) => element.emails);
          // console.log(Emails);

          Emails.forEach((element) => {
            return mailer
              .sendMail("anjana.saini@netleon.com", [element], req.body)
              .then(() => res.send(req.body))
              .catch(next);
          });

          // res.status(201).json({allDetails,userData});
        }
      }
    );
  });
});

router.post("/send", async (req, res, next) => {
  // console.log("Hello api");
  // console.log("hii mailer");
  listid = req.body.listid;
  emailbody = req.body.emailbody;
  userid = req.body.userid;
  // console.log(req.body.emailbody, req.body.listid,req.body.userid);

  const Cloud = "cloudwatchconfig";
  eList.find(
    { listname: listid },
    { emails: 1, _id: 0 },
    function (err, allEmails) {
      if (err) {
        console.log(err);
      } else {

        User.find({ _id: userid }, function (error, userdata) {
          if (error) {
            console.log("error", error)
            res.status(501).json({ message: "error in getting data" })
          }
          else {
            // if(userdata.verified == true)
            console.log(userdata[0]['verified']);
            // console.log(userdata,"userdata")
            if (userdata[0]['verified'] == true) {
              const Emails = allEmails.map((element) => element.emails);
              Emails.forEach((element) => {
                return mailer
                  .sendMail("anjana.saini@netleon.com", [element], req.body, Cloud)
                  .then(() => console.log("mail sended"))
                  // .then(() => res.send(req.body))

                  .catch(next);
                const dt = dateTime.create();
                const date = dt.format("Y-m-d H:M:S");
                const campaign = new Campaign({
                  userid,
                  listid,
                  emailbody,
                  date,
                });

                campaign.save();
              });
            }
            else {
              res.status(502).send({ message: "Please Verify Your Email to Create a Campaign." })
            }

          }
        })

      }
    }
  );
});

router.get("/ses_chart", (req, res) =>
  cloudWatchAPI
    .getMetricData()
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
);

//user plan purchase free
router.post("/freeplan", async (req, res) => {
  console.log(req.body);
  const user_id = req.body.user_id._id;
  const plan_id = req.body.planid;
  const plan_name = req.body.name;
  const plan_price = req.body.price;
  const email_limit = req.body.emails;
  const list_limit = req.body.lists;
  const dt = dateTime.create();
  const date = dt.format("Y-m-d H:M:S");

  const purchase = new Purchase({
    user_id,
    plan_id,
    plan_name,
    plan_price,
    email_limit,
    list_limit,
    date,
  });
  purchase.save();
  res.json(purchase);
});
//payment checkout
router.post("/checkout", async (req, res) => {
  console.log("Request:", req.body.token.id);

  let error;
  let status;
  const { product, token } = req.body;
  console.log("tokensssss:", token.id);
  console.log("userid:", product.userid);
  try {
    const planExist = await Purchase.find({ user_id: product.userid });
    // const userExist = await User.find({ username: req.body.username });

    console.log("user found:", planExist);
    if (planExist.length > 0) {
      console.log("plan is there");
      status = "Plan Purchase already exist";
      return res.status(400).send({ message: "plan already exists" });
    } else {
      console.log("no plan");
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id,
      });
      console.log("customer:", customer);
      const products = await stripe.products.create({
        name: product.plan_name,
      });
      const price = await stripe.prices.create({
        unit_amount: product.price * 100,
        currency: "INR",
        recurring: { interval: "month" },
        product: products.id,
      });

      const idempotencyKey = uuid();
      console.log("idempotency keyyy", idempotencyKey);
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: price.id }],
      });
      console.log(subscription.id);
      const user_id = product.userid;
      const plan_id = product.planid;
      const plan_price = product.price;
      const plan_name = product.plan_name;
      const email_limit = product.email_limit;
      const sub_id = subscription.id;
      const amount = product.price;
      const dt = dateTime.create();
      const date = dt.format("Y-m-d H:M:S");
      console.log(product);

      const list_limit = product.lists;
      // const date =
      // transaction_id,

      const trans = new Transaction({
        user_id,
        plan_id,
        sub_id,
        amount,
        date,
      });
      trans.save();
      const transaction_id = trans._id;
      const purchase = new Purchase({
        user_id,
        plan_id,
        plan_name,
        plan_price,
        email_limit,
        list_limit,
        sub_id,
        transaction_id,
        date,
      });
      purchase.save();
      // console.log("Subscription:", { subscription });
      status = "Payment Successful!!";
      res.status(200).json({ message: "Plan Saved Successfully!!!" });
    }
  } catch (error) {
    console.error("Error:", error);
    status = "failure in payment";
  }

  // res.json({ error, status });
});

// admin dashboard total counts
// count users
router.get("/count/users", (req, res) => {
  var users = [];
  var plans = [];
  // try{

  User.countDocuments().then((count) => {
    // res.json(count);
    users = count;
    console.log("users:", users);
  });

  var a = Plan.countDocuments().then((count) => {
    // res.json(count);
    plans = count;
    console.log("total", plans);
  });
  console.log("var a :", a);
  // }
  //  catch(err) {
  //     console.log(err.Message);
  //   }
});

// count plans
router.get("/count", (req, res) => {
  User.countDocuments()
    .then((users) => {
      Plan.countDocuments()
        .then((plans) => {
          List.countDocuments()
            .then((lists) => {
              eList
                .countDocuments()
                .then((emails) => {
                  Campaign.countDocuments()
                    .then((campaigns) => {
                      Purchase.countDocuments()
                        .then((purchases) => {
                          Transaction.countDocuments()
                            .then((transactions) => {
                              res
                                .status(200)
                                .json([
                                  users,
                                  plans,
                                  lists,
                                  emails,
                                  campaigns,
                                  purchases,
                                  transactions,
                                ]);
                            })
                            .catch((err) => {
                              console.log(err.Message);
                            });
                        })
                        .catch((err) => {
                          console.log(err.Message);
                        });
                    })
                    .catch((err) => {
                      console.log(err.Message);
                    });
                })
                .catch((err) => {
                  console.log(err.Message);
                });
            })
            .catch((err) => {
              console.log(err.Message);
            });
        })
        .catch((err) => {
          console.log(err.Message);
        });
    })
    .catch((err) => {
      console.log(err.Message);
    });
});

// count Lists
router.post("/count/userinfo", async (req, res) => {
  console.log("userid", req.body);
  const userid = req.body.userid;

  List.find({ userid: userid })
    .then((items) => console.log(items))
    .catch((err) => console.log(err));
  // console.log("items",items)
  // const lists = await User.find({ _id: userid }).then((list),console.log(list))
  // console.log("lists",lists);
  // List.countDocuments().then((count) => {
  //   res.json(count);
  // }).catch((err) => {
  //   console.log(err.Message);
  // })
});

//signup form list save

router.post("/signupform/list/save", async (req, res) => {
  const listname = req.body.listname;
  const userid = req.body.userid;
  const url = req.body.url;
  // emails = req.body.emails;
  // const { listname, userid } = req.body;
  const dt = dateTime.create();
  const date = dt.format("Y-m-d H:M:S");
  if (!listname || !userid) {
    return res
      .status(422)
      .json({ error: "plz fill all the fields properly!! " });
  }

  try {
    const list = new List({
      listname,
      userid,
      url,
      date
    });
    await list.save();
    res.status(200).json({ list });
  } catch (err) {
    console.log(err);
  }
});

//post form
router.post("/Subscribe/Email/:userid/:listid", function (req, res) {
  const data = JSON.stringify(req.body);
  var value = JSON.parse(data);
  console.log(value["email"]);
  console.log("userid:", req.params.userid);
  console.log("listid:", req.params.listid);
  const userid = req.params.userid;
  const listname = req.params.listid;
  const emails = value["email"];
  // const url = List.findOne({ _id: listname });
  // console.log(url);
  const elist = new eList({
    userid,
    listname,
    emails,
  });
  elist.save();
  List.find({ _id: listname }, function (err, allDetails) {
    if (err) {
      console.log(err);
    } else {
      console.log("details:", allDetails);
      console.log(allDetails[0].url);
      const url = allDetails[0].url;
      return res.redirect(url);
      // res.status(201).json({ allDetails });
    }
  });

  console.log("email saved succussfully!!");
  // return res.redirect('/UserHomePage');
});

// const session = await stripe.checkout.sessions.create({
//   success_url: 'http://localhost:3000/success',
//   cancel_url: 'http://localhost:3000/cancel',
//   line_items: [
//     {price: price.id, quantity: 1},
//   ],
//   mode: `subscription`,
// });

// router.post("/checkout",(req,res) => {
//   console.log(req.body);
//   const {product , token } = req.body;
//   console.log("Product",product);
//   console.log("Price",product.price);
//   console.log("token",product.plan_name);
//   const user_id = product.userid;
//   const plan_id = product.planid;
//   const price = product.price;
//   const plan_name = product.plan_name;
//   const transaction_id = token.card.id;
//   const purchase = new Purchase({
//     user_id,
//     plan_id,
//     transaction_id,
//     plan_name,
//     price
//   });
//   purchase.save();

//   const idempotencyKey = uuid();
//   return stripe.customers.create({
//   email:"anjana.saini@netleon.com",
//   source:token.id
//   })
//   .then(customer =>{
//   stripe.charger.create({
//   amount: product.price * 100,
//   currency:'usd',
//   customer:customer.id,
//   receipt_email: token.email,
//   description: `purchase of $(product.name)`,
//   shipping: {
//   name: token.card.name,
//   address:{
//   country:token.card.address_country
//   }
//   }
//   },{idempotencyKey})})
//   .then(result => res.status(200).json(result))
//   .catch(err => {console.log("error in stripe gatewaty",err)})
//   });

// console.log(list);

// router.post("/api/emailslist", async (req, res) => {
//   const { listname, emails, userid } = req.body;
//   console.log(req.body)

//   if (!listname || !emails || !userid) {
//     return res
//       .status(422)
//       .json({ error: "plz fill all the fields properly!! " });
//   }

//   try {
//     // const arr = [emails];
//     // arr.forEach((element) => {
//     //   console.log(element);
//     // });

//     const elist = new eList({
//       listname,
//       emails,
//       userid,
//     });
//     // console.log(list);
//     await elist.save();
//     res.status(201).json({ message: "List Successfully!!" });
//     // } else {
//     //   console.log("hii email");
//     //   res.status(422).json({ message: "Email does not exist!!" });
//     // }
//   } catch (err) {
//     console.log(err);
//   }
// });
// res.cookie("cookiename",token,{
//     expires:new Date(Date.now()+25892000000),
//     httpOnly:true
// });

module.exports = router;
