var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Prerana@123',
  database : 'bank',
  port : 3308
});
 
connection.connect();
 
global.tokens = [];
 
// connection.end();

module.exports = {
  searchUser: function (req, res) {
    if(req.body.param == "") {
      res.status(200).send([]);
    } else {
      connection.query("SELECT * FROM CUSTOMER WHERE Customer_Name LIKE '%"+req.body.param+"%' OR Customer_Id='"+req.body.param+"' LIMIT 10;", function (error, results, fields) {
        if (error) throw error;
        res.status(200).send(results);
        console.log('The solution is: ', results[0]);
      });
    }
    // res.status(200).send("Prathap");
  },
  login: function (req, res) {

    if(req.body.email == "") {
      res.status(400).send("Invalid Password");
    } else {
      connection.query("SELECT * FROM EMPLOYEE WHERE Email_Id LIKE '%"+req.body.email+"%' LIMIT 1;", function (error, results, fields) {
        if (error) throw error;
        if (results.length == 1) {
          //user found
          if(results[0].Password == req.body.password) {
            //valid password
            let token = Math.random().toString(20) + Math.random().toString(20);

            global.tokens.push(token);

            res.status(200).send({token: token});
          } else {
            //invalid password
            res.status(400).send("Invalid Password");
          }
        } else {
          //user not found
          res.status(400).send("User Not Found!!");
        }

      });
    }
  },
  saveCustomer: function (req, res) {
    connection.query(`INSERT INTO CUSTOMER VALUES (null, '${req.body.name}', '${req.body.address}', '${req.body.phone}', '${req.body.email}', '${req.body.gender}', 1)`, function (error, results, fields) {
      if (error) throw error;
      res.status(200).send("Customer Saved");
    });
  },
  customerDetails: function (req, res) {

    connection.query(`SELECT * FROM CUSTOMER WHERE Customer_Id=${req.body.customer_id}`, function (error, results, fields) {
      if (error) throw error;
      let cust = results[0];

      connection.query(`SELECT * FROM ACCOUNTS a LEFT JOIN BRANCH b ON b.Branch_Id=a.Branch_Id WHERE Customer_Id=${req.body.customer_id}`, function (error1, results1, fields1) {
        if (error1) throw error1;
        let accounts = results1;
        
        let ids = accounts.map(acc => {return acc.Account_No});

        if(ids.length == 0) {
          res.status(200).send({
            customer: cust,
            accounts: [],
            transactions: []
          })
        } else {
          connection.query(`SELECT * FROM TRANSACTIONS WHERE Account_No IN (${ids.join(",")}) ORDER BY \`Date\` DESC`, function (error2, results2, fields2) {
            if (error2) throw error2;
            let transactions = results2;
  
            res.status(200).send({
              customer: cust,
              accounts: accounts,
              transactions: transactions
            })
      
          });
        }

        
  
      });

    });
  },
  getBranches: function (req, res) {
    connection.query(`SELECT * FROM BRANCH;`, function (error, results, fields) {
      if (error) throw error;
      res.status(200).send(results);
    });
  },

  updateCustomer: function (req, res) {
    connection.query(`UPDATE CUSTOMER SET Customer_Name='${req.body.name}', Address='${req.body.address}', Phone='${req.body.phone}', Email_Id='${req.body.email}', Gender='${req.body.gender}', Customer_Status=${req.body.status} WHERE Customer_Id=${req.body.id}`, function (error, results, fields) {
      if (error) throw error;
      res.status(200).send("Customer Saved");
    });
  },

  createAccount: function (req, res) {
    connection.query(`INSERT INTO ACCOUNTS VALUES (null, ${req.body.branch_id}, ${req.body.customer_id}, '${req.body.acc_type}', 0, ${req.body.interest_rate}, 1)`, function (error, results, fields) {
      if (error) throw error;
      res.status(200).send("Account Created");
    });
  },


  updateAccount: function (req, res) {
    connection.query(`UPDATE ACCOUNTS SET Branch_Id=${req.body.branch_id}, Account_Type='${req.body.acc_type}', Interest_Rate=${req.body.interest}, Account_Status=${req.body.status} WHERE Account_No=${req.body.id}`, function (error, results, fields) {
      if (error) throw error;
      res.status(200).send("Account Updated");
    });
  },

  createTransaction: function (req, res) {

    connection.query(`SELECT * FROM ACCOUNTS WHERE Account_No=${req.body.account_id}`, function (err, results, fields) {

      let acc = results[0];
      let bal = results[0].Balance;
      let amount = parseFloat(req.body.amount);

      if(req.body.type == "Debit") {
        bal -= amount;
      } else if(req.body.type == 'Credit'){
        bal += amount;
      }


      connection.query(`INSERT INTO TRANSACTIONS VALUES (null, '${req.body.info}', ${req.body.account_id}, CURRENT_TIMESTAMP, ${amount}, '${req.body.type}', ${bal});`, function (error, results, fields) {
        if (error) throw error;

        connection.query(`UPDATE ACCOUNTS SET Balance=${bal} WHERE Account_No=${req.body.account_id};`, function (error, results, fields) {
          if (error) throw error;
          res.status(200).send("Transaction Created");
        });
      });
    });

  },
};