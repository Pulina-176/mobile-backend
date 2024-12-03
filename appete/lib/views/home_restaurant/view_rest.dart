import 'package:appete/views/home_restaurant/view_deals.dart';
import 'package:appete/views/home_restaurant/view_menu.dart';
import 'package:flutter/material.dart';

class ViewRest extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: Text('Your Restaurant'),
          automaticallyImplyLeading: false, // Removes the back button
          bottom: TabBar(
            tabs: [
              Tab(text: 'Menu'),
              Tab(text: 'Deals'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            ViewMenu_Restaurant(),
            ViewDeals_Restaurant(),
          ],
        ),
      ),
    );
  }
}