# Prerequisites are the following:

node.js installed

## The code located inside the main.js connects to the configured HiveMQ Cloud Broker. This is a ready-set example that can simply be run by executing this command in the terminal of your IDE:

    node main.js

## The code first subscribes to the topic filter 'bike/telemetry/#'. That means the MQTT client receives all messages that are published to this topic filter.

## Then the code publishes a message to the same topic, including the Bike information, inside a JSON file.

## The callback gets triggered when a message is received and prints it to the console.

There are also callbacks for a successful connection and when an error occurs.
