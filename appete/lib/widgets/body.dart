import 'package:appete/controllers/tab_index_controller.dart';
import 'package:appete/widgets/bottomNav.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

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