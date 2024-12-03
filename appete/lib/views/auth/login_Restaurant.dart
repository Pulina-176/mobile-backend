import 'package:appete/controllers/auth_restaurant_controller.dart';
import 'package:appete/controllers/menu_controller.dart';
import 'package:appete/controllers/restaurant_controller.dart';
import 'package:appete/views/auth/signup_Restaurant.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class LoginPage_Restaurant extends StatelessWidget {
  final AuthRestaurantController _login = Get.put(AuthRestaurantController());
  final RestaurantController _currentRestaurant =
      Get.put(RestaurantController());
  final Menu_Controller _menu = Get.put(Menu_Controller());

  final TextEditingController _email = TextEditingController();
  final TextEditingController _password = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // Header Image
              const SizedBox(height: 50),
              Image.asset(
                'assets/images/login.png',
                height: 150,
                fit: BoxFit.contain,
              ),
              const SizedBox(height: 20),
              const Text(
                'Welcome Back!',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 10),
              const Text(
                'Please log in to continue',
                style: TextStyle(fontSize: 16, color: Colors.grey),
              ),
              const SizedBox(height: 30),
              // Email Input
              TextField(
                controller: _email,
                decoration: InputDecoration(
                  labelText: 'Email',
                  hintText: 'Enter your email',
                  hintStyle: const TextStyle(fontSize: 14),
                  prefixIcon: const Icon(Icons.email_outlined),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12.0),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              // Password Input
              TextField(
                controller: _password,
                obscureText: true,
                decoration: InputDecoration(
                  labelText: 'Password',
                  hintText: 'Enter your password',
                  hintStyle: const TextStyle(fontSize: 14),
                  prefixIcon: const Icon(Icons.lock_outline),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12.0),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              // Login Button
              SizedBox(
                height: 40,
                width: 300,
                child: ElevatedButton(
                    onPressed: () => {LogIn()},
                    style: ElevatedButton.styleFrom(
                      elevation: 0.0,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10.0),
                      ),
                      backgroundColor: const Color.fromARGB(255, 255, 115, 92),
                    ),
                    child: const Text(
                      "Login",
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 15,
                          color: Colors.white),
                    )),
              ),
              const SizedBox(height: 16),
              // Signup Redirect
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text("Don't have an account? "),
                  GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => RestaurantSignUp(),
                        ),
                      );
                    },
                    child: const Text(
                      "Sign-Up",
                      style: TextStyle(
                        color: Color.fromARGB(255, 255, 115, 92),
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }

  void LogIn() async {
    String email = _email.text.trim();
    String password = _password.text.trim();

    if (validateForm()) {
      dynamic result = await _login.signInWithEmailAndPassword(email, password);
      if (result == null) {
        Get.snackbar(
          "Login Failed",
          "Invalid email or password. Please try again.",
          snackPosition: SnackPosition.BOTTOM,
        );
        return;
      }

      String uid = result.uid;
      if (uid.isNotEmpty) {
        try {
          await _currentRestaurant.getRestaurant(uid);
          await _menu.fetchMenuItems(uid);
          Get.toNamed('/home-rest');
        } catch (e) {
          Get.snackbar(
            "Error",
            "Failed to fetch restaurant details: $e",
            snackPosition: SnackPosition.BOTTOM,
          );
        }
      }
    }
  }

  bool validateForm() {
    if (_email.text.isEmpty) {
      Get.snackbar("Missing Field", "You need to enter a valid email",
          snackPosition: SnackPosition.TOP);
      return false;
    }
    if (_password.text.isEmpty) {
      Get.snackbar("Missing Field", "Password is missing!",
          snackPosition: SnackPosition.TOP);
      return false;
    }
    return true;
  }
}
