// Entry page for user
// User inputs address

import 'package:appete/controllers/current_address_controller.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class UserStart extends StatelessWidget {
  UserStart({super.key});

  final CurrentAddressController _addressController =
      Get.put(CurrentAddressController());
  final TextEditingController _addressField = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(''),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const Text(
                'Hi, where u at?',
                style: TextStyle(
                  fontSize: 30,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 20),
              TextField(
                controller: _addressField,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Address',
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: saveCurrentAddress,
                style: ElevatedButton.styleFrom(
                  elevation: 0.0,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                  backgroundColor: Colors.black,
                ),
                child: const Text(
                  "Submit",
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 15,
                      color: Colors.white),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  dynamic saveCurrentAddress() {
    // Handle submit action
    if (_addressField.text == '') {
      showDialog(
        context: Get.context!,
        barrierDismissible: false,
        barrierColor: Colors.black.withOpacity(0.5),
        builder: (BuildContext context) {
          return AlertDialog(
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.all(Radius.circular(8.0)),
            ),
            title: Text('Oops!',
                style: TextStyle(
                    color: Color.fromARGB(255, 187, 110, 47),
                    fontWeight: FontWeight.bold)),
            content: Text("We really need to know where you are right now :/"),
            actions: <Widget>[
              TextButton(
                child: Text(
                  "Got it",
                  style: TextStyle(color: Colors.orange[500]),
                ),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
            ],
          );
        },
      );
    } else {
      _addressController.setAddress = _addressField.text;
      print(_addressController.getAddress);
      Get.toNamed('/home');
    }
  }
}
