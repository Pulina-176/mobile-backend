import 'package:flutter/material.dart';
import 'package:get/get.dart';

class AppStart extends StatelessWidget {
  const AppStart({super.key});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0.0,
        backgroundColor: Colors.white,
      ),
      body: Stack(
        alignment: Alignment.bottomCenter,
        children: [
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  "Appete",
                  style: TextStyle(
                      fontFamily: 'Poppins',
                      color: Colors.yellow[700],
                      fontSize: 40,
                      fontWeight: FontWeight.bold),
                ),

                SizedBox(
                  height: 300,
                  child: Image.asset("assets/images/home.png"),
                ),
                // App title

                // Buttons
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.black,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    maximumSize: Size(size.width * 0.8, 40),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 40, vertical: 10),
                  ),
                  onPressed: () {
                    Get.toNamed("/signin-rest");
                  },
                  child: const Text(
                    "Manage your Restaurant",
                    style: TextStyle(color: Colors.white),
                  ),
                ),
                const SizedBox(height: 10), // Space between buttons
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.yellowAccent[700],
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    minimumSize: Size(size.width * 0.45, 40),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 40, vertical: 10),
                  ),
                  onPressed: () {
                    Get.toNamed("/start");
                  },
                  child: const Text(
                    "Discover Nearby Restaurants",
                    style: TextStyle(color: Colors.white, fontSize: 15),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
