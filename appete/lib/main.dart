// Firebase setup
import 'package:appete/controllers/auth_user_controller.dart';
import 'package:appete/views/auth/signup_Restaurant.dart';

import 'package:firebase_core/firebase_core.dart';

import 'package:appete/views/entryPoint.dart';
import 'package:appete/views/auth/user_start.dart';
import 'package:appete/views/auth/login_User.dart';
import 'package:flutter/foundation.dart';


import 'package:flutter/material.dart';
import 'package:get/get.dart';


Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  if(kIsWeb) {
    Firebase.initializeApp(
      options: const FirebaseOptions(
            apiKey: "AIzaSyCsQ2VBjZRHOAwvtzz4XytSyVjAxgaPTdQ",
            authDomain: "appete-project.firebaseapp.com",
            projectId: "appete-project",
            storageBucket: "appete-project.firebasestorage.app",
            messagingSenderId: "535458211873",
            appId: "1:535458211873:web:f262f14ebe6a905fee5b60"
        )
    ).then((value) {
        Get.put(AuthService());
  });
  }
  else{
    await Firebase.initializeApp().then((value) {
        Get.put(AuthService());
  });
  }

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





