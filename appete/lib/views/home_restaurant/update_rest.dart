import 'package:appete/views/home_restaurant/add_deal.dart';
import 'package:appete/views/home_restaurant/add_item.dart';
import 'package:flutter/material.dart';

class UpdateRest extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: Text('Update Restaurant'),
          bottom: TabBar(
            tabs: [
              Tab(text: 'Menu'),
              Tab(text: 'Deals'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            AddItemPage(),
            AddDeal(),
          ],
        ),
      ),
    );
  }
}