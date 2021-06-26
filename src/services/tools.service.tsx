import imageCompression from "browser-image-compression";

export default class Tools {
  static getFileExtension(name: any) {
    const parts = name.split(".");
    return parts[parts.length - 1];
  }
  static isFileImage(name: any) {
    const ext = this.getFileExtension(name).toLowerCase();
    return ext === "jpeg" || ext === "jpg" || ext === "png" || ext === "gif";
  }
  static isSizeOver(size: any, max: any) {
    const mbs = size / 1024 / 1024;
    return mbs <= max;
  }

  static capitalize(str: any) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static async requestSmallImage(event: any) {
    if (!event.target.files || event.target.files.length === 0)
      throw Error("Aucun fichier uploadé");
    const imageFile = event.target.files[0];
    const maxSize = 0.5;
    const name = imageFile.name;
    console.log(name);
    const size = imageFile.size;
    if (!this.isFileImage(name))
      throw Error("Votre fichier doit être un PNG, JPG, JPEG ou GIF");

    if (!this.isSizeOver(size, maxSize)) {
      const options = {
        maxSizeMB: maxSize,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(imageFile, options);
        const url = URL.createObjectURL(compressedFile);
        return url;
      } catch (err) {}
      throw Error("Votre fichier est trop lourd: " + maxSize + " Mo maximum");
    }

    const url = URL.createObjectURL(imageFile);
    console.log(url);
    return url;
  }

  static matchesSearch(search: any, val: any) {
    return (
      !search.length || (val || "").toLowerCase().includes(search.toLowerCase())
    );
  }

  // Try to retrieve language but fallback to other if not available
  static getLang(langObj: any, langId: any) {
    if (langObj) {
      if (langObj[langId] && langObj[langId].length) return langObj[langId];
      // Fallback to english if possible
      if (langObj.en && langObj.en.length) return langObj.en;
      // Fallback to first language available
      for (const id in langObj) if (langObj[id].length) return langObj[id];
    }
    return null;
  }

  static download(url: any, name = "export.csv") {
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  static async readFile(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  static async getImageContent(url: any) {
    const res = await fetch(url);
    const blob = await res.blob();
    return blob;
  }

  static arrayBufferToBase64(buffer: any) {
    let binary = "";
    const bytes = [].slice.call(new Uint8Array(buffer));

    bytes.forEach((b) => (binary += String.fromCharCode(b)));

    return window.btoa(binary);
  }
}
