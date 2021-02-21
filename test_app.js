// Load the http module to create an http server.
var http = require('http');
const RippleAPI = require('ripple-lib').RippleAPI;
const instructions = {maxLedgerVersionOffset: 5};
const currency = 'XRP';
const api = new RippleAPI({
    //server: 'wss://s1.ripple.com'                 // MAINNET
    server: 'wss://s.altnet.rippletest.net:51233'   // TESTNET
});

// Create a function to handle every HTTP request
function handler(req, res){

    var form = '';

    if(req.method == "GET"){

        form = '<!doctype html> \
<html lang="en"> \
<head> \
    <meta charset="UTF-8">  \
    <title>Form Calculator Add Example</title> \
</head> \
<body> \
  <form name="myForm" action="" onsubmit="return ajax();"method="post">\
      Username\
      <input type="text" name="A">\
      <br>\
      Password\
      <input type="text" name="B">\
      <br>\
      Amount\
      <input type="number" name="C">\
      <br>\
      Destination Address\
      <input type="text" name="D">\
      <br>\
      Message\
      <input type="text" name="E" id="message_box" style="display: none;">\
      <br>\
      <span id="result"></span> \
      <br> \
      <input type="button" value="Make transaction" onclick="reveal()">\
      <input type="submit" value="Submit"> \
  </form> \
  <script> \
    function reveal(){\
        document.getElementById("message_box").style.display = "block";\
    }\
    function ajax(){ \
      var a = document.forms["myForm"]["A"].value; \
      var b = document.forms["myForm"]["B"].value; \
      var c = document.forms["myForm"]["C"].value; \
      var d = document.forms["myForm"]["D"].value; \
      var e = document.forms["myForm"]["E"].value; \
      var formdata = "A="+a+"&B="+b+"&C="+c+"&D="+d+"&E="+e; \
      \
      xmlhttp = new XMLHttpRequest(); \
      xmlhttp.onreadystatechange=function(){ \
        if(xmlhttp.readyState==4 && xmlhttp.status==200){ \
          document.getElementById("result").innerHTML=xmlhttp.responseText; \
        }; \
      }; \
      xmlhttp.open("POST","",true); \
      xmlhttp.send(formdata); \
      return false; \
    } \
  </script> \
</body> \
</html>';

        //respond
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(form);

    } else if(req.method == 'POST'){

        //read form data
        req.on('data', function(chunk) {

            //grab form data as string
            var formdata = chunk.toString();

            //grab A and B values
            var a = formdata.split("&")[0].substring(2);//eval(formdata.split("&")[0]);
            var b = formdata.split("&")[1].substring(2);//eval(formdata.split("&")[1]);
            var c = formdata.split("&")[2].substring(2);//eval(formdata.split("&")[2]);
            var d = formdata.split("&")[3].substring(2);//eval(formdata.split("&")[3]);
            var e = formdata.split("&")[4].substring(2);
            // console.log(formdata);

            let username = a;//'rpSDxPwUyUzyFxAyVGwGt1hoJGC8neLZhF'
            let password = b;//"sh7ePwac3g2Py36YnnzTqJYxrEJpR"

            let ADDRESS_1;// ADD THIS HERERE
            let SECRET_1;// ADD THIS HERERER

            // TESTNET ADDRESS 2
            let amount = parseInt(c);//'100';
            let ADDRESS_2 = d;//"rBemDgBYvHhGXcuJBMMatQLEAaRKgBc32g"
            let message = e


            let payment = {
                source: {
                    address: ADDRESS_1,
                    maxAmount: {
                        value: amount,
                        currency: currency
                    }
                },
                destination: {
                    address: ADDRESS_2,
                    amount: {
                        value: amount,
                        currency: currency
                    }
                }
            };

            api.connect().then(() => {
                console.log('Connected...');
                api.preparePayment(ADDRESS_1, payment, instructions).then(prepared => {
                    const {signedTransaction, id} = api.sign(prepared.txJSON, SECRET_1);
                    console.log(id)
                    api.submit(signedTransaction).then(result => {
                        console.log(JSON.stringify(result, null, 2));
                        api.disconnect()
                    })
                })
            }).catch(console.error);

            var result = a+b+c+d;//calc(a,b);

            //fill in the result and form values
            form = result.toString();

            //respond
            res.setHeader('Content-Type', 'text/html');
            res.writeHead(200);
            res.end(form);

        });

    } else {
        res.writeHead(200);
        res.end();
    };

};

//js functions running only in Node.JS
function calc(a,b){
    return  Number(a)+Number(b);;
}

// Create a server that invokes the `handler` function upon receiving a request
http.createServer(handler).listen(8000, function(err){
    if(err){
        console.log('Error starting http server');
    } else {
        console.log("Server running at http://127.0.0.1:8000/ or http://localhost:8000/");
    };
});