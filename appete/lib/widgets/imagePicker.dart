import 'package:appete/controllers/image_storage_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class UploadImageWidget extends StatelessWidget {
  final UploadController controller = Get.put(UploadController());

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Obx(() {
          if (controller.imageFile.value != null) {
            return Image.file(controller.imageFile.value!);
          } else {
            return Placeholder(fallbackHeight: 200, fallbackWidth: double.infinity);
          }
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
                onPressed: controller.uploadImage,
                child: Text("Upload Image"),
              ),
            ],
          );
        }),
      ],
    );
  }
}
