import 'package:appete/controllers/image_storage_controller.dart';
import 'package:appete/controllers/restaurant_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class UploadDealImage extends StatelessWidget {

  final UploadController controller = Get.put(UploadController());
  final RestaurantController _currentRestaurant = Get.put(RestaurantController());

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView( // Wrapping the content in a scrollable widget
      child: Padding(
        padding: const EdgeInsets.all(16.0), // Adding padding for better layout
        child: Column(
          children: [
            Obx(() {
              return CircleAvatar(
                radius: 50, // Adjust size as needed
                backgroundImage: controller.imageFile.value != null
                    ? FileImage(controller.imageFile.value!) as ImageProvider
                    : NetworkImage(_currentRestaurant.currentRestaurant!.photo),
                child: controller.imageFile.value == null
                    ? Icon(
                        Icons.camera_alt,
                        size: 50,
                        color: Colors.grey.shade700,
                      )
                    : null,
              );
            }),
            SizedBox(height: 10),
            Obx(() {
              if (controller.isUploading.value) {
                return CircularProgressIndicator();
              }
              return Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  ElevatedButton(
                    onPressed: controller.pickImage,
                    child: Text("Pick Image"),
                  ),
                  SizedBox(width: 10),
                  ElevatedButton(
                    onPressed: controller.uploadDealImage,
                    child: Text("Upload Image"),
                  ),
                ],
              );
            }),
          ],
        ),
      ),
    );
  }
}
