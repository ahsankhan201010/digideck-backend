const express = require("express");
const { fetchQuotes, addQuote, fetchQuote, updateQuote, deleteQuote } = require("../controllers/quotesController");

const router = express.Router();

//RESTful api's

router
  .route("/")
  .get(fetchQuotes)
  .post(addQuote);

router
  .route("/quote/:quoteId")
  .get(fetchQuote)
  .patch(updateQuote)
  .delete(deleteQuote);

module.exports = router;
