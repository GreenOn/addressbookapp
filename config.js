/*module.exports = {
	secret: 'AddressBookApp_secret_87203#',
	sendgrid_key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
	mongodb: 'mongodb://AddressBookApp:dyno2016#@ds011308.mongolab.com:11308/AddressBookApp'
}
*/
var template_ids = {
	register_success: "6f38f460-73a4-4657-abe6-d0e907a37a6a",
	register_confirmation: "3b234ed7-27ba-4a00-95f1-c9b14e016992",
	password_recover: "71d9a777-7103-4b2b-9de6-65cbc47bb361",
	document_shared: "a60044d2-43cf-4fb2-bf50-e96afc23d148"
};

module.exports = {
	secret: 'AddressBookApp_secret_87203#',
	mongodb: 'mongodb://localhost/testing',
	verify_url: 'https://localhost:8080/api/verify/',
	reset_url: 'https://AddressBookApp-editor.herokuapp.com/support/reset.html#?',
	sendgrid_url: 'https://api.sendgrid.com/api/mail.send.json',
	sendgrid_key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
	sendgrid_email: 'AddressBookAppApp@gmail.com',
	sendgrid_templates: template_ids
}

// module.exports = {
// 	secret: 'AddressBookApp_secret_87203#',
// 	mongodb: 'mongodb://127.0.0.1:27017/AddressBookApp',
// 	verify_url: 'https://192.168.2.82:8080/api/verify/',
// 	reset_url: 'http://192.168.2.82:8080/support/reset.html#?',
// 	sendgrid_url: 'https://api.sendgrid.com/api/mail.send.json',
// 	sendgrid_key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
// 	sendgrid_email: 'AddressBookAppApp@gmail.com',
// 	sendgrid_templates: template_ids
// } 
