import 'package:appete/controllers/tab_index_controller.dart';
import 'package:appete/views/favourites/favorites_page.dart';
import 'package:appete/views/home_User/home_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:appete/widgets/bottomNav.dart';
import 'package:get/get.dart';

class MainScreen extends StatelessWidget {
  MainScreen({super.key});
  // This widget is the home page of the application

  List<Widget> pageList = const [
    HomePage_User(),
    FavoritesPage(),
    FavoritesPage(),
    HomePage_User()
  ];

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(TabIndexController());  // controller to identify which tab is opened
    return Scaffold(
        appBar: appBar(),
        body: Body(controller: controller, pageList: pageList), // pass down props to Body
        );
  }

  AppBar appBar() {
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
            ();
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
          )),
      actions: [
        GestureDetector(
          onTap: () {
            ();
          },
          child: Container(
            margin: const EdgeInsets.all(10),
            alignment: Alignment.center,
            child: SvgPicture.asset(
              'assets/icons/menu-dots-svgrepo-com.svg',
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
        )
      ],
    );
}

}

class Body extends StatelessWidget {

  final TabIndexController controller;
  final List<Widget> pageList;

  const Body({
    super.key, required this.controller, required this.pageList
  });

  @override
  Widget build(BuildContext context) {
    return Obx(() => Stack(
      children: [
        pageList[controller.tabIndex],
        Align(
          alignment: Alignment.bottomCenter,
          child: Theme(data: Theme.of(context).copyWith(canvasColor: Colors.orange[200]),
          child: BottomNavigation()),
        ),
      ],
    ));
  }
}
