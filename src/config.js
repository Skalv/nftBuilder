"use strict";

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const { MODE } = require(path.join(basePath, "src/blendMode.js"));
const description =
  "First collection of our poop !";
const baseUri = "ipfs://QmVcDxEj5wgu9dtHbxCRP5VRkh6JhHtJJS9ztmfRdYXNcH";

const layerConfigurations = [
  {
    growEditionSizeTo: 10000,
    layersOrder: [
      { name: "background" },
      { name: "base" },
      { name: "colors" },
      { name: "eyes" },
      { name: "mouth" },
      { name: "accessories" },
      { name: "insects" },
    ],
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 512,
  height: 512,
};

const background = {
  generate: false,
  brightness: "80%",
};

const extraMetadata = {
  creator: "CutePoop Gang"
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.width / format.height,
  imageName: "preview.png",
};

const pinataConfig = {
  imagesMetadata: {
    name: "poop_images",
    keyvalues: {}
  },
  jsonMetadata: {
    name: "poop_metadata",
    keyvalues: {}
  }
}

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pinataConfig
};
