import 'package:appete/controllers/tab_index_controller.dart';
import 'package:appete/widgets/bottomNav.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class Body extends StatelessWidget {
  final TabIndexController controller;
  final List<Widget> pageList;

  const Body({super.key, required this.controller, required this.pageList});

  @override
  Widget build(BuildContext context) {
    return Obx(() => Stack(
          children: [
            // Main content (the page list)
            SafeArea(
              // Wrap the page content inside a SafeArea to avoid overlap
              child: pageList[controller.tabIndex],
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Padding(
                  padding: EdgeInsets.only(
                      bottom: MediaQuery.of(context)
                          .padding
                          .bottom), // Avoid overlap
                  child: Theme(
                    data: Theme.of(context)
                        .copyWith(canvasColor: Colors.grey[500]),
                    child: BottomNavigation(),
                  )),
            ),
          ],
        ));
  }
}
