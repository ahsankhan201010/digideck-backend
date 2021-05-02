const { v4: uuid } = require("uuid");
const { readFile, writeFile } = require("../utility/common");

exports.fetchQuotes = async (req, res) => {
  try {
    //fetch quotes from file
    var quotes = await readFile(`${__dirname}/../data/quotes.json`, "utf-8");
    //send back quotes in response
    res.status(200).json({
      status: "success",
      data: {
        quotes,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addQuote = async (req, res) => {
  try {
    //take out data from body of request
    var { title, quote, author } = req.body;
    //fetch file
    var quotes = await readFile(`${__dirname}/../data/quotes.json`, "utf-8");
    //push new quote
    var newQuote = {
      id: uuid(), //generate ranodm id
      title,
      quote,
      author,
    };
    quotes.push(newQuote);
    //write file with updated data
    await writeFile(`${__dirname}/../data/quotes.json`, quotes);
    //send back response
    res.status(200).json({
      status: "success",
      data: {
        quote: newQuote,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.fetchQuote = async (req, res) => {
  try {
    //fetch id from param
    var { quoteId } = req.params;
    //read quotes from file
    var quotes = await readFile(`${__dirname}/../data/quotes.json`, "utf-8");
    //find quote with given id
    var quote = quotes.find(({ id }) => id === quoteId);

    //return in response that specific quote
    res.status(200).json({
      status: "success",
      data: {
        quote,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateQuote = async (req, res) => {
  try {
    //fetch quote id and quote data from params and body respectively
    var { quoteId } = req.params;
    //read quotes
    var quotes = await readFile(`${__dirname}/../data/quotes.json`, "utf-8");
    //update that specific quote whose id is provided with give data
    var updatedQuotes = quotes.map((quote) => {
      if (quote.id === quoteId) {
        return {
          ...quote,
          ...req.body,
        };
      }
      return quote;
    });
    //write updated quotes arr in file
    await writeFile(`${__dirname}/../data/quotes.json`, updatedQuotes);
    //return that updated quotes arr
    res.status(200).json({
      status: "success",
      data: {
        quotes: updatedQuotes,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteQuote = async (req, res) => {
  try {
    //fetch quoteId from prams
    var { quoteId } = req.params;
    var deletedQuote = null;
    //read quotes
    var quotes = await readFile(`${__dirname}/../data/quotes.json`, "utf-8");
    //delete that specfic quote from arr
    var updatedQuotes = quotes.filter(({ id }) => id !== quoteId);
    //write file
    await writeFile(`${__dirname}/../data/quotes.json`, updatedQuotes);
    //return deleted quote
    deletedQuote = quotes.find(({ id }) => id === quoteId);
    res.status(200).json({
      status: "success",
      data: {
        quote: deletedQuote,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
