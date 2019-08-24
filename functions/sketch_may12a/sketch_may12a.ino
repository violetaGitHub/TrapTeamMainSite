
// Standard C library
//#include <stdlib>
//#include <stdint>

// Thinxtra libraries
#include <Isigfox.h>
#include <WISOL.h>
#include <SimpleTimer.h>
#include <Tsensors.h>

Isigfox *sigfox = new WISOL();

/**
 * Called when setup failed. Blinks built-in LED to warn user.
 */
void setupFailed() {
  int state = 0;
  while (true) {
    digitalWrite(LED_BUILTIN, state);
    state = state ? 0 : 1;
    delay(1500);
  }
}

void setup() {
  // Set up pins
  pinMode(LED_BUILTIN, OUTPUT);
  
  // Set up Sigfox library
  if (sigfox->initSigfox() != 0) setupFailed();
  if (sigfox->testComms()  != 0) setupFailed();

  // Check we're in RCZ4 (NZ)
  if (sigfox->getZone()    != 4) setupFailed();

  // Shoot out a hello message
  unsigned char* hello = "Hello world!";
  if (sigfox->sendPayload(hello, 12, 0) != 0) {
    setupFailed();
  }

  // We'd send payload data with
  //    int WISOL::sendPayload(uint8_t* outData, const uint8_t len, int downlink)
  // or int WISOL::sendPayload(uint8_t* outData, const uint8_t len, int downlink, recvMsg* receivedMsg)
}

void loop() {
  // put your main code here, to run repeatedly:

}
