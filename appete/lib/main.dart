// Firebase setup
import 'package:appete/controllers/auth_user_controller.dart';
import 'package:appete/views/auth/signup_Restaurant.dart';

import 'package:firebase_core/firebase_core.dart';

import 'package:appete/views/entryPoint.dart';
import 'package:appete/views/auth/user_start.dart';
import 'package:appete/views/auth/login_User.dart';


import 'package:flutter/material.dart';
import 'package:get/get.dart';


Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp().then((value) {
      Get.put(AuthService());
  });

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
        debugShowCheckedModeBanner: false,
        theme: ThemeData(fontFamily: 'Poppins'),
        home: RestaurantSignUp(),
        routes: {
          '/home': (context) => MainScreen(), // Define the home route
          '/start': (context) => UserStart()  // User Start Page
        },
      );
  }

}





