export default function (excelBlob, name, type) {
  let blob = new Blob([excelBlob], {
    type: type
  });
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(blob, name);
  } else {
    let link = document.createElement("a");
    let href = window.URL.createObjectURL(blob);
    link.href = href;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(href);
  }
}