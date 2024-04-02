class DriverModel {
  String? startDestination;
  String? endDestination;
  String? starttime;
  String? endtime;
  String? conductorId;
  String? tripStatus;

  DriverModel(
      {this.conductorId,
      this.endDestination,
      this.endtime,
      this.startDestination,
      this.starttime,
      this.tripStatus});
}
