import 'dart:convert';
import 'package:busbuddy/Screens/Dashboard/driver_dashboard.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import '../../../components/already_have_an_account_acheck.dart';
import '../../../constants.dart';
import '../../Signup/signup_screen.dart';

class LoginForm extends StatefulWidget {
  const LoginForm({Key? key}) : super(key: key);

  @override
  _LoginFormState createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _formKey = GlobalKey<FormState>();
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  void login(String email, password) async {
    if (_formKey.currentState!.validate()) {
      try {
        // Create a map containing email and password
        Map<String, dynamic> requestBody = {
          'email': email,
          'password': password,
        };

        // Convert the map to JSON format
        String requestBodyJson = jsonEncode(requestBody);

        // Make the post request with JSON body
        Response response = await post(
          Uri.parse('http://localhost:8081/api/v1/signIn'),
          headers: {
            'Content-Type': 'application/json'
          }, // Specify JSON content type
          body: requestBodyJson, // Use JSON body
        );

        if (response.statusCode == 200) {
          var data = jsonDecode(response.body.toString());
          print(data['token']);
          print('Login successfully');
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => const DriverDashboard()),
          );
        } else {
          print('failed');
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Login failed'),
            ),
          );
        }
      } catch (e) {
        print(e.toString());
      }
      // // API call to login
      // Response response = await http.post(
      //   Uri.parse('http://localhost:8081/api/v1/signIn'),
      //   body: {
      //     'email': emailController.text.toString(),
      //     'password': passwordController.text.toString(),
      //   },
      // );
      // print('Response Data: ${response.body}');

      // if (response.statusCode == 200) {
      //   // Print the response data
      //   print('Response Data: ${response.body}');

      //   Navigator.pushReplacement(
      //     context,
      //     MaterialPageRoute(builder: (context) => DriverDashboard()),
      //   );
      // } else {
      //   // Handle login failure
      //   // Show error message to the user
      //   ScaffoldMessenger.of(context).showSnackBar(
      //     SnackBar(
      //       content: Text('Login failed'),
      //     ),
      //   );
      // }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: emailController,
            keyboardType: TextInputType.emailAddress,
            textInputAction: TextInputAction.next,
            cursorColor: kPrimaryColor,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter your email';
              }
              return null;
            },
            decoration: const InputDecoration(
              hintText: "Your email",
              prefixIcon: Padding(
                padding: EdgeInsets.all(defaultPadding),
                child: Icon(Icons.person),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              controller: passwordController,
              textInputAction: TextInputAction.done,
              obscureText: true,
              cursorColor: kPrimaryColor,
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter your password';
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
          const SizedBox(height: defaultPadding),
          ElevatedButton(
            onPressed: () {
              login(emailController.text.toString(),
                  passwordController.text.toString());
            },
            child: Text(
              "Login".toUpperCase(),
            ),
          ),
          const SizedBox(height: defaultPadding),
          AlreadyHaveAnAccountCheck(
            press: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) {
                    return const SignUpScreen();
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
