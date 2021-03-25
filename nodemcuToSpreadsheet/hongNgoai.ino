#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
WiFiClientSecure client;
String readString;
const char* ssid = "TEN_WIFI";
const char* password = "MAT_KHAU_WIFI";

const char* host = "script.google.com";
const int httpsPort = 443;
/*

*/
const char* fingerprint = "46 B2 C3 44 9C 59 09 8B 01 B6 F8 BD 4C FB 00 74 91 2F EF F6";
String GAS_ID = "ID_CUA_THANG_SPREADSHEET";  // Replace by your GAS service id

const int IN_A0 = 5; // analog input
int value_A0;

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  //sensor hong ngoai
  pinMode (IN_A0, INPUT);
  
}


void sendData(int x, int y);
void loop() {
  value_A0 = analogRead(IN_A0);
  if(value_A0 > 500){
    String hongNgoai = "Analog = " + String(value_A0);
    Serial.println(hongNgoai);
  }else{
    String hongNgoai = "Analog = " + String(value_A0);
    Serial.println(hongNgoai);
    int a = 1;
    int b = 1;
    sendData(a, b);
  }
  delay(500);
}
