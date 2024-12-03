import 'package:appete/controllers/current_address_controller.dart';
import 'package:appete/controllers/restaurant_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class HomePage_Restaurant extends StatelessWidget {
  HomePage_Restaurant({super.key});

  final CurrentAddressController _addressController =
      Get.put(CurrentAddressController());
  final RestaurantController _currentRestaurant =
      Get.put(RestaurantController());

  @override
  Widget build(BuildContext context) {
    final restaurant = _currentRestaurant.currentRestaurant!;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Your Account',
            style: TextStyle(
              color: Colors.black,
              fontSize: 18,
              fontWeight: FontWeight.bold,
            )),
        centerTitle: true,
      ),
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // Profile Section
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.2),
                    blurRadius: 8,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Column(
                children: [
                  // Profile Image
                  CircleAvatar(
                    radius: 60,
                    backgroundImage: restaurant.photo != null
                        ? NetworkImage(restaurant.photo!)
                        : const AssetImage('assets/images/default_profile.png')
                            as ImageProvider,
                  ),
                  const SizedBox(height: 15),

                  // Restaurant Name
                  Text(
                    restaurant.name,
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                    ),
                  ),
                  const SizedBox(height: 10),

                  // Description
                  Text(
                    restaurant.about ?? "No description available.",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.grey[700],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Information Section
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.2),
                    blurRadius: 8,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Address
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Icon(
                        Icons.location_on,
                        color: const Color.fromARGB(255, 255, 115, 92),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Text(
                          restaurant.address ?? "No address available.",
                          style: const TextStyle(
                            fontSize: 14,
                            color: Colors.black,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const Divider(height: 30, color: Colors.grey),

                  // Hotline
                  Row(
                    children: [
                      Icon(
                        Icons.phone,
                        color: const Color.fromARGB(255, 255, 115, 92),
                      ),
                      const SizedBox(width: 10),
                      Text(
                        restaurant.hotline ?? "No hotline available.",
                        style: const TextStyle(
                          fontSize: 14,
                          color: Colors.black,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Edit Profile Button
            SizedBox(
              height: 40,
              width: 300,
              child: ElevatedButton(
                  onPressed: () => {Get.toNamed('/edit-profile')},
                  style: ElevatedButton.styleFrom(
                    elevation: 0.0,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                    backgroundColor: const Color.fromARGB(255, 255, 115, 92),
                  ),
                  child: const Text(
                    "Edit Profile",
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 15,
                        color: Colors.white),
                  )),
            ),
          ],
        ),
      ),
    );
  }
}
