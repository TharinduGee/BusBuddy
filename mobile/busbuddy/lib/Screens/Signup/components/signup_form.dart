import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../../../components/already_have_an_account_acheck.dart';
import '../../../constants.dart';
import '../../Login/login_screen.dart';

class SignUpForm extends StatefulWidget {
  const SignUpForm({Key? key}) : super(key: key);

  @override
  _SignUpFormState createState() => _SignUpFormState();
}

class _SignUpFormState extends State<SignUpForm> {
  final storage = const FlutterSecureStorage();
  final _formKey = GlobalKey<FormState>();
  TextEditingController firstNameController = TextEditingController();
  TextEditingController lastNameController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  TextEditingController mobileNoController = TextEditingController();
  String selectedRole = '';

  void signUp(String firstName, String lastName, String email, String password,
      String mobileNo, String role) async {
    if (_formKey.currentState!.validate() && role.isNotEmpty) {
      try {
        http.Response response = await http.post(
          Uri.parse('http://$khost:8081/api/v1/signUp'),
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
          // print('Sign-up successful');
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Sign-up successful'),
            ),
          );
        } else {
          // print('Sign-up failed ');
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('Sign-up failed: ${response.body}'),
            ),
          );
        }
      } catch (e) {
        // print('Error during sign-up: ${e.toString()}');
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

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: firstNameController,
            keyboardType: TextInputType.name,
            textInputAction: TextInputAction.next,
            cursorColor: kPrimaryColor,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter your first name';
              }
              return null;
            },
            decoration: const InputDecoration(
              hintText: "Your first name",
              prefixIcon: Padding(
                padding: EdgeInsets.all(defaultPadding),
                child: Icon(Icons.person),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              controller: lastNameController,
              textInputAction: TextInputAction.next,
              cursorColor: kPrimaryColor,
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter your last name';
                }
                return null;
              },
              decoration: const InputDecoration(
                hintText: "Your last name",
                prefixIcon: Padding(
                  padding: EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.person),
                ),
              ),
            ),
          ),
          TextFormField(
            controller: emailController,
            keyboardType: TextInputType.emailAddress,
            textInputAction: TextInputAction.next,
            cursorColor: kPrimaryColor,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter your email';
              } else if (!RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(value)) {
                return 'Please enter a valid email address';
              }
              return null;
            },
            decoration: const InputDecoration(
              hintText: "Your email",
              prefixIcon: Padding(
                padding: EdgeInsets.all(defaultPadding),
                child: Icon(Icons.email),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              controller: passwordController,
              textInputAction: TextInputAction.next,
              obscureText: true,
              cursorColor: kPrimaryColor,
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter your password';
                } else if (value.length < 8) {
                  return 'Password must be at least 8 characters long';
                } else if (!RegExp(r'[0-9]').hasMatch(value)) {
                  return 'Password must contain at least one number';
                } else if (!RegExp(r'[a-z]').hasMatch(value)) {
                  return 'Password must contain at least one lowercase letter';
                } else if (!RegExp(r'[A-Z]').hasMatch(value)) {
                  return 'Password must contain at least one uppercase letter';
                } else if (!RegExp(r'[!@#$%^&*(),.?":{}|<>]').hasMatch(value)) {
                  return 'Password must contain at least one special character';
                }
                return null;
              },
              decoration: const InputDecoration(
                hintText: "Your password",
                prefixIcon: Padding(
                  padding: EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.lock),
                ),
              ),
            ),
          ),
          TextFormField(
            controller: mobileNoController,
            keyboardType: TextInputType.phone,
            textInputAction: TextInputAction.done,
            cursorColor: kPrimaryColor,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter your mobile number';
              } else if (!RegExp(r'^\+?[0-9]{10,15}$').hasMatch(value)) {
                return 'Please enter a valid mobile number';
              }
              return null;
            },
            decoration: const InputDecoration(
              hintText: "Your mobile number",
              prefixIcon: Padding(
                padding: EdgeInsets.all(defaultPadding),
                child: Icon(Icons.phone),
              ),
            ),
          ),
          const SizedBox(height: defaultPadding / 2),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              RoleSelectionButton(
                icon: Icons.business,
                label: 'Owner',
                isSelected: selectedRole == 'Owner',
                onTap: () {
                  setState(() {
                    selectedRole = 'Owner';
                  });
                },
              ),
              RoleSelectionButton(
                icon: Icons.directions_bus,
                label: 'Driver',
                isSelected: selectedRole == 'Driver',
                onTap: () {
                  setState(() {
                    selectedRole = 'Driver';
                  });
                },
              ),
              RoleSelectionButton(
                icon: Icons.people,
                label: 'Conductor',
                isSelected: selectedRole == 'Conductor',
                onTap: () {
                  setState(() {
                    selectedRole = 'Conductor';
                  });
                },
              ),
            ],
          ),
          const SizedBox(height: defaultPadding),
          ElevatedButton(
            onPressed: () {
              signUp(
                firstNameController.text.toString(),
                lastNameController.text.toString(),
                emailController.text.toString(),
                passwordController.text.toString(),
                mobileNoController.text.toString(),
                mapRoleToApiRole(selectedRole),
              );
            },
            child: Text("Sign Up".toUpperCase()),
          ),
          const SizedBox(height: defaultPadding),
          AlreadyHaveAnAccountCheck(
            login: false,
            press: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) {
                    return const LoginScreen();
                  },
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}

class RoleSelectionButton extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool isSelected;
  final VoidCallback onTap;

  const RoleSelectionButton({
    required this.icon,
    required this.label,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: isSelected ? kPrimaryColor : Colors.grey[200],
          borderRadius: BorderRadius.circular(10),
        ),
        child: Column(
          children: [
            Icon(
              icon,
              size: 32,
              color: isSelected ? Colors.white : Colors.black,
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                color: isSelected ? Colors.white : Colors.black,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
