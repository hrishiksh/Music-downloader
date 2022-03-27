import browserId3Writer from "browser-id3-writer";

const id3writer = ({
  mp3ArrayBuffer,
  imageArrayBuffer,
  title = "",
  artist = [""],
  composer = [""],
  genres = [""],
  language = "eng",
  album = "",
  releaseyear = 2022,
}) => {
  const writer = new browserId3Writer(mp3ArrayBuffer);
  writer.setFrame("TIT2", title);
  writer.setFrame("TPE1", artist);
  writer.setFrame("TCOM", composer);
  writer.setFrame("TCON", genres);
  writer.setFrame("TLAN", language);
  writer.setFrame("TALB", album);
  writer.setFrame("TYER", releaseyear);
  writer.setFrame("APIC", {
    type: 3,
    data: imageArrayBuffer,
    description: title,
    useUnicodeEncoding: false,
  });
  writer.addTag();
  return writer.getBlob();
};

export default id3writer;
