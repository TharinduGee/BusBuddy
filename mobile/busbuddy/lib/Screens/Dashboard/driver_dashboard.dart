import 'package:flutter/material.dart';

class DriverDashboard extends StatelessWidget {
  const DriverDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Text(
        "driver",
        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 76),
      ),
    );
  }
}
