import 'package:appete/controllers/auth_restaurant_controller.dart';
import 'package:appete/controllers/current_address_controller.dart';
import 'package:appete/controllers/menu_controller.dart';
import 'package:appete/controllers/restaurant_controller.dart';
import 'package:appete/models/Restaurant.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ViewMenu_Restaurant extends StatelessWidget {

  final Menu_Controller _menu = Get.put(Menu_Controller());
  final RestaurantController _restaurant = Get.put(RestaurantController());

  @override
  Widget build(BuildContext context) {
      return Scaffold(
      appBar: AppBar(
        title: Text('Menu'),
      ),
      body: Obx(() {
        if (_menu.menuItems.isEmpty) {
          return Center(child: Text('No menu items available'));
        }

        // Group menu items by category
        Map<String, List<MenuItem>> categorizedMenuItems = {};
        for (var item in _menu.menuItems) {
          if (!categorizedMenuItems.containsKey(item.category)) {
            categorizedMenuItems[item.category] = [];
          }
          categorizedMenuItems[item.category]!.add(item);
        }

        return ListView(
          children: categorizedMenuItems.entries.map((entry) {
            return ExpansionTile(
              title: Text(entry.key),
              children: entry.value.map((item) {
                return ListTile(
                  title: Text(item.itemName),
                  subtitle: Text(item.description),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text('\$${item.price}'),
                      IconButton(
                        icon: Icon(Icons.delete, color: Colors.red),
                        onPressed: () {
                          _menu.deleteMenuItem(_restaurant.currentRestaurant!.id , item);
                        },
                      ),
                    ],
                  ),
                );
              }).toList(),
            );
          }).toList(),
        );
      }),
    );

  }
}


            // ElevatedButton(onPressed: () => {
            //   print(_menu.menuItems.last.itemName.toString()),
            //   // _auth.signOut(),
            //   // Get.toNamed('/signin-rest')
            // }, child: Text("Click me"))