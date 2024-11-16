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
            ();
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
          )),
      actions: [
        GestureDetector(
          onTap: () {
            ();
          },
          child: Container(
            margin: const EdgeInsets.all(10),
            alignment: Alignment.center,
            child: SvgPicture.asset(
              'assets/icons/menu-dots-svgrepo-com.svg',
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
        )
      ],
    );
}
}

