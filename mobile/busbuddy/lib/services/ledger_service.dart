import 'dart:convert';
import 'package:busbuddy/constants.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class LedgerService {
  static final storage = const FlutterSecureStorage();

  static Future<void> addEntry({
    required String type,
    required String name,
    required int amount,
    required int refId,
  }) async {
    try {
      String token = await storage.read(key: 'JWtoken') ?? "";

      String url = 'http://$khost:8081/api/v1/ledger/addEntry';

      final response = await http.post(
        Uri.parse(url),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: json.encode({
          'type': type,
          'name': name,
          'amount': amount,
          'refId': refId,
        }),
      );

      if (response.statusCode != 200) {
        print('Failed to add entry: ${response.statusCode}');
      }
    } catch (error) {
      print('Error adding entry: $error');
    }
  }
}
