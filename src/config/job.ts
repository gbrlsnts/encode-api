/* Retrieval & Storage */

export const sourceProtocols = ['http', 'https'];
export const destinationProtocols = ['http', 'https', 'ftp', 's3'];

export const jobUrlValidation = (protocols) => ({
  require_protocol: true,
  protocols,
  allow_protocol_relative_urls: false,
});

/* Video */

export const maxEncodingWidth = 3820;
export const maxEncodingHeight = 2160;

export const maxVideoBitrate = 104857600; // 100Mbps

/* Audio */

export const maxAudioBitrate = 5242880; // 5Mbps
