var config = {};
var CryptoJS = require("crypto-js");

config.email = 'pictsalary@gmail.com' // Your Email here - Turn on less secure login from Google Security dashboard
var encrypted = "U2FsdGVkX19ze3xjf3PqtSr8cktZNuH1xvZa2Ju1Ajw=";

var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");

// document.getElementById("demo1").innerHTML = encrypted;
// document.getElementById("demo2").innerHTML = decrypted;
var final = decrypted.toString(CryptoJS.enc.Utf8);
console.log(final)

config.password = final // Your password here

module.exports = config;