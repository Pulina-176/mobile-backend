import 'package:appete/controllers/auth_restaurant_controller.dart';
import 'package:appete/controllers/auth_user_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class LoginPage_Restaurant extends StatelessWidget {
  final AuthRestaurantController _login = Get.put(AuthRestaurantController());

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
              decoration: InputDecoration(
                labelText: 'Email',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 16),
            TextField(
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
          ],
        ),
      ),
    );
  }

  void LogIn() async {

    String? email = _email.text; 
    String? password = _password.text;

    dynamic result = await _login.signInWithEmailAndPassword(email, password);
  }
}
