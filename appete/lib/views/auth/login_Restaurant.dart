import 'dart:io';

import 'package:appete/controllers/auth_restaurant_controller.dart';
import 'package:appete/controllers/auth_user_controller.dart';
import 'package:appete/controllers/menu_controller.dart';
import 'package:appete/controllers/restaurant_controller.dart';
import 'package:appete/views/auth/signup_Restaurant.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class LoginPage_Restaurant extends StatelessWidget {
  final AuthRestaurantController _login = Get.put(AuthRestaurantController()); // controller for authorization handling of Restaurant accounts
  final RestaurantController _currentRestaurant = Get.put(RestaurantController()); // controller for logged restaurant functions
  final Menu_Controller _menu = Get.put(Menu_Controller()); // controller for getting menu Items

  final TextEditingController _email = TextEditingController();
  final TextEditingController _password = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Login')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _email,
              decoration: InputDecoration(
                labelText: 'Email',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 16),
            TextField(
              controller: _password,
              obscureText: true,
              decoration: InputDecoration(
                labelText: 'Password',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: LogIn,
              child: Text('Log In'),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                const Text("Don't have an account? "),
                GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) =>
                            RestaurantSignUp(), // Replace with your signup page widget
                      ),
                    );
                  },
                  child: const Text(
                    "Sign-Up",
                    style: TextStyle(
                      color: Colors.blue, // Make it look like a link
                      decoration: TextDecoration
                          .underline, // Add underline for emphasis
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void LogIn() async {
    String? email = _email.text;
    String? password = _password.text;

    if (validateForm()) {
      dynamic result = await _login.signInWithEmailAndPassword(email, password);
      String uid = result.uid; // Unique ID for logged in user

        if (uid.isNotEmpty) {
            print('getting uid doc ${uid}');
            await _currentRestaurant.getRestaurant(uid);
            await _menu.fetchMenuItems(uid);
            Get.toNamed('/home-rest');
        }
    }
  }

  bool validateForm() {
    if (_email.text.isEmpty) {
      Get.snackbar("Missing field", "You need to enter a valid email");
      return false;
    }
    if (_password.text.isEmpty) {
      Get.snackbar("Missing field", "Password is missing!");
      return false;
    }
    return true;
  }
}
