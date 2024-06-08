const downloadFile = (fileUrl: string, fileName: string) => {
  if (!fileName) {
    fileName = "proposal_attachment.pdf";
  }

  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = fileName;
  link.target = "_blank";

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
};
export default downloadFile;
