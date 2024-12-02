import 'package:appete/controllers/tab_index_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class BottomNavigation extends StatelessWidget {
  const BottomNavigation({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(TabIndexController());
    return Obx(() => BottomNavigationBar(
      selectedIconTheme: const IconThemeData(color: Colors.black),
      unselectedIconTheme: const IconThemeData(color: Colors.white),
      showSelectedLabels: false,
      showUnselectedLabels: false,
      onTap: (value) {
        controller.setTabIndex = value;
      },
      currentIndex: controller.tabIndex,
      items: const [
      BottomNavigationBarItem(
        icon: Icon(Icons.home),
        label: 'Home',
      ),
      BottomNavigationBarItem(
        icon: Icon(Icons.list),
        label: 'Search',
      ),
      BottomNavigationBarItem(
        icon: Icon(Icons.add),
        label: 'Favorites',
      ),
      BottomNavigationBarItem(
        icon: Icon(Icons.person),
        label: 'Profile',
      ),
    ]));
  }
}
