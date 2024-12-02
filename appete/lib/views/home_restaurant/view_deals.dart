import 'package:appete/controllers/auth_restaurant_controller.dart';
import 'package:appete/controllers/current_address_controller.dart';
import 'package:appete/controllers/menu_controller.dart';
import 'package:appete/controllers/restaurant_controller.dart';
import 'package:appete/models/Restaurant.dart';

// import 'package:cloudinary_url_gen/cloudinary.dart';
// import 'package:cloudinary_flutter/image/cld_image.dart';
// import 'package:cloudinary_flutter/cloudinary_context.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ViewDeals_Restaurant extends StatelessWidget {

  final Menu_Controller _menu = Get.put(Menu_Controller());
  final RestaurantController _restaurant = Get.put(RestaurantController());

  @override
  Widget build(BuildContext context) {
      return Scaffold(
      
      body: Obx(() {
        if (_menu.deals.isEmpty) {
          return Center(child: Text('No deals available'));
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
          children: _menu.deals.map((item) {
            
                return ListTile(
                  title: Text(item.name),
                  subtitle: Text(item.dealDescription),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      // SizedBox(
                      //     width: 200,
                      //     height: 140,
                      //     // Add a Cloudinary CldImageWidget that wraps Flutter's authenticated Image widget.
                      //     child: CldImageWidget(
                      //       publicId: 'cld-sample',
                      //       )
                      // ),
                      Text('\$${item.priceDiscount}'),
                      IconButton(
                        icon: Icon(Icons.delete, color: Colors.red),
                        onPressed: () {
                          _confirmDelete(context, item);
                        }, 
                      ),
                    ],
                  ),
                );
              }).toList(),
            );
  }));

  }

    void _confirmDelete(BuildContext context, Deal deal) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Confirm Delete'),
        content: Text('Are you sure you want to delete this deal?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              _menu.deleteDeal(_restaurant.currentRestaurant!.id, deal);
              Navigator.of(context).pop();
            },
            child: Text('Delete'),
          ),
        ],
      ),
    );
  }
}


            // ElevatedButton(onPressed: () => {
            //   print(_menu.menuItems.last.itemName.toString()),
            //   // _auth.signOut(),
            //   // Get.toNamed('/signin-rest')
            // }, child: Text("Click me"))

