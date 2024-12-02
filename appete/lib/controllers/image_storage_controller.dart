import 'dart:io';
import 'dart:convert';
import 'package:appete/controllers/restaurant_controller.dart';
import 'package:appete/models/Restaurant.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;

class UploadController extends GetxController {

  static UploadController get to => Get.find(); // Singleton instance for global access

  final String cloudName = "dskifca6z"; // Replace with your cloud name
  final String uploadPreset = "ezkg4wek"; // Replace with your upload preset
  final _picker = ImagePicker();

  final RestaurantController _currentRestaurant = Get.put(RestaurantController()); // current restaurant profile

  // Reference to Firestore collection
  final CollectionReference restaurantCollection =
      FirebaseFirestore.instance.collection('restaurants');

  Rx<File?> imageFile = Rx<File?>(null);
  RxBool isUploading = false.obs;

  Future<void> pickImage() async {
    final pickedFile = await _picker.pickImage(source: ImageSource.gallery);

    if (pickedFile != null) {
      imageFile.value = File(pickedFile.path);
    }
  }

  Future<void> uploadImage() async {
    if (imageFile.value == null) return;

    isUploading.value = true;

    final url = "https://api.cloudinary.com/v1_1/$cloudName/image/upload";
    final request = http.MultipartRequest("POST", Uri.parse(url));
    request.fields['upload_preset'] = uploadPreset;
    request.files.add(await http.MultipartFile.fromPath(
      'file',
      imageFile.value!.path,
    ));

    final response = await request.send();

    isUploading.value = false;

    if (response.statusCode == 200) {
      final responseBody = await response.stream.bytesToString();
      final data = jsonDecode(responseBody);
      Get.snackbar("Success", "Image uploaded successfully",
          snackPosition: SnackPosition.BOTTOM);
      await restaurantCollection.doc(_currentRestaurant.currentRestaurant?.id).update({"photo": data['secure_url']});
      _currentRestaurant.currentRestaurant?.photo = data['secure_url'];

    // Clear the selected image
    imageFile.value = null;
      
    } else {
      Get.snackbar(
        "Error",
        "Failed to upload image. Status: ${response.statusCode}",
        snackPosition: SnackPosition.BOTTOM,
      );
    }
  }
}
