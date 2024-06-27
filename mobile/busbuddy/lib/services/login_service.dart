import 'dart:convert';
import 'package:busbuddy/Screens/Dashboard/trip_schedule.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart';
import '../constants.dart';

class LoginService {
  final storage = const FlutterSecureStorage();

  Future<void> login(BuildContext context, String email, String password,
      GlobalKey<FormState> formKey) async {
    if (formKey.currentState!.validate()) {
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (BuildContext context) {
          return const Center(
            child: CircularProgressIndicator(
              valueColor: AlwaysStoppedAnimation<Color>(Colors.orange),
            ),
          );
        },
      );

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

        Navigator.pop(context);

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
        Navigator.pop(context);
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

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _loginService = LoginService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Login'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              TextFormField(
                controller: _emailController,
                decoration: const InputDecoration(labelText: 'Email'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your email';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16.0),
              TextFormField(
                controller: _passwordController,
                decoration: const InputDecoration(labelText: 'Password'),
                obscureText: true,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your password';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 32.0),
              ElevatedButton(
                onPressed: () {
                  _loginService.login(
                    context,
                    _emailController.text,
                    _passwordController.text,
                    _formKey,
                  );
                },
                child: const Text('Login'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }
}

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Bus Buddy',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const LoginPage(),
    );
  }
}
