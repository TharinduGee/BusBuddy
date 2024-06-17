import 'dart:convert';
import 'package:busbuddy/Screens/Dashboard/trip_schedule.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart';
import 'package:flutter/material.dart';
import '../constants.dart';

class LoginService {
  final storage = const FlutterSecureStorage();

  Future<void> login(BuildContext context, String email, String password,
      GlobalKey<FormState> formKey) async {
    if (formKey.currentState!.validate()) {
      try {
        Response response = await post(
          Uri.parse('$khost/api/v1/signIn'),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: jsonEncode(<String, String>{
            'email': email,
            'password': password,
          }),
        );

        if (response.statusCode == 200) {
          var data = jsonDecode(response.body.toString());

          if (data['role'] == 'ROLE_DRIVER' ||
              data['role'] == 'ROLE_CONDUCTOR') {
            print('Login successfully');
            await storage.write(key: 'JWtoken', value: data['token']);
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(builder: (context) => const TripSchedule()),
            );
          } else {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content:
                    Text('Access restricted to drivers and conductors only'),
              ),
            );
          }
        } else {
          var responseData = jsonDecode(response.body.toString());
          String errorMessage = 'Login failed';

          if (response.statusCode == 400 && responseData == 'Bad credentials') {
            errorMessage = 'Email or password incorrect';
          } else if (response.statusCode == 404 &&
              responseData == 'User is not found.') {
            errorMessage = 'User is not found.';
          } else if (response.statusCode == 406 &&
              responseData['message'] ==
                  'User not assigned for this operation.') {
            errorMessage = 'Bus Business owner needs to assign you';
          }

          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(errorMessage),
            ),
          );
        }
      } catch (e) {
        print(e.toString());
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('An error occurred: '),
          ),
        );
      }
    }
  }
}
