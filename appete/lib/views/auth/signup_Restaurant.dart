import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class RestaurantSignUp extends StatelessWidget {
  RestaurantSignUp({super.key});

  final TextEditingController _email = TextEditingController();  
  final TextEditingController _password = TextEditingController();  
  final TextEditingController _confirmed_password = TextEditingController();  

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
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
                controller: _email,
                onChanged: (value) => {

                },
                decoration: InputDecoration(
                labelText: 'Email',
                border: OutlineInputBorder(),
              ),
              ),
              SizedBox(height: 20.0),
              TextFormField(
                controller: _password,
                obscureText: true,
                onChanged: (val) {

                },
                decoration: InputDecoration(
                labelText: 'Password',
                border: OutlineInputBorder(),
              ),
              ),
              SizedBox(height: 20.0),
              TextFormField(
                controller: _confirmed_password,
                obscureText: true,
                onChanged: (val) {

                },
                decoration: InputDecoration(
                labelText: 'Confirm Password',
                border: OutlineInputBorder(),
              ),
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

  bool validateForm() {
    if (_email.text.isEmpty) {
      return false;
    }
    if (_password.text != _confirmed_password.text || _password.text.length < 6) {
      return false;
    }
    return true;
  }

}