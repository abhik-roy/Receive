//Unused code from db.serialize(()=>{})

//starting code database.js
/*    module.exports.date = function(year, month, day, hour, min){
      //YYYY-MM-DDTHH:MM
      //the T is a separator between day and hour
      return toString(year) + '-' +  month + '-' + day + 'T' + hour + ':' + min;
    }
    function print(str){
      console.log(`[DB] str`);
    }
*/
    /*
    // Create basic, generic table if it doesnt exist.
    db.run('CREATE TABLE IF NOT EXISTS users (email text, password text)');

    // NOTE: The syntax:
    //      'module.exports.********* = function() {}'
    // Is to allow external JS files to use this function.


    // Inserts a user into the 'users' table of our database
    module.exports.insertUser = function(email, password) {
        db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
    }

    // Prints out the 'users' table of our database
    module.exports.printTable = function () {
        // This just prints all rows
        console.log('>printTable');
        db.each('SELECT rowid AS idx, email, password FROM users', function (err, row) {
            if(err){
              console.log("[DB]" + err.message);
            }
            console.log("[DB]\tRow " + row.idx + ": " + row.email + "\t" + row.password);
        });
        console.log('<printTable');
        //printcid();
    }*/

    /*
    // Checks if the email and password combination exist in the 'users' table.
    module.exports.verifyuser = function (email, password) {
        //  db.each('SELECT rowid AS id, email, password FROM users', function (err, row) {
        //    console.log(row.id + ": "+ row.email + "\t" + row.password);
        //});
    }*/

//old table code
/*old db, not used
      db.run(addtable + 'StoreName(\
            sid integer PRIMARY KEY,\
            sname TEXT NOT NULL,\
            bid NOT NULL,\
            FOREIGN KEY(bid) REFERENCES BID(bid))',
          [],
          (err) =>{
            console.log("createtables-StoreName: ", err);
          });

      db.run(addtable + 'StoreLocation(\
            sid TEXT,\
            location TEXT NOT NULL,\
            state VARCHAR(2) NOT NULL,\
            FOREIGN KEY(sid) REFERENCES StoreName(sid))',
          [],
          (err) => {
            console.log("createtables-StoreLocation: ", err);
          });
*/



/*
    module.exports.getallusers = (res) =>{
      cidjson = {
        "login" : true,
        cid : []
      };
      db.all('select cid from Customer', [],
          (err, rows, res) => {
            console.log('[DB]getallusers:' + JSON.stringify(rows));
            //uidjson.uid

          });
    }
    module.exports.printbid = function(){
      console.log('[DB]printbid');
      console.log('username\tpasswordhash\tbid');
      db.each('select * from Business', [], function(err, row){
        console.log(`${row.username}\t${row.passwordhash}\t${row.bid}`);
      });
    }
*/




    module.exports.test = () =>{
      /*
      db.get('insert into abc(b) values (1); select last_insert_rowid();',
          (err, rows) =>{
            console.log(`TESTING TESTING rows:${rows}`);
            util.inspect(rows);
          }
      );*/
      /*
      db.serialize(() => {
        dbSum(1, 1, db);
        dbSum(2, 2, db);
        dbSum(3, 3, db);
        dbSum(4, 4, db);
        dbSum(5, 5, db);
      });

      // close the database connection
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
      });

      function dbSum(a, b, db) {
        db.get('SELECT (? + ?) sum', [a, b], (err, row) => {
          if (err) {
            console.error(err.message);
          }
          console.log(`The sum of ${a} and ${b} is ${row.sum}`);
        });
      }
      */
      return;

      //only does 1 command at a time and ignores the one after
      /*db.run('insert into Item values(1,"test",9,9);\
          insert into Item values(1,"test2",9,9);');
          */
    }




/*
    //this doesn't work
    function customerlogin(username, passwordhash, type){
        var user; 
        var id;
        if(type == 'c'){
          user = 'Customer';
          id = 'cid';
        } else if(type == 'b'){
          user = 'Business';
          id = 'bid';
        } else{//store
          user = 'Store';
          id = 'sid';
        }
        promises = []
        promises.push(new Promise((resolve, reject)=>{
          //-1 is err, 0 can't login, id number login successful

          db.get(`select ${id} from ${user} where username=? and passwordhash=?`,
            [username, passwordhash],
            (err, row)=>{

              if(err){
                console.log(`[DB]customerloginERROR: username(${username})`);
                console.log({"login":false, "error":"Internal error"});
                reject(-1);
                return;
              }
              if(!row){
                console.log(`[DB]customerlogin: username(${username}) not found`);
                reject(0);
                return;
              }
              resolve(row[id]);
          });
        }));
        Promise.all(promises)
          .then(response=>{
             //I guess something here? Maybe use timeout
          });
    }
*/



    /*
    module.exports.injection = function(){
      db.each('select * from Customer where cid = ?',
          ['4548 or 1=1'],
          (err, row) =>{
            if(err) console.log("injection1 " + err);
            if(row) console.log("injection2 " + rows);
          }, (err, count)=>{
            console.log(`injection rows: ${count}`);
          });
    }*/