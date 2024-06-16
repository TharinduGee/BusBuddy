import 'dart:convert';
import 'package:busbuddy/Screens/Dashboard/trip_schedule.dart';
import 'package:busbuddy/Screens/Dashboard/dashboard.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
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
  // Create storage
  final storage = const FlutterSecureStorage();
  final _formKey = GlobalKey<FormState>();
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  void login(String email, String password) async {
    if (_formKey.currentState!.validate()) {
      try {
        Response response = await post(
          Uri.parse('http://$khost:8081/api/v1/signIn'),
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

          // Check if the user role is either 'ROLE_DRIVER' or 'ROLE_CONDUCTOR'
          if (data['role'] == 'ROLE_DRIVER' ||
              data['role'] == 'ROLE_CONDUCTOR') {
            print('Login successfully');
            // Write value
            await storage.write(key: 'JWtoken', value: data['token']);
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(builder: (context) => const TripSchedule()),
            );
          } else {
            // User role is not 'ROLE_DRIVER' or 'ROLE_CONDUCTOR'
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
          SnackBar(
            content: Text('An error occurred: $e'),
          ),
        );
      }
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
