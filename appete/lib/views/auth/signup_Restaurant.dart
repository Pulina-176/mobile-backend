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

  final AuthRestaurantController _restaurant =
      Get.put(AuthRestaurantController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
          child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          child: Column(
            children: <Widget>[
              // Email and Password
              const SizedBox(height: 50),
              Image.asset(
                'assets/images/login.png',
                height: 150,
                fit: BoxFit.contain,
              ),
              const SizedBox(height: 20),
              const Text(
                'Welcome to Appete!',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 10),
              const Text(
                'Sign up to continue',
                style: TextStyle(fontSize: 16, color: Colors.grey),
              ),
              const SizedBox(height: 30),

              SizedBox(height: 20.0),
              TextFormField(
                controller: _email,
                decoration: InputDecoration(
                  labelText: 'Email',
                  prefixIcon: Icon(Icons.email_outlined),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12.0),
                  ),
                ),
              ),
              SizedBox(height: 20.0),
              TextFormField(
                controller: _password,
                obscureText: true,
                decoration: InputDecoration(
                  labelText: 'Password',
                  prefixIcon: Icon(Icons.lock_outline),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12.0),
                  ),
                ),
              ),
              SizedBox(height: 20.0),
              TextFormField(
                controller: _confirmed_password,
                obscureText: true,
                decoration: InputDecoration(
                  labelText: 'Confirm Password',
                  prefixIcon: Icon(Icons.lock_outline),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12.0),
                  ),
                ),
              ),

              // Restaurant Name

              SizedBox(height: 20.0),

              TextFormField(
                controller: _name,
                decoration: InputDecoration(
                  labelText: 'Restaurant Name',
                  prefixIcon: Icon(Icons.restaurant_outlined),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12.0),
                  ),
                ),
              ),

              // City - Address

              SizedBox(height: 20.0),
              TextFormField(
                controller: _address,
                decoration: InputDecoration(
                  labelText: 'City',
                  prefixIcon: Icon(Icons.location_on_outlined),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12.0),
                  ),
                ),
              ),

              // Sign Up Button

              SizedBox(height: 20.0),
              SizedBox(
                height: 40,
                width: 300,
                child: ElevatedButton(
                    onPressed: register,
                    style: ElevatedButton.styleFrom(
                      elevation: 0.0,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10.0),
                      ),
                      backgroundColor: const Color.fromARGB(255, 255, 115, 92),
                    ),
                    child: const Text(
                      "Sign Up",
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 15,
                          color: Colors.white),
                    )),
              ),
            ],
          ),
        ),
      )),
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
      dynamic result = await _restaurant.registerWithEmailAndPassword(
          email, password, name, address);
      Get.toNamed('/signin-rest');
    }
  }

  bool validateForm() {
    if (_email.text.isEmpty) {
      Get.snackbar("Missing field", "You need to enter a valid email");
      return false;
    }
    if (_password.text != _confirmed_password.text ||
        _password.text.length < 6) {
      Get.snackbar("Password mismatch",
          "Passwords should match and be longer than 6 characters");
      return false;
    }
    return true;
  }
}
