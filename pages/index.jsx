import Head from "next/head";
import { useState } from "react";
import { saveAs } from "file-saver";
import id3writer from "../utils/id3writer";

export default function Home() {
  const [title, settitle] = useState("");
  const [artist, setartist] = useState("");
  const [composer, setcomposer] = useState("");
  const [genres, setgenres] = useState("");
  const [language, setlanguage] = useState("");
  const [album, setalbum] = useState("");
  const [releaseyear, setreleaseyear] = useState(2022);
  const [mp3ArrayBuffer, setmp3FileBuffer] = useState();
  const [imageArrayBuffer, setImageArrayBuffer] = useState();

  const readFiles = (e, setFunctions) => {
    const files = e.target.files;
    if (files.length >= 1) {
      const reader = new FileReader();
      reader.onload = function () {
        setFunctions(reader.result);
      };
      reader.onerror = function () {
        console.log("error occured");
      };
      reader.readAsArrayBuffer(files[0]);
    }
  };

  const onbtnclick = async () => {
    saveAs(
      id3writer({
        mp3ArrayBuffer,
        imageArrayBuffer,
        title,
        artist: artist.split(","),
        composer: composer.split(","),
        genres: genres.split(","),
        language,
        album,
        releaseyear,
      }),
      `${title}.mp3`
    );
  };

  return (
    <>
      <Head>
        <title>Get a copy</title>
      </Head>
      <main className="mx-auto max-w-screen-md my-10">
        <section>
          <input
            className="w-full px-4 py-2 my-4 text-lg border-gray-300 border-2 rounded-md focus:border-blue-500"
            id="mp3file"
            type="file"
            onChange={(e) => readFiles(e, setmp3FileBuffer)}
            accept="audio/mpeg"
          />

          <input
            className="w-full px-4 py-2 my-4 text-lg border-gray-300 border-2 rounded-md focus:border-blue-500"
            type="text"
            value={title}
            placeholder="title"
            onChange={(e) => settitle(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 my-4 text-lg border-gray-300 border-2 rounded-md focus:border-blue-500"
            type="text"
            value={artist}
            placeholder="artist"
            onChange={(e) => setartist(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 my-4 text-lg border-gray-300 border-2 rounded-md focus:border-blue-500"
            type="text"
            value={composer}
            placeholder="composer"
            onChange={(e) => setcomposer(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 my-4 text-lg border-gray-300 border-2 rounded-md focus:border-blue-500"
            type="text"
            value={genres}
            placeholder="genres"
            onChange={(e) => setgenres(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 my-4 text-lg border-gray-300 border-2 rounded-md focus:border-blue-500"
            type="text"
            value={language}
            placeholder="language"
            onChange={(e) => setlanguage(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 my-4 text-lg border-gray-300 border-2 rounded-md focus:border-blue-500"
            type="text"
            value={album}
            placeholder="album"
            onChange={(e) => setalbum(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 my-4 text-lg border-gray-300 border-2 rounded-md focus:border-blue-500"
            type="text"
            value={releaseyear}
            placeholder="releaseYear"
            onChange={(e) => setreleaseyear(e.target.value)}
          />

          <input
            className="w-full px-4 py-2 my-4 text-lg border-gray-300 border-2 rounded-md focus:border-blue-500"
            id="imagefile"
            type="file"
            onChange={(e) => readFiles(e, setImageArrayBuffer)}
            accept="image/*"
          />
          <button
            className="bg-blue-500 text-white border-none px-4 py-2 my-4 rounded-md"
            onClick={onbtnclick}
          >
            Process
          </button>
        </section>
      </main>
    </>
  );
}
