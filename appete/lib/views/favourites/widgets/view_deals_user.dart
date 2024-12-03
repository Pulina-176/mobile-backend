import 'package:appete/controllers/restaurant_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:appete/controllers/menu_controller.dart';
import 'package:appete/models/Restaurant.dart';

class ViewDeals_for_Rest_by_User extends StatelessWidget {

  final RestaurantController _controller = Get.put(RestaurantController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('View Restaurant'),
        backgroundColor: Colors.green,
      ),
      body: 
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "test ${_controller.currentRestaurant!.name}",
                  style: const TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  _controller.currentRestaurant!.address,
                  style: const TextStyle(fontSize: 16, color: Colors.grey),
                ),
                const SizedBox(height: 16),
                const Text(
                  "Deals",
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 16),
                ElevatedButton(
                  onPressed: () => {
                    print(_controller.currentRestaurant!.deals)
                  },
                  child: Text("View Deals"),
                ),
              ],
            ),
          )
    );
        }
      
    
  }

