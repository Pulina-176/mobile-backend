import 'package:flutter/material.dart';
import 'package:get/get.dart';

class AppStart extends StatelessWidget {
  const AppStart({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.white,
        bottomNavigationBar: Padding(
          padding: const EdgeInsets.only(bottom: 88, right: 39, left: 39),
          child: Row(
            children: [
              Expanded(
                child: SizedBox(
                  height: 60,
                  child: ElevatedButton(
                      onPressed: () => {Get.toNamed("/signin-rest")},
                      style: ElevatedButton.styleFrom(
                        elevation: 0.0,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        backgroundColor:
                            const Color.fromARGB(255, 187, 110, 47),
                      ),
                      child: const Text(
                        "Login",
                        style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 15,
                            color: Colors.white),
                      )),
                ),
              ),
              const SizedBox(width: 30),
              Expanded(
                child: SizedBox(
                  height: 60,
                  child: ElevatedButton(
                      onPressed: () => {Get.toNamed("/start")},
                      style: ElevatedButton.styleFrom(
                        elevation: 0.0,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        backgroundColor: Colors.black,
                      ),
                      child: const Text(
                        "User",
                        style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 15,
                            color: Colors.white),
                      )),
                ),
              ),
            ],
          ),
        ),
        body: Column(crossAxisAlignment: CrossAxisAlignment.center, children: [
          Padding(
              padding: const EdgeInsets.all(20.0),
              child: Image.asset("assets/images/welcome.png")),
          const Text("Welcome to Appete!",
              textAlign: TextAlign.center,
              style: TextStyle(
                  fontFamily: 'Poppins',
                  color: Color.fromARGB(255, 187, 110, 47),
                  fontSize: 35,
                  fontWeight: FontWeight.bold)),
          const SizedBox(height: 20),
          const Text("Bringing You Closer to Delicious Moments!",
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.normal)),
        ]));
  }
} 
//       backgroundColor: Colors.white,
//       appBar: AppBar(
//         elevation: 0.0,
//         backgroundColor: Colors.white,
//       ),
//       body: Stack(
//         alignment: Alignment.bottomCenter,
//         children: [
//           Center(
//             child: Column(
//               mainAxisAlignment: MainAxisAlignment.center,
//               children: [
//                 Text(
//                   "Appete",
//                   style: TextStyle(
//                       fontFamily: 'Poppins',
//                       color: Colors.yellow[700],
//                       fontSize: 40,
//                       fontWeight: FontWeight.bold),
//                 ),

//                 SizedBox(
//                   height: 300,
//                   child: Image.asset("assets/images/welcome.png"),
//                 ),
//                 // App title

//                 // Buttons
//                 ElevatedButton(
//                   style: ElevatedButton.styleFrom(
//                     backgroundColor: Colors.black,
//                     shape: RoundedRectangleBorder(
//                       borderRadius: BorderRadius.circular(10),
//                     ),
//                     maximumSize: Size(size.width * 0.8, 40),
//                     padding: const EdgeInsets.symmetric(
//                         horizontal: 40, vertical: 10),
//                   ),
//                   onPressed: () {
//                     Get.toNamed("/signin-rest");
//                   },
//                   child: const Text(
//                     "Manage your Restaurant",
//                     style: TextStyle(color: Colors.white),
//                   ),
//                 ),
//                 const SizedBox(height: 10), // Space between buttons
//                 ElevatedButton(
//                   style: ElevatedButton.styleFrom(
//                     backgroundColor: Colors.yellowAccent[700],
//                     shape: RoundedRectangleBorder(
//                       borderRadius: BorderRadius.circular(10),
//                     ),
//                     minimumSize: Size(size.width * 0.45, 40),
//                     padding: const EdgeInsets.symmetric(
//                         horizontal: 40, vertical: 10),
//                   ),
//                   onPressed: () {
//                     Get.toNamed("/start");
//                   },
//                   child: const Text(
//                     "Discover Nearby Restaurants",
//                     style: TextStyle(color: Colors.white, fontSize: 15),
//                   ),
//                 ),
//               ],
//             ),
//           ),
//         ],
//       ),
//     );
//   }
// }
