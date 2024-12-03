import 'package:appete/controllers/tab_index_controller.dart';
import 'package:appete/views/favourites/favorites_page.dart';
import 'package:appete/views/favourites/widgets/nearby_res.dart';
import 'package:appete/views/home_User/home_page.dart';
import 'package:appete/widgets/body.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';

class MainScreen extends StatelessWidget {
  MainScreen({super.key});
  // This widget is the home page of the application

  List<Widget> pageList = [
    HomePage_User(),
    NearbyRestaurantList(),
    FavoritesPage(),
    HomePage_User()
  ];

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(
        TabIndexController()); // controller to identify which tab is opened
    return Scaffold(
      appBar: appBar(),
      body: Body(
          controller: controller,
          pageList: pageList), // pass down props to Body
    );
  }

  AppBar appBar() {
    return AppBar(
      title: Text(
        'Appete',
        style: TextStyle(
          color: Colors.white,
          fontSize: 20, // Slightly larger font size for modern design
          fontWeight: FontWeight.w600,
        ),
      ),
      backgroundColor: Colors
          .black, // Use a modern, minimalistic color like black or dark grey
      elevation: 0.0, // Remove the shadow for a flatter design
      centerTitle: true,
      leading: GestureDetector(
        onTap: () {
          // Add navigation functionality
        },
        child: Container(
          margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
          child: Icon(
            Icons.arrow_back_ios,
            color: Colors.white, // Use a standard icon with white color
            size: 20,
          ),
        ),
      ),
      actions: [
        GestureDetector(
          onTap: () {
            // Add menu functionality
          },
          child: Container(
            margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
            child: Icon(
              Icons.more_vert,
              color: Colors.white, // Standard modern icon
              size: 22,
            ),
          ),
        ),
      ],
    );
  }
}
