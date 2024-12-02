import 'package:appete/controllers/auth_restaurant_controller.dart';
import 'package:appete/controllers/tab_index_controller.dart';
import 'package:appete/views/auth/login_Restaurant.dart';
import 'package:appete/views/favourites/favorites_page.dart';
import 'package:appete/views/home_restaurant/home_r_page.dart';
import 'package:appete/views/home_restaurant/restaurant_profile.dart';
import 'package:appete/views/home_restaurant/update_rest.dart';
import 'package:appete/views/home_restaurant/view_rest.dart';
import 'package:appete/widgets/body.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';

class MainScreen_Restaurant extends StatelessWidget {
  MainScreen_Restaurant({super.key});
  // This widget is the home page of the application

  final AuthRestaurantController _auth =
      Get.put(AuthRestaurantController());

  List<Widget> pageList = [
    HomePage_Restaurant(),
    ViewRest(),
    UpdateRest(),
    RestaurantProfile()
  ];

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(
        TabIndexController()); // controller to identify which tab is opened
    return Scaffold(
      appBar: appBar(context),
      body: Body(
          controller: controller,
          pageList: pageList), // pass down props to Body
    );
  }

  AppBar appBar(BuildContext context) {
    return AppBar(
          title: Text(
            'Appete',
            style: TextStyle(
              color: Colors.black,
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          backgroundColor: Colors.orange[500],
          elevation: 0.5,
          centerTitle: true,
          leading: GestureDetector(
            onTap: () {
              Navigator.of(context).pop(); // Navigate to the previous page
            },
            child: Container(
              margin: const EdgeInsets.all(10),
              alignment: Alignment.center,
              child: SvgPicture.asset(
                'assets/icons/chevron-left-svgrepo-com.svg',
                width: 20,
                height: 20,
              ),
              width: 30,
              height: 30,
              decoration: BoxDecoration(
                color: Colors.orange[500],
                borderRadius: BorderRadius.circular(10),
              ),
            ),
          ),
          actions: [
            PopupMenuButton<String>(
              onSelected: (value) {
                if (value == 'signout') {
                  // Implement sign-out logic here
                  _auth.signOut();
                  // Navigate to the login page and clear navigation history
                  Navigator.pushAndRemoveUntil(
                    context,
                    MaterialPageRoute(builder: (context) => LoginPage_Restaurant()), // Replace `LoginPage` with your login screen
                    (route) => false, // This clears the entire navigation stack
                  );
                }
              },
              icon: SvgPicture.asset(
                'assets/icons/menu-dots-svgrepo-com.svg',
                width: 20,
                height: 20,
              ),
              offset: Offset(0, kToolbarHeight),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
              itemBuilder: (context) => [
                PopupMenuItem(
                  value: 'signout',
                  child: Row(
                    children: [
                      Icon(Icons.logout, color: Colors.black),
                      SizedBox(width: 10),
                      Text('Sign Out'),
                    ],
                  ),
                ),
              ],
            ),
          ],
        );
  }
}
