import 'package:flutter/material.dart';

class Fetchhook {
  final dynamic data;
  final bool isLoading;
  final Exception? error;
  final VoidCallback refetch;

  Fetchhook({
    required this.data,
    required this.isLoading,
    required this.error,
    required this.refetch,
  });
}