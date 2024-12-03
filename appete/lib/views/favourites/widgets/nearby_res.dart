import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:appete/controllers/search_near_controller.dart'; // Import SearchNearController
import 'package:appete/controllers/current_address_controller.dart'; // Import CurrentAddressController
import 'package:appete/models/Restaurant.dart'; // Import the Restaurant model

class NearbyRestaurantList extends StatelessWidget {
  final SearchNearController searchNearController =
      Get.put(SearchNearController());
  final CurrentAddressController currentAddressController = Get.find();

  @override
  Widget build(BuildContext context) {
    searchNearController.fetchRestaurants();
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // Search bar for filtering restaurants by city
            TextField(
              onChanged: (value) {
                searchNearController.setCity(currentAddressController, value);
              },
              decoration: InputDecoration(
                labelText: 'Search by City',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
                prefixIcon: Icon(Icons.search, color: Colors.black),
              ),
            ),
            SizedBox(height: 20),
            // Button row
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                ElevatedButton(
                  onPressed: () {
                    searchNearController.searchByCity(currentAddressController);
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color.fromARGB(255, 187, 110, 47),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  child: Text('Search',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                      )),
                )
              ],
            ),
            SizedBox(height: 20),
            // Reactive list of filtered restaurants
            Expanded(
              child: Obx(() {
                // Show loading indicator if restaurants are being fetched
                if (searchNearController.getFilteredRestaurants.isEmpty) {
                  return Center(child: CircularProgressIndicator());
                }

                // Display the filtered restaurants list
                return ListView.builder(
                  itemCount: searchNearController.getFilteredRestaurants.length,
                  itemBuilder: (context, index) {
                    final restaurant =
                        searchNearController.getFilteredRestaurants[index];
                    return RestaurantCard(restaurant: restaurant);
                  },
                );
              }),
            ),
          ],
        ),
      ),
    );
  }
}

// Widget for displaying a single restaurant
class RestaurantCard extends StatelessWidget {
  final Restaurant restaurant;

  const RestaurantCard({required this.restaurant});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.symmetric(vertical: 10),
      elevation: 5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(10),
        onTap: () {
          Get.toNamed('/view-rest', arguments: {'id': restaurant.id});
        },
        child: Row(
          children: [
            // Restaurant Image
            ClipRRect(
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(10),
                bottomLeft: Radius.circular(10),
              ),
              child: restaurant.photo.isNotEmpty
                  ? Image.network(
                      restaurant.photo,
                      width: 100,
                      height: 100,
                      fit: BoxFit.cover,
                    )
                  : Container(
                      width: 100,
                      height: 100,
                      color: Colors.grey[300],
                      child: Icon(
                        Icons.restaurant,
                        color: Colors.white,
                        size: 40,
                      ),
                    ),
            ),
            // Restaurant Info
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      restaurant.name,
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Color.fromARGB(255, 50, 50, 50),
                      ),
                    ),
                    SizedBox(height: 5),
                    Text(
                      restaurant.address,
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.grey[700],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            // Arrow Icon
            Padding(
              padding: const EdgeInsets.only(right: 8.0),
              child: Icon(
                Icons.arrow_forward_ios,
                color: Color.fromARGB(255, 187, 110, 47),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
