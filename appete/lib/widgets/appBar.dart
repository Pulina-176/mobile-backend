import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class Header extends StatelessWidget {
  const Header({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: Text(
        'Appete',
        style: TextStyle(
          color: Colors.black,
          fontSize: 18,
          fontWeight: FontWeight.bold,
        ),
      ),
      backgroundColor: Colors.orange[500],
      elevation: 0.5,
      centerTitle: true,
      leading: GestureDetector(
        onTap: () {
          // Add logic here if needed
        },
        child: Container(
          margin: const EdgeInsets.all(10),
          alignment: Alignment.center,
          child: SvgPicture.asset(
            'assets/icons/chevron-left-svgrepo-com.svg',
            width: 20,
            height: 20,
          ),
          width: 30,
          height: 30,
          decoration: BoxDecoration(
            color: Colors.orange[500],
            borderRadius: BorderRadius.circular(10),
          ),
        ),
      ),
      actions: [
        PopupMenuButton<String>(
          onSelected: (value) {
            if (value == 'signout') {
              // Add your sign-out logic here
              print('User signed out');
            }
          },
          icon: SvgPicture.asset(
            'assets/icons/menu-dots-svgrepo-com.svg',
            width: 20,
            height: 20,
          ),
          offset: Offset(0, kToolbarHeight),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          itemBuilder: (context) => [
            PopupMenuItem(
              value: 'signout',
              child: Row(
                children: [
                  Icon(Icons.logout, color: Colors.black),
                  SizedBox(width: 10),
                  Text('Sign Out'),
                ],
              ),
            ),
          ],
        ),
      ],
    );
  }
}
