import 'package:appete/controllers/auth_user_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class LoginPage extends StatelessWidget {
  final AuthService _loginController = Get.put(AuthService());

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
              onPressed: () => {
                  
              },
              child: Text('Login'),
            ),
            ElevatedButton(
              onPressed: 
              () async {
                dynamic result = await _loginController.signInAnon();
                if (result == null) {
                  print('error signing in');
                } else {
                  print('signed in');
                  print(result.uid);
                  Get.toNamed('/home');
                } 
              },
              child: Text('Go as Guest'),
            ),
          ],
        ),
      ),
    );
  }
}