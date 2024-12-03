import 'package:appete/controllers/restaurant_controller.dart';
import 'package:appete/widgets/imagePicker.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class RestaurantProfile extends StatelessWidget {
  final RestaurantController _currentRestaurant =
      Get.put(RestaurantController());

  late final TextEditingController nameController;
  late final TextEditingController aboutController;
  late final TextEditingController hotlineController;
  late final TextEditingController addressController;

  RestaurantProfile() {
    nameController =
        TextEditingController(text: _currentRestaurant.currentRestaurant!.name);
    aboutController = TextEditingController(
        text: _currentRestaurant.currentRestaurant!.about);
    hotlineController = TextEditingController(
        text: _currentRestaurant.currentRestaurant!.hotline);
    addressController = TextEditingController(
        text: _currentRestaurant.currentRestaurant!.address);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // Profile Photo Section
              Container(
                child: Stack(
                  children: [
                    Stack(
                      alignment: Alignment.center,
                      children: [
                        UploadImageWidget(),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Editable Fields
              TextField(
                controller: nameController,
                decoration: InputDecoration(
                  labelText: 'Name',
                  filled: true,
                  fillColor: Colors.yellow[10],
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
              const SizedBox(height: 16),

              TextField(
                controller: aboutController,
                decoration: InputDecoration(
                  labelText: 'About',
                  labelStyle: TextStyle(
                    color: Colors.black,
                    fontSize: 14,
                  ),
                  filled: true,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
              const SizedBox(height: 16),

              TextField(
                controller: hotlineController,
                decoration: InputDecoration(
                  labelText: 'Hotline',
                  labelStyle: TextStyle(
                    color: Colors.black,
                    fontSize: 14,
                  ),
                  filled: true,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
              const SizedBox(height: 16),

              TextField(
                controller: addressController,
                decoration: InputDecoration(
                  labelText: 'Address',
                  labelStyle: TextStyle(
                    color: Colors.black,
                    fontSize: 14,
                  ),
                  filled: true,
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // Save Button
              ElevatedButton.icon(
                onPressed: () {
                  // Save changes
                  SaveChanges();
                },
                icon: const Icon(
                  Icons.save,
                  size: 18,
                  color: Colors.white,
                ),
                label: const Text(
                  'Save Changes',
                  style: TextStyle(color: Colors.white, fontSize: 14),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.yellow[700], // Yellow for button
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  padding:
                      const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                  elevation: 2,
                  textStyle: const TextStyle(fontWeight: FontWeight.w600),
                ),
              ),
            ],
          )),
    );
  }

  void SaveChanges() {
    try {
      _currentRestaurant.setProfile(nameController.text, addressController.text,
          hotlineController.text, aboutController.text);
    } catch (e) {
      Get.snackbar("error", e.toString());
    }
  }
}
