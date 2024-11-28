import 'package:appete/controllers/auth_restaurant_controller.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';

class RestaurantSignUp extends StatelessWidget {

  final TextEditingController _email = TextEditingController();  
  final TextEditingController _password = TextEditingController();  
  final TextEditingController _confirmed_password = TextEditingController(); 
  final TextEditingController _address = TextEditingController();
  final TextEditingController _name = TextEditingController();

  final AuthRestaurantController _restaurant = Get.put(AuthRestaurantController()); 

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.amber[200],
        elevation: 0.0,
        title: Text("Sign up as a Restaurant")
      ),
      body: Container(
        padding: EdgeInsets.symmetric(vertical: 20.0, horizontal: 50.0),
        child: Form(
          child: Column(
            children: <Widget>[

              // Email and Password
              
              SizedBox(height: 20.0),
              TextFormField(
                controller: _email,
                decoration: InputDecoration(
                labelText: 'Email',
                border: OutlineInputBorder(),
              ),
              ),
              SizedBox(height: 20.0),
              TextFormField(
                controller: _password,
                obscureText: true,
                decoration: InputDecoration(
                labelText: 'Password',
                border: OutlineInputBorder(),
              ),
              ),
              SizedBox(height: 20.0),
              TextFormField(
                controller: _confirmed_password,
                obscureText: true,
                decoration: InputDecoration(
                labelText: 'Confirm Password',
                border: OutlineInputBorder(),
              ),
              ),

              // Restaurant Name

              SizedBox(height: 20.0),
              SizedBox(height: 20.0),
              TextFormField(
                controller: _name,
                decoration: InputDecoration(
                labelText: 'Restaurant Name',
                border: OutlineInputBorder(),
              ),
              ),

              // City - Address

              SizedBox(height: 20.0),
              TextFormField(
                controller: _address,
                decoration: InputDecoration(
                labelText: 'City',
                border: OutlineInputBorder(),
              ),
              ),

              // Sign Up Button

              SizedBox(height: 20.0),
              ElevatedButton(
                child: Text(
                  'Sign up',
                  style: TextStyle(color: Colors.black87),
                ),
                onPressed: register,
              )

            ],
          ),
        ),
      ),
    );
  }

  void register() async {

    String? password = _confirmed_password.text;
    String? email = _email.text; 
    String? name = _name.text;
    String? address = _address.text;
    

    // String email = "pulinathushan@gmail.com";
    // String password = "abcdefg";   

    if (validateForm()) {
        dynamic result = await _restaurant.registerWithEmailAndPassword(email, password, name, address);
        Get.toNamed('/signin-rest');
    }
  }

  bool validateForm() {
    if (_email.text.isEmpty) {
      Get.snackbar("Missing field", "You need to enter a valid email");
      return false;
    }
    if (_password.text != _confirmed_password.text || _password.text.length < 6) {
      Get.snackbar("Password mismatch", "Passwords should match and be longer than 6 characters");
      return false;
    }
    return true;
  }

}