import 'package:appete/controllers/current_address_controller.dart';
import 'package:appete/controllers/restaurant_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class HomePage_Restaurant extends StatelessWidget {
  HomePage_Restaurant({super.key});

  final CurrentAddressController _addressController = Get.put(CurrentAddressController());
  final RestaurantController _currentRestaurant = Get.put(RestaurantController());

  @override
  Widget build(BuildContext context) {
    final restaurant = _currentRestaurant.currentRestaurant!;

    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false, // Removes the back button
        title: Text(
          'Restaurant Profile',
          style: TextStyle(color: Colors.black),
        ),
        backgroundColor: Colors.orange[500],
        centerTitle: true,
        elevation: 0.5,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // Profile Image
            CircleAvatar(
              radius: 100,
              backgroundImage: _currentRestaurant.currentRestaurant!.photo != null
                  ? NetworkImage(_currentRestaurant.currentRestaurant!.photo)
                  : AssetImage('assets/images/default_profile.png') as ImageProvider,
            ),
            const SizedBox(height: 15),

            // Restaurant Name
            Text(
              _currentRestaurant.currentRestaurant!.name,
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
            const SizedBox(height: 10),

            // Description
            Text(
              _currentRestaurant.currentRestaurant!.about ?? "No description available.",
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey[700],
              ),
            ),
            const SizedBox(height: 20),

            // Details Section
            Divider(color: Colors.grey[400]),
            const SizedBox(height: 10),

            // Address
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(Icons.location_on, color: Colors.orange[500]),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    _currentRestaurant.currentRestaurant!.address ?? "No address available.",
                    style: TextStyle(fontSize: 16, color: Colors.black),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),

            // Hotline
            Row(
              children: [
                Icon(Icons.phone, color: Colors.orange[500]),
                const SizedBox(width: 10),
                Text(
                  restaurant.hotline ?? "No hotline available.",
                  style: TextStyle(fontSize: 16, color: Colors.black),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
