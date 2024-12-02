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
      appBar: AppBar(
        title: Text('Search Restaurants'),
        backgroundColor: Colors.green,
      ),
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
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.search),
              ),
            ),
            SizedBox(height: 20),
            // Clear search button
            ElevatedButton(
              onPressed: () {
                searchNearController.clearSearch();
              },
              child: Text('Clear Search'),
            ),
            SizedBox(height: 20),
            ElevatedButton(
                onPressed: () {
                  searchNearController.searchByCity(currentAddressController);
                },
                child: Text('Get Restaurants')),
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
        child: SizedBox(
          height: 100,
          child: ListTile(
              leading: restaurant.photo.isNotEmpty
                  ? Image.network(
                      restaurant.photo, // Use the photo URL
                      width: 100,
                      height: 120,
                      fit: BoxFit.cover,
                    )
                  : Icon(Icons
                      .restaurant), // Placeholder if photo is not available
              title: Text(restaurant.name),
              subtitle: Text(restaurant.address),
              trailing: IconButton(
                icon: Icon(Icons.arrow_forward_ios),
                onPressed: () {
                  // Navigate to the restaurant details page and pass the restaurant ID
                  Get.toNamed('/view-rest', arguments: {'id': restaurant.id});
                },
              )),
        ));
  }
}
