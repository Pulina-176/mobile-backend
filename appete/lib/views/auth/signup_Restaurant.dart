import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class RestaurantSignUp extends StatelessWidget {
  const RestaurantSignUp({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.red[100],
      appBar: AppBar(
        backgroundColor: Colors.amber[200],
        elevation: 0.0,
        title: Text("Sign up as a Restaurant")
      ),
      body: Container(
        padding: EdgeInsets.symmetric(vertical: 20.0, horizontal: 50.0),
        child: Form(
          child: Column(
            children: <Widget>[
              SizedBox(height: 20.0),
              TextFormField(
                onChanged: (value) => {

                },
              ),
              SizedBox(height: 20.0),
              TextFormField(
                obscureText: true,
                onChanged: (val) {

                },
              ),
              SizedBox(height: 20.0),
              ElevatedButton(
                child: Text(
                  'Sign up',
                  style: TextStyle(color: Colors.black87),
                ),
                onPressed: () => {},
              )

            ],
          ),
        ),
      ),
    );
  }
}