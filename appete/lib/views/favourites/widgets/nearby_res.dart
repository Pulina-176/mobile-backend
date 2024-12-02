import 'package:flutter/material.dart';
import 'package:appete/constants/uidata.dart'; // Import uidata where restaurants list is defined

class NearbyRestaurantList extends StatelessWidget {
  const NearbyRestaurantList({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Nearby Restaurants", // Title for the AppBar
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        centerTitle: true, // Center the title
        backgroundColor: Colors.yellow[700], // Customize the background color
        elevation: 4, // Shadow for the AppBar
      ),
      body: Container(
        padding: const EdgeInsets.all(12),
        child: GridView.builder(
          physics: const BouncingScrollPhysics(), // Smooth scrolling
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 1, // 2 widgets per row
            crossAxisSpacing: 12, // Space between columns
            mainAxisSpacing: 12, // Space between rows
            childAspectRatio: 4 / 3, // Adjusted height for widgets
          ),
          itemCount: restaurants.length,
          itemBuilder: (context, index) {
            var restaurant = restaurants[index]; // Get restaurant details

            return Container(
              decoration: BoxDecoration(
                color: Colors.grey[200],
                borderRadius: BorderRadius.circular(12), // Rounded corners
                boxShadow: [
                  BoxShadow(
                    color: Colors.black26,
                    blurRadius: 6,
                    offset: const Offset(2, 2), // Shadow positioning
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Display restaurant image
                  ClipRRect(
                    borderRadius: const BorderRadius.vertical(
                      top: Radius.circular(12),
                    ),
                    child: Image.asset(
                      "assets/images/home.png", // Replace with actual image path
                      height: 140, // Image height
                      width: double.infinity,
                      fit: BoxFit.cover, // Ensures the image fills the space
                    ),
                  ),
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // Display restaurant name
                          Text(
                            "Hungry Galle", // Replace with actual key
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                          const SizedBox(height: 6),
                          // Display restaurant location or rating
                          Text(
                            "Restaurant Location", // Replace with actual key
                            style: const TextStyle(
                              fontSize: 14,
                              color: Colors.grey,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
