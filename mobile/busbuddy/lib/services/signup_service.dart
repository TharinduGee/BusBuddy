import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../constants.dart';
import '../Screens/Login/login_screen.dart';

class SignUpService {
  final storage = const FlutterSecureStorage();

  Future<void> signUp(
      BuildContext context,
      GlobalKey<FormState> formKey,
      String firstName,
      String lastName,
      String email,
      String password,
      String mobileNo,
      String role) async {
    if (formKey.currentState!.validate() && role.isNotEmpty) {
      try {
        http.Response response = await http.post(
          Uri.parse('$khost/api/v1/signUp'),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: jsonEncode(<String, String>{
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'password': password,
            'mobileNo': mobileNo,
            'role': role,
          }),
        );

        print('Response status: ${response.statusCode}');
        print('Response body: ${response.body}');

        if (response.statusCode == 201) {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) {
                return const LoginScreen();
              },
            ),
          );
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Sign-up successful'),
            ),
          );
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('Sign-up failed: ${response.body}'),
            ),
          );
        }
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('An error occurred: ${e.toString()}'),
          ),
        );
      }
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please complete the form and select a role'),
        ),
      );
    }
  }

  String mapRoleToApiRole(String role) {
    switch (role) {
      case 'Owner':
        return 'ROLE_ADMIN';
      case 'Driver':
        return 'ROLE_DRIVER';
      case 'Conductor':
        return 'ROLE_CONDUCTOR';
      default:
        return '';
    }
  }
}
