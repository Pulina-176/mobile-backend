// Firebase setup
import 'package:appete/controllers/auth_user_controller.dart';
import 'package:appete/views/favourites/widgets/view_deals_user.dart';
import 'package:appete/views/welcome/appStart.dart';
import 'package:appete/views/auth/login_Restaurant.dart';
import 'package:appete/views/auth/signup_Restaurant.dart';
import 'package:appete/views/entryPoint_restaurant.dart';
import 'package:appete/views/favourites/widgets/view_restaurant.dart';

import 'package:firebase_core/firebase_core.dart';
// // Import the Cloudinary packages.
// import 'package:cloudinary_url_gen/cloudinary.dart';
// import 'package:cloudinary_flutter/image/cld_image.dart';
// import 'package:cloudinary_flutter/cloudinary_context.dart';

import 'package:cloudinary/cloudinary.dart';

import 'package:appete/views/entryPoint.dart';
import 'package:appete/views/auth/user_start.dart';
import 'package:appete/views/auth/login_User.dart';
import 'package:flutter/foundation.dart';

import 'package:flutter/material.dart';
import 'package:get/get.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // CloudinaryContext.cloudinary =
  //     Cloudinary.fromCloudName(cloudName: 'dskifca6z');

  if (kIsWeb) {
    Firebase.initializeApp(
            options: const FirebaseOptions(
                apiKey: "AIzaSyCsQ2VBjZRHOAwvtzz4XytSyVjAxgaPTdQ",
                authDomain: "appete-project.firebaseapp.com",
                projectId: "appete-project",
                storageBucket: "appete-project.firebasestorage.app",
                messagingSenderId: "535458211873",
                appId: "1:535458211873:web:f262f14ebe6a905fee5b60"))
        .then((value) {
      Get.put(AuthService());
    });
  } else {
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
      theme: ThemeData(
        primaryColor: const Color.fromARGB(255, 255, 115, 92),
        fontFamily: 'Inter',
        inputDecorationTheme: InputDecorationTheme(
            border:
                OutlineInputBorder(borderRadius: BorderRadius.circular(8.0)),
            focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8.0),
                borderSide: BorderSide(color: Colors.black)),
            labelStyle: TextStyle(color: Colors.black),
            hintStyle: TextStyle(color: Colors.black)),
        textSelectionTheme: TextSelectionThemeData(cursorColor: Colors.black),
      ),
      home: AppStart(),
      routes: {
        '/home': (context) => MainScreen(), // Define the home route
        '/home-rest': (context) => MainScreen_Restaurant(),
        '/signin-rest': (context) => LoginPage_Restaurant(),
        '/start': (context) => UserStart(), // User Start Page
        '/restaurant-signup': (context) => RestaurantSignUp(),
        '/view-rest': (context) =>
            ViewRestaurant(restaurantId: Get.arguments['id']),
        '/view-deals': (context) =>
            ViewDeals_for_Rest_by_User(),
      },
    );
  }
}
