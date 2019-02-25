async function google() {
// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate');

// Creates a client
const translate = new Translate();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
const text = 'The text for which to detect language, e.g. Hello, world!';

let [detections] = await translate.detect(text);
detections = Array.isArray(detections) ? detections : [detections];
console.log('Detections:');
detections.forEach(detection => {
  console.log(`${detection.input} => ${detection.language}`);
});
}

google()
